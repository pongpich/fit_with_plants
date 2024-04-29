//ByteArk Version
import React, { Component } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { connect } from "react-redux";
import {
  updateProfile,
  logoutUser,
  checkUpdateMaxFriends,
} from "../redux/auth";
import {
  getCheckDisplayName,
  getMemberInfo,
  check4WeeksPrompt,
  checkRenewPrompt,
} from "../redux/get";
import {
  updateDisplayName,
  updateProgramPromptLog,
  checkProgramLevel,
} from "../redux/update";
import {
  getDailyWeighChallenge,
  postDailyWeighChallenge,
} from "../redux/challenges";
import {
  createCustomWeekForUser,
  videoListForUser,
  updatePlaytime,
  updatePlaylist,
  randomVideo,
  selectChangeVideo,
  resetStatus,
  clearVideoList,
  videoListForUserLastWeek,
  updateBodyInfo,
  updatePlaytimeLastWeek,
  getAllExerciseActivity,
  updatePlaytimeLastWeekSelected,
  hidePopupVideoPlayer,
  setHidePopupVideoPlayerList,
  setEndedVideoPlayerList,
  createBraveAndBurnChallenge,
  getBraveAndBurnChallenge,
  createExerciseSnack,
  getExerciseSnack,
  getVideoSnack,
  clearExerciseSnack,
} from "../redux/exerciseVideos";
import {
  completeVideoPlayPercentage,
  minimumVideoPlayPercentage,
  updateFrequency,
} from "../constants/defaultValues";
import {
  convertSecondsToMinutes,
  convertFormatTime,
  calculateWeekInProgram,
} from "../helpers/utils";
import "./videoList.scss";
import moment from "moment";
import BraveAndBurn from "../components/BraveAndBurn";
import VideoPlayerByteArk from "../components/VideoPlayer";
import VideoPlayerListByteArk from "../components/VideoPlayerList";
import SelectChangeVideoList from "../components/SelectChangeVideoList";
import VideoListLastWeekAll from "../components/VideoListLastWeekAll";
import VideoExerciseSnack from "./videoExerciseSnack";
import Modal from "../modals/modal";
import Modal_Form from "../modals/modal_form";
import Success_Modal from "../modals/success_modal";
import Challenges from "./challenges";
import Nutrition from "./nutrition/nutrition";
import Bg_login from "../assets/img/bg_login.png";

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      email: "",
      sex: "female",
      age: "",
      weight: "",
      height: "",
      chest: "",
      waist: "",
      hip: "",
      statusOtherAttributes: "default",
      focusDay: 0,
      other_attributes: "",
      selectedVDO: null,
      editVDO_click: "default",
      lastWeekVDO_click: "default",
      tempPlaylist: [],
      indexPlaylist: 0,
      selectChangeVideoList: [],
      spinnerRandomVideo: "default",
      weightInDailyWeighChallenge: "",
      otherAttributesPage: "basicInfo",
      autoPlayCheck: false,
      staticSex: "hr",
      staticAge: "hr",
      staticWeight: "hr",
      staticHeight: "hr",
      staticChest: "hr",
      staticWaist: "hr",
      staticHip: "hr",
      displayName: null,
      displayName2: null,
      displayName3: null,
      validation_displayname: false,
      checkDisplayName: null,
      step4WeeksPrompt: 1,
      selectVideoPlayer: 1,
      lastWeekVDOAll: true,
      lastWeekStart: null,
      weekAll: [],
      selectExerciseVideoLastWeek: null,
      showBarveAndBurn: false,
      show: true,
      modal_show: false,
      success_modal_show: false,
      exerciseSnack: false,
      showchallenge: false,
      shownutrition: false,
      dropdownOpen: false,
    };

    this.prevPlayTime = 0;

    this.onUpdateProfile = this.onUpdateProfile.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.onVideoTimeUpdate = this.onVideoTimeUpdate.bind(this);
    this.toggle = this.toggle.bind(this);
    this.togglePopupSelectEditVideo =
      this.togglePopupSelectEditVideo.bind(this);
    this.close = this.close.bind(this);
    this.exerciseDaySelection = this.exerciseDaySelection.bind(this);
    this.closeList = this.closeList.bind(this);
    this.addEventToVideo = this.addEventToVideo.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModalForm = this.showModalForm.bind(this);
    this.hideModalForm = this.hideModalForm.bind(this);
    this.showSuccessModal = this.showSuccessModal.bind(this);
    this.hideSuccessModal = this.hideSuccessModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showModalForm = () => {
    this.setState({ modal_show: true });
    this.setState({ show: false });
  };

  hideModalForm = () => {
    this.setState({ modal_show: false });
  };

  showSuccessModal = () => {
    this.setState({ success_modal_show: true });
    this.setState({ modal_show: false });
  };

  hideSuccessModal = () => {
    this.setState({ success_modal_show: false });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  handlePlayerDropdownChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "main") {
      this.props.history.push("/videolist");
    } else if (selectedOption === "backup") {
      this.props.history.push("/videolist2");
    }
  };

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      //ถ้า JSON.parse แล้ว Error แสดงว่าเป็น Json อยู่แล้ว
      return true;
    }
    //ถ้า JSON.parse แล้วไม่มี Error แสดงว่ายังเป็น String อยู่
    return false;
  }

  async componentDidMount() {
    const { user, statsCreateExerciseSnack, week } = this.props;

    this.props.setEndedVideoPlayerList(false);

    if (user) {
      this.props.getMemberInfo(user.user_id);
      this.props.checkProgramLevel(user.user_id);
      this.props.check4WeeksPrompt(user.user_id);
      this.props.checkRenewPrompt(user.user_id);

      this.props.getAllExerciseActivity(user.user_id);

      /*  */
      //this.props.createBraveAndBurnChallenge(user.user_id);
    }
    if (this.props.user && this.props.user.other_attributes) {
      this.props.videoListForUser(
        this.props.user.user_id,
        // this.props.user.other_attributes = "{"age": 32, "hip": 41, "sex": "female", "chest": 38, "waist": 31, "height": 175, "weight": 79}"
        this.isJson(user.other_attributes)
          ? user.other_attributes.weight
          : JSON.parse(user.other_attributes).weight,
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );

      if (this.props.statusVideoList !== "no_video") {
        this.addEventToVideo();
      }
      this.props.getDailyWeighChallenge(user.user_id);
      this.props.checkUpdateMaxFriends(user.user_id);
      this.setState({
        sex: this.isJson(user.other_attributes)
          ? user.other_attributes.sex
          : JSON.parse(user.other_attributes).sex,
        age: this.isJson(user.other_attributes)
          ? user.other_attributes.age
          : JSON.parse(user.other_attributes).age,
        weight: this.isJson(user.other_attributes)
          ? user.other_attributes.weight
          : JSON.parse(user.other_attributes).weight,
        height: this.isJson(user.other_attributes)
          ? user.other_attributes.height
          : JSON.parse(user.other_attributes).height,
        chest: this.isJson(user.other_attributes)
          ? user.other_attributes.chest
          : JSON.parse(user.other_attributes).chest,
        waist: this.isJson(user.other_attributes)
          ? user.other_attributes.waist
          : JSON.parse(user.other_attributes).waist,
        hip: this.isJson(user.other_attributes)
          ? user.other_attributes.hip
          : JSON.parse(user.other_attributes).hip,
      });
    }
    if (user === null) {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      displayName,
      displayName2,
      displayName3,
      lastWeekStart,
      focusDay,
      selectedVDO,
    } = this.state;
    const {
      user,
      exerciseVideo,
      statusVideoList,
      statusPostDailyWeighChallenge,
      statusDisplayName,
      statusUpdateProgramPromptLog,
      statusGetCheckRenewPrompt,
      statusGetMemberInfo,
      statusCheckRenewPrompt,
      statusGetAllExAct,
      member_info,
      all_exercise_activity,
      hidePopUpVideoPlayer,
      hidePopUpVideoPlayerList,
      endedVideoPlayerList,
      statusGetBraveAndBurn,
      statsCreateExerciseSnack,
      videoExerciseSnack,
      statsGetExerciseSnack,
      week,
      exercise_day,
    } = this.props;

    if (
      prevProps.statusGetBraveAndBurn !== statusGetBraveAndBurn &&
      statusGetBraveAndBurn === "success"
    ) {
      this.setState({ showBarveAndBurn: true });
    }

    //เช็คเพื่อซ่อน popup จากไฟล์ component VideoPlayer
    if (prevProps.hidePopUpVideoPlayer !== hidePopUpVideoPlayer) {
      if (hidePopUpVideoPlayer) {
        this.toggle();
      }
    }
    //เช็คเพื่อซ่อน popup จากไฟล์ component VideoPlayerList
    if (prevProps.hidePopUpVideoPlayerList !== hidePopUpVideoPlayerList) {
      if (hidePopUpVideoPlayerList) {
        this.closeList();
      }
    }

    if (
      prevProps.endedVideoPlayerList !== endedVideoPlayerList &&
      endedVideoPlayerList === true
    ) {
      this.onVideoEnd();
    }

    // เช็ควันหมดอยู่ expire_date ของuser
    if (prevProps.statusGetMemberInfo !== statusGetMemberInfo && member_info) {
      const expirationDate = new Date(member_info.expire_date);
      const currentDate = new Date();

      if (currentDate < expirationDate) {
        this.setState({ lastWeekVDOAll: true }); //  expire_date ยังไม่หมดอายุ
      } else {
        this.setState({ lastWeekVDOAll: false }); //  expire_date หมดอายุ
      }
    }

    if (
      prevProps.statusGetAllExAct !== statusGetAllExAct &&
      statusGetAllExAct == "success"
    ) {
      const maxWeek = all_exercise_activity.reduce((max, week) => {
        return week.week_in_program > max ? week.week_in_program : max;
      }, 0);

      if (maxWeek > 1) {
        // เอาไว้เช็ค week ล่า สุด  โดน -1 ตลอด
        this.setState({ lastWeekStart: maxWeek - 1 });
        this.selectVideoLastWeek(maxWeek - 1);
      } else {
        this.setState({ lastWeekStart: 1 });
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
      this.setState({ weekAll: filteredWeekAll });
    }

    if (prevState.lastWeekStart !== lastWeekStart) {
      // ทำสิ่งที่คุณต้องการเมื่อ lastWeekStart เปลี่ยนค่า
      this.selectVideoLastWeek(lastWeekStart);

      //this.props.getAllExerciseActivity(user.user_id);
    }

    if (
      prevProps.statusGetCheckRenewPrompt !== statusGetCheckRenewPrompt &&
      statusGetCheckRenewPrompt === "success"
    ) {
      if (!statusCheckRenewPrompt && user && user.other_attributes) {
        //ย้าย videoListForUserLastWeek จาก componentDidMount มาไว้ตรงนี้เพราะไปสร้าง week ย้อนหลังทุกครั้ง ทำให้ checkRenewPrompt ผิดพลาด
        this.props.videoListForUserLastWeek(
          this.props.user.user_id,
          // this.props.user.other_attributes = "{"age": 32, "hip": 41, "sex": "female", "chest": 38, "waist": 31, "height": 175, "weight": 79}"
          this.isJson(user.other_attributes)
            ? user.other_attributes.weight
            : JSON.parse(user.other_attributes).weight,
          this.props.user.start_date,
          this.props.user.expire_date,
          this.props.user.offset
        );
      }
    }
    if (
      prevProps.statusUpdateProgramPromptLog !== statusUpdateProgramPromptLog &&
      statusUpdateProgramPromptLog === "success"
    ) {
      this.setState({ step4WeeksPrompt: 4 });
      this.props.videoListForUserLastWeek(
        this.props.user.user_id,
        // this.props.user.other_attributes = "{"age": 32, "hip": 41, "sex": "female", "chest": 38, "waist": 31, "height": 175, "weight": 79}"
        this.isJson(user.other_attributes)
          ? user.other_attributes.weight
          : JSON.parse(user.other_attributes).weight,
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );
    }
    if (
      prevProps.statusPostDailyWeighChallenge !==
        statusPostDailyWeighChallenge &&
      statusPostDailyWeighChallenge === "success"
    ) {
      this.props.history.push("/challenges");
    }
    if (
      user &&
      prevProps.user &&
      user.other_attributes !== prevProps.user.other_attributes
    ) {
      this.setState({
        other_attributes: user.other_attributes,
      });
      this.props.videoListForUser(
        this.props.user.user_id,
        user.other_attributes.weight, //ไม่ต้อง JSON.parse เพราะผ่านการ UPDATE_PROFILE_SUCCESS
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );
      this.props.videoListForUserLastWeek(
        this.props.user.user_id,
        user.other_attributes.weight, //ไม่ต้อง JSON.parse เพราะผ่านการ UPDATE_PROFILE_SUCCESS
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );
      if (
        this.props.user.other_attributes &&
        this.props.statusVideoList !== "no_video"
      ) {
        this.addEventToVideo();
      }
    }
    if (prevProps.user !== user && user === null) {
      this.props.history.push("/login");
    }
    if (
      prevProps.video &&
      this.props.video &&
      prevProps.video.video_id !== this.props.video.video_id
    ) {
      const { indexPlaylist } = this.state;
      // playlist เป็น Array ที่เก็บ Object ของ video หลายๆอันไว้ข้างใน
      let playlist = [...this.state.tempPlaylist];
      // ...playlist[indexPlaylist] เพื่อเอาAttribute (order, play_time) ซึ่งไม่มีใน database
      // ...this.props.video เพื่อเอาAttribute ต่างๆของ video ใหม่ที่สุ่มได้นั้น นำมา assigned ทับ ...playlist[indexPlaylist]
      // play_time: 0 เพื่อให้Attribute play_time เท่ากับ 0 เสมอเมื่อสุ่ม video มา
      playlist[indexPlaylist] = {
        ...playlist[indexPlaylist],
        ...this.props.video,
        play_time: 0,
      };
      this.setState({
        tempPlaylist: playlist,
      });
    }
    if (prevProps.exerciseVideo !== exerciseVideo) {
      //เพื่อ update playtime ของ renderEditVDO
      const { focusDay } = this.state;
      const todayExercise = this.exerciseDaySelection(focusDay);
      const tempPlaylist = [...todayExercise];
      this.setState({
        tempPlaylist: tempPlaylist,
      });
    }
    if (prevProps.videos !== this.props.videos) {
      const videos = this.props.videos;
      this.setState({
        selectChangeVideoList: videos,
      });
    }
    if (prevProps.status === "processing" && this.props.status === "success") {
      this.closeEditVDO();
    }
    if (
      prevState.editVDO_click === "show" &&
      this.state.editVDO_click !== "show"
    ) {
      this.addEventToVideo();
    }
    if (
      prevState.editVDO_click !== "show" &&
      this.state.editVDO_click === "show"
    ) {
      this.addEventToVideo();
    }
    if (prevState.autoPlayCheck !== this.state.autoPlayCheck) {
      this.addEventToVideo();
      if (!this.state.autoPlayCheck) {
        this.state.selectedVDO = null;
      }
      
    }
    if (
      user &&
      prevProps.user &&
      prevProps.user.other_attributes !== user.other_attributes
    ) {
      /* this.setState({
        other_attributes: user.other_attributes
      }) */
      this.props.createCustomWeekForUser(
        this.props.user.user_id,
        user.other_attributes.weight, //ไม่ต้อง JSON.parse เพราะผ่านการ UPDATE_PROFILE_SUCCESS
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );
    }
    if (
      prevProps.statusVideoList === "no_video" &&
      statusVideoList !== "no_video"
    ) {
      this.props.updateBodyInfo(
        this.props.user.user_id,
        this.props.user.start_date,
        this.props.user.expire_date,
        this.state.other_attributes
      );
      this.props.videoListForUser(
        this.props.user.user_id,
        user.other_attributes.weight, //ไม่ต้อง JSON.parse เพราะผ่านการ UPDATE_PROFILE_SUCCESS
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );
      this.props.videoListForUserLastWeek(
        this.props.user.user_id,
        user.other_attributes.weight, //ไม่ต้อง JSON.parse เพราะผ่านการ UPDATE_PROFILE_SUCCESS
        this.props.user.start_date,
        this.props.user.expire_date,
        this.props.user.offset
      );
      this.addEventToVideo();
    }

    if (
      prevProps.statusDisplayName &&
      prevProps.statusDisplayName !== statusDisplayName
    ) {
      if (statusDisplayName === "success") {
        this.setState({
          /*    validation_displayname: false, */
          checkDisplayName: "success",
        });
        console.log("statusDisplayName", statusDisplayName);
      } else if (statusDisplayName === "fail") {
        if (displayName3 && displayName3 === displayName2) {
          this.setState({
            displayName: displayName2,
          });
        } else {
          this.setState({
            displayName: null,
            checkDisplayName: "fail",
          });
        }
      }
    }
  }

  selectVideoLastWeek(lastWeekStart) {
    const { all_exercise_activity } = this.props;

    const exercise_result =
      all_exercise_activity &&
      all_exercise_activity.filter((exercise) => {
        if (exercise.week_in_program == lastWeekStart) {
          return exercise;
        }
      });

    if (exercise_result && exercise_result.length > 0) {
      this.setState({
        selectExerciseVideoLastWeek: JSON.parse(exercise_result[0].activities),
      });
    }
  }

  addEventToVideo() {
    var video = this.refs.videoPlayer;
    if (video) {
      video.ontimeupdate = () => this.onVideoTimeUpdate("video");
    }
    var videoList = this.refs.videoPlayerList;
    if (videoList) {
      videoList.ontimeupdate = () => this.onVideoTimeUpdate("videoList");
      videoList.onended = () => this.onVideoEnd();
    }
  }

  toggleListLastWeek(index) {
    console.log("OPEN VIDEO", index);
    const { focusDay, lastWeekVDOAll } = this.state;

    if (!lastWeekVDOAll) {
      const todayExercise = this.exerciseDaySelectionLastWeek(focusDay);
      const selectedVDO = todayExercise.find(
        (element) => element.order === index
      );
      this.setState({ selectVideoPlayer: 1 });
      if (selectedVDO) {
        this.setState(
          {
            selectedVDO,
          },
          () => {
            var trailer = document.getElementById(`popupVDOList`);
            var video = document.getElementById(`videoPlayerList`);
            trailer.classList.add("active_list");
            video.play();
          }
        );
      }
    } else {
      const todayExercise = this.selectExerciseDaySelectionLastWeek(focusDay);
      const selectedVDO = todayExercise.find(
        (element) => element.order === index
      );
      this.setState({ selectVideoPlayer: 1 });
      if (selectedVDO) {
        this.setState(
          {
            selectedVDO,
          },
          () => {
            var trailer = document.getElementById(`popupVDOList`);
            var video = document.getElementById(`videoPlayerList`);
            trailer.classList.add("active_list");
            video.play();
          }
        );
      }
    }
    this.props.setHidePopupVideoPlayerList(false);
  }

  togglePopupSelectEditVideo(video_id, category, type, index, exr_position) {
    document.getElementById("popupSelectEditVideo").classList.toggle("active");
    this.setState({
      indexPlaylist: index,
    });
    this.props.selectChangeVideo(
      video_id,
      category,
      type,
      this.props.user && this.props.user.user_id,
      exr_position
    );
    this.props.resetStatus();
    document.body.style.overflow = "hidden";
  }

  closeTogglePopupSelectEditVideo() {
    document.getElementById("popupSelectEditVideo").classList.toggle("active");
    this.setState({
      selectChangeVideoList: [],
      indexPlaylist: 0,
    });
    document.body.style.overflow = "auto";
  }

  selectEditVideo(video) {
    const { indexPlaylist } = this.state;
    let playlist = [...this.state.tempPlaylist];
    playlist[indexPlaylist] = {
      ...playlist[indexPlaylist],
      ...video,
      play_time: 0,
    };
    this.setState({
      tempPlaylist: playlist,
      selectChangeVideoList: [],
    });
    document.getElementById("popupSelectEditVideo").classList.toggle("active");
    document.body.style.overflow = "auto";
  }

  exerciseDaySelection(focusDay) {
    if (this.props.exerciseVideo) {
      return this.props.exerciseVideo[focusDay];
    }
  }

  exerciseDaySelectionLastWeek(focusDay) {
    if (this.props.exerciseVideoLastWeek) {
      return this.props.exerciseVideoLastWeek[focusDay];
    }
  }

  selectExerciseDaySelectionLastWeek(focusDay) {
    const { selectExerciseVideoLastWeek } = this.state;
    if (selectExerciseVideoLastWeek) {
      return selectExerciseVideoLastWeek[focusDay];
    }
  }

  handleChange(event) {
    /*  console.log("444"); */
    const name = event.target.name;
    const valuName = event.target.value;

    if (name === "displayName") {
      this.setState({
        [name]: valuName,
      });

      if (
        /^([0-9a-zA-Zก-ฮัะาเแอำไใโอิอีอึอือุอูอ่อ้อ๊อ๋อ็อ์])+$/i.test(valuName)
      ) {
        this.props.getCheckDisplayName(valuName);
        this.setState({
          validation_displayname: false,
          displayName: valuName,
          displayName2: valuName,
        });
      } else {
        this.setState({
          validation_displayname: true,
          displayName2: null,
        });
      }
    } else {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDayChange = (day) => {
    this.setState({
      exerciseSnack: false,
      focusDay: day,
      showBarveAndBurn: false,
      showchallenge: false,
      shownutrition: false,
    });
  };

  onExerciseSnackChange = () => {
    this.setState({
      exerciseSnack: true,
      showBarveAndBurn: true,
    });
  };

  onChallengeChange = () => {
    this.setState({
      shownutrition: false,
      showchallenge: true,
      showBarveAndBurn: true,
    });
  };

  onNutritionChange = () => {
    this.setState({
      showchallenge: false,
      shownutrition: true,
      showBarveAndBurn: true,
    });
  };

  onUserLogout(event) {
    this.props.logoutUser();
    this.props.clearVideoList();
  }

  closeEditVDO() {
    this.setState({
      editVDO_click: "default",
      autoPlayCheck: false,
    });
  }

  randomVideo(video_id, category, type, index) {
    this.setState({
      indexPlaylist: index,
      spinnerRandomVideo: "loading",
    });
    this.props.randomVideo(
      video_id,
      category,
      type,
      this.props.user && this.props.user.user_id
    );
    var delayInMilliseconds = 500; //0.5 second
    setTimeout(() => {
      // แสดง Spinner 0.5 วินาที
      this.setState({
        spinnerRandomVideo: "default",
      });
    }, delayInMilliseconds);
  }

  editVDO() {
    const { focusDay } = this.state;
    const todayExercise = this.exerciseDaySelection(focusDay);
    const tempPlaylist = [...todayExercise];
    this.setState({
      editVDO_click: "show",
      tempPlaylist: tempPlaylist,
      autoPlayCheck: false,
    });
  }

  autoPlayCheck() {
    if (document.getElementById("autoPlayCheck").checked === true) {
      this.setState({ autoPlayCheck: true });
    } else {
      this.setState({ autoPlayCheck: false });
    }
  }

  toggleList(index) {
    console.log("toggleList");
    const { focusDay } = this.state;
    const todayExercise = this.exerciseDaySelection(focusDay);
    const selectedVDO = todayExercise.find(
      (element) => element.order === index
    );
    this.setState({ selectVideoPlayer: 1 });
    if (selectedVDO) {
      this.setState(
        {
          selectedVDO,
        },
        () => {
          var trailer = document.getElementById(`popupVDOList`);
          var video = document.getElementById(`videoPlayerList`);
          trailer.classList.add("active_list");
          video.play();
        }
      );
    }

    this.props.setHidePopupVideoPlayerList(false);
  }

  closeList() {
    var trailer = document.getElementById(`popupVDOList`);
    if (trailer) {
      trailer.classList.remove("active_list");
    }
    var video = document.getElementById(`videoPlayerList`);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    this.props.setHidePopupVideoPlayerList(true);
  }

  toggle(selectedVDO) {
    var trailer = document.getElementById(`popupVDO`);
    var video = document.getElementById(`videoPlayer`);
    this.setState({ selectVideoPlayer: 1 });
    if (selectedVDO) {
      this.setState({
        selectedVDO: selectedVDO,
      });
    }

    trailer.classList.toggle("active");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  close() {
    var trailer = document.getElementById(`popupVDO`);
    trailer.classList.toggle("active");
  }

  onVideoEnd() {
    const { focusDay, selectedVDO, lastWeekVDO_click, lastWeekVDOAll } =
      this.state;
    var todayExercise;
    if (lastWeekVDO_click === "show") {
      if (!lastWeekVDOAll) {
        todayExercise = this.exerciseDaySelectionLastWeek(focusDay);
      } else {
        todayExercise = this.selectExerciseDaySelectionLastWeek(focusDay);
      }
    } else {
      todayExercise = this.exerciseDaySelection(focusDay);
    }

    const nextVDO = todayExercise.find(
      (element) => element.order > selectedVDO.order
    );

    if (nextVDO) {
      this.setState(
        {
          selectedVDO: nextVDO,
        },
        () => {
          var trailer = document.getElementById(`popupVDOList`);
          var video = document.getElementById(`videoPlayerList`);
          trailer.classList.add("active_list");
          video.play();
        }
      );
    }

    this.props.setEndedVideoPlayerList(false);
  }

  onVideoListUpdate() {
    const { focusDay, tempPlaylist } = this.state;
    const user_id = this.props.user.user_id;
    const start_date = this.props.user.start_date;
    const day_number = focusDay;
    const playlist = [...tempPlaylist];
    const tempExerciseVideo = [...this.props.exerciseVideo];
    tempExerciseVideo[focusDay] = tempPlaylist;
    this.props.updatePlaylist(
      user_id,
      start_date,
      day_number,
      playlist,
      tempExerciseVideo
    );
  }

  onVideoTimeUpdate(compName = "video") {
    const {
      selectedVDO,
      focusDay,
      lastWeekVDO_click,
      lastWeekVDOAll,
      lastWeekStart,
      selectExerciseVideoLastWeek,
    } = this.state;
    var video =
      compName === "video" ? this.refs.videoPlayer : this.refs.videoPlayerList;
    if (!video || !selectedVDO) {
      return;
    }

    const diffTime = Math.abs(video.currentTime - this.prevPlayTime);
    if (diffTime < updateFrequency) {
      return;
    }
    this.prevPlayTime = video.currentTime;

    if (
      !video.duration ||
      video.currentTime / video.duration < minimumVideoPlayPercentage ||
      selectedVDO.play_time / selectedVDO.duration >=
        completeVideoPlayPercentage
    ) {
      return;
    }

    const user_id = this.props.user.user_id;
    const start_date = this.props.user.start_date;
    const expire_date = this.props.user.expire_date;
    const day_number = focusDay;
    const video_number = selectedVDO.order;
    const play_time = video.currentTime;
    const duration = video.duration;
    const tempExerciseVideoLastWeekSelect = [...selectExerciseVideoLastWeek];
    const tempExerciseVideoLastWeekAll = [...this.props.all_exercise_activity];
    const tempExerciseVideoLastWeek = [...this.props.exerciseVideoLastWeek];
    const tempExerciseVideo = [...this.props.exerciseVideo];

    if (lastWeekVDO_click === "show") {
      if (!lastWeekVDOAll) {
        tempExerciseVideoLastWeek[day_number][video_number] = {
          ...tempExerciseVideoLastWeek[day_number][video_number],
          play_time: play_time,
          duration: duration,
        };
      } else {
        tempExerciseVideoLastWeekSelect[day_number][video_number] = {
          ...tempExerciseVideoLastWeekSelect[day_number][video_number],
          play_time: play_time,
          duration: duration,
        };
        tempExerciseVideoLastWeekAll[lastWeekStart - 1].activities =
          JSON.stringify(tempExerciseVideoLastWeekSelect);
      }
    } else {
      tempExerciseVideo[day_number][video_number] = {
        ...tempExerciseVideo[day_number][video_number],
        play_time: play_time,
        duration: duration,
      };
    }

    const newVideo = { ...selectedVDO, play_time, duration };
    this.setState({
      selectedVDO: newVideo,
    });

    if (lastWeekVDO_click === "show") {
      if (!lastWeekVDOAll) {
        this.props.updatePlaytimeLastWeek(
          user_id,
          start_date,
          expire_date,
          day_number,
          video_number,
          play_time,
          duration,
          tempExerciseVideoLastWeek
        );
      } else {
        this.props.updatePlaytimeLastWeekSelected(
          user_id,
          start_date,
          expire_date,
          day_number,
          video_number,
          play_time,
          duration,
          tempExerciseVideoLastWeekAll,
          lastWeekStart
        );
      }
    } else {
      this.props.updatePlaytime(
        user_id,
        start_date,
        expire_date,
        day_number,
        video_number,
        play_time,
        duration,
        tempExerciseVideo
      );
    }
  }

  onUpdateBasicInfo(event) {
    const { sex, age, weight, height, displayName, displayName2 } = this.state;
    const { member_info } = this.props;

    if (
      sex !== "" &&
      age !== "" &&
      weight !== "" &&
      height !== "" &&
      (member_info && !member_info.display_name ? displayName !== null : true) //ถ้าผู้ใช้ยังไม่มีข้อมูล display_name ในระบบ ตรงช่องกรอก displayName ต้องไม่เท่ากับ null
    ) {
      if (age % 1 === 0) {
        this.setState({
          otherAttributesPage: "bodyInfo",
          statusOtherAttributes: "default",
        });
      } else {
        this.setState({
          statusOtherAttributes: "ageNotUseDecimals",
        });
      }
    } else {
      this.setState({
        statusOtherAttributes: "fail",
      });
    }
  }

  onUpdateProfile(event) {
    const { sex, age, weight, height, chest, waist, hip, displayName } =
      this.state;
    const { member_info, user } = this.props;

    this.setState({
      statusOtherAttributes: "default",
    });

    if (
      sex !== "" &&
      age !== "" &&
      weight !== "" &&
      height !== "" &&
      chest !== "" &&
      waist !== "" &&
      hip !== ""
    ) {
      const other_attributes = {
        sex,
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        chest: Number(chest),
        waist: Number(waist),
        hip: Number(hip),
      };

      this.setState({
        other_attributes: other_attributes,
      });

      if (this.props.user && this.props.user.other_attributes) {
        // ให้จัดตารางVDO และ updateBodyInfo (ที่ componentDidUpdate)
        this.props.createCustomWeekForUser(
          this.props.user.user_id,
          JSON.parse(this.props.user.other_attributes).weight,
          this.props.user.start_date,
          this.props.user.expire_date,
          this.props.user.offset
        );
        if (member_info && !member_info.display_name) {
          //เช็คว่าในระบบยังไม่มีข้อมูล display_name
          this.props.updateDisplayName(user && user.user_id, displayName);
        }
      } else {
        //ถ้า other_attributes = NULL ให้ update ฟิลด์ other_attributes ของ member
        this.props.updateProfile(
          this.props.user.email,
          other_attributes,
          displayName
        );
      }
    } else {
      this.setState({
        statusOtherAttributes: "fail",
      });
    }
  }

  renderEditVDO() {
    const {
      focusDay,
      selectedVDO,
      tempPlaylist,
      selectChangeVideoList,
      selectVideoPlayer,
      lastWeekVDO_click,
      lastWeekVDOAll,
      lastWeekStart,
      selectExerciseVideoLastWeek,
    } = this.state;
    const { member_info } = this.props;
    const videoUrl = selectedVDO && selectedVDO.url ? `${selectedVDO.url}` : "";
    let allMinute = [];
    let allSecond = [];
    tempPlaylist.map((item) =>
      allMinute.push(Number(item.duration.toFixed(2).split(".")[0]))
    );
    tempPlaylist.map((item) =>
      allSecond.push(Number(item.duration.toFixed(2).split(".")[1]))
    );
    let sumMinute = allMinute
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let sumSecond = allSecond
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let minute2 = Math.floor(sumSecond / 60);
    let totalMinute = Number(sumMinute) + Number(minute2);
    let totalSecond = sumSecond % 60;
    let timesExercise;
    if (totalMinute > 100) {
      // เช็คเพราะมีการปรับ database ให้เก็บVDOเป็นหน่วยวินาที
      totalMinute = Math.floor(sumMinute / 60);
      totalSecond = sumMinute % 60;
    }
    if (totalSecond < 10) {
      timesExercise = `${totalMinute}:0${totalSecond}`;
    } else {
      timesExercise = `${totalMinute}:${totalSecond}`;
    }

    return (
      <div className="card-body d-flex justify-content-center">
        <form className="mt-3">
          <span className="mr-5" style={{ fontSize: "15px", color: "#F45197" }}>
            {" "}
            <h4> แก้ไขคลิปออกกำลังกาย</h4>
          </span>

          <div className="popup" id="popupSelectEditVideo">
            <div
              className="overlay"
              onClick={() => this.closeTogglePopupSelectEditVideo()}
            ></div>
            <div className="content">
              <div
                className="close-btn"
                onClick={() => this.closeTogglePopupSelectEditVideo()}
              >
                &times;
              </div>
              <div className="row mt-4 body_part_header">
                {selectChangeVideoList.map((item, index) => {
                  const itemsArray = item && item.muscle.split(",");
                  if (index == 0) {
                    return (
                      <div className="property-box">
                        {itemsArray &&
                          itemsArray.map((muItem, j) => {
                            console.log("muItem", muItem);
                            if (muItem == "warm_up") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/Propertywarmup.png`}
                                ></img>
                              );
                            }
                            if (muItem == "cool_down") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/Propertycooldown.png`}
                                ></img>
                              );
                            }
                            if (muItem == "total_body") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/totalBody.png`}
                                ></img>
                              );
                            }
                            if (muItem == "core") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/PropertyCore.png`}
                                ></img>
                              );
                            }
                            if (muItem == "chest") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/PropertyChest.png`}
                                ></img>
                              );
                            }
                            if (muItem == "back") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/PropertyBack.png`}
                                ></img>
                              );
                              //PropertyGlute
                            }
                            if (muItem == "glute") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/PropertyGlute.png`}
                                ></img>
                              );
                            }
                            if (muItem == "leg") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/PropertyLeg.png`}
                                ></img>
                              );
                            }
                            if (muItem == "shoulder") {
                              return (
                                <img
                                  className="property-body_part ml-2"
                                  src={`../assets/img/body_part/PropertyShoulder.png`}
                                ></img>
                              );
                            }
                          })}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="selectEditPlaylist">
                {selectChangeVideoList.map((item, index) => {
                  if (item.category == "Flexibility") {
                    let weekFlexibility =
                      this.props.week <= 4
                        ? ["00004", "00005", "00006", "00007"]
                        : ["00008", "00009", "00010", "00011"];
                    if (weekFlexibility.includes(item.video_id)) {
                      return (
                        <div className="playlistWrapper border shadow">
                          <div className="">
                            <SelectChangeVideoList
                              thumbnail={item.thumbnail}
                              category={item.category}
                              url={item.url}
                            />
                          </div>
                          <div className="mt-1 ml-3 mb-4">
                            <h6 style={{ color: "#F45197" }}>
                              <b> {item.name}</b>
                            </h6>
                          </div>
                          <div className="mt-1 ml-3 mb-4">
                            <h6>
                              <b> {item.type} </b>
                            </h6>
                          </div>

                          <button
                            className="btn btn-danger mb-3 mt-5"
                            type="button"
                            style={{
                              fontSize: "15px",
                              cursor: "pointer",
                              padding: "10px 24px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              display: "block",
                              width: "85%",
                              backgroundColor: "#F45197",
                              borderRadius: "20px",
                            }}
                            onClick={() => this.selectEditVideo(item)}
                          >
                            <b>เลือกวีดีโอนี้</b>
                          </button>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className="playlistWrapper border shadow">
                        <div className="">
                          <SelectChangeVideoList
                            thumbnail={item.thumbnail}
                            category={item.category}
                            url={item.url}
                          />
                        </div>
                        <div className="mt-1 ml-3 mb-4">
                          <h6 style={{ color: "#F45197" }}>
                            <b> {item.name} </b>
                          </h6>
                        </div>
                        <div className="mt-1 ml-3 mb-4">
                          <h6>
                            <b> {item.type} </b>
                          </h6>
                        </div>

                        <button
                          className="btn btn-danger mb-3 mt-5"
                          type="button"
                          style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            padding: "10px 24px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                            width: "85%",
                            backgroundColor: "#F45197",
                            borderRadius: "20px",
                          }}
                          onClick={() => this.selectEditVideo(item)}
                        >
                          <b>เลือกวีดีโอนี้</b>
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div
            className="tab-content mb-3 row"
            id="myTabContent"
            style={{ borderBottom: "3px solid #4F4F4F", paddingBottom: "10px" }}
          >
            <div
              className="tab-pane fade show active col-lg-8 col-md-4 col-12"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="mt-3">
                {focusDay === 0 && (
                  <h5 style={{ color: "#F45197" }}>
                    <b>DAY 1</b>
                  </h5>
                )}
                {focusDay === 1 && (
                  <h5 style={{ color: "#F45197" }}>
                    <b>DAY 2</b>
                  </h5>
                )}
                {focusDay === 2 && (
                  <h5 style={{ color: "#F45197" }}>
                    <b>DAY 3</b>
                  </h5>
                )}
                {focusDay === 3 && (
                  <h5 style={{ color: "#F45197" }}>
                    <b>DAY 4</b>
                  </h5>
                )}
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <button
                className="btn btn-light"
                type="button"
                style={{
                  backgroundColor: "white",
                  color: "#F45197",
                  borderColor: "#F45197",
                  fontSize: "17px",
                  cursor: "pointer",
                  borderRadius: "12px",
                  width: "100%",
                  padding: "10px",
                }}
                onClick={() => this.closeEditVDO()}
              >
                <b>ยกเลิก</b>
              </button>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <button
                className="btn"
                type="button"
                style={{
                  backgroundColor: "#F45197",
                  color: "white",
                  fontSize: "17px",
                  cursor: "pointer",
                  borderRadius: "12px",
                  float: "right",
                  width: "100%",
                  padding: "10px",
                }}
                onClick={() => this.onVideoListUpdate()}
              >
                <b>ยืนยันการแก้ไข</b>
              </button>
            </div>
          </div>

          <div className="">
            {this.state.autoPlayCheck ? (
              <div className="trailer" id={`popupVDO`}>
                <div>
                  {videoUrl ? (
                    <VideoPlayerByteArk
                      url={videoUrl}
                      day_number={focusDay}
                      video_number={selectedVDO && selectedVDO.order}
                      selectedVDO={selectedVDO}
                      lastWeekVDO_click={lastWeekVDO_click}
                      lastWeekVDOAll={lastWeekVDOAll}
                      lastWeekStart={lastWeekStart}
                      selectExerciseVideoLastWeek={selectExerciseVideoLastWeek}
                    />
                  ) : (
                    <>
                      <video
                        ref="videoPlayer"
                        src={videoUrl}
                        id="videoPlayer"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      ></video>
                      <img
                        alt=""
                        src="../assets/img/thumb/close.png"
                        className="close"
                        onClick={() => this.toggle()}
                      ></img>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="trailer" id={`popupVDO`}>
                <div>
                  {videoUrl ? (
                    <VideoPlayerByteArk
                      url={videoUrl}
                      day_number={focusDay}
                      video_number={selectedVDO && selectedVDO.order}
                      selectedVDO={selectedVDO}
                      lastWeekVDO_click={lastWeekVDO_click}
                      lastWeekVDOAll={lastWeekVDOAll}
                      lastWeekStart={lastWeekStart}
                      selectExerciseVideoLastWeek={selectExerciseVideoLastWeek}
                    />
                  ) : (
                    <>
                      <video
                        ref="videoPlayer"
                        src={videoUrl}
                        id="videoPlayer"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      ></video>
                      <img
                        alt=""
                        src="../assets/img/thumb/close.png"
                        className="close"
                        onClick={() => this.toggle()}
                      ></img>
                    </>
                  )}
                </div>
              </div>
            )}
            <table className="table table-responsive">
              <div>
                <div>
                  <div className="tabletitle row mb-4">
                    {
                      <span
                        className="col-lg-8 col-md-6 col-12"
                        style={{ fontSize: "16px", color: "grey" }}
                      >
                        {" "}
                        รวมเวลาฝึกทั้งหมด {timesExercise} นาที
                      </span>
                    }
                  </div>
                </div>
              </div>
              <tbody>
                {tempPlaylist.map((item, index) => {
                  const itemsArray = item.muscle.split(",");
                  const minuteLabel =
                    item.duration < 20
                      ? convertFormatTime(item.duration)
                      : convertSecondsToMinutes(item.duration);
                  return (
                    <div className="row" key={index}>
                      <div className="mt-3 mb-1 col-lg-8 col-md-12 col-10">
                        <div className="videoItem border shadow">
                          {this.state.spinnerRandomVideo === "loading" ? (
                            item.video_id === this.props.video.video_id ? ( //ถ้า video_id ของ item ตรงกับของ this.props.video คือตรงกับที่มีการสุ่มวีดีโอใหม่ให้
                              <div className="play_button">
                                <i className="fa fa-refresh fa-spin fa-5x"></i>
                              </div>
                            ) : (
                              <img
                                className="play_button"
                                src="../assets/img/thumb/play_button2.png"
                                width="100px"
                                onClick={() => this.toggle(item)}
                              ></img>
                            )
                          ) : (
                            <img
                              className="play_button"
                              src="../assets/img/thumb/play_button2.png"
                              width="100px"
                              onClick={() => this.toggle(item)}
                            ></img>
                          )}
                          <div className="videoThumb">
                            <div className="containerThumb">
                              {item.thumbnail ? (
                                <img
                                  className="img-fluid"
                                  src={`${item.thumbnail}`}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="img-fluid"
                                  src={`../assets/img/thumb/${item.category
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}_g3.jpg`}
                                  alt=""
                                />
                              )}
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
                                  <b>{item.name}</b>
                                </h4>
                              ) : (
                                <h6 style={{ color: "#F45197" }}>
                                  <b>{item.name}</b>
                                </h6>
                              )}
                              {this.props.member_info &&
                                this.props.member_info.low_impact === "yes" &&
                                item.tag &&
                                item.tag.includes("low_impact") && (
                                  <p
                                    style={{
                                      color: "grey",
                                      marginBottom: "0px",
                                      marginTop: "-10px",
                                    }}
                                  >
                                    {" "}
                                    {"(Low impact)"}{" "}
                                  </p>
                                )}
                            </div>
                            <div className="property-box">
                              {itemsArray &&
                                itemsArray.map((muItem, j) => {
                                  if (muItem == "warm_up") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/Propertywarmup.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "cool_down") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/Propertycooldown.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "total_body") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/totalBody.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "core") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/PropertyCore.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "chest") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/PropertyChest.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "back") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/PropertyBack.png`}
                                      ></img>
                                    );
                                    //PropertyGlute
                                  }
                                  if (muItem == "glute") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/PropertyGlute.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "leg") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/PropertyLeg.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "shoulder") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/PropertyShoulder.png`}
                                      ></img>
                                    );
                                  }
                                  if (muItem == "cardio") {
                                    return (
                                      <img
                                        className="property-body_part ml-2"
                                        src={`../assets/img/body_part/cardio_preem.png`}
                                      ></img>
                                    );
                                  }
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                      {item.play_time !== item.duration &&
                        item.category !== "Challenge" &&
                        ((item.category === "Warm Up" ||
                          item.category === "Cool Down") &&
                        member_info &&
                        member_info.program_level === "bfr_lv1" ? (
                          <div></div>
                        ) : (
                          <div
                            className="col-lg-2 col-md-12 col-8"
                            style={{ top: "50%" }}
                          >
                            <div
                              className="changeVideoBtn mb-2 btn col-lg-12 col-md-4 col-12"
                              onClick={() =>
                                this.togglePopupSelectEditVideo(
                                  item.video_id,
                                  item.category,
                                  item.type,
                                  index,
                                  item.exr_position
                                )
                              }
                            >
                              <img
                                className="ml-3 mr-2"
                                src={`../assets/img/shuffle.png`}
                                style={{ float: "left" }}
                                width="30px"
                                height="30px"
                              />
                              เลือกวีดีโอใหม่
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }

  renderBasicInfo() {
    const {
      statusOtherAttributes,
      displayName,
      validation_displayname,
      displayName2,
      checkDisplayName,
      displayname,
    } = this.state;
    const { member_info } = this.props;
    return (
      <div>
        <div
          className="card shadow mb-4 col-lg-6 offset-lg-3 col-md-12 col-12"
          style={{ borderRadius: "20px", background: "rgba(255,255,255,0.6)" }}
        >
          <div className="mb-3 col-lg-12  col-md-12 col-12">
            <center>
              <h2 className="mt-5" style={{ color: "#F45197" }}>
                <b>กรอกข้อมูลเบื้องต้น</b>
              </h2>
              <h2 className="mb-4" style={{ color: "#F45197" }}>
                <b>เพื่อเริ่มต้นการใช้งาน</b>
              </h2>
              {/* <h5>การกรอกข้อมูลจะทำให้เราสามารถออกแบบ</h5>
              <h5>โปรแกรมออกกำลังกายให้เหมาะสมกับคุณได้ดียิ่งขึ้น</h5> */}
            </center>
          </div>
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <div className="form-group">
              {member_info && !member_info.display_name && (
                <>
                  <label
                    for="age"
                    className="bmd-label-floating"
                    style={{ color: "#000000" }}
                  >
                    ชื่อที่ใช้แสดงในระบบ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="display-name"
                    name="displayName"
                    step="1"
                    value={displayName}
                    onChange={(event) => this.handleChange(event)}
                  />
                </>
              )}

              {validation_displayname ? (
                <p style={{ color: "red" }}>
                  อนุญาตให้ใส่ 0-9, A-Z, ก-ฮ เท่านั้น
                </p>
              ) : null}
              {checkDisplayName === "fail" ? (
                <p style={{ color: "red" }}>
                  มีผู้ใช้ชื่อ {displayName2} อยู่แล้วในระบบ
                </p>
              ) : null}
              {displayName && displayName.length < 4 ? (
                <p style={{ color: "red" }}>กรุณากรอกตัวอักษร 4 ตัว ขึ้นไป</p>
              ) : null}
            </div>
            {statusOtherAttributes === "fail" && !displayName && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
              </small>
            )}
          </div>
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <label style={{ color: "#000000" }}>เพศ</label>
            <div
              style={{ display: "flex", justifyContent: "flex-start" }}
              onChange={this.onChangeValue}
            >
              <div>
                <input
                  type="radio"
                  value="male"
                  name="sex"
                  checked={this.state.sex === "male"}
                  onChange={this.onChange}
                  className="mr-3"
                  style={{ height: 25, width: 25, verticalAlign: "middle" }}
                />
                <label>ชาย</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="female"
                  name="sex"
                  checked={this.state.sex === "female"}
                  onChange={this.onChange}
                  className="mr-3 ml-3"
                  style={{ height: 25, width: 25, verticalAlign: "middle" }}
                />
                <label>หญิง</label>
              </div>
              {/* <label className="form-check-label mb-3 mr-4">
                <input
                  className="form-check-input"
                  type="radio"
                  value="male"
                  name="sex"
                  checked={this.state.sex === "male"}
                  onChange={this.onChange}
                  style={{ height: 25, width: 25, verticalAlign: "middle" }}
                /> ชาย
                          <span className="circle">
                  <span className="check"></span>
                </span>
              </label> */}
              {/* <label className="form-check-label" style={{ marginLeft: "20px" }}>
                <input
                  className="form-check-input"
                  type="radio"
                  value="female"
                  name="sex"
                  checked={this.state.sex === "female"}
                  onChange={this.onChange}
                  style={{ height: 25, width: 25, verticalAlign: "middle" }}
                /> หญิง
                          <span className="circle">
                  <span className="check"></span>
                </span>
              </label> */}
            </div>
          </div>

          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <div className="form-group">
              <label
                for="age"
                className="bmd-label-floating"
                style={{ color: "#000000" }}
              >
                อายุ
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                step="1"
                value={this.state.age}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            {statusOtherAttributes === "ageNotUseDecimals" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>อายุ ห้ามเป็นเลขทศนิยม</h6>
              </small>
            )}
            {statusOtherAttributes === "fail" && this.state.age === "" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
              </small>
            )}
          </div>
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <div className="form-group">
              <label
                for="weight"
                className="bmd-label-floating"
                style={{ color: "#000000" }}
              >
                น้ำหนัก (กก.)
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                step=".01"
                value={this.state.weight}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            {statusOtherAttributes === "fail" && this.state.weight === "" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
              </small>
            )}
          </div>
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <div className="form-group">
              <label
                for="height"
                className="bmd-label-floating"
                style={{ color: "#000000" }}
              >
                ส่วนสูง (ซม.)
              </label>
              <input
                type="number"
                className="form-control"
                id="height"
                name="height"
                step=".01"
                value={this.state.height}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            {statusOtherAttributes === "fail" && this.state.height === "" && (
              <small id="emailHelp" className="form-text text-muted mb-3">
                <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
              </small>
            )}
          </div>
          <div className="mb-5 mt-4 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <div className="text-center">
              <button
                className="btn-shadow"
                onClick={() => this.onUpdateBasicInfo()}
                style={{
                  backgroundColor: "#F45197",
                  borderColor: "#F45197",
                  color: "white",
                  borderRadius: "50px",
                  width: "300px",
                  height: "48px",
                  padding: "0px",
                }}
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderBodyInfo() {
    const { statusOtherAttributes } = this.state;

    /*  console.log("window.innerWidth :", window.innerWidth); */
    return (
      <div
        className="card shadow"
        style={{
          borderRadius: "8px",
          padding: window.innerWidth >= 922 ? "5px 50px 5px" : "5px",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <div className="mt-5 mb-5 col-lg-12  col-md-12 col-12">
          <center>
            <h2 className="" style={{ color: "#F45197" }}>
              <b>กรอกข้อมูลเบื้องต้น</b>
            </h2>
            <h2 className="mb-4" style={{ color: "#F45197" }}>
              <b>เพื่อเริ่มต้นการใช้งาน</b>
            </h2>
            <h5>
              <b>
                <i>กรุณาใช้หน่วยวัดเป็น “นิ้ว” (Inches)</i>
              </b>
            </h5>

            {/* <h5>โปรแกรมออกกำลังกายให้เหมาะสมกับคุณได้ดียิ่งขึ้น</h5> */}
            <hr></hr>
          </center>
          <div
            style={{ textAlign: window.innerWidth > 768 ? "left" : "center" }}
          >
            <h5>
              <b>สัดส่วน</b>
            </h5>
            <h5>
              กรุณาวัดสัดส่วนของคุณ
              โดยใช้รูปตัวอย่างเพื่อเป็นไกด์ในการวัดสัดส่วน
            </h5>
          </div>
        </div>

        <div className="row">
          <div
            className="col-lg-12  col-md-12 col-12 d-flex"
            style={{
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div className="mb-2">
              {<img src="../assets/img/women2.png" width="314" alt="" />}
            </div>
            <div className="mb-2">
              {<img src="../assets/img/male2.png" width="314" alt="" />}
            </div>

            <div className="">
              <div className="form-group">
                <label
                  for="chest"
                  className="bmd-label-floating"
                  style={{ color: "#00000" }}
                >
                  รอบอก (นิ้ว)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="chest"
                  name="chest"
                  step=".01"
                  value={this.state.chest}
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
              {statusOtherAttributes === "fail" && this.state.chest === "" && (
                <small id="emailHelp" className="form-text text-muted mb-3">
                  <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
                </small>
              )}
              <div className="form-group">
                <label
                  for="waist"
                  className="bmd-label-floating"
                  style={{ color: "#00000" }}
                >
                  รอบเอว (นิ้ว)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="waist"
                  name="waist"
                  step=".01"
                  value={this.state.waist}
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
              {statusOtherAttributes === "fail" && this.state.waist === "" && (
                <small id="emailHelp" className="form-text text-muted mb-3">
                  <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
                </small>
              )}
              <div className="form-group">
                <label
                  for="hip"
                  className="bmd-label-floating"
                  style={{ color: "#00000" }}
                >
                  สะโพก (นิ้ว)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="hip"
                  name="hip"
                  step=".01"
                  value={this.state.hip}
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
              {statusOtherAttributes === "fail" && this.state.hip === "" && (
                <small id="emailHelp" className="form-text text-muted mb-3">
                  <h6 style={{ color: "red" }}>กรุณากรอกข้อมูล</h6>
                </small>
              )}
              <div className="form-group mb-5" style={{ padding: "0 20px" }}>
                <div className="text-center">
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <div className="mb-2 mr-2">
                      <button
                        className="btn-shadow"
                        onClick={() =>
                          this.setState({ otherAttributesPage: "basicInfo" })
                        }
                        style={{
                          backgroundColor: "white",
                          borderColor: "#F45197",
                          color: "#F45197",
                          borderRadius: "50px",
                          width: "200px",
                          height: "40px",
                          padding: "0px",
                        }}
                      >
                        ย้อนกลับ
                      </button>
                    </div>
                    <div className="mb-2 ml-lg-2">
                      <button
                        className="btn-shadow"
                        onClick={() =>
                          this.setState({
                            otherAttributesPage: "renderBasicBodyInfo",
                          })
                        }
                        style={{
                          backgroundColor: "#F45197",
                          borderColor: "#F45197",
                          color: "white",
                          borderRadius: "50px",
                          width: "200px",
                          height: "40px",
                          padding: "0px",
                        }}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="space-70 mb-5"></div>
        <div className="form-group mb-5">
          <div className="text-center">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div className="mb-2 mr-2">
                <button
                  className="btn-shadow"
                  onClick={() =>
                    this.setState({ otherAttributesPage: "basicInfo" })
                  }
                  style={{
                    backgroundColor: "white",
                    borderColor: "#F45197",
                    color: "#F45197",
                    borderRadius: "50px",
                    width: "300px",
                    height: "48px",
                    padding: "0px",
                  }}
                >
                  ย้อนกลับ
                </button>
              </div>
              <div className="mb-2 ml-2">
                <button
                  className="btn-shadow"
                  onClick={() =>
                    this.setState({
                      otherAttributesPage: "renderBasicBodyInfo",
                    })
                  }
                  style={{
                    backgroundColor: "#F45197",
                    borderColor: "#F45197",
                    color: "white",
                    borderRadius: "50px",
                    width: "300px",
                    height: "48px",
                    padding: "0px",
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }

  renderBasicBodyInfo() {
    const sexInfo = this.state.sex;
    const sexInfoTH = sexInfo === "male" ? "ชาย" : "หญิง";
    const sexInfoTHBack = sexInfo === "male" ? "หญิง" : "ชาย";
    const sexInfoEngฺBack = sexInfo === "male" ? "female" : "male";
    return (
      <>
        <div
          className="card shadow mb-4 col-lg-8 offset-lg-2 col-md-12 col-12"
          style={{ borderRadius: "20px", background: "rgba(255,255,255,0.6)" }}
        >
          <div className="mb-3 col-lg-12  col-md-12 col-12">
            <center>
              <h2 className="mt-5 mb-4" style={{ color: "#F45197" }}>
                <b>สรุปรายละเอียด</b>
              </h2>
              <h5>กรุณาตรวจสอบความถูกต้องของข้อมูลอีกครั้งก่อนกดยืนยัน</h5>
              <h5>
                <b>
                  <i>ใช้หน่วยวัดสัดส่วนเป็น “นิ้ว” (Inches)</i>
                </b>
              </h5>
            </center>
          </div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                เพศ
              </label>
              <div className="col-sm-4">
                <select
                  onClick={(event) => this.renderHr(event)}
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  className="form-control"
                  id="sex"
                  aria-label="Default select example"
                >
                  {sexInfo === "male" ? (
                    <option value={sexInfo} selected>
                      {sexInfoTH}
                    </option>
                  ) : (
                    <option value="female">หญิง</option>
                  )}
                  <option value={sexInfoEngฺBack}>{sexInfoTHBack}</option>
                </select>
              </div>
            </div>
          </div>
          <div className={this.state.staticSex}></div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                อายุ
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  value={this.state.age}
                  onClick={(event) => this.renderHr(event)}
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className={this.state.staticAge}></div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                น้ำหนัก(กก.)
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  step=".01"
                  value={this.state.weight}
                  min="0"
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  onClick={(event) => this.renderHr(event)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className={this.state.staticWeight}></div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                ส่วนสูง (ซม.)
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  id="height"
                  name="height"
                  step=".01"
                  min="0"
                  value={this.state.height}
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  onClick={(event) => this.renderHr(event)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className={this.state.staticHeight}></div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                รอบอก (นิ้ว)
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  step=".01"
                  min="0"
                  name="chest"
                  id="chest"
                  value={this.state.chest}
                  onClick={(event) => this.renderHr(event)}
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className={this.state.staticChest}></div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                รอบเอว (นิ้ว)
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  step=".01"
                  min="0"
                  id="waist"
                  name="waist"
                  value={this.state.waist}
                  onClick={(event) => this.renderHr(event)}
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className={this.state.staticWaist}></div>
          <div className="centerForm">
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-6 col-form-label">
                สะโพก (นิ้ว)
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  step=".01"
                  min="0"
                  id="hip"
                  name="hip"
                  value={this.state.hip}
                  onClick={(event) => this.renderHr(event)}
                  onChange={(event) => this.handleChangeBasicBodyInfo(event)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className={this.state.staticHip}></div>
          <div className="centerForm">
            <div className="mb-6 col-lg-6 offset-lg-3 col-md-12 col-12">
              <Button
                className="btn-shadow"
                onClick={() => this.onUpdateProfile()}
                style={{
                  backgroundColor: "#F45197",
                  borderColor: "#F45197",
                  color: "white",
                  borderRadius: "50px",
                  width: "300px",
                  height: "48px",
                  padding: "0px",
                }}
              >
                ยืนยัน
              </Button>
            </div>
          </div>
          <br />
        </div>
      </>
    );
  }

  handleChangeBasicBodyInfo(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  renderHr(event) {
    const idHr = event.target.id;

    if (idHr === "sex") {
      this.setState({
        staticSex: "hrPink",
      });
    } else {
      this.setState({
        staticSex: "hr",
      });
    }
    if (idHr === "age") {
      this.setState({
        staticAge: "hrPink",
      });
    } else {
      this.setState({
        staticAge: "hr",
      });
    }
    if (idHr === "weight") {
      this.setState({
        staticWeight: "hrPink",
      });
    } else {
      this.setState({
        staticWeight: "hr",
      });
    }
    if (idHr === "height") {
      this.setState({
        staticHeight: "hrPink",
      });
    } else {
      this.setState({
        staticHeight: "hr",
      });
    }
    if (idHr === "chest") {
      this.setState({
        staticChest: "hrPink",
      });
    } else {
      this.setState({
        staticChest: "hr",
      });
    }
    if (idHr === "waist") {
      this.setState({
        staticWaist: "hrPink",
      });
    } else {
      this.setState({
        staticWaist: "hr",
      });
    }
    if (idHr === "hip") {
      this.setState({
        staticHip: "hrPink",
      });
    } else {
      this.setState({
        staticHip: "hr",
      });
    }
  }

  render4WeeksPrompt() {
    //4WeeksPrompt จะแสดงเมื่อออกกำลังกายด้วย BFR program เพิ่งครบ 4 weeks เป็นครั้งแรก
    const { user, statusUpdateProgramPromptLog, statusCheckRenewPrompt } =
      this.props;
    const { step4WeeksPrompt } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 100,
          paddingBottom: 100,
        }}
      >
        <div
          className="shadow-sm"
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 30,
            paddingTop: 60,
            paddingBottom: 60,
            textAlign: "center",
            width: "fit-content",
          }}
        >
          {step4WeeksPrompt === 1 && (
            <div>
              <h1 style={{ color: "#F45197" }}>ยินดีด้วยค่ะ</h1>
              <h1 style={{ color: "#F45197" }}>
                คุณผ่านโปรแกรมในสัปดาห์แรกได้สำเร็จ!
              </h1>
              <br></br>
              <span>คุณพร้อมที่จะอัปเกรดความฟิต</span>
              <br></br>
              <span>ด้วยโปรแกรมที่ท้าทายขึ้น และผลลัพธ์ที่ดีกว่า</span>
              <br></br>
              <span>ไปกับโปรแกรม “Standard” หรือไม่</span>
              <br></br>
            </div>
          )}
          {step4WeeksPrompt === 2 && (
            <div>
              <h1 style={{ color: "#F45197" }}>โปรแกรม Bebe Fit Routine</h1>
              <h1 style={{ color: "#F45197" }}>เต็มรูปแบบ (Standard)</h1>
              <h3>โปรแกรมการออกกำลังกายที่ออกแบบมา</h3>
              <h3>เพื่อให้คุณได้ผลลัพธ์จากการเปลี่ยนแปลงที่ดีที่สุด</h3>
              <div style={{ textAlign: "left" }}>
                <br></br>
                <span>
                  โดยจะมีการปรับโปรแกรมเป็นรูปแบบการฝึกแบบ Circuit Training
                </span>
                <br></br>
                <span>
                  ที่ประกอบไปด้วย Body Weight Training และ Cardio
                  ที่มีความเข้มข้นสูง (HIIT)
                </span>
                <br></br>
                <span>
                  เพื่อเพิ่มการเผาผลาญพลังงาน พร้อมสร้างกล้ามเนื้อแบบ 2IN1 !!!
                </span>
                <br></br> <br></br>
                <span>
                  ใช้ระยะเวลาการฝึกเพิ่มขึ้นเล็กน้อย สูงสุด*อยู่ที่ประมาณ 60
                  นาที/วัน
                </span>
                <br></br>
                <span>
                  **ระยะเวลาขึ้นอยู่กับเกณฑ์น้ำหนัก
                  แต่ละเกณฑ์น้ำหนักจะได้ระยะเวลาฝึกไม่เท่ากัน
                </span>
                <br></br>
                <span>โดยระยะเวลาสูงสุดอยู่ที่ประมาณ 60 นาที**</span>
                <br></br>
                <br></br>
                <span className="font-weight-bold">
                  เหมาะสำหรับผู้ที่ต้องการ เพิ่มความฟิต
                  และความท้าทายให้กับร่างกาย
                </span>
                <br></br>
                <span className="font-weight-bold">
                  เพื่อผลลัพธ์ที่ดีที่สุดของคุณ!
                </span>
                <br></br>
              </div>
            </div>
          )}
          {step4WeeksPrompt === 3 && (
            <div className="mb-3">
              <h1>หมายเหตุ</h1>
              <span>การตัดสินใจส่งผลต่อการปรับโปรแกรมของระบบ</span>
              <br></br>
              <span>กรุณาอ่านรายละเอียดก่อนตัดสินใจนะคะ</span>
              <br></br>
            </div>
          )}
          {statusUpdateProgramPromptLog !== "loading" && (
            <div className="row mt-4" style={{ justifyContent: "center" }}>
              <button
                onClick={() =>
                  this.props.updateProgramPromptLog(
                    user.user_id,
                    !statusCheckRenewPrompt ? "4 weeks prompt" : "renew prompt",
                    "not level up"
                  )
                }
                style={{
                  width: step4WeeksPrompt < 3 ? 250 : 300,
                  borderRadius: 30,
                  borderColor: "#F45197",
                  color: "#F45197",
                }}
                className="mt-3"
              >
                {step4WeeksPrompt < 3
                  ? "ไม่สนใจ, ขอคงโปรแกรมเดิม"
                  : "ขอใช้โปรแกรมเดิม"}
              </button>
              <div className="ml-2 mr-2"></div>
              <button
                onClick={
                  step4WeeksPrompt < 3
                    ? () =>
                        this.setState({
                          step4WeeksPrompt: step4WeeksPrompt + 1,
                        })
                    : () =>
                        this.props.updateProgramPromptLog(
                          user.user_id,
                          !statusCheckRenewPrompt
                            ? "4 weeks prompt"
                            : "renew prompt",
                          "level up"
                        )
                }
                style={{
                  width: step4WeeksPrompt < 3 ? 250 : 300,
                  borderRadius: 30,
                  borderColor: "#F45197",
                  backgroundColor: "#F45197",
                  color: "white",
                }}
                className="mt-3"
              >
                {step4WeeksPrompt < 3
                  ? step4WeeksPrompt === 2
                    ? "สนใจ, อัปเกรดโปรแกรม"
                    : "สนใจ, อ่านรายละเอียด"
                  : "ยืนยัน, อัปเกรดโปรแกรม"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderOtherAttribute() {
    const { otherAttributesPage } = this.state;
    return (
      <div className="card-body">
        <form>
          {otherAttributesPage === "basicInfo" && this.renderBasicInfo()}
          {otherAttributesPage === "bodyInfo" && this.renderBodyInfo()}
          {otherAttributesPage === "renderBasicBodyInfo" &&
            this.renderBasicBodyInfo()}
        </form>
      </div>
    );
  }

  checkDayPlaytime(todayExercise) {
    var showEditBtn = false;
    todayExercise.map((item) => {
      if (item.play_time / item.duration < completeVideoPlayPercentage) {
        showEditBtn = true;
      }
    });
    return showEditBtn;
  }

  renderBtnSelectVideoPlayer(videoUrl, videoUrl2) {
    const { selectVideoPlayer } = this.state;
    return (
      <div>
        {videoUrl && videoUrl2 && (
          <button
            type="button"
            className="btn btn-light btn-sm mr-2"
            style={{
              borderColor: "#F45197",
              borderWidth: selectVideoPlayer === 1 ? 3 : 0,
            }}
            onClick={() => this.setState({ selectVideoPlayer: 1 })}
          >
            ตัวเล่นหลัก
          </button>
        )}
        {videoUrl2 && (
          <button
            type="button"
            className="btn btn-light btn-sm mr-2"
            style={{
              borderColor: "#F45197",
              borderWidth: selectVideoPlayer === 2 ? 3 : 0,
            }}
            onClick={() => this.setState({ selectVideoPlayer: 2 })}
          >
            ตัวเล่นสำรอง
          </button>
        )}
      </div>
    );
  }

  renderVideoListLastWeek() {
    const {
      focusDay,
      selectedVDO,
      selectVideoPlayer,
      lastWeekVDO_click,
      lastWeekVDOAll,
      lastWeekStart,
      selectExerciseVideoLastWeek,
    } = this.state;

    const { exerciseVideoLastWeek } = this.props;
    const videoUrl = selectedVDO && selectedVDO.url ? `${selectedVDO.url}` : "";
    const todayExercise = this.exerciseDaySelectionLastWeek(focusDay);
    let allMinute = [];
    let allSecond = [];
    if (this.props.exerciseVideoLastWeek) {
      todayExercise.map((item) =>
        allMinute.push(Number(item.duration.toFixed(2).split(".")[0]))
      );
      todayExercise.map((item) =>
        allSecond.push(Number(item.duration.toFixed(2).split(".")[1]))
      );
    }
    let sumMinute = allMinute
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let sumSecond = allSecond
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let minute2 = Math.floor(sumSecond / 60);
    let totalMinute = Number(sumMinute) + Number(minute2);
    let totalSecond = sumSecond % 60;
    let timesExercise;
    if (totalMinute > 100) {
      // เช็คเพราะมีการปรับ database ให้เก็บVDOเป็นหน่วยวินาที
      totalMinute = Math.floor(sumMinute / 60);
      totalSecond = sumMinute % 60;
    }
    if (totalSecond < 10) {
      timesExercise = `${totalMinute}:0${totalSecond}`;
    } else {
      timesExercise = `${totalMinute}:${totalSecond}`;
    }

    return (
      <div className="card-body d-flex justify-content-center">
        <form>
          <div
            className="tab-content mt-3 mb-3"
            id="myTabContent"
            style={{
              borderBottom: "3px solid #4F4F4F",
              paddingBottom: "0px",
            }}
          >
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <h4 className="ml-3 mb-3" style={{ color: "#F45197" }}>
                โปรแกรมสัปดาห์ที่ผ่านมา
              </h4>
              <nav className="nav">
                {exerciseVideoLastWeek.length >= 1 && (
                  <a
                    className="nav-link"
                    style={{
                      color: `${focusDay === 0 ? "#F45197" : "grey"}`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.onDayChange(0)}
                  >
                    <h5>
                      <b>DAY 1</b>
                    </h5>
                  </a>
                )}
                {exerciseVideoLastWeek.length >= 2 && (
                  <a
                    className="nav-link"
                    style={{
                      color: `${focusDay === 1 ? "#F45197" : "grey"}`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.onDayChange(1)}
                  >
                    <h5>
                      <b>DAY 2</b>
                    </h5>
                  </a>
                )}
                {exerciseVideoLastWeek.length >= 3 && (
                  <a
                    className="nav-link"
                    style={{
                      color: `${focusDay === 2 ? "#F45197" : "grey"}`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.onDayChange(2)}
                  >
                    <h5>
                      <b>DAY 3</b>
                    </h5>
                  </a>
                )}
                {exerciseVideoLastWeek.length >= 4 && (
                  <a
                    className="nav-link"
                    style={{
                      color: `${focusDay === 3 ? "#F45197" : "grey"}`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.onDayChange(3)}
                  >
                    <h5>
                      <b>DAY 4</b>
                    </h5>
                  </a>
                )}

                <a
                  className="nav-link ml-auto"
                  style={{ cursor: "pointer", color: "#F45197" }}
                  onClick={() =>
                    this.setState({ lastWeekVDO_click: "default" })
                  }
                >
                  <u>ดูวีดีโอออกกำลังกายปัจจุบัน</u>
                </a>
              </nav>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              pppp
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              kkkkk
            </div>
          </div>

          <div className="">
            {this.state.autoPlayCheck ? (
              <div className="trailer" id={`popupVDOList`}>
                <div>
                  {videoUrl ? (
                    <VideoPlayerListByteArk
                      url={videoUrl}
                      day_number={focusDay}
                      video_number={selectedVDO && selectedVDO.order}
                      selectedVDO={selectedVDO}
                      lastWeekVDO_click={lastWeekVDO_click}
                      lastWeekVDOAll={lastWeekVDOAll}
                      lastWeekStart={lastWeekStart}
                      selectExerciseVideoLastWeek={selectExerciseVideoLastWeek}
                    />
                  ) : (
                    <>
                      <video
                        ref="videoPlayerList"
                        src={videoUrl}
                        id="videoPlayerList"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      ></video>
                      <img
                        alt=""
                        src="../assets/img/thumb/close.png"
                        className="close"
                        onClick={() => this.closeList()}
                      ></img>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="trailer" id={`popupVDO`}>
                <div>
                  {videoUrl ? (
                    <VideoPlayerByteArk
                      url={videoUrl}
                      day_number={focusDay}
                      video_number={selectedVDO && selectedVDO.order}
                      selectedVDO={selectedVDO}
                      lastWeekVDO_click={lastWeekVDO_click}
                      lastWeekVDOAll={lastWeekVDOAll}
                      lastWeekStart={lastWeekStart}
                      selectExerciseVideoLastWeek={selectExerciseVideoLastWeek}
                    />
                  ) : (
                    <>
                      <video
                        ref="videoPlayer"
                        src={videoUrl}
                        id="videoPlayer"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      ></video>
                      <img
                        alt=""
                        src="../assets/img/thumb/close.png"
                        className="close"
                        onClick={() => this.toggle()}
                      ></img>
                    </>
                  )}
                </div>
              </div>
            )}
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
                          รวมเวลาฝึกทั้งหมด {timesExercise} นาที
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="col-lg-12 col-md-4 col-12">
                        <div className="mt-1" style={{ float: "right" }}>
                          <span
                            className="mr-2"
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "grey",
                            }}
                          >
                            เล่นอัตโนมัติ
                          </span>
                          <label
                            className="switch"
                            onClick={() => this.autoPlayCheck()}
                          >
                            <input
                              type="checkbox"
                              className="danger"
                              id="autoPlayCheck"
                            ></input>
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <tbody>
                {this.props.exerciseVideoLastWeek &&
                  todayExercise.map((item, index) => {
                    const itemsArray = item.muscle.split(",");
                    const minuteLabel =
                      item.duration < 20
                        ? convertFormatTime(item.duration)
                        : convertSecondsToMinutes(item.duration);
                    return (
                      <div className="row" key={index}>
                        <div className="checkCompleteVideo mt-3 col-lg-2 col-md-1 col-2">
                          {index === 0 && (
                            <h6 className="firstVideoStartText">
                              เริ่มกันเลย!
                            </h6>
                          )}
                          {item.play_time &&
                          item.duration &&
                          item.play_time / item.duration >=
                            completeVideoPlayPercentage ? (
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
                          {index === todayExercise.length - 1 ? (
                            <div className="vl" style={{ height: "0%" }}></div>
                          ) : (
                            <div className="vl"></div>
                          )}
                          {index === todayExercise.length - 1 && (
                            <h6 className="lastVideoEndText">สำเร็จแล้ว!</h6>
                          )}
                        </div>
                        <div className="mt-3 mb-1 col-lg-8 col-md-11 col-10">
                          <div className="videoItem border shadow">
                            {this.state.autoPlayCheck && (
                              <img
                                className="play_button"
                                src="../assets/img/thumb/play_button2.png"
                                width="100px"
                                onClick={() => this.toggleListLastWeek(index)}
                              ></img>
                            )}
                            {!this.state.autoPlayCheck && (
                              <img
                                className="play_button"
                                src="../assets/img/thumb/play_button2.png"
                                width="100px"
                                onClick={() => this.toggle(item)}
                              ></img>
                            )}
                            <div className="videoThumb">
                              <div className="containerThumb">
                                {item.thumbnail ? (
                                  <img
                                    className="img-fluid"
                                    src={`${item.thumbnail}`}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className="img-fluid"
                                    src={`../assets/img/thumb/${item.category
                                      .toLowerCase()
                                      .split(" ")
                                      .join("")}_g3.jpg`}
                                    alt=""
                                  />
                                )}
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
                                    <b>{item.name}</b>
                                  </h4>
                                ) : (
                                  <h6 style={{ color: "#F45197" }}>
                                    <b>{item.name}</b>
                                  </h6>
                                )}
                                {this.props.member_info &&
                                  this.props.member_info.low_impact === "yes" &&
                                  item.tag &&
                                  item.tag.includes("low_impact") && (
                                    <p
                                      style={{
                                        color: "grey",
                                        marginBottom: "0px",
                                        marginTop: "-10px",
                                      }}
                                    >
                                      {" "}
                                      {"(Low impact)"}{" "}
                                    </p>
                                  )}
                              </div>
                              <div className="property-box">
                                {itemsArray &&
                                  itemsArray.map((muItem, j) => {
                                    if (muItem == "warm_up") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/Propertywarmup.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "cool_down") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/Propertycooldown.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "total_body") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/totalBody.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "core") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyCore.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "chest") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyChest.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "back") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyBack.png`}
                                        ></img>
                                      );
                                      //PropertyGlute
                                    }
                                    if (muItem == "glute") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyGlute.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "leg") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyLeg.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "shoulder") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyShoulder.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "cardio") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/cardio_preem.png`}
                                        ></img>
                                      );
                                    }
                                  })}
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
        </form>
      </div>
    );
  }

  videoWeekAll() {
    const { user } = this.props;
    this.setState({ lastWeekVDO_click: "show" });
    this.props.getAllExerciseActivity(user.user_id);
  }

  renderVideoListLastWeekAll() {
    const {
      focusDay,
      selectedVDO,
      selectVideoPlayer,
      lastWeekStart,
      weekAll,
      selectExerciseVideoLastWeek,
      lastWeekVDO_click,
      lastWeekVDOAll,
    } = this.state;
    const { exerciseVideoLastWeek, all_exercise_activity } = this.props;

    const videoUrl = selectedVDO && selectedVDO.url ? `${selectedVDO.url}` : "";
    const todayExercise = this.selectExerciseDaySelectionLastWeek(focusDay);

    let allMinute = [];
    let allSecond = [];

    /*  const selectExerciseVideoLastWeek = exerciseVideoLastWeek */

    if (selectExerciseVideoLastWeek) {
      todayExercise.map((item) =>
        allMinute.push(Number(item.duration.toFixed(2).split(".")[0]))
      );
      todayExercise.map((item) =>
        allSecond.push(Number(item.duration.toFixed(2).split(".")[1]))
      );
    }
    let sumMinute = allMinute
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let sumSecond = allSecond
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let minute2 = Math.floor(sumSecond / 60);
    let totalMinute = Number(sumMinute) + Number(minute2);
    let totalSecond = sumSecond % 60;
    let timesExercise;
    if (totalMinute > 100) {
      // เช็คเพราะมีการปรับ database ให้เก็บVDOเป็นหน่วยวินาที
      totalMinute = Math.floor(sumMinute / 60);
      totalSecond = sumMinute % 60;
    }
    if (totalSecond < 10) {
      timesExercise = `${totalMinute}:0${totalSecond}`;
    } else {
      timesExercise = `${totalMinute}:${totalSecond}`;
    }

    return (
      <div className="card-body d-flex justify-content-center">
        <form>
          <div
            className="tab-content mt-3 mb-3"
            id="myTabContent"
            style={{ borderBottom: "3px solid #4F4F4F", paddingBottom: "0px" }}
          >
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <h4 className="ml-3 mb-3" style={{ color: "#F45197" }}>
                โปรแกรมสัปดาห์ที่ผ่านมา
              </h4>
              <select
                className="form-control ml-3 mb-3  col-10  col-sm-10 col-md-4"
                aria-label="Default select example"
                onChange={(event) =>
                  this.setState({ lastWeekStart: event.target.value })
                }
              >
                {weekAll &&
                  weekAll.map((number) => {
                    return <option value={number}>Week {number}</option>;
                  })}
              </select>
              <nav className="nav">
                {selectExerciseVideoLastWeek &&
                  selectExerciseVideoLastWeek.length >= 1 && (
                    <a
                      className="nav-link"
                      style={{
                        color: `${focusDay === 0 ? "#F45197" : "grey"}`,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onDayChange(0)}
                    >
                      <h5>
                        <b>DAY 1</b>
                      </h5>
                    </a>
                  )}
                {selectExerciseVideoLastWeek &&
                  selectExerciseVideoLastWeek.length >= 2 && (
                    <a
                      className="nav-link"
                      style={{
                        color: `${focusDay === 1 ? "#F45197" : "grey"}`,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onDayChange(1)}
                    >
                      <h5>
                        <b>DAY 2</b>
                      </h5>
                    </a>
                  )}
                {selectExerciseVideoLastWeek &&
                  selectExerciseVideoLastWeek.length >= 3 && (
                    <a
                      className="nav-link"
                      style={{
                        color: `${focusDay === 2 ? "#F45197" : "grey"}`,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onDayChange(2)}
                    >
                      <h5>
                        <b>DAY 3</b>
                      </h5>
                    </a>
                  )}
                {selectExerciseVideoLastWeek &&
                  selectExerciseVideoLastWeek.length >= 4 && (
                    <a
                      className="nav-link"
                      style={{
                        color: `${focusDay === 3 ? "#F45197" : "grey"}`,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onDayChange(3)}
                    >
                      <h5>
                        <b>DAY 4</b>
                      </h5>
                    </a>
                  )}

                <a
                  className="nav-link ml-auto"
                  style={{ cursor: "pointer", color: "#F45197" }}
                  onClick={() =>
                    this.setState({ lastWeekVDO_click: "default" })
                  }
                >
                  <u>ดูวีดีโอออกกำลังกายปัจจุบัน</u>
                </a>
              </nav>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              pppp
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              kkkkk
            </div>
          </div>

          <div className="">
            {this.state.autoPlayCheck ? (
              <div className="trailer" id={`popupVDOList`}>
                <div>
                  {videoUrl ? (
                    <VideoPlayerListByteArk
                      url={videoUrl}
                      day_number={focusDay}
                      video_number={selectedVDO && selectedVDO.order}
                      selectedVDO={selectedVDO}
                      lastWeekVDO_click={lastWeekVDO_click}
                      lastWeekVDOAll={lastWeekVDOAll}
                      lastWeekStart={lastWeekStart}
                      selectExerciseVideoLastWeek={selectExerciseVideoLastWeek}
                    />
                  ) : (
                    <>
                      <video
                        ref="videoPlayerList"
                        src={videoUrl}
                        id="videoPlayerList"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      ></video>
                      <img
                        alt=""
                        src="../assets/img/thumb/close.png"
                        className="close"
                        onClick={() => this.closeList()}
                      ></img>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="trailer" id={`popupVDO`}>
                <div>
                  {videoUrl ? (
                    <VideoPlayerByteArk
                      url={videoUrl}
                      day_number={focusDay}
                      video_number={selectedVDO && selectedVDO.order}
                      selectedVDO={selectedVDO}
                      lastWeekVDO_click={lastWeekVDO_click}
                      lastWeekVDOAll={lastWeekVDOAll}
                      lastWeekStart={lastWeekStart}
                      selectExerciseVideoLastWeek={selectExerciseVideoLastWeek}
                    />
                  ) : (
                    <>
                      <video
                        ref="videoPlayer"
                        src={videoUrl}
                        id="videoPlayer"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      ></video>
                      <img
                        alt=""
                        src="../assets/img/thumb/close.png"
                        className="close"
                        onClick={() => this.toggle()}
                      ></img>
                    </>
                  )}
                </div>
              </div>
            )}
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
                          รวมเวลาฝึกทั้งหมด {timesExercise} นาที
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="col-lg-12 col-md-4 col-12">
                        <div className="mt-1" style={{ float: "right" }}>
                          <span
                            className="mr-2"
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "grey",
                            }}
                          >
                            เล่นอัตโนมัติ
                          </span>
                          <label
                            className="switch"
                            onClick={() => this.autoPlayCheck()}
                          >
                            <input
                              type="checkbox"
                              className="danger"
                              id="autoPlayCheck"
                            ></input>
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <tbody>
                {selectExerciseVideoLastWeek &&
                  todayExercise.map((item, index) => {
                    const itemsArray = item.muscle.split(",");
                    const minuteLabel =
                      item.duration < 20
                        ? convertFormatTime(item.duration)
                        : convertSecondsToMinutes(item.duration);
                    return (
                      <div className="row" key={index}>
                        <div className="checkCompleteVideo mt-3 col-lg-2 col-md-1 col-2">
                          {index === 0 && (
                            <h6 className="firstVideoStartText">
                              เริ่มกันเลย!
                            </h6>
                          )}
                          {item.play_time &&
                          item.duration &&
                          item.play_time / item.duration >=
                            completeVideoPlayPercentage ? (
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
                          {index === todayExercise.length - 1 ? (
                            <div className="vl" style={{ height: "0%" }}></div>
                          ) : (
                            <div className="vl"></div>
                          )}
                          {index === todayExercise.length - 1 && (
                            <h6 className="lastVideoEndText">สำเร็จแล้ว!</h6>
                          )}
                        </div>
                        <div className="mt-3 mb-1 col-lg-8 col-md-11 col-10">
                          <div className="videoItem border shadow">
                            {this.state.autoPlayCheck && (
                              <img
                                className="play_button"
                                src="../assets/img/thumb/play_button2.png"
                                width="100px"
                                onClick={() => this.toggleListLastWeek(index)}
                              ></img>
                            )}
                            {!this.state.autoPlayCheck && (
                              <img
                                className="play_button"
                                src="../assets/img/thumb/play_button2.png"
                                width="100px"
                                onClick={() => this.toggle(item)}
                              ></img>
                            )}
                            <div className="videoThumb">
                              <div className="containerThumb">
                                {item.thumbnail ? (
                                  <img
                                    className="img-fluid"
                                    src={`${item.thumbnail}`}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className="img-fluid"
                                    src={`../assets/img/thumb/${item.category
                                      .toLowerCase()
                                      .split(" ")
                                      .join("")}_g3.jpg`}
                                    alt=""
                                  />
                                )}
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
                                    <b>{item.name}</b>
                                  </h4>
                                ) : (
                                  <h6 style={{ color: "#F45197" }}>
                                    <b>{item.name}</b>
                                  </h6>
                                )}
                                {this.props.member_info &&
                                  this.props.member_info.low_impact === "yes" &&
                                  item.tag &&
                                  item.tag.includes("low_impact") && (
                                    <p
                                      style={{
                                        color: "grey",
                                        marginBottom: "0px",
                                        marginTop: "-10px",
                                      }}
                                    >
                                      {" "}
                                      {"(Low impact)"}{" "}
                                    </p>
                                  )}
                              </div>
                              <div className="property-box">
                                {itemsArray &&
                                  itemsArray.map((muItem, j) => {
                                    if (muItem == "warm_up") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/Propertywarmup.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "cool_down") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/Propertycooldown.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "total_body") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/totalBody.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "core") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyCore.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "chest") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyChest.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "back") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyBack.png`}
                                        ></img>
                                      );
                                      //PropertyGlute
                                    }
                                    if (muItem == "glute") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyGlute.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "leg") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyLeg.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "shoulder") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/PropertyShoulder.png`}
                                        ></img>
                                      );
                                    }
                                    if (muItem == "cardio") {
                                      return (
                                        <img
                                          className="property-body_part ml-2"
                                          src={`../assets/img/body_part/cardio_preem.png`}
                                        ></img>
                                      );
                                    }
                                  })}
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
        </form>
      </div>
    );
  }

  renderVideoList() {
    const {
      focusDay,
      selectedVDO,
      selectVideoPlayer,
      lastWeekVDO_click,
      lastWeekVDOAll,
      lastWeekStart,
      selectExerciseVideoLastWeek,
      showBarveAndBurn,
      exerciseSnack,
      showchallenge,
      shownutrition,
    } = this.state;

    const { exerciseVideo } = this.props;
    const numbDayExercise = exerciseVideo.length;
    const videoUrl = selectedVDO && selectedVDO.url ? `${selectedVDO.url}` : "";

    const todayExercise = this.exerciseDaySelection(focusDay);
    let allMinute = [];
    let allSecond = [];
    if (this.props.exerciseVideo) {
      todayExercise.map((item) =>
        allMinute.push(Number(item.duration.toFixed(2).split(".")[0]))
      );
      todayExercise.map((item) =>
        allSecond.push(Number(item.duration.toFixed(2).split(".")[1]))
      );
    }
    let sumMinute = allMinute
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let sumSecond = allSecond
      .reduce((acc, curr) => (acc += curr), 0)
      .toFixed(0);
    let minute2 = Math.floor(sumSecond / 60);
    let totalMinute = Number(sumMinute) + Number(minute2);
    let totalSecond = sumSecond % 60;
    let timesExercise;
    if (totalMinute > 100) {
      // เช็คเพราะมีการปรับ database ให้เก็บVDOเป็นหน่วยวินาที
      totalMinute = Math.floor(sumMinute / 60);
      totalSecond = sumMinute % 60;
    }
    if (totalSecond < 10) {
      timesExercise = `${totalMinute}:0${totalSecond}`;
    } else {
      timesExercise = `${totalMinute}:${totalSecond}`;
    }

    return (
      <div className="card-body">
        <form>
          <div
            className="tab-content mt-3 mb-3"
            id="myTabContent"
            // style={{ borderBottom: "3px solid #4F4F4F", paddingBottom: "0px" }}
          >
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              {/* <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4 className="ml-4 mb-3" style={{ color: "#F45197" }}>
                  โปรแกรมปัจจุบัน{" "}
                  {this.props.user.fb_group !== 404 ? (
                    <span>(WEEK {this.props.week})</span>
                  ) : (
                    <span></span>
                  )}
                </h4>
              </div> */}

              <nav
                className="nav p-2 d-flex align-items-center"
                style={{ background: "#FFF8FB" }}
              >
                <div className="w-100 d-block d-md-flex align-items-center mt-3 flex-md-wrap">
                  {numbDayExercise && numbDayExercise >= 1 && (
                    <a
                      className="nav-link"
                      style={{
                        color: `${
                          !showBarveAndBurn && focusDay === 0
                            ? "#F45197"
                            : "grey"
                        }`,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onDayChange(0)}
                    >
                      <h5>
                        <b>DAY 1</b>
                      </h5>
                    </a>
                  )}
                  {numbDayExercise && numbDayExercise >= 2 && (
                    <a
                      className="nav-link"
                      style={{
                        color: `${
                          !showBarveAndBurn && focusDay === 1
                            ? "#F45197"
                            : "grey"
                        }`,
                        cursor: "pointer",
                      }}
                      onClick={() => this.onDayChange(1)}
                    >
                      <h5>
                        <b>DAY 2</b>
                      </h5>
                    </a>
                  )}
                  {this.props.member_info &&
                    this.props.member_info.exercise_day != 2 && (
                      <a
                        className="nav-link"
                        style={{
                          color: `${
                            !showBarveAndBurn && focusDay === 2
                              ? "#F45197"
                              : "grey"
                          }`,
                          cursor: "pointer",
                        }}
                        onClick={() => this.onDayChange(2)}
                      >
                        <h5>
                          <b>DAY 3</b>
                        </h5>
                      </a>
                    )}
                  {/* {numbDayExercise >= 3 && (
                  <a
                    className="nav-link"
                    style={{
                      color: `${!showBarveAndBurn && focusDay === 2 ? "#F45197" : "grey"
                        }`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.onDayChange(2)}
                  >
                    <h5>
                      <b>DAY 3</b>
                    </h5>
                  </a>
                )} */}

                  {/* {numbDayExercise >= 4 && (
                  <a
                    className="nav-link"
                    style={{
                      color: `${!showBarveAndBurn && focusDay === 3 ? "#F45197" : "grey"
                        }`,
                      cursor: "pointer",
                    }}
                    onClick={() => this.onDayChange(3)}
                  >
                    <h5>
                      <b>DAY 4</b>
                    </h5>
                  </a>
                )} */}
                  {/* {
                  <a
                    className="nav-link"
                    onClick={() => this.onExerciseSnackChange()}
                    style={{
                      color: `${showBarveAndBurn ? "#F45197" : "grey"}`,
                      cursor: "pointer",
                    }}
                  >
                    <h5>
                      <b> Random Exercise Snack</b>
                    </h5>
                  </a>
                } */}
                  {
                    <a
                      className="nav-link"
                      onClick={() => this.onChallengeChange()}
                      style={{
                        color: `${showchallenge ? "#F45197" : "grey"}`,
                        cursor: "pointer",
                      }}
                    >
                      <h5>
                        <b> CHALLENGE</b>
                      </h5>
                    </a>
                  }
                  {
                    <a
                      className="nav-link"
                      onClick={() => this.onNutritionChange()}
                      style={{
                        color: `${shownutrition ? "#F45197" : "grey"}`,
                        cursor: "pointer",
                      }}
                    >
                      <h5>
                        <b> NUTRITION</b>
                      </h5>
                    </a>
                  }

                  {this.props.week > 1 && (
                    <a
                      className="nav-link ml-auto"
                      style={{ cursor: "pointer", color: "#F45197" }}
                      onClick={() => this.videoWeekAll()} //(this.setState({ lastWeekVDO_click: "show" })
                    >
                      <u>ดูวีดีโอออกกำลังกายสัปดาห์ที่ผ่านมา</u>
                    </a>
                  )}
                </div>
              </nav>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              pppp
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              kkkkk
            </div>
          </div>

          {showchallenge ? <Challenges /> : null}
          {shownutrition ? <Nutrition /> : null}
          {!showBarveAndBurn ? (
            <div className="">
              {this.state.autoPlayCheck ? (
                <div className="trailer" id={`popupVDOList`}>
                  <div>
                    {
                      <VideoPlayerListByteArk
                        url={videoUrl}
                        day_number={focusDay}
                        video_number={selectedVDO && selectedVDO.order}
                        selectedVDO={selectedVDO}
                        lastWeekVDO_click={lastWeekVDO_click}
                        lastWeekVDOAll={lastWeekVDOAll}
                        lastWeekStart={lastWeekStart}
                        selectExerciseVideoLastWeek={
                          selectExerciseVideoLastWeek
                        }
                      />
                    }
                  </div>
                </div>
              ) : (
                <div className="trailer" id={`popupVDO`}>
                  <div>
                    {videoUrl ? (
                      <VideoPlayerByteArk
                        url={videoUrl}
                        day_number={focusDay}
                        video_number={selectedVDO && selectedVDO.order}
                        selectedVDO={selectedVDO}
                        lastWeekVDO_click={lastWeekVDO_click}
                        lastWeekVDOAll={lastWeekVDOAll}
                        lastWeekStart={lastWeekStart}
                        selectExerciseVideoLastWeek={
                          selectExerciseVideoLastWeek
                        }
                      />
                    ) : (
                      <>
                        <video
                          ref="videoPlayer"
                          src={videoUrl}
                          id="videoPlayer"
                          controls
                          controlsList="nodownload"
                          disablePictureInPicture
                        ></video>
                        <img
                          alt=""
                          src="../assets/img/thumb/close.png"
                          className="close"
                          onClick={() => this.toggle()}
                        ></img>
                      </>
                    )}
                  </div>
                </div>
              )}

              {showBarveAndBurn ? (
                <div>
                  <BraveAndBurn></BraveAndBurn>
                </div>
              ) : (
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
                              รวมเวลาฝึกทั้งหมด {timesExercise} นาที
                            </span>
                            {todayExercise &&
                              this.checkDayPlaytime(todayExercise) && (
                                <div
                                  className="mb-3"
                                  style={{
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "#F45197",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() => this.editVDO()}
                                  aria-hidden="true"
                                >
                                  <img
                                    className="mr-2"
                                    src={`../assets/img/edit.png`}
                                    width="30px"
                                    height="30px"
                                  />
                                  แก้ไขวีดีโอ
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="col-lg-12 col-md-4 col-12">
                            <div className="mt-1" style={{ float: "right" }}>
                              <span
                                className="mr-2"
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  color: "grey",
                                }}
                              >
                                เล่นอัตโนมัติ
                              </span>
                              <label
                                className="switch"
                                onClick={() => this.autoPlayCheck()}
                              >
                                <input
                                  type="checkbox"
                                  className="danger"
                                  id="autoPlayCheck"
                                ></input>
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <tbody>
                    {this.props.exerciseVideo &&
                      todayExercise.map((item, index) => {
                        const itemsArray = item.muscle.split(",");

                        const minuteLabel =
                          item.duration < 20
                            ? convertFormatTime(item.duration)
                            : convertSecondsToMinutes(item.duration);
                        return (
                          <div className="row" key={index}>
                            <div className="checkCompleteVideo mt-3 col-lg-2 col-md-1 col-2">
                              {index === 0 && (
                                <h6 className="firstVideoStartText">
                                  เริ่มกันเลย!
                                </h6>
                              )}
                              {item.play_time &&
                              item.duration &&
                              item.play_time / item.duration >=
                                completeVideoPlayPercentage ? (
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
                              {index === todayExercise.length - 1 ? (
                                <div
                                  className="vl"
                                  style={{ height: "0%" }}
                                ></div>
                              ) : (
                                <div className="vl"></div>
                              )}
                              {index === todayExercise.length - 1 && (
                                <h6 className="lastVideoEndText">
                                  สำเร็จแล้ว!
                                </h6>
                              )}
                            </div>
                            <div className="mt-3 mb-1 col-lg-8 col-md-11 col-10 mb-5">
                              <div className="videoItem border shadow">
                                {this.state.autoPlayCheck && (
                                  <img
                                    className="play_button"
                                    src="../assets/img/thumb/play_button2.png"
                                    width="100px"
                                    onClick={() => this.toggleList(index)}
                                  ></img>
                                )}
                                {!this.state.autoPlayCheck && (
                                  <img
                                    className="play_button"
                                    src="../assets/img/thumb/play_button2.png"
                                    width="100px"
                                    onClick={() => this.toggle(item)}
                                  ></img>
                                )}
                                <div className="videoThumb">
                                  <div className="containerThumb">
                                    {item.thumbnail ? (
                                      <img
                                        className="img-fluid"
                                        src={`${item.thumbnail}`}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="img-fluid"
                                        src={`../assets/img/thumb/${item.category
                                          .toLowerCase()
                                          .split(" ")
                                          .join("")}_g3.jpg`}
                                        alt=""
                                      />
                                    )}
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
                                        <b>{item.name}</b>
                                      </h4>
                                    ) : (
                                      <h6 style={{ color: "#F45197" }}>
                                        <b>{item.name}</b>
                                      </h6>
                                    )}
                                    {/*    {this.props.member_info &&
                                      this.props.member_info.low_impact ===
                                        "yes" &&
                                      item.tag &&
                                      item.tag.includes("low_impact") && (
                                        <p
                                          style={{
                                            color: "grey",
                                            marginBottom: "0px",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          {" "}
                                          {"(Low impact)"}{" "}
                                        </p>
                                      )} */}
                                  </div>
                                  <div className="property-box">
                                    {itemsArray &&
                                      itemsArray.map((muItem, j) => {
                                        if (muItem == "warm_up") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/Propertywarmup.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "cool_down") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/Propertycooldown.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "total_body") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/totalBody.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "core") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/PropertyCore.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "chest") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/PropertyChest.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "back") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/PropertyBack.png`}
                                            ></img>
                                          );
                                          //PropertyGlute
                                        }
                                        if (muItem == "glute") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/PropertyGlute.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "leg") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/PropertyLeg.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "shoulder") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/PropertyShoulder.png`}
                                            ></img>
                                          );
                                        }
                                        if (muItem == "cardio") {
                                          return (
                                            <img
                                              className="property-body_part ml-2"
                                              src={`../assets/img/body_part/cardio_preem.png`}
                                            ></img>
                                          );
                                        }
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          ) : null}
        </form>
      </div>
    );
  }

  renderPopupDailyWeighChallenge() {
    return (
      <div>
        <div
          className="overlayContainerPopupDailyWeighChallenge"
          id="overlayPopupDailyWeighChallenge"
          onClick={() => this.closePopupDailyWeighChallenge()}
        />
        <div
          className="popupDailyWeighChallenge"
          id="popupDailyWeighChallenge"
          style={{ borderRadius: "25px" }}
        >
          <br></br>
          <center>
            <h5 className="mt-1 mb-3" style={{ color: "#F45197" }}>
              <b>กรุณากรอกน้ำหนักปัจจุบันของคุณ</b>
            </h5>
          </center>
          <div className="input-group mb-4">
            <input
              type="number"
              className="form-control"
              style={{ textAlign: "right" }}
              id="weightInDailyWeighChallenge"
              value={this.state.weightInDailyWeighChallenge}
              onChange={(event) => this.handleChange(event)}
            />
            <span className="input-group-text" style={{ color: "#F45197" }}>
              KG
            </span>
          </div>
          {this.props.statusPostDailyWeighChallenge !== "loading" ? (
            <div className="row">
              <div className="col-1"></div>
              <button
                type="button"
                className="btn col-4"
                onClick={() => this.closePopupDailyWeighChallenge()}
                style={{
                  backgroundColor: "white",
                  color: "#F45197",
                  borderColor: "#F45197",
                }}
              >
                ปิด
              </button>
              <div className="col-2"></div>
              <button
                type="button"
                className="btn btn-danger col-4"
                onClick={() =>
                  this.submitDailyWeighChallenge(
                    this.state.weightInDailyWeighChallenge
                  )
                }
                style={{ backgroundColor: "#F45197" }}
              >
                ยืนยัน
              </button>
              <div className="col-1"></div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }

  closePopupDailyWeighChallenge() {
    document
      .getElementById("popupDailyWeighChallenge")
      .classList.toggle("active");
    document
      .getElementById("overlayPopupDailyWeighChallenge")
      .classList.toggle("active");
  }

  submitDailyWeighChallenge(weight) {
    const { user } = this.props;
    if (weight > 0 && weight < 300) {
      this.props.postDailyWeighChallenge(user.user_id, weight);
    }
  }

  render() {
    const {
      editVDO_click,
      lastWeekVDO_click,
      step4WeeksPrompt,
      lastWeekVDOAll,
      selectedVDO,
    } = this.state;
    const {
      user,
      statusVideoList,
      dailyWeighChallenge,
      statusCheck4WeeksPrompt,
      statusGetCheck4WeeksPrompt,
      statusCheckRenewPrompt,
      statusGetCheckRenewPrompt,
    } = this.props;
    return (
      <div>
        {dailyWeighChallenge &&
          this.props.user &&
          this.renderPopupDailyWeighChallenge()}
        <div
          className="main main-raised"
          style={{
            backgroundColor:
              user && user.other_attributes && statusVideoList !== "no_video"
                ? "white"
                : "#F0EEF3",
          }}
        >
          <div className="container">
            <div className="">
              {/* <Modal show={this.state.show} handleClose={this.hideModal} handleForm={this.showModalForm} />
              <Modal_Form modal_show={this.state.modal_show} handleClose={this.hideModalForm} handleSuccess={this.showSuccessModal} />
              <Success_Modal success_modal_show={this.state.success_modal_show} handleClose={this.hideSuccessModal} /> */}

              {this.props.user &&
              this.props.user.other_attributes &&
              this.props.statusVideoList !== "no_video"
                ? editVDO_click === "show"
                  ? this.renderEditVDO()
                  : lastWeekVDO_click === "show"
                  ? lastWeekVDOAll === true
                    ? this.renderVideoListLastWeekAll()
                    : this.renderVideoListLastWeek()
                  : this.renderVideoList()
                : statusGetCheck4WeeksPrompt !== "loading" &&
                  statusGetCheckRenewPrompt !== "loading" &&
                  ((statusCheck4WeeksPrompt || statusCheckRenewPrompt) &&
                  step4WeeksPrompt < 4 //ปัจจุบัน (4weeks, renew) Prompt ใช้ render เดียวกัน
                    ? this.render4WeeksPrompt()
                    : this.renderOtherAttribute())}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  authUser,
  exerciseVideos,
  challenges,
  get,
  update,
}) => {
  const { user } = authUser;
  const {
    statusDisplayName,
    statusGetMemberInfo,
    member_info,
    statusCheck4WeeksPrompt,
    statusGetCheck4WeeksPrompt,
    statusCheckRenewPrompt,
    statusGetCheckRenewPrompt,
  } = get;
  const { statusUpdateDisplayName, statusUpdateProgramPromptLog } = update;
  const { dailyWeighChallenge, statusPostDailyWeighChallenge } = challenges;
  const {
    exerciseVideo,
    exerciseVideoLastWeek,
    isFirstWeek,
    status,
    video,
    videos,
    statusVideoList,
    statusUpdateBodyInfo,
    week,
    lastweek,
    statusGetAllExAct,
    all_exercise_activity,
    hidePopUpVideoPlayer,
    hidePopUpVideoPlayerList,
    endedVideoPlayerList,
    statusCreateBraveAndBurn,
    statusGetBraveAndBurn,
    brave_and_burn_challenge,
    statsCreateExerciseSnack,
    videoExerciseSnack,
    statsGetExerciseSnack,
  } = exerciseVideos;
  return {
    user,
    exerciseVideo,
    exerciseVideoLastWeek,
    isFirstWeek,
    status,
    video,
    videos,
    statusVideoList,
    statusUpdateBodyInfo,
    week,
    lastweek,
    dailyWeighChallenge,
    statusPostDailyWeighChallenge,
    statusDisplayName,
    statusGetMemberInfo,
    statusUpdateDisplayName,
    member_info,
    statusCheck4WeeksPrompt,
    statusGetCheck4WeeksPrompt,
    statusUpdateProgramPromptLog,
    statusCheckRenewPrompt,
    statusGetCheckRenewPrompt,
    statusGetAllExAct,
    all_exercise_activity,
    hidePopUpVideoPlayer,
    hidePopUpVideoPlayerList,
    endedVideoPlayerList,
    statusCreateBraveAndBurn,
    statusGetBraveAndBurn,
    brave_and_burn_challenge,
    statsCreateExerciseSnack,
    videoExerciseSnack,
    statsGetExerciseSnack,
  };
};

const mapActionsToProps = {
  updateProfile,
  createCustomWeekForUser,
  videoListForUser,
  logoutUser,
  updatePlaytime,
  updatePlaylist,
  randomVideo,
  selectChangeVideo,
  resetStatus,
  clearVideoList,
  videoListForUserLastWeek,
  updateBodyInfo,
  updatePlaytimeLastWeek,
  getDailyWeighChallenge,
  postDailyWeighChallenge,
  checkUpdateMaxFriends,
  getCheckDisplayName,
  getMemberInfo,
  updateDisplayName,
  updateProgramPromptLog,
  check4WeeksPrompt,
  checkRenewPrompt,
  checkProgramLevel,
  getAllExerciseActivity,
  updatePlaytimeLastWeekSelected,
  hidePopupVideoPlayer,
  setEndedVideoPlayerList,
  setHidePopupVideoPlayerList,
  createBraveAndBurnChallenge,
  getBraveAndBurnChallenge,
  createExerciseSnack,
  getExerciseSnack,
  getVideoSnack,
  clearExerciseSnack,
};

export default connect(mapStateToProps, mapActionsToProps)(VideoList);
