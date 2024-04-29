import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { useSelector, useDispatch } from "react-redux";
import {
  hidePopupVideoPlayer,
  updatePlaytime,
  setHidePopupVideoPlayerSnack,
  updatePlaytimeLastWeek,
  updateVideoSnack,
  getExerciseSnack,
  createEventLogSnacks,
  snacksCount,
} from "../redux/exerciseVideos";
import {
  completeVideoPlayPercentage,
  minimumVideoPlayPercentage,
  updateFrequency,
} from "../constants/defaultValues";

const VideoPlayerSnack = ({ url, videoId }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const {
    videoExerciseSnack,
    week,
    hideVideoPopUpSnack,
    statsUpdateVideoSnack,
  } = useSelector(({ exerciseVideos }) =>
    exerciseVideos ? exerciseVideos : ""
  );
  const { user } = useSelector(({ authUser }) => (authUser ? authUser : ""));

  const [exerciseSnack, setExerciseSnack] = useState(
    videoExerciseSnack && videoExerciseSnack.length > 0
      ? JSON.parse(videoExerciseSnack[0].video)
      : null
  );
  const [videoSnack, setVideoSnack] = useState(
    videoExerciseSnack ? videoExerciseSnack : null
  );

  useEffect(() => {
    setExerciseSnack(
      videoExerciseSnack && videoExerciseSnack.length > 0
        ? JSON.parse(videoExerciseSnack[0].video)
        : null
    );
    setVideoSnack(videoExerciseSnack);
  }, [videoExerciseSnack]);

  const [videoEnded, setVideoEnded] = useState(false); // เพิ่ม state สำหรับตรวจสอบว่าวีดีโอถูกดูจบหรือไม่
  const [videoCurrDuration, setVideoCurrDuration] = useState(0); // เพิ่ม state สำหรับเก็บระยะเวลาที่เล่นไปของวีดีโอ
  const [videoDuration, setVideoDuration] = useState(0); // เพิ่ม state สำหรับเก็บความยาวของวีดีโอ
  const [prevPlayTime, setPrevPlayTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video && url) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url); // ใช้ URL ที่ถูกส่งเข้ามาใน props
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          //video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url; // ใช้ URL ที่ถูกส่งเข้ามาใน props
        video.addEventListener("canplay", () => {
          // video.play();
        });
      }

      video.addEventListener("ended", () => {
        setVideoEnded(true); // กำหนดว่าวีดีโอถูกดูจบ
      });

      video.addEventListener("loadedmetadata", () => {
        const videoDuration = video.duration; // ความยาวของวีดีโอ (ในวินาที)
        console.log(`ความยาวของวีดีโอ: ${videoDuration} วินาที`);
        setVideoDuration(videoDuration);
      });

      video.addEventListener("timeupdate", () => {
        setVideoCurrDuration(video.currentTime); // อัปเดตระยะเวลาที่คลิปถูกเล่นไป
      });
    }
  }, [url]);

  useEffect(() => {
    let playTime = false;
    const updatedExerciseSnack =
      exerciseSnack &&
      exerciseSnack.map((exercise) => {
        if (exercise.play_time == 0) {
          if (exercise.video_id === videoId) {
            const newDuration =
              videoCurrDuration > 0.7 * exercise.duration
                ? exercise.duration
                : 0;

            playTime = videoCurrDuration > 0.7 * exercise.duration && true;

            // Update the duration property
            return { ...exercise, play_time: newDuration };
          }

          return exercise;
        }
        return exercise;
      });

    if (playTime == true) {
      const targetIndex = 0; // Assuming you want to update the first item in the array

      /*  const diffTime = Math.abs(videoCurrDuration - prevPlayTime); การยิ่ง ทุก ๆ 0.5 วิ
      if (diffTime < 0.5) {
        return;
      } */

      dispatch(
        updateVideoSnack(updatedExerciseSnack, videoExerciseSnack[0].id)
      );
    }
  }, [videoCurrDuration]);

  const handleVideoClose = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      // และอื่น ๆ ที่คุณต้องการให้เกิดขึ้นเมื่อปิดวีดีโอ
    }
    //createEventLogSnacks
    //สั่ง set ตัวแปรใน redux และให้หน้า videoList ไปเช็ีคจากตัวแปรนั้นเพื่อซ่อน popup
    /*     dispatch(getExerciseSnack(user.user_id, week));*/

    var filteredExerciseSnack = exerciseSnack.filter(function (item) {
      return item.play_time > 0;
    });

    // นับจำนวน exerciseSnack ที่มี video_id มากกว่า 0
    var count = filteredExerciseSnack.length;
    dispatch(snacksCount(count));
    if (count > 3) {
      dispatch(createEventLogSnacks(user && user.user_id, count));
    }

    if (count == 4) {
      document.getElementById("example-snack-success") &&
        document.getElementById("example-snack-success").click();
    }

    dispatch(setHidePopupVideoPlayerSnack(true));
  };

  return (
    <div>
      <video id="videoPlayer" ref={videoRef} controls />

      <img
        alt=""
        src="../assets/img/thumb/close.png"
        className="close"
        onClick={handleVideoClose}
      ></img>
    </div>
  );
};

export default VideoPlayerSnack;
