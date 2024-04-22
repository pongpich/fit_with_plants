import React, { Component } from 'react';
import { convertSecondsToMinutes, convertFormatTime } from "../helpers/utils";
import { completeVideoPlayPercentage } from "../constants/defaultValues";
import { connect } from "react-redux";

class VideoListLastWeekAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastWeekStart: null,
            selectExerciseVideoLastWeek: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const {  lastWeekStart } = this.state;
        const { user, exerciseVideo, statusVideoList, statusPostDailyWeighChallenge, statusDisplayName, statusUpdateProgramPromptLog, statusGetCheckRenewPrompt, statusGetMemberInfo, statusCheckRenewPrompt, statusGetAllExAct, member_info, all_exercise_activity } = this.props;

        if (prevProps.statusGetAllExAct !== statusGetAllExAct && statusGetAllExAct == "success") {

            const maxWeek = all_exercise_activity.reduce((max, week) => {
                return week.week_in_program > max ? week.week_in_program : max;
            }, 0);


            if (maxWeek > 1) { // เอาไว้เช็ค week ล่า สุด  โดน -1 ตลอด
                this.setState({ lastWeekStart: maxWeek - 1 })
                this.selectVideoLastWeek(maxWeek - 1);
            } else {
                this.setState({ lastWeekStart: 1 })
                this.selectVideoLastWeek(1);

            }


            // เเสดง  select week ทั้ง หมด โดยไม่เอา week ล่าสุด
            const result = all_exercise_activity.map((week) => {
                if (week.week_in_program < maxWeek) {
                    return week.week_in_program;
                }

            });

            const weekAll = result.sort((a, b) => b - a);
            const filteredWeekAll = weekAll.filter(Boolean);
            this.setState({ weekAll: filteredWeekAll })
        }



        if (prevState.lastWeekStart !== lastWeekStart) {

            // ทำสิ่งที่คุณต้องการเมื่อ lastWeekStart เปลี่ยนค่า
            this.selectVideoLastWeek(lastWeekStart);

            //this.props.getAllExerciseActivity(user.user_id);
        }
    }


    selectVideoLastWeek(lastWeekStart) {

        const { all_exercise_activity } = this.props
        const exercise_result = all_exercise_activity && all_exercise_activity.filter((exercise) => {

            if (exercise.week_in_program == lastWeekStart) {
                return exercise
            }

        })


        if (exercise_result && exercise_result.length > 0) {
            this.setState({
                selectExerciseVideoLastWeek: JSON.parse(exercise_result[0].activities)
            });
        }


    }

    selectExerciseDaySelectionLastWeek(focusDay) {
        const { selectExerciseVideoLastWeek } = this.state
        if (selectExerciseVideoLastWeek) {
          return selectExerciseVideoLastWeek[focusDay];
        }
      }

    render() {
        const {
            focusDay,
            selectedVDO,
            selectVideoPlayer,
            weekAll,
            selectExerciseVideoLastWeek,
            videoUrl,
            videoUrl2,
            todayExercise,
            timesExercise,
        } = this.props;

        return (
            <div className="card-body d-flex justify-content-center">
                <form>
                    <div className="tab-content mt-3 mb-3" id="myTabContent" style={{ borderBottom: "3px solid #4F4F4F", paddingBottom: "0px" }}>
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h4 className="ml-3 mb-3" style={{ color: "#F45197" }}>โปรแกรมสัปดาห์ที่ผ่านมา</h4>
                            <select class="form-control ml-3 mb-3  col-10  col-sm-10 col-md-4" aria-label="Default select example" onChange={(event) => this.setState({ lastWeekStart: event.target.value })}>
                                {
                                    weekAll && weekAll.map((number) => {
                                        return <option value={number}>Week {number}</option>
                                    })
                                }
                            </select>
                            <nav className="nav">
                                {
                                    (selectExerciseVideoLastWeek && selectExerciseVideoLastWeek.length >= 1) &&
                                    <a
                                        className="nav-link"
                                        style={{ color: `${focusDay === 0 ? "#F45197" : "grey"}`, cursor: "pointer" }}
                                        onClick={() => this.onDayChange(0)}
                                    >
                                        <h5><b>DAY 1</b></h5>
                                    </a>
                                }
                                {
                                    (selectExerciseVideoLastWeek && selectExerciseVideoLastWeek.length >= 2) &&
                                    <a
                                        className="nav-link"
                                        style={{ color: `${focusDay === 1 ? "#F45197" : "grey"}`, cursor: "pointer" }}
                                        onClick={() => this.onDayChange(1)}
                                    >
                                        <h5><b>DAY 2</b></h5>
                                    </a>
                                }
                                {
                                    (selectExerciseVideoLastWeek && selectExerciseVideoLastWeek.length >= 3) &&
                                    <a
                                        className="nav-link"
                                        style={{ color: `${focusDay === 2 ? "#F45197" : "grey"}`, cursor: "pointer" }}
                                        onClick={() => this.onDayChange(2)}
                                    >
                                        <h5><b>DAY 3</b></h5>
                                    </a>
                                }
                                {
                                    (selectExerciseVideoLastWeek && selectExerciseVideoLastWeek.length >= 4) &&
                                    <a
                                        className="nav-link"
                                        style={{ color: `${focusDay === 3 ? "#F45197" : "grey"}`, cursor: "pointer" }}
                                        onClick={() => this.onDayChange(3)}
                                    >
                                        <h5><b>DAY 4</b></h5>
                                    </a>
                                }

                                <a
                                    className="nav-link ml-auto"
                                    style={{ cursor: "pointer", color: "#F45197" }}
                                    onClick={() => this.setState({ lastWeekVDO_click: "default" })}
                                >
                                    <u>ดูวีดีโอออกกำลังกายปัจจุบัน</u>
                                </a>
                            </nav>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">pppp</div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">kkkkk</div>
                    </div>

                    <div className="">
                        <div className="trailer" id={`popupVDO`}>
                            <div>
                                <video ref="videoPlayer" src={selectVideoPlayer === 1 ? videoUrl : videoUrl2 ? videoUrl2 : videoUrl} id="videoPlayer" controls controlsList="nodownload" disablePictureInPicture></video>
                            </div>
                            <img alt="" src="../assets/img/thumb/close.png" className="close" onClick={() => this.toggle()}></img>
                        </div>
                        <div className="trailer" id={`popupVDOList`}>
                            <div>
                                <video ref="videoPlayerList" src={selectVideoPlayer === 1 ? videoUrl : videoUrl2 ? videoUrl2 : videoUrl} id="videoPlayerList" controls controlsList="nodownload" disablePictureInPicture></video>
                            </div>
                            <img alt="" src="../assets/img/thumb/close.png" className="close" onClick={() => this.closeList()}></img>
                        </div>
                        <table className="table table-responsive">
                            <div>
                                <div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="">
                                                <span className="mr-5 ml-3" style={{ fontSize: "16px", float: "left", color: "grey" }}> รวมเวลาฝึกทั้งหมด {timesExercise} นาที</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="col-lg-12 col-md-4 col-12">
                                                <div className="mt-1" style={{ float: "right" }} >
                                                    <span className="mr-2" style={{ fontSize: "18px", fontWeight: "bold", color: "grey" }}>เล่นอัตโนมัติ</span>
                                                    <label className="switch" onClick={() => this.autoPlayCheck()}>
                                                        <input type="checkbox" className="danger" id="autoPlayCheck"></input>
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <tbody>
                                {
                                    (selectExerciseVideoLastWeek) &&
                                    (todayExercise.map((item, index) => {
                                        const minuteLabel = (item.duration < 20) ? convertFormatTime(item.duration) : convertSecondsToMinutes(item.duration);
                                        return (
                                            <div className="row" key={index}>
                                                <div className="checkCompleteVideo mt-3 col-lg-2 col-md-1 col-2">
                                                    {
                                                        (index === 0) && <h6 className="firstVideoStartText">เริ่มกันเลย!</h6>
                                                    }
                                                    {
                                                        (item.play_time && item.duration && item.play_time / item.duration >= completeVideoPlayPercentage) ?
                                                            <span className="dot" style={{ backgroundColor: "#F45197" }}>
                                                                <h5 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "white" }}><i className="fa fa-check fa-lg" ></i></h5>
                                                            </span>
                                                            :
                                                            <span className="dot">
                                                                <h3 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>{index + 1}</h3>
                                                            </span>
                                                    }
                                                    {
                                                        (index === todayExercise.length - 1) ?
                                                            <div className="vl" style={{ height: "0%" }}></div>
                                                            :
                                                            <div className="vl"></div>
                                                    }
                                                    {
                                                        (index === todayExercise.length - 1) && <h6 className="lastVideoEndText">สำเร็จแล้ว!</h6>
                                                    }
                                                </div>
                                                <div className="mt-3 mb-1 col-lg-8 col-md-11 col-10">
                                                    <div className="videoItem border shadow">
                                                        {
                                                            (this.state.autoPlayCheck) &&
                                                            <img className="play_button" src="../assets/img/thumb/play_button2.png" width="100px" onClick={() => this.toggleListLastWeek(index)}></img>
                                                        }
                                                        {
                                                            (!this.state.autoPlayCheck) &&
                                                            <img className="play_button" src="../assets/img/thumb/play_button2.png" width="100px" onClick={() => this.toggle(item)}></img>
                                                        }
                                                        <div className="videoThumb">
                                                            <div className="containerThumb">
                                                                {
                                                                    (item.thumbnail) ?
                                                                        <img className="img-fluid" src={`${item.thumbnail}`} alt="" />
                                                                        :
                                                                        <img className="img-fluid" src={`../assets/img/thumb/${item.category.toLowerCase().split(" ").join("")}_g3.jpg`} alt="" />
                                                                }
                                                                {/* <div className="overlay" onClick={() => this.toggle(item)}>
                                    <i className="fa fa-play fa-4x" aria-hidden="true"></i>
                                    <div className="videoDuration" style={{ position: "absolute", right: "5%", bottom: "0", color: "white" }}>
                                      <h6>
                                        <b>{(item.duration + "").split(".")[0]}:{(item.duration + "").split(".")[1]} นาที</b>
                                      </h6>
                                    </div>
                                  </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="videoDetail">
                                                            <div className="videoDuration mt-3">
                                                                <h6>
                                                                    <i className="fa fa-clock-o fa-1x mr-2" aria-hidden="true"></i>
                                                                    {minuteLabel} นาที
                                                                </h6>
                                                            </div>
                                                            <hr className="" style={{ width: "100%", marginTop: "40px" }}></hr>
                                                            <div className="videoName">
                                                                <p style={{ color: "grey", marginBottom: "0px", marginTop: "0px" }}> {item.category} </p>
                                                                {(item.name.length < 17) ?
                                                                    <h4 style={{ color: "#F45197" }}><b>{item.name}</b></h4>
                                                                    :
                                                                    <h6 style={{ color: "#F45197" }}><b>{item.name}</b></h6>
                                                                }
                                                                {
                                                                    (this.props.member_info && (this.props.member_info.low_impact === "yes") && item.tag && item.tag.includes("low_impact")) &&
                                                                    <p style={{ color: "grey", marginBottom: "0px", marginTop: "-10px" }}> {'(Low impact)'} </p>
                                                                }
                                                            </div>
                                                            { //เช็ค ถ้าหากเป็น category ที่มี type ย่อย จะไม่สามารถนำชื่อ category มาตั้งเป็นชื่อรูปได้ ต้องแยกเป็นเคสๆไป
                                                                (item.category !== "Main Circuit Combo" && item.category !== "Main Circuit" && item.category !== "Challenge") &&
                                                                <img className="body_part" src={`../assets/img/body_part/${item.category.toLowerCase().split(" ").join("")}.png`}></img>
                                                            }
                                                            {
                                                                (item.type.toLowerCase().split(" ").join("") === "chestfocus" || item.type.toLowerCase().split(" ").join("") === "chest_back")
                                                                && <img className="body_part ml-2" src={`../assets/img/body_part/chest.png`}></img>
                                                            }
                                                            {
                                                                (item.type.toLowerCase().split(" ").join("") === "backfocus" || item.type.toLowerCase().split(" ").join("") === "chest_back")
                                                                && <img className="body_part ml-2" src={`../assets/img/body_part/back.png`}></img>
                                                            }
                                                            {
                                                                (item.type.toLowerCase().split(" ").join("") === "backfocus" || item.type.toLowerCase().split(" ").join("") === "chest_back")
                                                                && <img className="body_part ml-2" src={`../assets/img/body_part/core.png`}></img>
                                                            }
                                                            {
                                                                (item.type.toLowerCase().split(" ").join("") === "legfocus" || item.type.toLowerCase().split(" ").join("") === "leg_arm")
                                                                && <img className="body_part ml-2" src={`../assets/img/body_part/leg.png`}></img>
                                                            }
                                                            {
                                                                (item.type.toLowerCase().split(" ").join("") === "armfocus" || item.type.toLowerCase().split(" ").join("") === "leg_arm")
                                                                && <img className="body_part ml-2" src={`../assets/img/body_part/arm.png`}></img>
                                                            }
                                                            {
                                                                (item.type.toLowerCase().split(" ").join("") === "armfocus" || item.type.toLowerCase().split(" ").join("") === "leg_arm")
                                                                && <img className="body_part ml-2" src={`../assets/img/body_part/shoulder.png`}></img>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }))
                                }
                            </tbody>
                        </table>
                    </div>
                </form>

            </div>
        )
    }
}

//export default VideoListLastWeekAll;
const mapStateToProps = ({ authUser, exerciseVideos, challenges, get, update }) => {
    const { user } = authUser;
    const { statusDisplayName, statusGetMemberInfo, member_info, statusCheck4WeeksPrompt, statusGetCheck4WeeksPrompt, statusCheckRenewPrompt, statusGetCheckRenewPrompt } = get;
    const { statusUpdateDisplayName, statusUpdateProgramPromptLog } = update;
    const { dailyWeighChallenge, statusPostDailyWeighChallenge } = challenges;
    const { exerciseVideo, exerciseVideoLastWeek, isFirstWeek, status, video, videos, statusVideoList, statusUpdateBodyInfo, week, lastweek, statusGetAllExAct, all_exercise_activity } = exerciseVideos;
    return { user, exerciseVideo, exerciseVideoLastWeek, isFirstWeek, status, video, videos, statusVideoList, statusUpdateBodyInfo, week, lastweek, dailyWeighChallenge, statusPostDailyWeighChallenge, statusDisplayName, statusGetMemberInfo, statusUpdateDisplayName, member_info, statusCheck4WeeksPrompt, statusGetCheck4WeeksPrompt, statusUpdateProgramPromptLog, statusCheckRenewPrompt, statusGetCheckRenewPrompt, statusGetAllExAct, all_exercise_activity };
};

const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(VideoListLastWeekAll);