import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Hls from "hls.js";
import {
  completeVideoPlayPercentage,
  minimumVideoPlayPercentage,
  updateFrequency,
} from "../constants/defaultValues";
import { FacebookShareButton } from "react-share";
import {
  updateVideoStatusBraveAndBurn,
  updateFbShareStatusBraveAndBurn,
} from "../redux/exerciseVideos";

const MdText = styled.div`
  font-size: 22px;
  margin: 0;
`;

const LgText = styled.div`
  margin: 0px;
  font-weight: bold;

  @media (max-width: 768px) {
    /* Small devices (landscape phones) */
    font-size: 26px;
  }

  @media (min-width: 769px) {
    /* Small devices (landscape phones) */
    font-size: 36px;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 1px;
  border-radius: 20px;

  @media (max-width: 768px) {
    /* Small devices (landscape phones) */
    width: 300px;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    /* Medium devices (tablets) */
    width: 400;
  }

  @media (min-width: 993px) {
    /* Large devices (desktops) */
    width: 400px;
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const CloseButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 5px 10px;
  position: absolute;
  top: 10px; /* ปรับตำแหน่งตามที่ต้องการ */
  right: 10px; /* ปรับตำแหน่งตามที่ต้องการ */
  z-index: 1000; /* ตั้งค่า z-index เพื่อให้ปุ่มอยู่ด้านบนสุด */
`;

const BraveAndBurn = () => {
  const dispatch = useDispatch();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0); // เพิ่ม state สำหรับเก็บความยาวของวีดีโอ
  const [videoCurrDuration, setVideoCurrDuration] = useState(0); // เพิ่ม state สำหรับเก็บระยะเวลาที่เล่นไปของวีดีโอ
  const [prevPlayTime, setPrevPlayTime] = useState(0);
  const [timeStamp, setTimeStamp] = useState(null);

  const videoRef = useRef(null);

  const user = useSelector(({ authUser }) => (authUser ? authUser.user : ""));
  const week = useSelector(({ exerciseVideos }) =>
    exerciseVideos ? exerciseVideos.week : ""
  );
  const brave_and_burn_challenge = useSelector(({ exerciseVideos }) =>
    exerciseVideos ? exerciseVideos.brave_and_burn_challenge : ""
  );

  // คำสั่งเปิด/ปิด popup
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    //setVideoUrl
    setVideoUrl(JSON.parse(brave_and_burn_challenge.video).url3);

    //setVideoEnded
    if (brave_and_burn_challenge.video_status === "success") {
      setVideoEnded(true);
    }

    //setTimeStamp
    const isoDateString = brave_and_burn_challenge.updated_at;
    const date = new Date(isoDateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat("th-TH", options).format(
      date
    );
    setTimeStamp(formattedDate);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl); // ใช้ URL ที่ถูกส่งเข้ามาใน props
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          //video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl; // ใช้ URL ที่ถูกส่งเข้ามาใน props
        video.addEventListener("canplay", () => {
          // video.play();
        });
      }

      video.addEventListener("ended", () => {
        setVideoEnded(true); // กำหนดว่าวีดีโอถูกดูจบ
      });

      video.addEventListener("loadedmetadata", () => {
        const videoDuration = video.duration; // ความยาวของวีดีโอ (ในวินาที)
        setVideoDuration(videoDuration);
      });

      video.addEventListener("timeupdate", () => {
        setVideoCurrDuration(video.currentTime); // อัปเดตระยะเวลาที่คลิปถูกเล่นไป
      });
    }
  }, [isPopupOpen]);

  useEffect(() => {
    //ทำการหน่วงเวลาตาม updateFrequency เพื่อยิง updatePlayTime
    const diffTime = Math.abs(videoCurrDuration - prevPlayTime);
    if (diffTime < updateFrequency) {
      return;
    }
    setPrevPlayTime(videoCurrDuration);

    //เช็คว่าถ้าดูวีดีโอยังไม่ถึง minimumVideoPlayPercentage ไม่ต้อง updatePlayTime
    if (videoCurrDuration / videoDuration < minimumVideoPlayPercentage) {
      return;
    }

    setVideoEnded(true);
  }, [videoCurrDuration]);

  useEffect(() => {
    if (videoEnded) {
      dispatch(updateVideoStatusBraveAndBurn(user && user.user_id));
      console.log("END!!");
    }
  }, [videoEnded]);

  return (
    <div>
      {isPopupOpen && (
        <PopupWrapper>
          <video id="videoPlayer" ref={videoRef} controls width={900} />
          <CloseButton onClick={togglePopup}>ปิด</CloseButton>
        </PopupWrapper>
      )}

      <div id="the-video-player"></div>

      <div
        className="center d-flex flex-column align-items-center"
        style={{ backgroundColor: "white", padding: 50 }}
      >
        <Card
          className="card" /* style={{ width: 300, backgroundColor: "white", padding: 1, borderRadius: 20 }} */
        >
          <div className="containerThumb">
            {videoEnded ? (
              <img
                className="img-fluid"
                style={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                src={require(`../assets/img/brave&burn/brave&burn_complete${week}.png`)}
                alt=""
              />
            ) : (
              <img
                className="img-fluid"
                style={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                src={require(`../assets/img/brave&burn/brave&burn${week}.png`)}
                alt=""
              />
            )}
          </div>

          <div style={{ padding: "10px 30px" }}>
            <MdText>Brave&Burn</MdText>
            <LgText>
              {week > 3
                ? `${week}th`
                : week === 3
                ? `${week}rd`
                : week === 2
                ? `${week}nd`
                : `${week}st`}
              {` Challenge!!`}
            </LgText>
            {videoEnded ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p style={{ fontSize: 16, margin: "0" }}>
                  ยินดีด้วย !!!! {user.facebook ? user.facebook : ""}
                </p>
                <p style={{ fontSize: 16, margin: "0" }}>
                  ได้พิชิตคลิปประจำสัปดาห์
                </p>
                <p style={{ fontSize: 16, margin: "0" }}>{timeStamp}</p>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="btn d-flex justify-content-center align-items-center mb-2 mt-2"
                  style={{
                    color: "white",
                    backgroundColor: "#EF60A3",
                    width: 330,
                    height: 55,
                    borderRadius: 50,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                  onClick={togglePopup}
                >
                  เล่นชาเลนจ์นี้
                </div>
              </div>
            )}
          </div>
        </Card>
        {videoEnded && (
          <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
            <p>
              แชร์โพสต์นี้บนหน้าเฟซบุ๊กของคุณ โดยตั้งค่าเป็นสาธารณะ
              และติดแฮชแท็ก
            </p>
            <p>#BraveandBurn #bebeforbeginer #วงการเบเบ้ เพื่อรับคะแนน</p>
            <FacebookShareButton
              url={`https://platform.bebefitroutine.com/brave_and_burn/complete${week}.html`}
            >
              <div
                onClick={() =>
                  dispatch(
                    updateFbShareStatusBraveAndBurn(user && user.user_id)
                  )
                }
                className="btn btn-primary gap-2"
              >
                <i className="fa-brands fa-facebook"> SHARE</i>
              </div>
            </FacebookShareButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default BraveAndBurn;
