import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createExerciseSnack,
  hidePopupVideoPlayer,
  getExerciseSnack,
  clearExerciseSnack,
  setHidePopupVideoPlayerSnack,
  updateVideoSnack,
  getVideoSnack,
} from "../redux/exerciseVideos";
import {
  convertSecondsToMinutes,
  convertFormatTime,
  calculateWeekInProgram,
} from "../helpers/utils";
import VideoPlayerSnack from "../components/VideoPlayerSnack";

const VideoExerciseSnack = () => {
  const dispatch = useDispatch();
  const {
    videoExerciseSnack,
    week,
    hideVideoPopUpSnack,
    statsUpdateVideoSnack,
    statsGetExerciseSnack,
    videoExerciseSnackAll,
    snackNumber,
  } = useSelector(({ exerciseVideos }) =>
    exerciseVideos ? exerciseVideos : ""
  );
  const { user } = useSelector(({ authUser }) => (authUser ? authUser : ""));

  const [exerciseSnack, setExerciseSnack] = useState(
    videoExerciseSnack && videoExerciseSnack.length > 0
      ? JSON.parse(videoExerciseSnack[0].video)
      : null
  );
  const [videoAll, setVideoAll] = useState(
    videoExerciseSnackAll ? videoExerciseSnackAll : null
  );
  const [weekSnack, setWeekSnack] = useState(week);
  const [autoPlayCheck, setAutoPlayCheck] = useState(true);

  const [url, setUrl] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [re_id, setRe_id] = useState(null);

  useEffect(() => {
    dispatch(setHidePopupVideoPlayerSnack(false));
  }, []);

  useEffect(() => {
    setVideoAll(videoExerciseSnackAll ? videoExerciseSnackAll : null);
  }, [videoExerciseSnackAll]);

  useEffect(() => {
    setExerciseSnack(
      videoExerciseSnack && videoExerciseSnack.length > 0
        ? JSON.parse(videoExerciseSnack[0].video)
        : null
    );
  }, [videoExerciseSnack]);

  useEffect(() => {
    if (hideVideoPopUpSnack) {
      var trailer = document.getElementById(`popupVDOSnack`);
      trailer.classList.remove("active_list");
      dispatch(setHidePopupVideoPlayerSnack(false));
    }
  }, [hideVideoPopUpSnack]);

  const toggleList = (url, video_id) => {
    setUrl(url);
    setVideoId(video_id);

    var trailer = document.getElementById(`popupVDOSnack`);
    trailer.classList.add("active_list");
  };

  const totalTime = () => {
    const totalDuration =
      exerciseSnack &&
      exerciseSnack.reduce(
        (total, exerciseSnack) => total + exerciseSnack.duration,
        0
      );

    const totalDurationInMinutes = Math.floor(totalDuration / 60); // จำนวนนาที
    const remainingSeconds = totalDuration % 60; // จำนวนวินาทีที่เหลือ
    const formattedDuration = `${totalDurationInMinutes}:${remainingSeconds}`;
    return formattedDuration;
  };

  useEffect(() => {
    if (statsUpdateVideoSnack == "success") {
      document.getElementById("btn-close") &&
        document.getElementById("btn-close").click();
      dispatch(getExerciseSnack(user.user_id, week));
      dispatch(getVideoSnack(user.user_id, week));
      
    }
  }, [statsUpdateVideoSnack]);

  useEffect(() => {
    if (statsGetExerciseSnack == "success") {
      //btn-close
      dispatch(clearExerciseSnack());
    }
  }, [statsGetExerciseSnack]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // สร้างฟังก์ชันที่จะถูกเรียกเมื่อขนาดหน้าจอเปลี่ยน
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // เพิ่ม event listener เพื่อตรวจจับการเปลี่ยนขนาดหน้าจอ
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // ถอด event listener เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const randomVideo = (id) => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * videoAll.length);
    } while (randomIndex === id);

    const randomVideo = videoAll[randomIndex == 0 ? 0 : randomIndex - 1];

    const indexToReplace = exerciseSnack.findIndex(
      (exercise) => exercise.video_id == id
    );
    let updatedExerciseSnack;

    if (indexToReplace !== -1) {
      updatedExerciseSnack = [...exerciseSnack]; // สร้างคัดลอกใหม่
      updatedExerciseSnack[indexToReplace] = randomVideo;
    } else {
      console.log(`Exercise with video_id ${id} not found in exerciseSnack.`);
    }

    dispatch(updateVideoSnack(updatedExerciseSnack, videoExerciseSnack[0].id));
  };

  const renew = (item) => {
    let updatedExerciseSnack;

    if (re_id !== -1) {
      updatedExerciseSnack = [...exerciseSnack]; // สร้างคัดลอกใหม่
      updatedExerciseSnack[re_id] = item;
    } else {
      console.log(
        `Exercise with video_id ${re_id} not found in exerciseSnack.`
      );
    }

    dispatch(updateVideoSnack(updatedExerciseSnack, videoExerciseSnack[0].id));
  };

  useEffect(() => {
    // /exampleModalSnackSuccess
    if (snackNumber == 4) {
      document.getElementById("example-snack-success") &&
        document.getElementById("example-snack-success").click();
    }
  }, []);

  const renewId = (index) => {
    setRe_id(index);
    document.getElementById("example-snack") &&
      document.getElementById("example-snack").click();
  };



  return (
    <>
      <div className="">
        <div className="trailer" id={`popupVDOSnack`}>
          <div>
            <VideoPlayerSnack url={url} videoId={videoId} />
          </div>
        </div>

        <table className="table table-responsive">
          <div>
            <div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="">
                    <span
                      className="mr-5 ml-3"
                      style={{
                        fontSize: "16px",
                        float: "left",
                        color: "grey",
                      }}
                    >
                      {" "}
                      รวมเวลาฝึกทั้งหมด {totalTime()} นาที
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <tbody>
            {exerciseSnack &&
              exerciseSnack.map((item, index) => {
                const minuteLabel =
                  item.duration < 20
                    ? convertFormatTime(item.duration)
                    : convertSecondsToMinutes(item.duration);

                return (
                  <div className="row" key={index}>
                    <div className="checkCompleteVideo mt-3 col-lg-2 col-md-1 col-2">
                      {index === 0 && (
                        <h6 className="firstVideoStartText">เริ่มกันเลย!</h6>
                      )}
                      {item.play_time && item.play_time > 0 ? (
                        <span
                          className="dot"
                          style={{ backgroundColor: "#F45197" }}
                        >
                          <h5
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%,-50%)",
                              color: "white",
                            }}
                          >
                            <i className="fa fa-check fa-lg"></i>
                          </h5>
                        </span>
                      ) : (
                        <span className="dot">
                          <h3
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%,-50%)",
                            }}
                          >
                            {index + 1}
                          </h3>
                        </span>
                      )}

                      {index + 1 < exerciseSnack.length && (
                        <>
                          <div className="vl" style={{ height: "0%" }}></div>
                          <div className="vl"></div>
                        </>
                      )}
                      {index + 1 == exerciseSnack.length && (
                        <>
                          <h6 className="lastVideoEndText">สำเร็จแล้ว!</h6>
                        </>
                      )}
                    </div>
                    <div className="mt-3 mb-1 col-lg-8 col-md-11 col-10 mb-5">
                      <div className="videoItem border shadow">
                        <img
                          className="play_button"
                          src="../assets/img/thumb/play_button2.png"
                          width="100px"
                          onClick={() => toggleList(item.url, item.video_id)}
                        ></img>

                        <div className="videoThumb-width">
                          <div className="videoThumb">
                            <div className="containerThumb">
                              <img
                                className="img-fluid thumbnail-img"
                                src={`${item.thumbnail}`}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>

                        <div className="videoDetail">
                          <div className="videoDuration mt-3">
                            <h6>
                              <i
                                className="fa fa-clock-o fa-1x mr-2"
                                aria-hidden="true"
                              ></i>
                              {minuteLabel} นาที
                            </h6>
                          </div>
                          <hr
                            className=""
                            style={{ width: "100%", marginTop: "40px" }}
                          ></hr>
                          <div className="videoName">
                            <p
                              style={{
                                color: "grey",
                                marginBottom: "0px",
                                marginTop: "0px",
                              }}
                            >
                              {" "}
                              {item.category}{" "}
                            </p>
                            {item.name.length < 17 ? (
                              <h4 style={{ color: "#F45197" }}>
                                <b>{item.name} </b>
                              </h4>
                            ) : (
                              <h6 style={{ color: "#F45197" }}>
                                <b>{item.name}</b>
                              </h6>
                            )}
                            <p
                              style={{
                                color: "grey",
                                marginBottom: "0px",
                                marginTop: "0px",
                              }}
                            >
                              อุปกรณ์ :{" "}
                              {item.equipment ? item.equipment : "ไม่มี"}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="box-re ">
                          <div
                            className="box-random"
                            onClick={() => randomVideo(item.video_id)}
                          >
                            <img
                              src="../assets/img/random.png"
                              width={24}
                              height={24}
                            />
                            <span className="text-random">สุ่มคลิปใหม่</span>
                          </div>
                          <div
                            className="box-random"
                            onClick={() => renewId(index)}
                          >
                            <img
                              src="../assets/img/renew.png"
                              width={24}
                              height={24}
                            />
                            <span className="text-random">เลือกคลิปใหม่</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModalSnack"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <p
                className="modal-title fs-5 head-new-video"
                id="exampleModalLabel"
              >
                เลือกคลิปใหม่
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btn-close"
              >
                <img
                  src="../assets/img/close-line.png"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="modal-body ">
              {videoAll &&
                videoAll.map((item, index) => {
                  if (item.video_id != re_id) {
                    return (
                      <div className="row box-snack">
                        <div
                          className="thumbnail-box"
                          onClick={() => toggleList(item.url, item.video_id)}
                        >
                          <img
                            src={item.thumbnail}
                            className="component-4 mb-3"
                          />
                          <img
                            className="play_snack"
                            src="../assets/img/thumb/play_button2.png"
                            width="100px"
                          />
                        </div>

                        <div className="snack col-12 col-md-5">
                          <p className="snack-name">{item.name}</p>
                          <p className="equipment-name">
                            อุปกรณ์ :{" "}
                            {item.equipment ? item.equipment : "ไม่มี"}
                          </p>
                        </div>
                        <div
                          className="box-qty"
                          onClick={() => renew(item, item.video_id)}
                        >
                          <img src="../assets/img/qty.png" className="qty" />
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        style={{ display: "none" }}
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSnackSuccess"
        id="example-snack-success"
      >
        Launch demo modal
      </button>
      <button
        type="button"
        style={{ display: "none" }}
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSnack"
        id="example-snack"
      >
        exampleModalSnack
      </button>

      <div
        class="modal fade"
        id="exampleModalSnackSuccess"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                <img
                  src="../assets/img/snackSuccess.png"
                  className="snack-success"
                />
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img
                  src="../assets/img/close-line.png"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div class="modal-body">
              <p className="great-snack">เยี่ยมมาก! พิชิตภารกิจได้สำเร็จ</p>
              <p className="snack-point">คุณได้รับ 10 คะแนน</p>
              <div
                className="button-snack-point"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                ตกลง
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoExerciseSnack;
