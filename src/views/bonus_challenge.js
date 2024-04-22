import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Hls from "hls.js";
import VideoPlayer from "../components/VideoPlayer";
import { ByteArkPlayerContainer } from "byteark-player-react";
import brave_burn1 from "../assets/img/brave&burn/brave&burn1.png";
import brave_burn2 from "../assets/img/brave&burn/brave&burn2.png";
import brave_burn3 from "../assets/img/brave&burn/brave&burn3.png";
import brave_burn4 from "../assets/img/brave&burn/brave&burn4.png";
import brave_burn5 from "../assets/img/brave&burn/brave&burn5.png";
import brave_burn6 from "../assets/img/brave&burn/brave&burn6.png";
import brave_burn7 from "../assets/img/brave&burn/brave&burn7.png";
import brave_burn8 from "../assets/img/brave&burn/brave&burn8.png";

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

const VideoFrame = styled.iframe`
  width: 30%; /* ปรับขนาดของ iframe ตามความต้องการ */
`;

const CloseButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 5px 10px;
`;

function BonusChallenge() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const week = useSelector(({ exerciseVideos }) =>
    exerciseVideos ? exerciseVideos.week : ""
  );

  // คำสั่งเปิด/ปิด popup
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  //เก่า
  /* 
        const handleVideoEnd = () => {
            setVideoEnded(true);
        }; */

  const handleVideoEnd = () => {
    console.log("video end");
  };

  const time_update = (ts) => {
    console.log(ts);
  };
  /*     useEffect(() => {
            const player = bytearkPlayer('the-video-player', {
                fluid: true,
                poster: '/assets/samples/player/images/poster-big-buck-bunny.jpg',
                sources: [
                    {
                        title: 'Planforfit clip1',
                        src:
                            'https://planforfittufqepu.stream-playlist.byteark.com/streams/TuFSWQUUyDB2/playlist.m3u8',
                        type: 'application/x-mpegURL',
                    },
                ],
            });
    
            player.on('ended', handleVideoEnd);
            setInterval(function () {
                time_update(player.currentTime());
            }, 5000);
        }, []); */

  useEffect(() => {
    if (videoEnded) {
      console.log("ดูวีดีโอจบ!!");
    }
  }, [videoEnded]);

  return (
    <div>
      {isPopupOpen && (
        <PopupWrapper>
          <video
            src="https://player.vimeo.com/progressive_redirect/playback/414644940/rendition/720p/file.mp4?loc=external&signature=dbccc6ffbff46df17b0b0a09302e62dc3ff0d16ce39a9a13876821834760430f"
            id="videoPlayer"
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onEnded={handleVideoEnd}
          ></video>
          <CloseButton onClick={togglePopup}>ปิด</CloseButton>
        </PopupWrapper>
      )}

      {/*             <VideoPlayer url="https://byteark-poc-slvkafvgn1mh.stream-playlist.byteark.com/streams/TuFAlxQoDhDr/playlist.m3u8" />
            
 */}

      <div id="the-video-player"></div>

      <div className="nav mt-5 mb-4 ml-5" id="myTab" role="tablist">
        <div className="mr-4 mb-3">
          <a
            className=""
            id="home-tab"
            data-toggle="tab"
            href="/#/Videdivst"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            style={{ color: "grey", textDecorationColor: "white" }}
          >
            Workout Routine{" "}
          </a>
        </div>
        {
          <div className="">
            <a
              className="challenges-cursor"
              id="contact-tab"
              data-toggle="tab"
              href="/#/challenges"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              style={{ color: "grey", textDecorationColor: "white" }}
            >
              ชาเลนจ์
            </a>
          </div>
        }
        {
          <div className="ml-4">
            <a
              className=""
              id="contact-tab"
              data-toggle="tab"
              href="/#/BonusChallenge"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              style={{
                color: "#F45197",
                borderBottom: "5px solid #F45197",
                paddingBottom: "2px",
                textDecorationColor: "white",
              }}
            >
              Brave & Burn
            </a>
          </div>
        }
      </div>

      <div
        className="center d-flex flex-column align-items-center"
        style={{ backgroundColor: "white", padding: 50 }}
      >
        <div
          className="card"
          style={{
            width: 476,
            backgroundColor: "white",
            padding: 1,
            borderRadius: 20,
          }}
        >
          <div className="containerThumb">
            <img
              className="img-fluid"
              style={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
              src={require(`../assets/img/brave&burn/brave&burn${week}.png`)}
            ></img>
          </div>
          {/* <div className='center'>
                        <img className="play_button" onClick={togglePopup} src="../assets/img/thumb/play_button2.png" width="100px" ></img>
                    </div> */}
          <div style={{ padding: 35 }}>
            <p style={{ fontSize: 22, margin: "0" }}>Brave&Burn</p>
            <p style={{ fontSize: 42, margin: "0" }}>
              {week > 3
                ? `${week}th`
                : week === 3
                ? `${week}rd`
                : week === 2
                ? `${week}nd`
                : `${week}st`}
              {` Challenge!!`}
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="btn d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  backgroundColor: "#EF60A3",
                  width: 386,
                  height: 82,
                  borderRadius: 50,
                  fontSize: 24,
                }}
                onClick={togglePopup}
              >
                เล่นชาเลนจ์นี้
              </div>
            </div>
          </div>
        </div>
        {videoEnded && (
          <div className="mt-3">
            <div className="btn btn-primary gap-2">
              <i class="fa-brands fa-facebook"> SHARE</i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BonusChallenge;
