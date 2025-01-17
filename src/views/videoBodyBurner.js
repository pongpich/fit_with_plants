import React, { useState, useEffect, useMemo } from "react";
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
  saveModalScoreBurnerTen,
  createEventLogSnacks,
  getMemberLog,
} from "../redux/exerciseVideos";
import {
  convertSecondsToMinutes,
  convertFormatTime,
  calculateWeekInProgram,
} from "../helpers/utils";
import stylesVideo from "./videoList.scss";
import { getChallengePeriod } from "../redux/challenges";
import VideoPlayerSnack from "../components/VideoPlayerSnack";
import {
  Alert,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import star_icon from "../../src/assets/img/star.png";
import arrow_circle from "../assets/img/arrow_circle.png";
import Union from "../assets/img/Union.png";
import play_button from "../assets/img/play_button.png";
import { completeVideoPlayPercentage } from "../constants/defaultValues";

const filterWeek = [{ week: 1, week: 2 }];

const VideoBodyBurner = ({ weekSelect }) => {
  const dispatch = useDispatch();
  const {
    videoExerciseSnack,
    week,
    hideVideoPopUpSnack,
    statsUpdateVideoSnack,
    statsGetExerciseSnack,
    videoExerciseSnackAll,
    snackNumber,
    saveScoreBurnerTen,
    dataMemberLog,
    statsEventCreateLogSnack,
  } = useSelector(({ exerciseVideos }) => exerciseVideos && exerciseVideos);
  const { challengePeriod } = useSelector(
    ({ challenges }) => challenges && challenges
  );

  const { user } = useSelector(({ authUser }) => (authUser ? authUser : ""));
  const [exerciseSnack, setExerciseSnack] = useState(
    videoExerciseSnack && videoExerciseSnack.length > 0
      ? JSON.parse(videoExerciseSnack[0].video)
      : ""
  );
  const [videoAll, setVideoAll] = useState(
    videoExerciseSnackAll ? videoExerciseSnackAll : null
  );
  const [weekSnack, setWeekSnack] = useState(week);
  const [autoPlayCheck, setAutoPlayCheck] = useState(true);
  const [indexScore, setIndexScore] = useState(0);
  const [modalTen, setModalTen] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [memberLog, setMemberLog] = useState(() => dataMemberLog);

  const [url, setUrl] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [re_id, setRe_id] = useState(null);

  const toggleList = (url, video_id, index) => {
    setUrl(url);
    setVideoId(video_id);

    var trailer = document.getElementById(`popupVDOSnack`);
    trailer.classList.add("active_list");
    setIndexScore(index);
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

  const toggleTen = () => {
    if (week == weekSelect) {
      dispatch(createEventLogSnacks(user.user_id, 3, week));
    }
    dispatch(clearExerciseSnack());
    setModalTen(false);
  };

  const closeBtnTen = (
    <button type="button" className="btn-close" onClick={() => toggleTwo()}>
      <img src="../assets/img/close-line.png" width={24} height={24} alt="" />
    </button>
  );

  const toggleTwo = () => {
    if (week == weekSelect) {
      dispatch(createEventLogSnacks(user.user_id, indexScore + 1, week));
    }
    setModalTwo(false);
  };

  const closeBtnTwo = (
    <button type="button" className="btn-close" onClick={() => toggleTwo()}>
      <img src="../assets/img/close-line.png" width={24} height={24} alt="" />
    </button>
  );

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

  const handleShowModalTen = () => {
    if (!exerciseSnack || exerciseSnack?.length == 0) return;
    const exerciseSnackTop = exerciseSnack.slice(0, 3);
    const isAllTopDone = exerciseSnackTop.every((val) => val.play_time !== 0);
    const isFoundModalTen = dataMemberLog.some(
      (val) => val.count_snack == 3 && val.log_week == week
    );
    if (isFoundModalTen || week != weekSelect) {
      setModalTen(false);
      return;
    }
    if (isAllTopDone) {
      setModalTen(true);
    }
  };

  const handleShowModalTwo = () => {
    if (!exerciseSnack || exerciseSnack?.length == 0) return;
    const exerciseSnackBottom = exerciseSnack.slice(3);
    const videoBottom = exerciseSnackBottom.filter(
      (_, i) => i + 3 == indexScore
    );
    const isFoundModalScre = dataMemberLog.some(
      (val) => val.count_snack == indexScore + 1 && val.log_week == week
    );
    if (isFoundModalScre || week != weekSelect) {
      setModalTwo(false);
      return;
    }
    if (videoBottom[0]?.play_time > 0) {
      setModalTwo(true);
    }
  };

  const renewId = (index, id) => {
    setRe_id(index);

    const result = videoExerciseSnackAll.filter((video) => {
      return video.video_id != id;
    });
    setVideoAll(result);

    document.getElementById("example-snack") &&
      document.getElementById("example-snack").click();
  };

  useEffect(() => {
    // เพิ่ม event listener เพื่อตรวจจับการเปลี่ยนขนาดหน้าจอ
    window.addEventListener("resize", handleResize);
    // ถอด event listener เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getChallengePeriod());
    dispatch(setHidePopupVideoPlayerSnack(false));
    dispatch(getExerciseSnack(user.user_id, weekSelect));
    dispatch(getVideoSnack(user && user.user_id, weekSelect));
    dispatch(getMemberLog(user.user_id));
  }, [weekSelect]);

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

  useEffect(() => {
    if (challengePeriod) {
      handleShowModalTen();
      handleShowModalTwo();
    }
  }, [exerciseSnack, indexScore]);

  useEffect(() => {
    if (statsUpdateVideoSnack == "success") {
      document.getElementById("btn-close") &&
        document.getElementById("btn-close").click();
      dispatch(getExerciseSnack(user.user_id, weekSelect));
      dispatch(getVideoSnack(user.user_id, weekSelect));
    }

    if (statsEventCreateLogSnack == "success") {
      dispatch(getMemberLog(user.user_id));
    }
  }, [statsUpdateVideoSnack, statsEventCreateLogSnack]);

  useEffect(() => {
    if (statsGetExerciseSnack == "success") {
      //btn-close
      dispatch(clearExerciseSnack());
    }
  }, [statsGetExerciseSnack]);

  return (
    <>
      <div className="">
        <div className="trailer" id={`popupVDOSnack`}>
          <div>
            <VideoPlayerSnack
              url={url}
              videoId={videoId}
              indexScore={indexScore}
              setUrl={setUrl}
            />
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
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

        <table
          className="table table-responsive"
          style={{ overflow: "hidden" }}
        >
          <Alert
            style={{
              height: 70,
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              marginBottom: 32,
            }}
          >
            <img
              src={star_icon}
              alt="star_icon"
              style={{ width: 30, height: 30, marginRight: 18 }}
            />

            <span className="title_body">
              ทำ Cardio ที่กำหนดให้ ครบ 3 คลิป ได้รับ 10 คะแนน
            </span>
            <img
              src={star_icon}
              alt="star_icon"
              style={{ width: 30, height: 30, marginLeft: 18 }}
            />
          </Alert>

          <div>
            {exerciseSnack ? (
              exerciseSnack
                .map((item, index) => {
                  const minuteLabel =
                    item.duration < 20
                      ? convertFormatTime(item.duration)
                      : convertSecondsToMinutes(item.duration);

                  return (
                    <Row key={index}>
                      <Col xs="2" lg="2">
                        {index === 0 && (
                          <h6 className="firstVideoStartText">เริ่มกันเลย!</h6>
                        )}
                        {item.play_time && item.play_time > 0 ? (
                          <span
                            className="dot"
                            style={{ backgroundColor: "#FFF6EE" }}
                          >
                            <h5
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                                color: "#059669",
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

                        {index === 2 ? (
                          <div
                            className={
                              item.play_time &&
                              item.duration &&
                              item.play_time / item.duration >=
                                completeVideoPlayPercentage
                                ? `vl`
                                : `vl_done`
                            }
                            style={{ height: "0%" }}
                          />
                        ) : (
                          <div
                            className={
                              item.play_time &&
                              item.duration &&
                              item.play_time / item.duration >=
                                completeVideoPlayPercentage
                                ? `vl`
                                : `vl_done`
                            }
                          />
                        )}
                        {index == 2 && (
                          <>
                            <h6 className="lastVideoEndText">สำเร็จ!</h6>
                          </>
                        )}
                      </Col>
                      <Col xs="10" lg="10">
                        <div className="videoItem">
                          <Row style={{ marginBottom: 48 }}>
                            <Col xs={12} md={5} lg={4}>
                              <div
                                style={{
                                  backgroundImage: `url(${item.thumbnail})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  height: 153,
                                  width: "100%",
                                  maxWidth: 272,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={play_button}
                                  style={{
                                    width: 64,
                                    height: 64,
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    toggleList(item.url, item.video_id, index)
                                  }
                                  alt="img"
                                />
                              </div>
                            </Col>
                            <Col xs={12} md={7} lg={8}>
                              <div>
                                <div className="videoName">
                                  <h6 style={{ marginTop: 10 }}>
                                    <i
                                      className="fa fa-clock-o fa-1x mr-2"
                                      aria-hidden="true"
                                    ></i>
                                    {minuteLabel} นาที
                                  </h6>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <h4 style={{ color: "#059669" }}>
                                      <b>{item.name} </b>
                                    </h4>
                                  </div>
                                  <hr />

                                  <span
                                    style={{
                                      color: "#828282",
                                      fontSize: 15,
                                    }}
                                  >
                                    สัดส่วนที่ได้ :
                                  </span>
                                  <img
                                    className="property-body_part ml-2"
                                    src={`../assets/img/body_part/cardio_preem.png`}
                                    alt="img"
                                  />
                                </div>
                              </div>
                            </Col>
                          </Row>

                          {/* <div className="box-re">
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
                            onClick={() => renewId(index, item.video_id)}
                          >
                            <img
                              src="../assets/img/renew.png"
                              width={24}
                              height={24}
                              alt=""
                            />
                            <span className="text-random">เลือกคลิปใหม่</span>
                          </div>
                        </div> */}
                        </div>
                      </Col>
                    </Row>
                  );
                })
                .slice(0, 3)
            ) : (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: 200 }}
              >
                <Spinner style={{ color: "rgb(5, 150, 105)" }} />
              </div>
            )}
          </div>
        </table>

        <table
          className="table table-responsive"
          style={{ overflow: "hidden" }}
        >
          <Alert
            style={{
              height: 70,
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              marginBottom: 32,
            }}
          >
            <img
              src={star_icon}
              alt="star_icon"
              style={{ width: 30, height: 30, marginRight: 18 }}
            />
            <span className="title_body">
              ทำ Cardio ส่วนที่เหลืออีก จะได้รับเพิ่มคลิปละ 2.5 คะแนน
            </span>
            <img
              src={star_icon}
              alt="star_icon"
              style={{ width: 30, height: 30, marginLeft: 18 }}
            />
          </Alert>
          <div>
            {exerciseSnack ? (
              exerciseSnack
                .map((item, index) => {
                  const minuteLabel =
                    item.duration < 20
                      ? convertFormatTime(item.duration)
                      : convertSecondsToMinutes(item.duration);

                  return (
                    <Row key={index}>
                      <Col xs="2" lg="2">
                        {item.play_time && item.play_time > 0 ? (
                          <span
                            className="dot"
                            style={{ backgroundColor: "#FFF6EE" }}
                          >
                            <h5
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                                color: "#059669",
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

                        {index === exerciseSnack.length - 1 ? (
                          <div
                            className={
                              item.play_time &&
                              item.duration &&
                              item.play_time / item.duration >=
                                completeVideoPlayPercentage
                                ? `vl`
                                : `vl_done`
                            }
                            style={{ height: "0%" }}
                          />
                        ) : (
                          <div
                            className={
                              item.play_time &&
                              item.duration &&
                              item.play_time / item.duration >=
                                completeVideoPlayPercentage
                                ? `vl`
                                : `vl_done`
                            }
                          />
                        )}
                        {index + 1 == exerciseSnack.length && (
                          <>
                            <h6 className="lastVideoEndText">สำเร็จ!</h6>
                          </>
                        )}
                      </Col>
                      <Col xs="10" lg="10">
                        <div className="videoItem">
                          <Row style={{ marginBottom: 48 }}>
                            <Col xs={12} md={5} lg={4}>
                              <div
                                style={{
                                  backgroundImage: `url(${item.thumbnail})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  height: 153,
                                  width: "100%",
                                  maxWidth: 272,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={play_button}
                                  style={{
                                    width: 64,
                                    height: 64,
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    toggleList(item.url, item.video_id, index)
                                  }
                                  alt="img"
                                />
                              </div>
                            </Col>
                            <Col xs={12} md={7} lg={8}>
                              <div>
                                <div className="videoName">
                                  <h6 style={{ marginTop: 10 }}>
                                    <i
                                      className="fa fa-clock-o fa-1x mr-2"
                                      aria-hidden="true"
                                    ></i>
                                    {minuteLabel} นาที
                                  </h6>

                                  <div className="title_btn_new_clip">
                                    <h4 style={{ color: "#059669" }}>
                                      <b>{item.name} </b>
                                    </h4>

                                    {week == weekSelect && (
                                      <div
                                        className="box-random"
                                        onClick={() =>
                                          renewId(index, item.video_id)
                                        }
                                      >
                                        <img
                                          src={arrow_circle}
                                          style={{
                                            width: 16,
                                            height: 16,
                                            marginRight: 8,
                                          }}
                                          alt=""
                                        />
                                        <span
                                          style={{
                                            color: "#059669",
                                            fontSize: 15,
                                            fontWeight: 700,
                                            marginLeft: 8,
                                          }}
                                        >
                                          เลือกคลิปใหม่
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <hr />

                                  <span
                                    style={{
                                      color: "#828282",
                                      fontSize: 15,
                                    }}
                                  >
                                    สัดส่วนที่ได้ :
                                  </span>
                                  <img
                                    className="property-body_part ml-2"
                                    src={`../assets/img/body_part/cardio_preem.png`}
                                    alt="img"
                                  />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  );
                })
                .slice(3)
            ) : (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: 200 }}
              >
                <Spinner style={{ color: "rgb(5, 150, 105)" }} />
              </div>
            )}
          </div>
        </table>
      </div>

      {/* MODAL EDIT CLIP */}
      <div
        className="modal fade"
        id="exampleModalSnack"
        tabIndex="-1"
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
            <div className="modal-body">
              {videoAll &&
                videoAll
                  .filter((item) => {
                    if (weekSelect == 1 || weekSelect == 2) {
                      return item.video_id == 1 || item.video_id == 2;
                    }
                    if (weekSelect == 3 || weekSelect == 4) {
                      return item.video_id == 3 || item.video_id == 4;
                    }
                    if (weekSelect == 5 || weekSelect == 6) {
                      return item.video_id == 5 || item.video_id == 6;
                    }
                    if (weekSelect == 7 || weekSelect == 8) {
                      return item.video_id == 7 || item.video_id == 8;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="row"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingLeft: 48,
                          paddingRight: 48,
                          marginBottom: 16,
                        }}
                      >
                        <div
                          className="thumbnail-box"
                          onClick={() => toggleList(item.url, item.video_id)}
                          style={{ display: "flex", flexWrap: "wrap" }}
                        >
                          <div>
                            <img
                              src={item.thumbnail}
                              className="component-4 mb-3"
                              alt=""
                            />
                          </div>

                          <div>
                            <h4 style={{ fontWeight: 700, color: "#059669" }}>
                              {item.name}
                            </h4>
                            <span
                              style={{
                                color: "#828282",
                                fontSize: 15,
                              }}
                            >
                              สัดส่วนที่ได้ :
                            </span>
                            <img
                              className="property-body_part ml-2"
                              src={`../assets/img/body_part/cardio_preem.png`}
                              alt="img"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 64,
                            height: 64,
                            backgroundColor: "#059669",
                            borderRadius: "1rem",
                            borderColor: "#059669",
                          }}
                          onClick={() => renew(item, item.video_id)}
                        >
                          <img
                            src={Union}
                            style={{ width: 25, height: 25 }}
                            alt="union"
                          />
                        </button>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      {/* MODAL EDIT CLIP */}

      <button
        type="button"
        style={{ display: "none" }}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSnack"
        id="example-snack"
      >
        EditClicp
      </button>

      <Modal isOpen={modalTen} toggle={toggleTen} centered>
        <ModalHeader toggle={toggleTen} close={closeBtnTen}>
          <div className="modal-title fs-5" id="exampleModalLabel">
            <img
              src="../assets/img/snackSuccess.png"
              className="snack-success"
              alt=""
            />
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="great-snack">เยี่ยมมาก! พิชิตภารกิจได้สำเร็จ</p>
          <p className="snack-point">คุณได้รับ 10 คะแนน</p>
          <div className="button-snack-point" onClick={toggleTen}>
            ตกลง
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalTwo} toggle={toggleTwo} centered>
        <ModalHeader toggle={toggleTwo} close={closeBtnTwo}>
          <div className="modal-title fs-5" id="exampleModalLabel">
            <img
              src="../assets/img/snackSuccess.png"
              className="snack-success"
              alt=""
            />
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="great-snack">เยี่ยมมาก! พิชิตภารกิจได้สำเร็จ</p>
          <p className="snack-point">คุณได้รับ 2.5 คะแนน</p>
          <div className="button-snack-point" onClick={toggleTwo}>
            ตกลง
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default VideoBodyBurner;
