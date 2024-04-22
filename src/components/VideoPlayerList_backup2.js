import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { useSelector, useDispatch } from "react-redux";
import { hidePopupVideoPlayer, setHidePopupVideoPlayerList, setEndedVideoPlayerList, updatePlaytime, updatePlaytimeLastWeek, updatePlaytimeLastWeekSelected } from "../redux/exerciseVideos";
import { completeVideoPlayPercentage, minimumVideoPlayPercentage, updateFrequency } from "../constants/defaultValues";


const VideoPlayerListByteArk = ({ videos, url, day_number, video_number, selectedVDO, lastWeekVDO_click, lastWeekVDOAll, lastWeekStart, selectExerciseVideoLastWeek }) => {

  const dispatch = useDispatch();
  const hidePopUpVideoPlayerList = useSelector(({ exerciseVideos }) => (exerciseVideos ? exerciseVideos.hidePopUpVideoPlayerList : ""));
  const exerciseVideo = useSelector(({ exerciseVideos }) => (exerciseVideos ? exerciseVideos.exerciseVideo : ""));
  const all_exercise_activity = useSelector(({ exerciseVideos }) => (exerciseVideos ? exerciseVideos.all_exercise_activity : ""));
  const exerciseVideoLastWeek = useSelector(({ exerciseVideos }) => (exerciseVideos ? exerciseVideos.exerciseVideoLastWeek : ""));
  const endedVideoPlayerList = useSelector(({ exerciseVideos }) => (exerciseVideos ? exerciseVideos.endedVideoPlayerList : ""));
  const user = useSelector(({ authUser }) => (authUser ? authUser.user : ""));
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false); // เพิ่ม state สำหรับตรวจสอบว่าวีดีโอถูกดูจบหรือไม่
  const [videoCurrDuration, setVideoCurrDuration] = useState(0); // เพิ่ม state สำหรับเก็บระยะเวลาที่เล่นไปของวีดีโอ
  const [videoDuration, setVideoDuration] = useState(0); // เพิ่ม state สำหรับเก็บความยาวของวีดีโอ
  const [prevPlayTime, setPrevPlayTime] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);


  useEffect(() => {
    addEventListenerVideo();
  }, [currentVideoIndex]);

  const addEventListenerVideo = () => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videos[currentVideoIndex]); // ใช้ URL ที่ถูกส่งเข้ามาใน props
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });

      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videos[currentVideoIndex]; // ใช้ URL ที่ถูกส่งเข้ามาใน props
        video.addEventListener('canplay', () => {
          video.play();
        });
      }

      video.addEventListener('ended', () => {
        // ตรวจสอบว่าไม่ได้อยู่ในวีดีโอสุดท้ายและยังมีวีดีโอถัดไปในรายการ
        if (currentVideoIndex < videos.length - 1) {
          setCurrentVideoIndex(currentVideoIndex + 1);
          const video = videoRef.current;

          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videos[currentVideoIndex]);  // เริ่มเล่นวีดีโอถัดไป
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play();
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videos[currentVideoIndex];  // เริ่มเล่นวีดีโอถัดไป
            video.addEventListener('canplay', () => {
              video.play();
            });
          }
        } else {
          handleVideoClose();
        }
      });


      video.addEventListener('loadedmetadata', () => {
        const videoDuration = video.duration; // ความยาวของวีดีโอ (ในวินาที)
        setVideoDuration(videoDuration);
      });

      video.addEventListener('timeupdate', () => {
        setVideoCurrDuration(video.currentTime); // อัปเดตระยะเวลาที่คลิปถูกเล่นไป
      });
    }
  }

  useEffect(() => {
    //เช็คคลิปสุดท้ายหยุดคลิปตอน 99.9% แทนการเช็ควีดีโอจบ
    if ((currentVideoIndex === videos.length - 1) && (videoCurrDuration / videoDuration >= 0.999)) {
      handleVideoClose();
    }
    //เช็คคลิปตอน 99.9% แทนการเช็ควีดีโอจบ
    if ((videoCurrDuration / videoDuration >= 0.999)) {

      if (currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
        const video = videoRef.current;

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videos[currentVideoIndex]);  // เริ่มเล่นวีดีโอถัดไป
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videos[currentVideoIndex];  // เริ่มเล่นวีดีโอถัดไป
          video.addEventListener('canplay', () => {
            video.play();
          });
        }
      } else {
        handleVideoClose();
      }

    }


    //ทำการหน่วงเวลาตาม updateFrequency เพื่อยิง updatePlayTime
    const diffTime = Math.abs(videoCurrDuration - prevPlayTime);
    if (diffTime < updateFrequency) { return }
    setPrevPlayTime(videoCurrDuration)

    //เช็คว่าถ้าดูวีดีโอยังไม่ถึง minimumVideoPlayPercentage ไม่ต้อง updatePlayTime
    //เช็คว่าถ้าเคยดูคลิปนั้นจบแล้ว ไม่ต้อง updatePlayTime
    if (
      (videoCurrDuration / videoDuration < minimumVideoPlayPercentage) ||
      (selectedVDO.play_time / selectedVDO.duration >= completeVideoPlayPercentage)) {
      return
    }

    updatePlayTime();
  }, [videoCurrDuration]);

  const updatePlayTime = () => {
    if (lastWeekVDO_click === "show") {
      if (!lastWeekVDOAll) { //updatePlayTime ของผู้ใช้หมดอายุดูย้อนหลัง
        const tempExerciseVideoLastWeek = [...exerciseVideoLastWeek];
        tempExerciseVideoLastWeek[day_number][video_number] = { ...tempExerciseVideoLastWeek[day_number][video_number], play_time: videoDuration, duration: videoDuration };

        dispatch(updatePlaytimeLastWeek(
          user.user_id,
          user.start_date,
          user.expire_date,
          day_number,
          video_number,
          videoDuration,
          videoDuration,
          tempExerciseVideoLastWeek
        ));
      } else {  //updatePlayTime ของผู้ใช้ต่ออายุดูย้อนหลัง
        const tempExerciseVideoLastWeekSelect = [...selectExerciseVideoLastWeek];
        const tempExerciseVideoLastWeekAll = [...all_exercise_activity];
        tempExerciseVideoLastWeekSelect[day_number][video_number] = { ...tempExerciseVideoLastWeekSelect[day_number][video_number], play_time: videoDuration, duration: videoDuration };
        tempExerciseVideoLastWeekAll[lastWeekStart - 1].activities = JSON.stringify(tempExerciseVideoLastWeekSelect);

        dispatch(updatePlaytimeLastWeekSelected(
          user.user_id,
          user.start_date,
          user.expire_date,
          day_number,
          video_number,
          videoDuration,
          videoDuration,
          tempExerciseVideoLastWeekAll,
          lastWeekStart
        ));
      }
    } else {  //updatePlayTime ของผู้ใช้ต่ออายุดูคลิปปัจจุบัน
      const tempExerciseVideo = [...exerciseVideo];
      tempExerciseVideo[day_number][video_number] = { ...tempExerciseVideo[day_number][video_number], play_time: videoDuration, duration: videoDuration };

      dispatch(updatePlaytime(
        user.user_id,
        user.start_date,
        user.expire_date,
        day_number,
        video_number,
        videoDuration,
        videoDuration,
        tempExerciseVideo
      ));
    }


  }

  const handleVideoClose = () => {
    setIsPlaying(false);
    const video = videoRef.current;

    if (video) {
      video.pause();
      // และอื่น ๆ ที่คุณต้องการให้เกิดขึ้นเมื่อปิดวีดีโอ
    }

    //สั่ง set ตัวแปรใน redux และให้หน้า videoList ไปเช็ีคจากตัวแปรนั้นเพื่อซ่อน popup
    dispatch(setHidePopupVideoPlayerList(true))
  };

  return (
    <div>
      <video
        id="videoPlayerList"
        ref={videoRef}
        controls
      />

      <img alt="" src="../assets/img/thumb/close.png" className="close" onClick={handleVideoClose}></img>
    </div>);
};

export default VideoPlayerListByteArk;
