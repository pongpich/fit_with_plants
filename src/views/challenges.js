import React, { Component } from "react";
import { connect } from "react-redux";
import {
  cancelTeamInvite,
  cancelFriendRequest,
  getFriendRequestSent,
  getTeamInviteSent,
  getRank,
  getLogWeight,
  getIsReducedWeight,
  getLogWeightTeam,
  getDailyTeamWeightBonus,
  getNumberOfTeamNotFull,
  assignGroupToMember,
  clearChallenges,
  createChallengeGroup,
  leaveTeam,
  getMembersAndRank,
  getGroupName,
  getScoreOfTeam,
  getLeaderboard,
  getChallengePeriod,
  getFriendList,
  getMaxFriends,
  sendFriendRequest,
  getFriendRequest,
  rejectFriend,
  acceptFriend,
  deleteFriend,
  getFriendsRank,
  sendTeamInvite,
  getTeamInvite,
  acceptTeamInvite,
  rejectTeamInvite,
  getAchievementLog,
  updateAchievementLog,
  checkAllMissionComplete,
  getIsReducedWaist,
} from "../redux/challenges";
import { getExerciseSnack } from "../redux/exerciseVideos";
import { getGroupID, checkUpdateMaxFriends } from "../redux/auth";
import { getAllMemberStayFit } from "../redux/get";
import "./challenges.scss";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
  LineShareButton,
  WhatsappShareButton,
} from "react-share";
import moment from "moment";
import icon_web from "../assets/img/icon-web.png";
import facebook from "../assets/img/icon-facebook.png";
import twitter from "../assets/img/icon-Twitter.png";
import message from "../assets/img/icon-message-fa.png";
import line from "../assets/img/icon-line.png";
import tiktok from "../assets/img/icon-tiktok.png";
import whatsApp from "../assets/img/icon-WhatsApp.png";
import instagram from "../assets/img/icon-instagram.png";
import frame40 from "../assets/img/frame40.png";
import frame41 from "../assets/img/frame41.png";
import frame42 from "../assets/img/frame42.png";
import frame43 from "../assets/img/frame43.png";
import frame44 from "../assets/img/frame44.png";
import frame45 from "../assets/img/frame45.png";
import frame46 from "../assets/img/frame46.png";
import group25 from "../assets/img/group25.png";
import frame47 from "../assets/img/frame47.png";
import copyLink from "../assets/img/copy-link.png";

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreInWeek: 0,
      teamName: "",
      selectedNavLink: "mission",
      selectedScoreBoard: "team",
      selectedAddFriend: false,
      emailAddFriend: "",
      emailDeleteFriend: "",
      emailTeamInvite: "",
      selectedTeamInvite: false,
      numbOfFriends: 0,
      myTeamRank: 0,
      myIndividualRank: 0,
      emailOrDisplayName: "",
      statusRandomTeam: "default",
      selectedCreateTeam: false,
      videoSnack: null,
      challengePeriod2: "false",
    };
  }

  async componentDidMount() {
    console.log("his", this.props.user.user_id, this.props.week);
    if (this.props.user) {
      this.props.getGroupID(this.props.user.user_id);
      this.props.checkUpdateMaxFriends(this.props.user.user_id);
      this.props.getChallengePeriod();

      this.props.getTeamInvite(this.props.user.user_id);

      this.props.getRank(this.props.user.user_id, this.props.user.start_date);
      this.props.getLogWeight(this.props.user.user_id);
      this.props.getIsReducedWeight(this.props.user.user_id);
      this.props.getIsReducedWaist(this.props.user.user_id);

      this.props.getLeaderboard();
      this.props.getFriendList(this.props.user.user_id);
      this.props.getFriendRequest(this.props.user.user_id);
      this.props.getMaxFriends(this.props.user.user_id);
      this.props.getAchievementLog(this.props.user.user_id);
      this.props.getFriendsRank(this.props.user.user_id);

      if (this.props.user && this.props.user.group_id) {
        this.props.getLogWeightTeam(this.props.user.group_id);

        this.props.getDailyTeamWeightBonus(this.props.user.user_id);
        this.props.getMembersAndRank(
          this.props.user.group_id,
          this.props.user.start_date
        );
        this.props.getGroupName(this.props.user.group_id);
        this.props.getScoreOfTeam(this.props.user.group_id);
      } else {
        this.props.clearChallenges();
      }
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      user,
      teamRank,
      individualRank,
      statusGetNumberOfTeamNotFull,
      numberOfTeamNotFull,
      statusLeaveTeam,
      statusSendFriendRequest,
      friend_request,
      statusGetFriendRequest,
      statusAcceptFriend,
      statusRejectFriend,
      statusDeleteFriend,
      statusSendTeamInvite,
      statusGetTeamInvite,
      team_invite,
      statusRejectTeamInvite,
      statusAcceptTeamInvite,
      statusGetFriendList,
      friend_list,
      statusCheckAllMissionComplete,
      achievementLog,
      statusUpdateAchievement,
      statusGetLeaderBoard,
      statusCancelFriendRequest,
      statusCancelTeamInvite,
      statusCreateTeam,
    } = this.props;

    const achievementFinisher =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Finisher").length >
        0
        ? true
        : false;
    const achievementAce =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Ace").length > 0
        ? true
        : false;
    const achievement1st =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "1st").length > 0
        ? true
        : false;
    const achievement2nd =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "2nd").length > 0
        ? true
        : false;
    const achievementTop10 =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Top 10").length > 0
        ? true
        : false;
    const achievementSocialStar =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Social star")
          .length > 0
        ? true
        : false;
    const achievementSocialStarPlus =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Social star+")
          .length > 0
        ? true
        : false;

    if (
      prevProps.statusCancelFriendRequest !== statusCancelFriendRequest &&
      statusCancelFriendRequest === "success"
    ) {
      this.props.getFriendRequestSent(
        this.props.user && this.props.user.user_id
      );
    }
    if (
      prevProps.statusCancelTeamInvite !== statusCancelTeamInvite &&
      statusCancelTeamInvite === "success"
    ) {
      this.props.getTeamInviteSent(this.props.user && this.props.user.user_id);
    }
    if (
      prevProps.statsGetExerciseSnack !== this.props.statsGetExerciseSnack &&
      this.props.statsGetExerciseSnack === "success"
    ) {
      //videoSnack
      this.setState({
        videoSnack:
          this.props.videoExerciseSnack &&
            this.props.videoExerciseSnack.length > 0
            ? JSON.parse(this.props.videoExerciseSnack[0].video)
            : null,
      });
    }

    if (
      prevProps.statusCreateTeam !== statusCreateTeam &&
      statusCreateTeam === "success"
    ) {
      this.props.getGroupID(user.user_id);
      this.setState({ selectedCreateTeam: false }); //กำหนด selectedCreateTeam เป็น false เพื่อซ่อนหน้าการยืนยันการตั้งชื่อทีม
    }

    if (
      prevProps.statusGetLeaderBoard !== statusGetLeaderBoard &&
      statusGetLeaderBoard === "success"
    ) {
      const myTeamRankIndex = teamRank.findIndex(
        (item) => item.group_id === parseInt(this.props.user.group_id)
      );
      const myIndividualRankIndex = individualRank.findIndex(
        (item) => item.user_id === this.props.user.user_id
      );
      this.setState({
        myTeamRank: myTeamRankIndex + 1,
        myIndividualRank: myIndividualRankIndex + 1,
      });

      if (myIndividualRankIndex + 1 === 1 && !achievementAce) {
        document.getElementById("modalAchievement1Btn") &&
          document.getElementById("modalAchievement1Btn").click();
        this.props.updateAchievementLog(user.user_id, "Ace");
      }
      if (myTeamRankIndex + 1 === 1 && !achievement1st) {
        document.getElementById("modalAchievement3Btn") &&
          document.getElementById("modalAchievement3Btn").click();
        this.props.updateAchievementLog(user.user_id, "1st");
      }
      if (myTeamRankIndex + 1 === 2 && !achievement2nd) {
        document.getElementById("modalAchievement4Btn") &&
          document.getElementById("modalAchievement4Btn").click();
        this.props.updateAchievementLog(user.user_id, "2nd");
      }
      if (
        myTeamRankIndex + 1 >= 3 &&
        myTeamRankIndex + 1 <= 10 &&
        !achievementTop10
      ) {
        document.getElementById("modalAchievement5Btn") &&
          document.getElementById("modalAchievement5Btn").click();
        this.props.updateAchievementLog(user.user_id, "Top 10");
      }
    }

    if (
      prevProps.statusUpdateAchievement !== statusUpdateAchievement &&
      statusUpdateAchievement === "success"
    ) {
      this.props.getAchievementLog(user.user_id);
    }

    if (
      prevProps.statusCheckAllMissionComplete !==
      statusCheckAllMissionComplete &&
      statusCheckAllMissionComplete === "success"
    ) {
      //สั่งให้โชว์ popup
      document.getElementById("modalAchievement8Btn") &&
        document.getElementById("modalAchievement8Btn").click();
      this.props.getAchievementLog(user.user_id);
    }

    if (
      prevProps.statusGetFriendList !== statusGetFriendList &&
      statusGetFriendList === "success"
    ) {
      console.log("friend_list.length :", friend_list.length);
      this.setState({
        numbOfFriends: friend_list.length,
      });

      if (friend_list.length >= 10 && !achievementSocialStar) {
        //มีเพื่อนในรายชื่อ 10 คนแล้ว
        document.getElementById("modalAchievement6Btn") &&
          document.getElementById("modalAchievement6Btn").click();
        this.props.updateAchievementLog(user.user_id, "Social star");
      }
      if (friend_list.length >= 15 && !achievementSocialStarPlus) {
        //มีเพื่อนในรายชื่อ 15 คนแล้ว
        document.getElementById("modalAchievement7Btn") &&
          document.getElementById("modalAchievement7Btn").click();
        this.props.updateAchievementLog(user.user_id, "Social star+");
      }
    }

    if (
      prevProps.statusRejectTeamInvite !== statusRejectTeamInvite &&
      statusRejectTeamInvite === "success"
    ) {
      this.openPopupTeamInvite(); //สั่งให้ซ่อน popup TeamInvite
      this.props.getTeamInvite(this.props.user.user_id);
    }

    if (
      prevProps.statusAcceptTeamInvite !== statusAcceptTeamInvite &&
      statusAcceptTeamInvite === "success"
    ) {
      this.openPopupTeamInvite(); //สั่งให้ซ่อน popup TeamInvite
      this.props.getGroupID(user.user_id);
      this.props.getTeamInvite(this.props.user.user_id);
    }

    if (
      prevProps.statusGetTeamInvite !== statusGetTeamInvite &&
      statusGetTeamInvite === "success"
    ) {
      if (team_invite && team_invite[0]) {
        //team_invite[0] คือ คำชวนเข้าทีมที่เก่าที่สุดที่ยังไม่ตอบรับ
        this.openPopupTeamInvite(); //สั่งให้โชว์ popup TeamInvite
      }
    }

    if (
      prevProps.statusSendTeamInvite !== statusSendTeamInvite &&
      statusSendTeamInvite === "success"
    ) {
      this.setState({
        selectedTeamInvite: false,
      });
      this.props.getTeamInviteSent(this.props.user && this.props.user.user_id);
    }

    if (
      prevProps.statusDeleteFriend !== statusDeleteFriend &&
      statusDeleteFriend === "success"
    ) {
      this.closePopupDeleteFriend(); //สั่งให้ซ่อน popup DeleteFriend
      this.props.getFriendList(this.props.user.user_id);
    }

    if (
      prevProps.statusRejectFriend !== statusRejectFriend &&
      statusRejectFriend === "success"
    ) {
      this.closePopupFriendRequest(); //สั่งให้ซ่อน popup FriendRequest
      this.props.getFriendRequest(this.props.user.user_id);
    }

    if (
      prevProps.statusAcceptFriend !== statusAcceptFriend &&
      (statusAcceptFriend === "success" || statusAcceptFriend === "fail")
    ) {
      this.closePopupFriendRequest(); //สั่งให้ซ่อน popup FriendRequest
      this.props.getFriendList(this.props.user.user_id);
      this.props.getFriendRequest(this.props.user.user_id);
    }

    if (
      prevProps.statusGetFriendRequest !== statusGetFriendRequest &&
      statusGetFriendRequest === "success"
    ) {
      if (friend_request && friend_request[0]) {
        //friend_request[0] คือ คำขอเป็นเพื่อนที่เก่าที่สุดที่ยังไม่ตอบรับ
        this.openPopupFriendRequest(); //สั่งให้โชว์ popup FriendRequest
      }
    }

    if (
      prevProps.statusSendFriendRequest !== statusSendFriendRequest &&
      statusSendFriendRequest === "success"
    ) {
      this.setState({ selectedAddFriend: false });
      this.props.getFriendRequestSent(
        this.props.user && this.props.user.user_id
      );
    }

    if (
      prevProps.statusGetNumberOfTeamNotFull !== statusGetNumberOfTeamNotFull &&
      statusGetNumberOfTeamNotFull === "success"
    ) {
      if (numberOfTeamNotFull > 0) {
        this.props.assignGroupToMember(
          this.props.user.user_id,
          this.props.user.start_date,
          this.props.user.fb_group
        );
      } else {
        this.setState({
          statusRandomTeam: "fail",
        });
      }
    }
    //หลังจาก assignGroupToMember หรือ createChallengeGroup  จะมีการ getNumberOfTeamNotFull ให้ทำการ getGroupID
    //หรือ หลังจาก leaveTeam ให้ getGroupID (group_id ที่ได้ จะเป็น null)
    if (
      (prevProps.statusGetNumberOfTeamNotFull !==
        statusGetNumberOfTeamNotFull &&
        statusGetNumberOfTeamNotFull === "default") ||
      (prevProps.statusLeaveTeam === "default" && statusLeaveTeam === "success")
    ) {
      this.props.getGroupID(this.props.user.user_id);
    }
    //หลังจาก getGroupID จะมีการแก้ไขค่า user.group_id ที่ Reducer authUser
    if (user && user.group_id !== prevProps.user.group_id) {
      this.props.getRank(this.props.user.user_id, this.props.user.start_date);
      this.props.getLogWeight(this.props.user.user_id);
      this.props.getLogWeightTeam(this.props.user.group_id);
      this.props.getIsReducedWeight(this.props.user.user_id);
      this.props.getIsReducedWaist(this.props.user.user_id);
      this.props.getDailyTeamWeightBonus(this.props.user.user_id);
      this.props.getMembersAndRank(
        this.props.user.group_id,
        this.props.user.start_date
      );
      this.props.getGroupName(this.props.user.group_id);
      this.props.getScoreOfTeam(this.props.user.group_id);
      this.props.getLeaderboard();
    }
  }

  isExerciseCompleted(activites) {
    //let isCompleted = true;
    let count = 3;

    //if (activites.length <= 0) isCompleted = false;

    for (let dayIndex = 0; dayIndex < activites.length; dayIndex++) {
      const dailyExercises = activites[dayIndex];
      for (let exIndex = 0; exIndex < dailyExercises.length; exIndex++) {
        const exercise = dailyExercises[exIndex];
        if (
          parseFloat(exercise.play_time) / parseFloat(exercise.duration) <
          0.9
        ) {
          //isCompleted = false;
          count = count - 1;
          break;
        }
      }
    }
    return count;
  }

  renderMission() {
    const rank =
      this.props.rank &&
      this.props.rank.charAt(0).toUpperCase() +
      this.props.rank.substr(1).toLowerCase(); //ตัวแรกพิมพ์ใหญ่ ตัวที่เหลือพิมพ์เล็ก
    const {
      logWeightCount,
      isReducedWeight,
      logWeightTeamCount,
      numberOfMembers,
      dailyTeamWeightBonusCount,
      challengePeriod,
      exerciseVideo,
      waistInWeekResult,
    } = this.props;
    const isExerciseCompleted = this.isExerciseCompleted(exerciseVideo);
    // console.log(challengePeriod, 'xxxxxxxxxx');
    var { scoreInWeek } = this.state;
    if (logWeightCount >= 2) {
      scoreInWeek += 10;
    } //ชั่งน้ำหนักครบ 2 ครั้ง
    if (isReducedWeight) {
      scoreInWeek += 10;
    } //น้ำหนักลดลงจากสัปดาห์ก่อน
    if (isExerciseCompleted === exerciseVideo.length) {
      scoreInWeek += 10;
    } //ออกกำลังกายครบทั้งสัปดาห์
    if (logWeightTeamCount >= numberOfMembers * 2 && numberOfMembers > 0) {
      scoreInWeek += 10;
    } //ทีมชั่งน้ำหนักครบ คนละ2ครั้ง
    if (dailyTeamWeightBonusCount > 0) {
      scoreInWeek += dailyTeamWeightBonusCount * 10;
    } //ในแต่ละวันมีสมาชิกชั่งน้ำหนัก
    if (scoreInWeek > 41) {
      scoreInWeek = 41;
    } //เพื่อไม่ให้เกินหลอด

    return (
      <div>
        <div className="row" style={{ gap: "20px" }}>
          {this.renderPopupRulesAndPrizes()}
          {this.renderPopupScoreDetail()}

          {/* เปิดปิด event ตรงนี้อย่าลืม เอา challengePeriod2 ออกเปลี่ยนเป็น challengePeriod ธรรมดา */}
          {!this.state.challengePeriod ? (
            <>
              <div
                className="card shadow col-lg-4 col-md-12"
                style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <h5
                        className="card-title mb-4"
                        style={{ color: "#F45197" }}
                      >
                        <b>รายการชาเลนจ์แบบทีม</b>
                      </h5>
                      <p className="card-text">
                        ทีมชั่งน้ำหนักครบ {numberOfMembers * 2} ครั้ง{" "}
                        <span style={{ float: "right", color: "#F45197" }}>
                          {logWeightTeamCount}/{numberOfMembers * 2}
                        </span>
                      </p>
                      <p className="card-text">
                        ทีมชั่งน้ำหนักครบ 7 วัน
                        <span style={{ float: "right", color: "#F45197" }}>
                          {dailyTeamWeightBonusCount}/7
                        </span>
                      </p>
                    </div>
                    {/* <div className="col-lg-6 mb-3" style={{ float: "right" }}>
                    <h5
                      className="card-title mb-4"
                      style={{ color: "#F45197" }}
                    >
                      <b>รายการชาเลนจ์แบบเดี่ยว</b>
                    </h5>
                    <p className="card-text">
                      ชั่งน้ำหนักครบ 2 ครั้ง{" "}
                      <span style={{ float: "right", color: "#F45197" }}>
                        {logWeightCount}/2
                      </span>
                    </p>
                    <p className="card-text">
                      น้ำหนักลดลงจากสัปดาห์ก่อน
                      <span style={{ float: "right", color: "#F45197" }}>
                        {isReducedWeight ? 1 : 0}/1
                      </span>
                    </p>
                    <p className="card-text">
                      รอบเอวลดลงจากสัปดาห์ก่อน
                      <span style={{ float: "right", color: "#F45197" }}>
                        {waistInWeekResult}/1
                      </span>
                    </p>
                    <p className="card-text">
                      ออกกำลังกายครบทุกวันในสัปดาห์
                      <span style={{ float: "right", color: "#F45197" }}>
                        {this.props.statusVideoList !== "no_video"
                          ? isExerciseCompleted
                          : 0}
                        /{exerciseVideo.length}
                      </span>
                    </p>
                    <p className="card-text">
                      ทำ Random Exercise Snacks สำเร็จ
                      <span style={{ float: "right", color: "#F45197" }}>
                        {count ? count : 0}/4
                      </span>
                    </p>
                  </div> */}
                  </div>
                </div>
              </div>

              <div
                className="card shadow col-lg-4 col-md-12"
                style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-4" style={{ color: "#F45197" }}>
                    <b>รายการชาเลนจ์แบบเดี่ยว</b>
                  </h5>
                  <p className="card-text">
                    ชั่งน้ำหนักครบ 2 ครั้ง{" "}
                    <span style={{ float: "right", color: "#F45197" }}>
                      {logWeightCount}/2
                    </span>
                  </p>
                  <p className="card-text">
                    น้ำหนักลดลงจากสัปดาห์ก่อน
                    <span style={{ float: "right", color: "#F45197" }}>
                      {isReducedWeight ? 1 : 0}/1
                    </span>
                  </p>
                  <p className="card-text">
                    รอบเอวลดลงจากสัปดาห์ก่อน
                    <span style={{ float: "right", color: "#F45197" }}>
                      {waistInWeekResult}/1
                    </span>
                  </p>
                  <p className="card-text">
                    ออกกำลังกายครบทุกวันในสัปดาห์
                    <span style={{ float: "right", color: "#F45197" }}>
                      {this.props.statusVideoList !== "no_video"
                        ? isExerciseCompleted
                        : 0}
                      /{exerciseVideo.length}
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div
              className="card-body shadow col-lg-7 col-12 mr-lg-5 mr-0"
              style={{
                textAlign: "center",
                borderRadius: "25px",
                border: "1px solid #EF60A3",
              }}
            >
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4 mt-4">
                <img src={`../assets/img/challenges/icon_not_period.png`} />
              </div>
              <p style={{ fontWeight: "bold" }}>
                ไม่มีภารกิจ เนื่องจากไม่ได้อยู่ในระยะเวลาของชาเลนจ์
              </p>
            </div>
          )}
          <div
            className="card shadow col-lg-3 col-md-12"
            style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
          >
            <div className="card-body">
              <center>
                <img
                  src={
                    rank
                      ? `../assets/img/rank/${rank.toLowerCase()}.png`
                      : `../assets/img/rank/newbie.png`
                  }
                  // src={rank && `../assets/img/rank/${rank.toLowerCase()}.png`}
                  className="rounded-circle"
                  alt="Cinque Terre"
                  width="55%"
                  height="45%"
                />
                <h3 className="card-title" style={{ color: "#F45197" }}>
                  <b>{rank}</b>
                </h3>
                <div
                  class="progress"
                  style={{ width: "70%", borderRadius: "25px" }}
                >
                  <div
                    class="progress-bar"
                    style={{
                      width: `${(scoreInWeek / 41) * 100}%`,
                      backgroundColor: "#F45197",
                    }}
                  ></div>
                </div>
                <h5
                  className="card-text mt-3 mb-3"
                  style={{ color: "#F45197" }}
                >
                  {scoreInWeek}/41 คะแนน
                </h5>
              </center>
            </div>
          </div>
        </div>

        {!this.state.challengePeriod && (
          <div
            className="d-flex flex-lg-row flex-column mt-5"
            style={{ gap: "20px" }}
          >
            <div>
              <h5
                className="card-title"
                style={{
                  cursor: "pointer",
                  color: "#F45197",
                  textDecoration: "underline",
                }}
                onClick={() => this.openPopupScoreDetail()}
              >
                รายละเอียดคะแนน
              </h5>
            </div>
            <div>
              <h5
                className="card-title"
                style={{
                  cursor: "pointer",
                  color: "#F45197",
                  textDecoration: "underline",
                }}
                onClick={() => this.openPopupRulesAndPrizes()}
              >
                กฎกติกาและของรางวัล
              </h5>
            </div>
            <div>
              <p
                className="card-text"
                style={{ fontSize: "15px", color: "red" }}
              >
                *รายการจะถูก Reset และสรุปคะแนนทุกวันอาทิตย์ เพื่อคำนวณ Rank
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  renderPopupTeamInvite() {
    return (
      <div>
        <div
          className="overlayContainerPopupTeamInvite"
          id="overlayPopupTeamInvite"
          onClick={() => this.closePopupTeamInvite()}
        />
        <div className="popupTeamInvite" id="popupTeamInvite">
          <div
            className="close-btn"
            onClick={() => this.closePopupTeamInvite()}
          >
            &times;
          </div>
          <br></br>
          <h5 style={{ color: "#F45197", textAlign: "center" }}>
            <b>คำชวนเข้าร่วมทีมชาเลนจ์</b>
          </h5>
          <br></br>
          <h6>
            <b>
              {this.props.team_invite &&
                this.props.team_invite[0] &&
                this.props.team_invite[0].email}
            </b>{" "}
            ต้องการชวนคุณเข้าร่วมทีม
          </h6>
          <br></br>
          {this.props.statusAcceptFriend !== "loading" &&
            this.props.statusRejectFriend !== "loading" && (
              <div className="row mt-3">
                <div className="col-1"></div>
                <button
                  type="button"
                  className="btn btn-secondary col-4"
                  style={{
                    backgroundColor: "white",
                    color: "#F45197",
                    borderColor: "#F45197",
                  }}
                  onClick={() =>
                    this.props.rejectTeamInvite(
                      this.props.team_invite &&
                      this.props.team_invite[0] &&
                      this.props.team_invite[0].log_id
                    )
                  }
                >
                  ปฎิเสธ
                </button>
                <div className="col-2"></div>
                <button
                  type="button"
                  className="btn btn-secondary col-4"
                  style={{ backgroundColor: "#F45197", borderColor: "#F45197" }}
                  onClick={() =>
                    this.props.acceptTeamInvite(
                      this.props.user && this.props.user.user_id,
                      this.props.team_invite &&
                      this.props.team_invite[0] &&
                      this.props.team_invite[0].group_id,
                      this.props.team_invite &&
                      this.props.team_invite[0] &&
                      this.props.team_invite[0].log_id
                    )
                  }
                >
                  เข้าร่วมทีม
                </button>
                <div className="col-1"></div>
              </div>
            )}
        </div>
      </div>
    );
  }

  openPopupTeamInvite() {
    document.getElementById("popupTeamInvite").classList.toggle("active");
    document
      .getElementById("overlayPopupTeamInvite")
      .classList.toggle("active");
  }

  closePopupTeamInvite() {
    document.getElementById("popupTeamInvite").classList.toggle("active");
    document
      .getElementById("overlayPopupTeamInvite")
      .classList.toggle("active");
  }

  renderTeamList() {
    const {
      numberOfMembers,
      membersOfTeam,
      group_name,
      totalScoreOfTeam,
      user,
      statusSendTeamInvite,
      statusGetNumberOfTeamNotFull,
      challengePeriod,
    } = this.props;
    const {
      selectedTeamInvite,
      emailTeamInvite,
      statusRandomTeam,
      selectedCreateTeam,
    } = this.state;
    return (
      <div className="row">
        {this.renderPopupLeaveTeam()}
        {selectedTeamInvite ? (
          <div
            className="card shadow col-lg-7 col-md-12"
            style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
          >
            <div className="card-body">
              <div className="row mt-4 justify-content-center">
                <div className="col-lg-12 ">
                  <h5 className="" style={{ textAlign: "center" }}>
                    {" "}
                    <img src={`../assets/img/challenges/vectorinvite.png`} />
                    &nbsp; ชวนเข้าทีม
                  </h5>
                </div>
                <div className="col-lg-6">
                  <input
                    type=""
                    className="form-control"
                    placeholder="อีเมล"
                    id="emailTeamInvite"
                    value={this.state.emailTeamInvite}
                    onChange={(event) => this.handleChange(event)}
                  />
                  {statusSendTeamInvite !== "loading" && (
                    <button
                      type="button"
                      class="btn btn-danger mt-4 mb-4 col-12"
                      style={{ backgroundColor: "#F45197" }}
                      onClick={() =>
                        this.props.sendTeamInvite(
                          user && user.user_id,
                          emailTeamInvite
                        )
                      }
                    >
                      ส่งคำเชิญ
                    </button>
                  )}
                </div>
              </div>
              <br></br>
            </div>
          </div>
        ) : (
          <div
            className="card shadow col-lg-7 col-md-12"
            style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
          >
            {membersOfTeam.length > 0 ? ( //membersOfTeam.length > 0 คือ ผู้ใช้มีทีมแล้ว
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="card-title">
                      <b style={{ color: "#F45197" }}>{group_name}</b>{" "}
                      <span style={{ float: "right" }}>
                        สมาชิก {numberOfMembers}/10คน
                      </span>
                    </h5>
                  </div>
                  <div className="col-lg-10">
                    {membersOfTeam &&
                      membersOfTeam.map((item, index) => (
                        <p className="card-text">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                              {index + 1}.{" "}
                              {item.display_name
                                ? item.display_name
                                : item.facebook
                                  ? item.facebook
                                  : `${item.first_name} ${item.last_name}`}
                            </div>
                            <div className="col-lg-3 col-md-3 col-6">
                              <span style={{ color: "grey" }}>
                                {item.total_score} คะแนน
                              </span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-6">
                              <span
                                style={{ float: "right", color: "#F45197" }}
                              >
                                {item.end_rank
                                  ? item.end_rank.charAt(0).toUpperCase() +
                                  item.end_rank.substr(1).toLowerCase()
                                  : item.start_rank.charAt(0).toUpperCase() +
                                  item.start_rank.substr(1).toLowerCase()}
                              </span>
                            </div>
                          </div>
                        </p>
                      ))}
                  </div>
                </div>
                <br></br>
                <hr className="w-100"></hr>
                <div className="row justify-content-between">
                  <h5
                    className="underline-on-hover"
                    style={{ cursor: "pointer", color: "#F45197" }}
                    onClick={() => this.openPopupLeaveTeam()}
                  >
                    ออกจากทีม
                  </h5>
                  {membersOfTeam && membersOfTeam.length < 10 && (
                    <h5
                      className="underline-on-hover"
                      style={{ cursor: "pointer", color: "#F45197" }}
                      onClick={() =>
                        this.setState({ selectedTeamInvite: true })
                      }
                    >
                      + ชวนเข้าทีม
                    </h5>
                  )}
                </div>
              </div>
            ) : !selectedCreateTeam ? (
              <div className="card-body" style={{ textAlign: "center" }}>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4 mt-4">
                  <img src={`../assets/img/challenges/icon_no_team.png`} />
                </div>
                <p style={{ fontWeight: "bold" }}>คุณยังไม่มีทีม</p>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12  center2  margin-top-3">
                  <div className="bottom-teamList">
                    {statusRandomTeam === "fail" &&
                      statusGetNumberOfTeamNotFull === "success" && (
                        <h6 style={{ color: "red" }}>
                          ระบบไม่สามารถสุ่มเข้าทีมให้ได้
                          เนื่องจากทุกทีมมีสมาชิกครบแล้ว
                          กรุณาสร้างทีมใหม่ด้วยตนเอง
                          หรือรอจนกว่าจะเกิดการสร้างทีมใหม่และลองสุ่มอีกครั้ง
                        </h6>
                      )}
                    {statusGetNumberOfTeamNotFull !== "loading" &&
                      challengePeriod &&
                      user &&
                      !user.group_id && (
                        <>
                          <button
                            type="button"
                            className="btn bottom-add mr-2 mb-3"
                            style={{ width: "160px" }}
                            onClick={() =>
                              this.setState({ selectedCreateTeam: true })
                            }
                          >
                            สร้างทีมของคุณ
                          </button>
                          <button
                            type="button"
                            className="btn bottom-add ml-2 mb-3"
                            style={{ width: "160px" }}
                            onClick={() =>
                              this.props.getNumberOfTeamNotFull(
                                user && user.fb_group
                              )
                            }
                          >
                            สุ่มเข้าร่วมทีม
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-body mt-3  col-lg-12 col-md-12">
                <center>
                  <h4
                    className="card-title mt-3 mb-4"
                    style={{ color: "#F45197" }}
                  >
                    <b>ตั้งชื่อทีมของคุณ</b>
                  </h4>
                  <input
                    type=""
                    className="form-control"
                    placeholder="ชื่อทีมต้องมากกว่า 6 ตัวอักษร"
                    id="teamName"
                    value={this.state.teamName}
                    onChange={(event) => this.handleChange(event)}
                  />
                  {this.props.statusCreateTeam === "fail" && (
                    <h6 className="mt-3" style={{ color: "red" }}>
                      มีชื่อทีมนี้ในระบบแล้ว
                    </h6>
                  )}
                  {this.props.statusCreateTeam !== "loading" ? (
                    <button
                      type="button"
                      class="btn btn-danger mt-4 mb-4 col-12"
                      style={{ backgroundColor: "#F45197" }}
                      onClick={() => this.createTeam(this.state.teamName)}
                    >
                      ยืนยัน
                    </button>
                  ) : (
                    <div />
                  )}
                </center>
              </div>
            )}
          </div>
        )}

        <div
          className="card shadow col-lg-4 col-md-12  offset-lg-1"
          style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
        >
          <div className="card-body">
            <center style={{ marginTop: "35%", marginBottom: "35%" }}>
              <h3 className="mb-4">คะแนนทีม</h3>
              <h1 style={{ color: "#F45197" }}>
                {totalScoreOfTeam ? totalScoreOfTeam : 0} คะแนน
              </h1>
            </center>
          </div>
        </div>
      </div>
    );
  }

  renderPopupLeaveTeam() {
    const { user } = this.props;
    return (
      <div>
        <div
          className="overlayContainerPopupLeaveTeam"
          id="overlayPopupLeaveTeam"
          onClick={() => this.closePopupLeaveTeam()}
        />
        <div className="popupLeaveTeam" id="popupLeaveTeam">
          <div className="close-btn" onClick={() => this.closePopupLeaveTeam()}>
            &times;
          </div>
          <br></br>
          <center>
            <h3 className="mt-5 mb-4" style={{ color: "red" }}>
              คุณต้องการออกจากทีม
            </h3>
            <h5>
              <b>คุณแน่ใจหรือไม่ ?</b>
            </h5>
          </center>
          <div className="row mt-5">
            <div className="col-1"></div>
            <button
              type="button"
              className="btn btn-secondary col-4"
              style={{
                backgroundColor: "white",
                color: "#F45197",
                borderColor: "#F45197",
              }}
              onClick={() => this.closePopupLeaveTeam()}
            >
              ยกเลิก
            </button>
            <div className="col-2"></div>
            <button
              type="button"
              className="btn btn-danger col-4"
              style={{ backgroundColor: "#F45197" }}
              onClick={() => this.props.leaveTeam(user.user_id)}
            >
              ยืนยัน
            </button>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    );
  }

  openPopupLeaveTeam() {
    document.getElementById("popupLeaveTeam").classList.toggle("active");
    document.getElementById("overlayPopupLeaveTeam").classList.toggle("active");
  }

  closePopupLeaveTeam() {
    document.getElementById("popupLeaveTeam").classList.toggle("active");
    document.getElementById("overlayPopupLeaveTeam").classList.toggle("active");
  }

  renderTeamRank() {
    const { teamRank, user } = this.props;
    const teamRankFilter = teamRank.filter(
      (item) => user.fb_group === item.fb_group
    );

    return (
      <div className="col-lg-12  mb-3" style={{ float: "left" }}>
        <div className="box-Individual">
          {teamRankFilter &&
            teamRankFilter.map((item, index) => (
              <>
                {user.group_id == item.group_id ? (
                  <p className="card-text user-idLogin">
                    {index + 1}. {item.group_name}
                    &nbsp;
                    {index + 1 == "1" ? (
                      <img src="../assets/img/coin/gold.png" alt="" />
                    ) : null}
                    {index + 1 == "2" ? (
                      <img src="../assets/img/coin/silver.png" alt="" />
                    ) : null}
                    {index + 1 == "3" ? (
                      <img src="../assets/img/coin/copper.png" alt="" />
                    ) : null}
                    <span style={{ float: "right", color: "#F45197" }}>
                      {item.totalScoreOfTeam ? item.totalScoreOfTeam : 0} คะแนน
                    </span>
                  </p>
                ) : (
                  <p className="card-text">
                    {index + 1}. {item.group_name}
                    &nbsp;
                    {console.log("index", index)}
                    {index + 1 == "1" ? (
                      <img src="../assets/img/coin/gold.png" alt="" />
                    ) : null}
                    {index + 1 == "2" ? (
                      <img src="../assets/img/coin/silver.png" alt="" />
                    ) : null}
                    {index + 1 == "3" ? (
                      <img src="../assets/img/coin/copper.png" alt="" />
                    ) : null}
                    <span style={{ float: "right", color: "#F45197" }}>
                      {item.totalScoreOfTeam ? item.totalScoreOfTeam : 0} คะแนน
                    </span>
                  </p>
                )}
              </>
            ))}
        </div>
        {teamRankFilter &&
          teamRankFilter.map((item, index) =>
            user.group_id == item.group_id ? (
              <b className="mb-4">
                <hr class="w-100" />
                <p className="card-text">
                  {index + 1}. {item.group_name}
                  <span style={{ float: "right", color: "#F45197" }}>
                    {item.totalScoreOfTeam ? item.totalScoreOfTeam : 0} คะแนน
                  </span>
                </p>
              </b>
            ) : null
          )}
      </div>
    );
  }

  renderIndividualRank() {
    const { individualRank, user } = this.props;
    const individualRankFilter = individualRank.filter(
      (item) =>
        Math.abs(
          moment(user.start_date).diff(moment(item.start_date), "days")
        ) <= 1
    );

    var myRank = individualRank.filter(
      (item) => item.user_id === this.props.user.user_id
    );
    // myRank[0] === undefined คือกรณีผู้ใช้ไม่มีข้อมูลอยู่เลยใน member_event_log  (ทำให้เกิดบัค จึงต้องกำหนดค่าให้)
    if (myRank[0] === undefined) {
      myRank[0] = {
        rank: 0,
        facebook: user.facebook
          ? user.facebook
          : `${user.first_name} ${user.last_name}`,
        total_score: 0,
      };
    }

    var myRankIndex = individualRankFilter.findIndex(
      (item) => item.user_id === this.props.user.user_id
    );

    return (
      <div className="col-lg-12  mb-3" style={{ float: "left" }}>
        <div className="box-Individual">
          {individualRankFilter &&
            individualRankFilter.map((item, index) => {
              const fullName = `${item.first_name} ${item.last_name}`;
              const rankDetail = `${index + 1}. ${item.display_name
                  ? item.display_name
                  : item.facebook
                    ? item.facebook
                    : fullName
                }`;
              index = index + 1;
              return (
                <>
                  {this.props.user.user_id === item.user_id ? (
                    <p className="card-text user-idLogin">
                      {rankDetail}
                      &nbsp;
                      {console.log("index", index)}
                      {index == "1" ? (
                        <img src="../assets/img/coin/gold.png" alt="" />
                      ) : null}
                      {index == "2" ? (
                        <img src="../assets/img/coin/silver.png" alt="" />
                      ) : null}
                      {index == "3" ? (
                        <img src="../assets/img/coin/copper.png" alt="" />
                      ) : null}
                      <span style={{ float: "right", color: "#F45197" }}>
                        {item.total_score ? item.total_score : 0} คะแนน
                      </span>
                    </p>
                  ) : (
                    <p className="card-text">
                      {rankDetail}
                      &nbsp;
                      {console.log("index", index)}
                      {index == "1" ? (
                        <img src="../assets/img/coin/gold.png" alt="" />
                      ) : null}
                      {index == "2" ? (
                        <img src="../assets/img/coin/silver.png" alt="" />
                      ) : null}
                      {index == "3" ? (
                        <img src="../assets/img/coin/copper.png" alt="" />
                      ) : null}
                      <span style={{ float: "right", color: "#F45197" }}>
                        {item.total_score ? item.total_score : 0} คะแนน
                      </span>
                    </p>
                  )}
                </>
              );
            })}
        </div>
        {
          <b className="row mb-4">
            <hr class="w-100" />
            <p className="card-text col-12">
              {myRankIndex + 1}.{" "}
              {myRank[0].display_name
                ? myRank[0].display_name
                : myRank[0].facebook
                  ? myRank[0].facebook
                  : `${myRank[0].first_name} ${myRank[0].last_name}`}
              <span style={{ float: "right", color: "#F45197" }}>
                {myRank[0].total_score ? myRank[0].total_score : 0} คะแนน
              </span>
            </p>
          </b>
        }
      </div>
    );
  }

  renderFriendsRank() {
    const { user, friendsRank } = this.props;

    var myRank = friendsRank.filter(
      (item) => item.user_id === this.props.user.user_id
    );
    // myRank[0] === undefined คือกรณีผู้ใช้ไม่มีข้อมูลอยู่เลยใน member_event_log  (ทำให้เกิดบัค จึงต้องกำหนดค่าให้)
    if (myRank[0] === undefined) {
      myRank[0] = {
        rank: 0,
        facebook: user.display_name
          ? user.display_name
          : user.facebook
            ? user.facebook
            : `${user.first_name} ${user.last_name}`,
        total_score: 0,
      };
    }

    var myRankIndex = friendsRank.findIndex(
      (item) => item.user_id === this.props.user.user_id
    );

    return (
      <div className="col-lg-12  mb-3" style={{ float: "left" }}>
        <div className="box-Individual">
          {friendsRank &&
            friendsRank.length > 0 &&
            friendsRank.map((item, index) => {
              const fullName = `${item.first_name} ${item.last_name}`;
              const rankDetail = `${index + 1}. ${item.display_name
                  ? item.display_name
                  : item.facebook
                    ? item.facebook
                    : fullName
                }`;
              index = index + 1;
              return (
                <>
                  {user.user_id === item.user_id ? (
                    <p className="card-text user-idLogin">
                      {rankDetail} &nbsp;
                      {console.log("index", index)}
                      {index == "1" ? (
                        <img src="../assets/img/coin/gold.png" alt="" />
                      ) : null}
                      {index == "2" ? (
                        <img src="../assets/img/coin/silver.png" alt="" />
                      ) : null}
                      {index == "3" ? (
                        <img src="../assets/img/coin/copper.png" alt="" />
                      ) : null}
                      <span style={{ float: "right", color: "#F45197" }}>
                        {item.total_score ? item.total_score : 0} คะแนน
                      </span>
                    </p>
                  ) : (
                    <p className="card-text">
                      {rankDetail}&nbsp;
                      {index == 1 ? (
                        <img src="../assets/img/coin/gold.png" alt="" />
                      ) : null}
                      {index == 2 ? (
                        <img src="../assets/img/coin/silver.png" alt="" />
                      ) : null}
                      {index == 3 ? (
                        <img src="../assets/img/coin/copper.png" alt="" />
                      ) : null}
                      <span style={{ float: "right", color: "#F45197" }}>
                        {item.total_score ? item.total_score : 0} คะแนน
                      </span>
                    </p>
                  )}
                </>
              );
            })}
        </div>
        {
          <b className="row mb-6">
            <hr class="w-100" />
            <p className="card-text col-12">
              {myRankIndex + 1}.{" "}
              {myRank[0].display_name
                ? myRank[0].display_name
                : myRank[0].facebook
                  ? myRank[0].facebook
                  : `${myRank[0].first_name} ${myRank[0].last_name}`}
              <span style={{ float: "right", color: "#F45197" }}>
                {myRank[0].total_score ? myRank[0].total_score : 0} คะแนน
              </span>
            </p>
          </b>
        }
      </div>
    );
  }

  renderScoreBoard() {
    const { friendsRank } = this.props;
    const { selectedScoreBoard } = this.state;
    return (
      <div className="row">
        <div
          className="card shadow col-lg-5 col-md-12 col-12"
          style={{
            borderRadius: "1rem",
            border: "1px solid #F45197",
          }}
        >
          <div className="card-body">
            <div className="row">
              <h5
                className="ml-3 mr-4"
                style={{
                  color: `${selectedScoreBoard === "team" ? "#F45197" : "grey"
                    }`,
                  textDecoration:
                    selectedScoreBoard === "team" ? "underline" : "",
                  cursor: "pointer",
                }}
                onClick={() => this.setState({ selectedScoreBoard: "team" })}
              >
                กระดานคะแนนทีม
              </h5>
              <h5
                className="mr-4"
                style={{
                  color: `${selectedScoreBoard === "individual" ? "#F45197" : "grey"
                    }`,
                  textDecoration:
                    selectedScoreBoard === "individual" ? "underline" : "",
                  cursor: "pointer",
                }}
                onClick={() =>
                  this.setState({ selectedScoreBoard: "individual" })
                }
              >
                กระดานคะแนนเดี่ยว
              </h5>
              {friendsRank && friendsRank.length > 0 && (
                <h5
                  className=""
                  style={{
                    color: `${selectedScoreBoard === "friendsRank" ? "#F45197" : "grey"
                      }`,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    this.setState({ selectedScoreBoard: "friendsRank" })
                  }
                >
                  คะแนนเพื่อน
                </h5>
              )}
              <hr className="w-100"></hr>
              {selectedScoreBoard === "team" && this.renderTeamRank()}
              {selectedScoreBoard === "individual" &&
                this.renderIndividualRank()}
              {selectedScoreBoard === "friendsRank" && this.renderFriendsRank()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPopupMaxFriendsDetail() {
    return (
      <div>
        <div
          className="overlayContainerPopupMaxFriendsDetail"
          id="overlayPopupMaxFriendsDetail"
          onClick={() => this.closePopupMaxFriendsDetail()}
        />
        <div className="popupMaxFriendsDetail" id="popupMaxFriendsDetail">
          <div
            className="close-btn"
            onClick={() => this.closePopupMaxFriendsDetail()}
          >
            &times;
          </div>
          <br></br>
          <h5 style={{ color: "#F45197" }}>
            <b>วิธีการเพิ่มจำนวนเพื่อน</b>
          </h5>
          <h6>
            <b>•</b> เริ่มต้นสามารถ add เพื่อนได้ 1 คน
          </h6>
          <h6>
            <b>•</b> ทำ 1 active week (ออกกำลังกายครบอย่างน้อย 1 วัน)
            จะสามารถเพิ่มเพื่อนได้อีก 2 คน
          </h6>
          <h6>
            <b>•</b> จำนวนเพื่อนมีสูงสุดได้ 15 คน
          </h6>
          <br></br>
          {this.props.statusGetNumberOfTeamNotFull !== "loading" ? (
            <div className="row mt-3">
              <div className="col-3"></div>
              <button
                type="button"
                className="btn btn-secondary col-6"
                style={{ backgroundColor: "#F45197" }}
                onClick={() => this.closePopupMaxFriendsDetail()}
              >
                ปิด
              </button>
              <div className="col-3"></div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }

  openPopupMaxFriendsDetail() {
    document.getElementById("popupMaxFriendsDetail").classList.toggle("active");
    document
      .getElementById("overlayPopupMaxFriendsDetail")
      .classList.toggle("active");
  }

  closePopupMaxFriendsDetail() {
    document.getElementById("popupMaxFriendsDetail").classList.toggle("active");
    document
      .getElementById("overlayPopupMaxFriendsDetail")
      .classList.toggle("active");
  }

  renderPopupFriendRequest() {
    return (
      <div>
        <div
          className="overlayContainerPopupFriendRequest"
          id="overlayPopupFriendRequest"
          onClick={() => this.closePopupFriendRequest()}
        />
        <div className="popupFriendRequest" id="popupFriendRequest">
          <div
            className="close-btn"
            onClick={() => this.closePopupFriendRequest()}
          >
            &times;
          </div>
          <br></br>
          <h5 style={{ color: "#F45197", textAlign: "center" }}>
            <b>คำขอเป็นเพื่อน</b>
          </h5>
          <br></br>
          <h6>
            <b>
              {this.props.friend_request &&
                this.props.friend_request[0] &&
                this.props.friend_request[0].email}
            </b>{" "}
            ต้องการเป็นเพื่อนกับคุณ
          </h6>
          <br></br>
          {this.props.statusAcceptFriend !== "loading" &&
            this.props.statusRejectFriend !== "loading" && (
              <div className="row mt-3">
                <div className="col-1"></div>
                <button
                  type="button"
                  className="btn btn-secondary col-4"
                  style={{
                    backgroundColor: "white",
                    color: "#F45197",
                    borderColor: "#F45197",
                  }}
                  onClick={() =>
                    this.props.rejectFriend(
                      this.props.friend_request &&
                      this.props.friend_request[0] &&
                      this.props.friend_request[0].log_id
                    )
                  }
                >
                  ปฎิเสธ
                </button>
                <div className="col-2"></div>
                <button
                  type="button"
                  className="btn btn-secondary col-4"
                  style={{ backgroundColor: "#F45197", borderColor: "#F45197" }}
                  onClick={() =>
                    this.props.acceptFriend(
                      this.props.user && this.props.user.user_id,
                      this.props.friend_request &&
                      this.props.friend_request[0] &&
                      this.props.friend_request[0].sender_id,
                      this.props.friend_request &&
                      this.props.friend_request[0] &&
                      this.props.friend_request[0].log_id
                    )
                  }
                >
                  ยอมรับ
                </button>
                <div className="col-1"></div>
              </div>
            )}
        </div>
      </div>
    );
  }

  openPopupFriendRequest() {
    document.getElementById("popupFriendRequest").classList.toggle("active");
    document
      .getElementById("overlayPopupFriendRequest")
      .classList.toggle("active");
  }

  closePopupFriendRequest() {
    document.getElementById("popupFriendRequest").classList.toggle("active");
    document
      .getElementById("overlayPopupFriendRequest")
      .classList.toggle("active");
  }

  renderPopupDeleteFriend() {
    return (
      <div>
        <div
          className="overlayContainerPopupDeleteFriend"
          id="overlayPopupDeleteFriend"
          onClick={() => this.closePopupDeleteFriend()}
        />
        <div className="popupDeleteFriend" id="popupDeleteFriend">
          <div
            className="close-btn"
            onClick={() => this.closePopupDeleteFriend()}
          >
            &times;
          </div>
          <br></br>
          <h5 style={{ color: "#F45197", textAlign: "center" }}>
            <b>ยืนยันการลบเพื่อน</b>
          </h5>
          <br></br>
          <h6 style={{ textAlign: "center" }}>
            คุณต้องการลบ{" "}
            <b>
              {this.props.friend_request &&
                this.props.friend_request[0] &&
                this.props.friend_request[0].email}
            </b>
          </h6>
          <h6 style={{ textAlign: "center" }}>ออกจากรายชื่อเพื่อนหรือไม่</h6>
          <br></br>
          {this.props.statusDeleteFriend !== "loading" && (
            <div className="row mt-3">
              <div className="col-1"></div>
              <button
                type="button"
                className="btn btn-secondary col-4"
                style={{
                  backgroundColor: "white",
                  color: "#F45197",
                  borderColor: "#F45197",
                }}
                onClick={() => this.closePopupDeleteFriend()}
              >
                ยกเลิก
              </button>
              <div className="col-2"></div>
              <button
                type="button"
                className="btn btn-secondary col-4"
                style={{ backgroundColor: "#F45197", borderColor: "#F45197" }}
                onClick={() =>
                  this.props.deleteFriend(
                    this.props.user && this.props.user.user_id,
                    this.state.emailDeleteFriend
                  )
                }
              >
                ลบเพื่อน
              </button>
              <div className="col-1"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  openPopupDeleteFriend() {
    document.getElementById("popupDeleteFriend").classList.toggle("active");
    document
      .getElementById("overlayPopupDeleteFriend")
      .classList.toggle("active");
  }

  closePopupDeleteFriend() {
    document.getElementById("popupDeleteFriend").classList.toggle("active");
    document
      .getElementById("overlayPopupDeleteFriend")
      .classList.toggle("active");
  }

  onDeleteFriendModal(friend_email) {
    this.setState({
      emailDeleteFriend: friend_email,
    });
    this.openPopupDeleteFriend();
  }

  renderFriendList() {
    const { friend_list, max_friends, user, statusSendFriendRequest } =
      this.props;
    const { emailAddFriend } = this.state;
    return (
      <div className="row">
        {this.renderPopupDeleteFriend()}
        {this.renderPopupMaxFriendsDetail()}
        {this.state.selectedAddFriend ? (
          <div
            className="card shadow col-lg-7 col-md-12"
            style={{ borderRadius: "25px" }}
          >
            <div className="card-body">
              <div className="row mt-4 justify-content-center">
                <div className="col-lg-12 ">
                  <h5 className="" style={{ textAlign: "center" }}>
                    {" "}
                    <img src={`../assets/img/challenges/vectorinvite.png`} />
                    &nbsp; เพิ่มเพื่อนด้วยชื่อหรืออีเมล์
                  </h5>
                </div>
                <div className="col-lg-6">
                  <input
                    type=""
                    className="form-control"
                    placeholder="กรุณาระบุชื่อผู้ใช้งาน หรือ อีเมล"
                    id="emailAddFriend"
                    value={this.state.emailAddFriend}
                    onChange={(event) => this.handleChange(event)}
                  />
                  {statusSendFriendRequest === "fail" && (
                    <h6 style={{ color: "red" }}>
                      ไม่พบผู้ใช้ที่ต้้องการเพิ่มเพื่อนอยู่ในระบบ
                    </h6>
                  )}
                  <button
                    type="button"
                    class="btn btn-danger mt-4 mb-4 col-12"
                    style={{ backgroundColor: "#F45197" }}
                    onClick={() =>
                      this.props.sendFriendRequest(user.user_id, emailAddFriend)
                    }
                  >
                    ส่งคำขอ
                  </button>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        ) : (
          <div
            className="card shadow col-lg-7 col-md-12"
            style={{ borderRadius: "25px", border: "1px solid #EF60A3" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="card-title">
                    <b style={{ color: "#F45197" }}>รายชื่อเพื่อน</b>{" "}
                    <span style={{ float: "right" }}>
                      เพื่อน {friend_list && friend_list.length}/{max_friends}{" "}
                      คน
                    </span>
                  </h5>
                </div>
                <div className="col-lg-10">
                  {friend_list &&
                    friend_list.length > 0 &&
                    friend_list.map((item, index) => (
                      <p className="card-text">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            {index + 1}.{" "}
                            {item.display_name
                              ? item.display_name
                              : item.facebook
                                ? item.facebook
                                : `${item.first_name} ${item.last_name}`}
                          </div>
                          <div className="col-lg-3 col-md-3 col-6">
                            <span style={{ color: "grey" }}>
                              {item.total_score} คะแนน
                            </span>
                          </div>
                          <div className="col-lg-3 col-md-3 col-6">
                            <span style={{ float: "right", color: "#F45197" }}>
                              {item.end_rank
                                ? item.end_rank.charAt(0).toUpperCase() +
                                item.end_rank.substr(1).toLowerCase()
                                : item.start_rank.charAt(0).toUpperCase() +
                                item.start_rank.substr(1).toLowerCase()}{" "}
                              <img
                                className="ml-4"
                                style={{ cursor: "pointer" }}
                                src={`../assets/img/challenges/icon_x.png`}
                                onClick={() =>
                                  this.onDeleteFriendModal(item.email)
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </p>
                    ))}
                </div>
              </div>
              <br></br>
              <hr className="w-100"></hr>
              <div className="row justify-content-between">
                <h5
                  className="underline-on-hover"
                  style={{ cursor: "pointer", color: "#F45197" }}
                  onClick={() => this.openPopupMaxFriendsDetail()}
                >
                  วิธีการเพิ่มจำนวนเพื่อน
                </h5>
                {friend_list.length < max_friends && (
                  <h5
                    className="underline-on-hover"
                    style={{ cursor: "pointer", color: "#F45197" }}
                    onClick={() => this.setState({ selectedAddFriend: true })}
                  >
                    + เพิ่มเพื่อน
                  </h5>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  renderAchievement() {
    const { achievementLog } = this.props;
    const achievementFinisher =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Finisher").length >
        0
        ? true
        : false;
    const achievementAce =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Ace").length > 0
        ? true
        : false;
    const achievement1st =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "1st").length > 0
        ? true
        : false;
    const achievement2nd =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "2nd").length > 0
        ? true
        : false;
    const achievementTop10 =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Top 10").length > 0
        ? true
        : false;
    const achievementSocialStar =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Social star")
          .length > 0
        ? true
        : false;
    const achievementSocialStarPlus =
      achievementLog &&
        achievementLog.filter((item) => item.achievement === "Social star+")
          .length > 0
        ? true
        : false;

    return (
      <div className="row">
        <div
          className="card shadow col-lg-7 col-md-12"
          style={{ borderRadius: "25px" }}
        >
          <div className="card-body">
            {
              <>
                <div className="box-challengeIn">
                  <p className="text-challenge">
                    <div className="container">
                      {achievementFinisher ? (
                        <>
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                              {/* จอมือถือ */}
                              <div
                                className="container line-hr"
                                data-bs-toggle="modal"
                                id="achievement8"
                                data-bs-target="#modalAchievement8"
                              >
                                <div className="row">
                                  <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                    <img
                                      src={`./assets/img/icon_achievement/finisher.png`}
                                      width="70"
                                      height="70"
                                      className="icon_rank-img"
                                    />
                                  </div>
                                  <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-12 col-sm-12  col-md-10">
                                          <p>
                                            <span className="bold">
                                              Finisher
                                            </span>
                                            <br />{" "}
                                            ทำภารกิจครบทุกสัปดาห์จนจบฤดูกาล
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* จอคอม */}
                              <div className="container display-btn">
                                <div className="row">
                                  <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                    <img
                                      src={`./assets/img/icon_achievement/finisher.png`}
                                      width="70"
                                      height="70"
                                      className="icon_rank-img"
                                    />
                                  </div>
                                  <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                    <div>
                                      <div className="row">
                                        <div className="col-12 col-sm-12  col-md-10">
                                          <p>
                                            <span className="bold">
                                              Finisher
                                            </span>
                                            <br />{" "}
                                            ทำภารกิจครบทุกสัปดาห์จนจบฤดูกาล
                                          </p>
                                        </div>
                                        <div
                                          className="col-12 col-sm-12 col-md-2"
                                          onClick={() =>
                                            document.getElementById(
                                              "modalAchievement8Btn"
                                            ) &&
                                            document
                                              .getElementById(
                                                "modalAchievement8Btn"
                                              )
                                              .click()
                                          }
                                        >
                                          <button
                                            type="button"
                                            className="btn btn-achievement "
                                          >
                                            แชร์
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                              <div className="container">
                                <div className="row">
                                  <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                    <img
                                      src={`./assets/img/icon_achievement/finisher_grey.png`}
                                      width="70"
                                      height="70"
                                      className="icon_rank-img"
                                    />
                                  </div>
                                  <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                    <p className="share-text">
                                      <span className="bold">Finisher</span>
                                      <br /> ทำภารกิจครบทุกสัปดาห์จนจบฤดูกาล
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <hr className="line-hr" />
                      {achievementAce ? (
                        <div class="row">
                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            {/* จอมือถือ */}
                            <div
                              className="container line-hr"
                              data-bs-toggle="modal"
                              id="achievement1"
                              data-bs-target="#modalAchievement1"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/ace.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">Ace</span>
                                          <br />
                                          ได้อันดับคะแนนสูงสุดประจำสัปดาห์
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* จอคอม */}
                            <div className="container display-btn">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/ace.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div>
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">Ace</span>
                                          <br />
                                          ได้อันดับคะแนนสูงสุดประจำสัปดาห์
                                        </p>
                                      </div>
                                      <div
                                        className="col-12 col-sm-12 col-md-2"
                                        onClick={() =>
                                          document.getElementById(
                                            "modalAchievement1Btn"
                                          ) &&
                                          document
                                            .getElementById(
                                              "modalAchievement1Btn"
                                            )
                                            .click()
                                        }
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-achievement "
                                        >
                                          แชร์
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            <div className="container">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/ace_grey.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <p>
                                    <span className="bold">Ace</span>
                                    <br />
                                    ได้อันดับคะแนนสูงสุดประจำสัปดาห์
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr className="line-hr" />
                      {achievement1st ? (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            {/* จอมือถือ */}
                            <div
                              className="container line-hr"
                              data-bs-toggle="modal"
                              id="achievement3"
                              data-bs-target="#modalAchievement3"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/1st.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">1st</span>
                                          <br /> ได้ทีมอันดับที่ 1 ประจำสัปดาห์{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* จอคอม */}
                            <div className="container  display-btn">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/1st.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div>
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">1st</span>
                                          <br /> ได้ทีมอันดับที่ 1 ประจำสัปดาห์{" "}
                                        </p>
                                      </div>
                                      <div
                                        className="col-12 col-sm-12 col-md-2"
                                        onClick={() =>
                                          document.getElementById(
                                            "modalAchievement3Btn"
                                          ) &&
                                          document
                                            .getElementById(
                                              "modalAchievement3Btn"
                                            )
                                            .click()
                                        }
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-achievement "
                                        >
                                          แชร์
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            <div className="container">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/1st_grey.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <p>
                                    <span className="bold">1st</span>
                                    <br /> ได้ทีมอันดับที่ 1 ประจำสัปดาห์
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr className="line-hr" />
                      {achievement2nd ? (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            {/* จอมือถือ */}
                            <div
                              className="container line-hr"
                              data-bs-toggle="modal"
                              id="achievement4"
                              data-bs-target="#modalAchievement4"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/2nd.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">2nd</span>
                                          <br /> ได้ทีมอันดับที่ 2 ประจำสัปดาห์
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* จอคอม */}
                            <div className="container display-btn">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/2nd.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div>
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">2nd</span>
                                          <br /> ได้ทีมอันดับที่ 2 ประจำสัปดาห์
                                        </p>
                                      </div>
                                      <div
                                        className="col-12 col-sm-12 col-md-2"
                                        onClick={() =>
                                          document.getElementById(
                                            "modalAchievement4Btn"
                                          ) &&
                                          document
                                            .getElementById(
                                              "modalAchievement4Btn"
                                            )
                                            .click()
                                        }
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-achievement "
                                        >
                                          แชร์
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            <div class="container">
                              <div class="row">
                                <div class="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/2nd_grey.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div class="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <p>
                                    <span className="bold">2nd</span>
                                    <br /> ได้ทีมอันดับที่ 2 ประจำสัปดาห์
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr className="line-hr" />
                      {achievementTop10 ? (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            {/* จอมอืถือ */}
                            <div
                              className="container line-hr"
                              data-bs-toggle="modal"
                              id="achievement5"
                              data-bs-target="#modalAchievement5"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/top10.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">Top 10</span>
                                          <br /> ได้ทีมอันดับที่ 3-10
                                          ประจำสัปดาห์{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* จอคอม */}
                            <div className="container display-btn">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/top10.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div>
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">Top 10</span>
                                          <br /> ได้ทีมอันดับที่ 3-10
                                          ประจำสัปดาห์{" "}
                                        </p>
                                      </div>
                                      <div
                                        className="col-12 col-sm-12 col-md-2"
                                        onClick={() =>
                                          document.getElementById(
                                            "modalAchievement5Btn"
                                          ) &&
                                          document
                                            .getElementById(
                                              "modalAchievement5Btn"
                                            )
                                            .click()
                                        }
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-achievement "
                                        >
                                          แชร์
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            <div className="container">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/top10_grey.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <p>
                                    <span className="bold">Top 10</span>
                                    <br /> ได้ทีมอันดับที่ 3-10 ประจำสัปดาห์
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr className="line-hr" />
                      {achievementSocialStar ? (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            {/* จอมือถือ */}
                            <div
                              className="container line-hr"
                              data-bs-toggle="modal"
                              id="achievement6"
                              data-bs-target="#modalAchievement6"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/social_star.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">
                                            Social star
                                          </span>
                                          <br /> มีเพื่อนในรายชื่อ 10 คน{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* จอคอม */}
                            <div className="container display-btn">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/social_star.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div>
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">
                                            Social star
                                          </span>
                                          <br /> มีเพื่อนในรายชื่อ 10 คน{" "}
                                        </p>
                                      </div>
                                      <div
                                        className="col-12 col-sm-12 col-md-2"
                                        onClick={() =>
                                          document.getElementById(
                                            "modalAchievement6Btn"
                                          ) &&
                                          document
                                            .getElementById(
                                              "modalAchievement6Btn"
                                            )
                                            .click()
                                        }
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-achievement "
                                        >
                                          แชร์
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            <div className="container">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/social_star_grey.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <p>
                                    <span className="bold">Social star</span>
                                    <br /> มีเพื่อนในรายชื่อ 10 คน
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr className="line-hr" />
                      {achievementSocialStarPlus ? (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            {/* จอมือถือ */}
                            <div
                              className="container line-hr"
                              data-bs-toggle="modal"
                              id="achievement7"
                              data-bs-target="#modalAchievement7"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/social_star_plus.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">
                                            Social star+
                                          </span>
                                          <br /> มีเพื่อนในรายชื่อ 15 คน
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* จอคอม */}
                            <div className="container display-btn">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/social_star_plus.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <div>
                                    <div className="row">
                                      <div className="col-12 col-sm-12  col-md-10">
                                        <p>
                                          <span className="bold">
                                            Social star+
                                          </span>
                                          <br /> มีเพื่อนในรายชื่อ 15 คน
                                        </p>
                                      </div>
                                      <div
                                        className="col-12 col-sm-12 col-md-2"
                                        onClick={() =>
                                          document.getElementById(
                                            "modalAchievement7Btn"
                                          ) &&
                                          document
                                            .getElementById(
                                              "modalAchievement7Btn"
                                            )
                                            .click()
                                        }
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-achievement "
                                        >
                                          แชร์
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
                            <div className="container">
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2">
                                  <img
                                    src={`./assets/img/icon_achievement/social_star_plus_grey.png`}
                                    width="70"
                                    height="70"
                                    className="icon_rank-img"
                                  />
                                </div>
                                <div className="col-8 col-sm-9 col-md-10 col-lg-9 col-xl-10">
                                  <p>
                                    <span className="bold">Social star+</span>
                                    <br /> มีเพื่อนในรายชื่อ 15 คน
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </p>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    );
  }

  filterSearch() {
    const { emailOrDisplayName } = this.state;

    // Declare variables
    var filter, ul, li, a, i, txtValue;
    filter = emailOrDisplayName && emailOrDisplayName.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul && ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    if (li) {
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h5")[0];
        txtValue = a && (a.textContent || a.innerText);
        if (txtValue && txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
  }

  checkFriendRequestStatus(receiver_id) {
    const { friend_request_sent } = this.props;
    if (friend_request_sent) {
      const filter_friend_request_sent = friend_request_sent.filter(
        (item) => item.receiver_id === receiver_id
      );
      if (filter_friend_request_sent.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  checkTeamInviteStatus(receiver_id) {
    const { team_invite_sent } = this.props;
    if (team_invite_sent) {
      const filter_team_invite_sent = team_invite_sent.filter(
        (item) => item.receiver_id === receiver_id
      );
      if (filter_team_invite_sent.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  checkFriendStatus(receiver_id) {
    const { friend_list } = this.props;
    if (friend_list) {
      const filter_friend_list = friend_list.filter(
        (item) => item.user_id === receiver_id
      );
      if (filter_friend_list.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  all_users() {
    const {
      allMemberStayFit,
      user,
      statusSendFriendRequest,
      statusCancelFriendRequest,
      statusCancelTeamInvite,
    } = this.props;
    const { emailOrDisplayName } = this.state;

    var allMemberStayFitFilter = allMemberStayFit;
    var filter, ul, li, a, i, txtValue;
    filter = emailOrDisplayName && emailOrDisplayName.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul && ul.getElementsByTagName("li");
    if (li) {
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h5")[0];
        txtValue = a && (a.textContent || a.innerText);
        allMemberStayFitFilter = allMemberStayFit.filter(
          (item) =>
            item.email.toUpperCase().indexOf(filter) > -1 ||
            (item.display_name &&
              item.display_name.toUpperCase().indexOf(filter) > -1)
        );
      }
    }

    return (
      <>
        <div class="col-12 col-sm-12 col-md-12 col-lg-8">
          <div className="card display_name">
            <div className="top-search">
              <div className="row">
                <p className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 user_all">
                  ผู้ใช้งานทั้งหมดในระบบ
                </p>
                <div className="col-12 col-sm-12 col-md-12   col-lg-8 col-xl-8">
                  <div className="row justify-content-md-center">
                    <div className="col-12 col-sm-8 col-md-10 col-lg-9 col-xl-9">
                      <input
                        type="text"
                        className="form-control"
                        id="emailOrDisplayName"
                        value={emailOrDisplayName}
                        onChange={(event) => this.handleChange(event)}
                        onKeyUp={this.filterSearch()}
                        placeholder="ชื่อ หรืออีเมลเพื่อนของคุณ"
                      />
                    </div>
                    <div className="col-12 col-sm-4 col-md-2   col-lg-3 col-xl-3">
                      <button className="btn bottom-search" type="button">
                        ค้นหา
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <ul id="myUL" className="myUL">
                <div class="li">
                  {allMemberStayFitFilter &&
                    allMemberStayFitFilter.length > 0 ? (
                    allMemberStayFit &&
                    allMemberStayFit.map((item, i) => (
                      <li key={i}>
                        <div class="row align-items-center">
                          <div class="col-12 col-md-auto col-lg-5 col-xl-5 text-left">
                            <h5>
                              {item.display_name
                                ? item.display_name
                                : item.email}
                              <span style={{ display: "none" }}>
                                {" "}
                                {item.email}
                              </span>
                            </h5>
                          </div>
                          <div class="col-12 col-lg-2 col-xl-2 text-center">
                            <span> {item.rank} </span>
                          </div>
                          <div class="col-12 col-lg-auto col-xl-auto  text-center">
                            {this.checkFriendStatus(item.user_id) ? ( //เช็คว่ามีคนนี้เป็นเพื่อนแล้วหรือยัง
                              <span
                                style={{ color: "#000000", fontSize: "16px" }}
                              >
                                {" "}
                                เพื่อนของคุณ{" "}
                              </span>
                            ) : this.checkFriendRequestStatus(item.user_id) ? ( //เช็คว่าเคยส่งคำขอเพื่อนไปหาคนนี้หรือยัง
                              <div>
                                <span
                                  style={{ color: "#D30769", fontSize: "16px" }}
                                >
                                  {" "}
                                  รอการยืนยัน{" "}
                                </span>
                                {statusCancelFriendRequest !== "loading" && ( //เช็คเพื่อซ่อนปุ่มในจังหวะ loading ป้องกันการกดยกเลิกรัวๆ
                                  <span
                                    style={{ cursor: "pointer" }}
                                    className="btn bottom-cancel"
                                    onClick={() =>
                                      this.props.cancelFriendRequest(
                                        user.user_id,
                                        item.user_id
                                      )
                                    }
                                  >
                                    <img className="cancel-H" />
                                    ยกเลิกคำขอ
                                  </span>
                                )}
                              </div>
                            ) : (
                              statusSendFriendRequest !== "loading" &&
                              item.user_id !== user.user_id && ( //เช็คเพื่อซ่อนปุ่มในจังหวะ loading ป้องกันการกดเพิ่มเพื่อนรัวๆ
                                <span
                                  className="btn bottom-add"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    this.props.sendFriendRequest(
                                      user.user_id,
                                      item.email
                                    )
                                  }
                                >
                                  {`เพิ่มเพื่อน`}
                                </span>
                              )
                            )}
                          </div>
                          <div class="col-12 col-lg-auto col-xl-auto  text-center">
                            {this.props.numberOfMembers > 0 &&
                              this.props.numberOfMembers < 10 && //เช็คว่าผู้ใช้มีทีมไหม (ถ้า numberOfMembers = 0 คือเรายังไม่มีทีม) && เช็คว่าทีมยังไม่เต็ม
                              (item.group_id ? ( //เช็คว่าคนนี้่มีทีมแล้วหรือยัง
                                <span
                                  style={{ color: "#000000", fontSize: "16px" }}
                                >
                                  {" "}
                                  มีทีมอยู่แล้ว{" "}
                                </span>
                              ) : this.checkTeamInviteStatus(item.user_id) ? ( //เช็คว่าเคยส่งคำชวนเข้าทีมไปหาคนนี้หรือยัง
                                <div>
                                  <span
                                    style={{
                                      color: "#D30769",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {" "}
                                    รอการยืนยัน{" "}
                                  </span>
                                  {statusCancelTeamInvite !== "loading" && ( //เช็คเพื่อซ่อนปุ่มในจังหวะ loading ป้องกันการกดยกเลิกรัวๆ
                                    <span
                                      style={{ cursor: "pointer" }}
                                      className="btn bottom-cancel"
                                      onClick={() =>
                                        this.props.cancelTeamInvite(
                                          user.user_id,
                                          item.user_id
                                        )
                                      }
                                    >
                                      <img className="cancel-H" />
                                      ยกเลิกคำชวน
                                    </span>
                                  )}
                                </div>
                              ) : (
                                statusSendFriendRequest !== "loading" &&
                                item.user_id !== user.user_id && ( //เช็คเพื่อซ่อนปุ่มในจังหวะ loading
                                  <span
                                    className="btn bottom-add"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.props.sendTeamInvite(
                                        user.user_id,
                                        item.email
                                      )
                                    }
                                  >
                                    {`ชวนเข้าทีม`}
                                  </span>
                                )
                              ))}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <h5>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 ellipse24">
                        <img src={group25} />
                      </div>
                      <p className="text-noSystem">ไม่มีชื่ออยู่ในระบบ</p>
                      {/*  <div className="col-12 col-sm-12 col-md-12 col-lg-12  center2  margin-top-3">
                        <div className="bottom-teamList">
                          <button type="button" className="btn bottom-outlineaddTeam " onClick={(e) => this.clickaddfriend(true)}><IntlMessages id="challenge.invitefriends" /></button>
                        </div>
                      </div> */}
                    </h5>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-4">{ }</div>
      </>
    );
  }

  onSearchMember() {
    this.setState({
      selectedNavLink: "searchMember",
      selectedAddFriend: false,
    });
    this.props.getAllMemberStayFit(this.props.user && this.props.user.fb_group);
    this.props.getFriendRequestSent(this.props.user && this.props.user.user_id);
    this.props.getTeamInviteSent(this.props.user && this.props.user.user_id);
  }

  renderChallenge() {
    const { selectedNavLink } = this.state;
    return (
      <div>
        <div
          className="card-body d-flex justify-content-center"
        // style={{ backgroundColor: "#D8D6DF" }}
        >
          <form className="col-lg-12 col-md-12">
            <div className="row mb-5 mt-3">
              <div className="col-lg-12 mb-5">
                <nav className="nav mb-3 d-flex" style={{ gap: "10px" }}>
                  <a
                    className="nav-link"
                    style={{
                      color: `${selectedNavLink === "mission" ? "#FFFFFF" : "#F45197"
                        }`,
                      cursor: "pointer",
                      background:
                        selectedNavLink === "mission" ? "#EF60A3" : "#FFFFFF",
                      border: "1px solid #EF60A3",
                      width: "150px",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onClick={() =>
                      this.setState({ selectedNavLink: "mission" })
                    }
                  >
                    <b>ภารกิจทั้งหมด</b>
                  </a>
                  <a
                    className="nav-link"
                    style={{
                      color: `${selectedNavLink === "teamList" ? "#FFFFFF" : "#F45197"
                        }`,
                      cursor: "pointer",
                      background:
                        selectedNavLink === "teamList" ? "#EF60A3" : "#FFFFFF",
                      border: "1px solid #EF60A3",
                      width: "150px",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onClick={() =>
                      this.setState({
                        selectedNavLink: "teamList",
                        selectedTeamInvite: false,
                        selectedCreateTeam: false,
                      })
                    }
                  >
                    <b>สมาชิกในทีม</b>
                  </a>
                  <a
                    className="nav-link"
                    style={{
                      color: `${selectedNavLink === "scoreBoard" ? "#FFFFFF" : "#F45197"
                        }`,
                      cursor: "pointer",
                      background:
                        selectedNavLink === "scoreBoard"
                          ? "#EF60A3"
                          : "#FFFFFF",
                      border: "1px solid #EF60A3",
                      width: "150px",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onClick={() =>
                      this.setState({ selectedNavLink: "scoreBoard" })
                    }
                  >
                    <b>กระดานคะแนน</b>
                  </a>
                  <a
                    className="nav-link"
                    style={{
                      color: `${selectedNavLink === "friendList" ? "#FFFFFF" : "#F45197"
                        }`,
                      cursor: "pointer",
                      background:
                        selectedNavLink === "friendList"
                          ? "#EF60A3"
                          : "#FFFFFF",
                      border: "1px solid #EF60A3",
                      width: "150px",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onClick={() =>
                      this.setState({
                        selectedNavLink: "friendList",
                        selectedAddFriend: false,
                      })
                    }
                  >
                    <b>รายชื่อเพื่อน</b>
                  </a>
                  <a
                    className="nav-link"
                    style={{
                      color: `${selectedNavLink === "achievement"
                          ? "#FFFFFF"
                          : "#F45197"
                        }`,
                      cursor: "pointer",
                      background:
                        selectedNavLink === "achievement"
                          ? "#EF60A3"
                          : "#FFFFFF",
                      border: "1px solid #EF60A3",
                      width: "150px",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onClick={() =>
                      this.setState({
                        selectedNavLink: "achievement",
                        selectedAddFriend: false,
                      })
                    }
                  >
                    <b>ความสำเร็จ</b>
                  </a>
                  <a
                    className="nav-link"
                    style={{
                      color: `${selectedNavLink === "searchMember"
                          ? "#FFFFFF"
                          : "#F45197"
                        }`,
                      cursor: "pointer",
                      background:
                        selectedNavLink === "searchMember"
                          ? "#EF60A3"
                          : "#FFFFFF",
                      border: "1px solid #EF60A3",
                      width: "200px",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                    onClick={() => this.onSearchMember()}
                  >
                    <b>ผู้ใช้งานทั้งหมด</b>
                  </a>
                </nav>
                {selectedNavLink === "mission" && this.renderMission()}
                {selectedNavLink === "teamList" && this.renderTeamList()}
                {selectedNavLink === "scoreBoard" && this.renderScoreBoard()}
                {selectedNavLink === "friendList" && this.renderFriendList()}
                {selectedNavLink === "achievement" && this.renderAchievement()}
                {selectedNavLink === "searchMember" && this.all_users()}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  createTeam(teamName) {
    const { user } = this.props;
    if (teamName.length > 6) {
      this.props.createChallengeGroup(
        user.user_id,
        teamName,
        user.start_date,
        user.fb_group
      );
    } else {
      this.setState({
        teamName: "",
      });
    }
  }

  renderCreateTeam() {
    const { user } = this.props;
    return (
      <div>
        <div className="card-body d-flex justify-content-center">
          <form>
            <div className="nav mt-5 mb-4 ml-5" id="myTab" role="tablist">
              <div className="mr-4 mb-3">
                <a
                  className="challenges-cursor"
                  id="home-tab"
                  data-toggle="tab"
                  href="/#/Videdivst"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  style={{ color: "black", textDecorationColor: "white" }}
                >
                  Workout Routine
                </a>
              </div>
              <div className="">
                <a
                  className="challenges-cursor"
                  id="contact-tab"
                  data-toggle="tab"
                  href="/#/challenges"
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
                  ชาเลนจ์
                </a>
              </div>
            </div>

            <div className="row">
              <div className="card shadow mt-3  col-lg-12 col-md-12">
                <center>
                  <h4
                    className="card-title mt-3 mb-4"
                    style={{ color: "#F45197" }}
                  >
                    <b>ตั้งชื่อทีมของคุณ</b>
                  </h4>
                  <input
                    type=""
                    className="form-control"
                    placeholder="ชื่อทีมต้องมากกว่า 6 ตัวอักษร"
                    id="teamName"
                    value={this.state.teamName}
                    onChange={(event) => this.handleChange(event)}
                  />
                  {this.props.statusCreateTeam !== "loading" ? (
                    <button
                      type="button"
                      class="btn btn-danger mt-4 mb-4 col-12"
                      style={{ backgroundColor: "#F45197" }}
                      onClick={() => this.createTeam(this.state.teamName)}
                    >
                      ยืนยัน
                    </button>
                  ) : (
                    <div />
                  )}
                </center>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderJoinChallenge() {
    return (
      <div>
        {this.renderPopupJoinChallenge()}
        {this.renderPopupRulesAndPrizes()}
        <div className="">
          <form>
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
                  style={{ color: "black", textDecorationColor: "white" }}
                >
                  Workout Routine
                </a>
              </div>
              <div className="">
                <a
                  className="challenges-cursor"
                  id="contact-tab"
                  data-toggle="tab"
                  href="/#/challenges"
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
                  ชาเลนจ์
                </a>
              </div>
            </div>

            <div className="row" style={{ backgroundColor: "#D8D6DF" }}>
              <div
                className="card shadow mt-5 mb-5  col-lg-10 col-md-12  offset-lg-1"
                style={{ borderRadius: "25px" }}
              >
                <div className="card-body">
                  <center>
                    <h2 className="card-title mt-3 ">
                      <b>
                        ชาเลนจ์น้องใหม่ เอาใจสมาชิก{" "}
                        <b style={{ color: "#F45197" }}>BEBE FIT ROUTINE</b>
                      </b>
                    </h2>
                    <h2 className="card-title mb-5">
                      <b>สนุกไปกับภารกิจพร้อมรับสิทธิพิเศษมากมาย</b>
                    </h2>
                    <div className="row">
                      <div className="mb-4 col-lg-4">
                        <img
                          src={`../assets/img/challenges/scale.png`}
                          className="rounded-circle mb-3"
                        />
                        <h5 className="card-title">
                          <b>ภารกิจพิชิตตัวเลข</b>
                        </h5>
                        <h5 className="card-text">
                          บันทึกการชั่งน้ำหนักเพื่อดูความเปลี่ยนแปลงของร่างกาย{" "}
                          <span style={{ color: "#F45197" }}>รับ 10 คะแนน</span>
                        </h5>
                      </div>
                      <div className="mb-4 col-lg-4">
                        <img
                          src={`../assets/img/challenges/exercise.png`}
                          className="rounded-circle mb-3"
                        />
                        <h5 className="card-title">
                          <b>ภารกิจฟิตเฟิร์ม</b>
                        </h5>
                        <h5 className="card-text">
                          ก้าวสู่เป้าหมายออกกำลังกายได้ครบทั้งสัปดาห์{" "}
                          <span style={{ color: "#F45197" }}>รับ 10 คะแนน</span>
                        </h5>
                      </div>
                      <div className="mb-4 col-lg-4">
                        <img
                          src={`../assets/img/challenges/challenge.png`}
                          className="rounded-circle mb-3"
                        />
                        <h5 className="card-title">
                          <b>ภารกิจก้าวสู่ทีมอันดับ 1</b>
                        </h5>
                        <h5 className="card-text mb-4">
                          สะสมคะแนนกับเพื่อนร่วมทีม{" "}
                          <span style={{ color: "#F45197" }}>
                            อีกหนึ่งแรงผลักดันสู่เป้าหมายในการออกกำลังกาย
                          </span>
                        </h5>
                      </div>
                    </div>
                    {this.props.challengePeriod && (
                      <button
                        type="button"
                        class="btn btn-danger col-6"
                        style={{ backgroundColor: "#F45197" }}
                        onClick={() => this.openPopupJoinChallenge()}
                      >
                        เข้าร่วมชาเลนจ์
                      </button>
                    )}
                  </center>
                  <div className="mt-4">
                    <center>
                      <h5
                        className="card-title underline-on-hover col-6"
                        style={{ cursor: "pointer", color: "#F45197" }}
                        onClick={() => this.openPopupRulesAndPrizes()}
                      >
                        กฎกติกาและของรางวัล
                      </h5>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderPopupJoinChallenge() {
    return (
      <div>
        <div
          className="overlayContainerPopupJoinChallenge"
          id="overlayPopupJoinChallenge"
          onClick={() => this.closePopupJoinChallenge()}
        />
        <div
          className="popupJoinChallenge"
          id="popupJoinChallenge"
          style={{ borderRadius: "25px" }}
        >
          <br></br>
          <center>
            <img
              src={`../assets/img/challenges/champ.png`}
              className="rounded-circle mb-3"
            />
            <h4 className="mt-1 mb-3" style={{ color: "#F45197" }}>
              <b>คุณต้องการเข้าร่วมชาเลนจ์หรือไม่</b>
            </h4>
          </center>
          {this.props.statusGetNumberOfTeamNotFull !== "loading" ? (
            <div className="row mt-5">
              <div className="col-1"></div>
              <button
                type="button"
                className="btn btn-secondary col-4"
                style={{
                  backgroundColor: "white",
                  color: "#F45197",
                  borderColor: "#F45197",
                }}
                onClick={() => this.closePopupJoinChallenge()}
              >
                ยกเลิก
              </button>
              <div className="col-2"></div>
              <button
                type="button"
                className="btn btn-danger col-4"
                style={{ backgroundColor: "#F45197" }}
                onClick={() =>
                  this.props.getNumberOfTeamNotFull(this.props.user.fb_group)
                }
              >
                เข้าร่วม
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

  renderPopupRulesAndPrizes() {
    return (
      <div>
        <div
          className="overlayContainerPopupRulesAndPrizes"
          id="overlayPopupRulesAndPrizes"
          onClick={() => this.closePopupRulesAndPrizes()}
        />
        <div className="popupRulesAndPrizes" id="popupRulesAndPrizes">
          <div
            className="close-btn"
            onClick={() => this.closePopupRulesAndPrizes()}
          >
            &times;
          </div>
          <br></br>
          <h4 className="mt-1 mb-4">
            <b>กฎและกติกา</b>
          </h4>
          <h5 style={{ color: "#F45197" }}>
            <b>• สมาชิกในทีม</b>
          </h5>
          <h6>
            1 ทีม จะมีสมาชิกจำนวน 10 ท่าน โดยระบบจะทำการจัดทีมให้อัตโนมัติ
          </h6>
          <h6>หากสมาชิกหมดอายุก่อนจบ Season ระบบจะตัดออกจากกลุ่มใน 7 วัน</h6>
          <br></br>
          <h5 style={{ color: "#F45197" }}>
            <b>• การเลื่อนขั้น (Rank)</b>
          </h5>
          <h6>
            ระดับขั้นจะแบ่งออกเป็น Newbie, Bronze, Silver, Gold และ Platinum
          </h6>
          <h6>
            ในแต่ละสัปดาห์ถ้ามีคะแนนรวมมากกว่า 40 คะแนนจะได้รับการเลื่อนขั้น
          </h6>
          <h6>
            แต่หากคะแนนน้อยกว่าหรือเท่ากับ 40 คะแนนจะถูดลดขั้นลงมา 1 ลำดับ{" "}
          </h6>
          <h6>โดยระบบจะทำการอัปเดตคะแนนทุกวันอาทิตย์เวลา 00.00 น.</h6>
          <br></br>
          <h5 style={{ color: "#F45197" }}>
            <b>• การสะสมคะแนน</b>
          </h5>
          <h6>
            <b>คะแนนส่วนบุคคล</b> จะได้รับจากภารกิจ โดยจำนวนคะแนนที่ได้รับนั้น
          </h6>
          <h6>
            จะขึ้นอยู่กับ Rank ในแต่ละสัปดาห์ ยิ่ง Rank สูงจะได้คะแนนมากขึ้น
          </h6>
          <h6>
            <b>คะแนนของทีม</b> จะเป็นคะแนนสะสมรวมของสมาชิก
          </h6>
          <h6>ถ้าคนในทีมทำภารกิจสำเร็จ ผู้ร่วมทีมจะได้รับคะแนนด้วยเช่นกัน</h6>
          <br></br>
          <h5 style={{ color: "#F45197" }}>
            <b>• รายละเอียดของรางวัลประจำ Season</b>
          </h5>
          <h6>สามารถติดตามของรางวัลได้ทาง Facebook Group</h6>
          <br></br>
          {/*  <h5 style={{ color: "#F45197" }}><b>• ระยะเวลาชาเลนจ์</b></h5>
          <h6>เริ่มตั้งแต่วันที่ 4 ตุลาคม 2561 สิ้นสุดวันที่ 28 พฤศจิกายน 2561</h6> */}
          {this.props.statusGetNumberOfTeamNotFull !== "loading" ? (
            <div className="row mt-3">
              <div className="col-3"></div>
              <button
                type="button"
                className="btn btn-secondary col-6"
                style={{ backgroundColor: "#F45197" }}
                onClick={() => this.closePopupRulesAndPrizes()}
              >
                ปิด
              </button>
              <div className="col-3"></div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }

  renderPopupScoreDetail() {
    return (
      <div>
        <div
          className="overlayContainerPopupScoreDetail"
          id="overlayPopupScoreDetail"
          onClick={() => this.closePopupScoreDetail()}
        />
        <div className="popupScoreDetail" id="popupScoreDetail">
          <div
            className="close-btn"
            onClick={() => this.closePopupScoreDetail()}
          >
            &times;
          </div>
          <br></br>
          <h4 className="mt-1 mb-4">
            <b>รายละเอียดคะแนน</b>
          </h4>
          <h5 style={{ color: "#F45197" }}>
            <b>• รายการชาเลนจ์แบบเดี่ยว</b>
          </h5>
          <h6>
            <b>ชั่งน้ำหนักครบ 2 ครั้ง</b> จะได้รับ 10 คะแนน
          </h6>
          <h6>
            <b>น้ำหนักลดลงจากสัปดาห์ก่อน</b> จะได้รับ 10 คะแนน
          </h6>
          <h6>
            <b>รอบเอวลดลงจากสัปดาห์ก่อน</b> จะได้รับ 10 คะแนน
          </h6>
          <h6>
            <b>ออกกำลังกายครบทุกวันในสัปดาห์</b> จะได้รับ 10 คะแนน
          </h6>
          <h6>
            <b>ทำ Random Exercise Snacks 4 ครั้ง</b> จะได้รับ 10 คะแนน
          </h6>
          <h6>
            <b>ทำ Random Exercise Snacks 5 ครั้ง</b> จะได้รับคะแนนพิเศษ 2 คะแนน
          </h6>
          <h6>
            <b>ทำ Random Exercise Snacks 6 ครั้ง</b> จะได้รับคะแนนพิเศษ 3 คะแนน
          </h6>
          <h6>
            <b>ทำ Random Exercise Snacks 7 ครั้ง</b> จะได้รับคะแนนพิเศษ 5 คะแนน
          </h6>
          <br></br>
          <h5 style={{ color: "#F45197" }}>
            <b>• รายการชาเลนจ์แบบทีม</b>
          </h5>
          <h6>
            <b>สมาชิกทุกคนชั่งน้ำหนักครบ 2 ครั้ง</b> ทั้งทีมจะได้รับ คนละ 10
            คะแนน
          </h6>
          <h6>
            <b>ในแต่ละวันมีสมาชิกอย่างน้อย 1คน ชั่งน้ำหนัก</b>
          </h6>
          <h6>
            <b> - ครบ 7 วัน</b> ทั้งทีมจะได้รับ คนละ 70 คะแนน
          </h6>
          <h6>
            <b> - ครบ 6 วัน</b> ทั้งทีมจะได้รับ คนละ 60 คะแนน
          </h6>
          <h6>
            <b> - ครบ 5 วัน</b> ทั้งทีมจะได้รับ คนละ 50 คะแนน
          </h6>
          <h6>
            <b> - ครบ 4 วัน</b> ทั้งทีมจะได้รับ คนละ 40 คะแนน
          </h6>
          <h6>
            <b> - ครบ 3 วัน</b> ทั้งทีมจะได้รับ คนละ 30 คะแนน
          </h6>
          <h6>
            <b> - ครบ 2 วัน</b> ทั้งทีมจะได้รับ คนละ 20 คะแนน
          </h6>
          <h6>
            <b> - ครบ 1 วัน</b> ทั้งทีมจะได้รับ คนละ 10 คะแนน
          </h6>
          <br></br>
          <h5 style={{ color: "#F45197" }}>
            <b>• Bonus Rank</b>
          </h5>
          <h6>
            <b>หากสัปดาห์นั้นอยู่ใน Rank "Gold"</b> จะได้รับคะแนนพิเศษ 5 คะแนน
          </h6>
          <h6>
            <b>หากสัปดาห์นั้นอยู่ใน Rank "Platinum"</b> จะได้รับคะแนนพิเศษ 10
            คะแนน
          </h6>
          <br></br>
          <h6 style={{ color: "#F45197" }}>
            <b>ระบบจะทำการอัปเดตคะแนนทุกวันอาทิตย์เวลา 00.00 น.</b>
          </h6>
          {this.props.statusGetNumberOfTeamNotFull !== "loading" ? (
            <div className="row mt-3">
              <div className="col-3"></div>
              <button
                type="button"
                className="btn btn-secondary col-6"
                style={{ backgroundColor: "#F45197" }}
                onClick={() => this.closePopupScoreDetail()}
              >
                ปิด
              </button>
              <div className="col-3"></div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }

  openPopupJoinChallenge() {
    document.getElementById("popupJoinChallenge").classList.toggle("active");
    document
      .getElementById("overlayPopupJoinChallenge")
      .classList.toggle("active");
  }

  closePopupJoinChallenge() {
    document.getElementById("popupJoinChallenge").classList.toggle("active");
    document
      .getElementById("overlayPopupJoinChallenge")
      .classList.toggle("active");
  }

  openPopupRulesAndPrizes() {
    document.getElementById("popupRulesAndPrizes").classList.toggle("active");
    document
      .getElementById("overlayPopupRulesAndPrizes")
      .classList.toggle("active");
  }

  closePopupRulesAndPrizes() {
    document.getElementById("popupRulesAndPrizes").classList.toggle("active");
    document
      .getElementById("overlayPopupRulesAndPrizes")
      .classList.toggle("active");
  }

  openPopupScoreDetail() {
    document.getElementById("popupScoreDetail").classList.toggle("active");
    document
      .getElementById("overlayPopupScoreDetail")
      .classList.toggle("active");
  }

  closePopupScoreDetail() {
    document.getElementById("popupScoreDetail").classList.toggle("active");
    document
      .getElementById("overlayPopupScoreDetail")
      .classList.toggle("active");
  }

  autoClick(e) {
    document.getElementById(e).click();
  }
  copyLink() {
    // Get the text field
    var copyText = document.getElementById("copyLink");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }

  /* เเชร์  */
  super() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement3.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame42} className="frame40" />
            {/* <img src={icon_web} className="icon_web" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">ทีมอันดับที่ 1 ประจำสัปดาห์</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share3"
                  onClick={(e) => this.autoClick("modalAchievement3")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom3"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div>
                  <div className="box-share center2">
                    <FacebookShareButton url={urlShare}>
                      <img src={facebook} className="icon-share" />
                    </FacebookShareButton>
                    {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                    {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                    {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                    <LineShareButton url={urlShare}>
                      <img src={line} className="icon-share" />
                    </LineShareButton>
                    {/* <img src={tiktok} className="icon-share" /> */}
                    <WhatsappShareButton url={urlShare}>
                      <img src={whatsApp} className="icon-share" />
                    </WhatsappShareButton>
                    {/*  <img src={instagram} className="icon-share" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  wow() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement4.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame43} className="frame40" />
            {/* <img src={icon_web} className="icon_web" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">ทีมอันดับที่ 2 ประจำสัปดาห์</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share4"
                  onClick={(e) => this.autoClick("modalAchievement4")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom4"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div className="box-share center2">
                  <FacebookShareButton url={urlShare}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                  {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                  {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                  <LineShareButton url={urlShare}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  {/* <img src={tiktok} className="icon-share" /> */}
                  <WhatsappShareButton url={urlShare}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                  {/*  <img src={instagram} className="icon-share" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  thankYou() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement5.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame44} className="frame40" />
            {/* <img src={icon_web} className="icon_web" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">ทีมอันดับ Top 10 ประจำสัปดาห์</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share5"
                  onClick={(e) => this.autoClick("modalAchievement5")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom5"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div className="box-share center2">
                  <FacebookShareButton url={urlShare}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                  {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                  {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                  <LineShareButton url={urlShare}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  {/* <img src={tiktok} className="icon-share" /> */}
                  <WhatsappShareButton url={urlShare}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                  {/*  <img src={instagram} className="icon-share" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  bang() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement1.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame47} className="frame40" />
            {/* <img src={icon_web} className="icon_web" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">ทำคะแนนได้สูงสุดประจำสัปดาห์</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share1"
                  onClick={(e) => this.autoClick("modalAchievement1")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom1"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div className="box-share center2">
                  <FacebookShareButton url={urlShare}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                  {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                  {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                  <LineShareButton url={urlShare}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  {/* <img src={tiktok} className="icon-share" /> */}
                  <WhatsappShareButton url={urlShare}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                  {/*  <img src={instagram} className="icon-share" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  staycool() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement6.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame40} className="frame40" />
            {/* <img src={icon_web} className="icon_web2" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">คุณมีเพื่อนในรายชื่อ 10 คนแล้ว!</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share6"
                  onClick={(e) => this.autoClick("modalAchievement6")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom6"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div className="box-share center2">
                  <FacebookShareButton url={urlShare}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                  {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                  {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                  <LineShareButton url={urlShare}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  {/* <img src={tiktok} className="icon-share" /> */}
                  <WhatsappShareButton url={urlShare}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                  {/*  <img src={instagram} className="icon-share" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  pop() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement7.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame46} className="frame40" />
            {/* <img src={icon_web} className="icon_web" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">คุณมีเพื่อนในรายชื่อครบ 15 คนแล้ว!</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share7"
                  onClick={(e) => this.autoClick("modalAchievement7")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom7"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div className="box-share center2">
                  <FacebookShareButton url={urlShare}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                  {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                  {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                  <LineShareButton url={urlShare}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  {/* <img src={tiktok} className="icon-share" /> */}
                  <WhatsappShareButton url={urlShare}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                  {/*  <img src={instagram} className="icon-share" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  goodJob() {
    const urlShare =
      "https://preemworkout.pynk.co/achievement/achievement8.html";
    return (
      <div class="text-center">
        <div class="row justify-content-md-center">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <img src={frame45} className="frame40" />
            {/* <img src={icon_web} className="icon_web" /> */}
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6  ">
            <div className="canterMode-box">
              <p className="modeText-box">ทำภารกิจครบทุกสัปดาห์จนจบฤดูกาล</p>
              <div className="bottom-shareBox">
                <button
                  type="button"
                  className="btn bottom-share"
                  id="bottom-share8"
                  onClick={(e) => this.autoClick("modalAchievement8")}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom8"
                  aria-controls="offcanvasBottom"
                >
                  {" "}
                  แชร์ความสำเร็จ{" "}
                </button>
              </div>
              <div className="display-btn">
                <hr />
                <p className="share-success">แชร์ความสำเร็จ</p>
                <div className="box-share center2">
                  <FacebookShareButton url={urlShare}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  {/* <TwitterShareButton url={urlShare}>
                  <img src={twitter} className="icon-share" />
                </TwitterShareButton> */}
                  {/* appId={} ต้องใช้ appId ถึงจะแชร์ได้  */}
                  {/* <FacebookMessengerShareButton url={urlShare} >
                  <img src={message} className="icon-share" />
                </FacebookMessengerShareButton> */}
                  <LineShareButton url={urlShare}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  {/* <img src={tiktok} className="icon-share" /> */}
                  <WhatsappShareButton url={urlShare}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                  {/*  <img src={instagram} className="icon-share" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { numberOfTeamNotFull, statusGetNumberOfTeamNotFull, user } =
      this.props;
    const urlShare1 =
      "https://preemworkout.pynk.co/achievement/achievement1.html";
    const urlShare3 =
      "https://preemworkout.pynk.co/achievement/achievement2.html";
    const urlShare4 =
      "https://preemworkout.pynk.co/achievement/achievement3.html";
    const urlShare5 =
      "https://preemworkout.pynk.co/achievement/achievement4.html";
    const urlShare6 =
      "https://preemworkout.pynk.co/achievement/achievement5.html";
    const urlShare7 =
      "https://preemworkout.pynk.co/achievement/achievement6.html";
    const urlShare8 =
      "https://preemworkout.pynk.co/achievement/achievement7.html";
    return (
      <>
        <div>
          {this.renderPopupFriendRequest()}
          {this.renderPopupTeamInvite()}
          {
            user && user.group_id
              ? this.renderChallenge()
              : this.renderChallenge()
            /*  (statusGetNumberOfTeamNotFull === "default" || numberOfTeamNotFull > 0) ?
               this.renderJoinChallenge()
               :
               this.renderCreateTeam() */
          }

          {
            <button
              style={{ display: "none" }}
              id="modalAchievement3Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement3"
            >
              modalAchievement3
            </button>
          }
          {
            <button
              style={{ display: "none" }}
              id="modalAchievement4Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement4"
            >
              modalAchievement4
            </button>
          }
          {
            <button
              style={{ display: "none" }}
              id="modalAchievement5Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement5"
            >
              modalAchievement5
            </button>
          }
          {
            <button
              style={{ display: "none" }}
              id="modalAchievement6Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement6"
            >
              achievement6
            </button>
          }
          {
            <button
              style={{ display: "none" }}
              id="modalAchievement7Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement7"
            >
              achievement7
            </button>
          }
          {
            <button
              style={{ display: "none" }}
              id="modalAchievement8Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement8"
            >
              achievement8
            </button>
          }
          {
            <button
              style={{ display: "none" }}
              id="modalAchievement1Btn"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalAchievement1"
            >
              modalAchievement1
            </button>
          }
          <div
            class="modal fade"
            id="modalAchievement3"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog  modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription">{this.super()}</div>
              </div>
            </div>
          </div>

          {/* <!-- Modal  achievement4 --> */}
          <div
            class="modal fade"
            id="modalAchievement4"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog   modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription">{this.wow()}</div>
              </div>
            </div>
          </div>
          {/* <!-- Modal  achievement5 --> */}
          <div
            class="modal fade"
            id="modalAchievement5"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog   modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription">{this.thankYou()}</div>
              </div>
            </div>
          </div>
          {/* <!-- Modal  achievement6 --> */}
          <div
            class="modal fade"
            id="modalAchievement6"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog   modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription2">{this.staycool()}</div>
              </div>
            </div>
          </div>
          {/* <!-- Modal  achievement7 --> */}
          <div
            class="modal fade"
            id="modalAchievement7"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog   modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription">{this.pop()}</div>
              </div>
            </div>
          </div>
          {/* <!-- Modal  achievement8 --> */}
          <div
            class="modal fade"
            id="modalAchievement8"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog   modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription">{this.goodJob()}</div>
              </div>
            </div>
          </div>
          {/* <!-- Modal  achievement1 --> */}
          <div
            class="modal fade"
            id="modalAchievement1"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog   modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div></div>
                  <div
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    x
                  </div>
                </div>
                <div class="modal-subscription">{this.bang()}</div>
              </div>
            </div>
          </div>
        </div>

        {/*    offcanvas */}
        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom1"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index ">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare1}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare1}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare1}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare1}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom3"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index ">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare3}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare3}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare3}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare3}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom4"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index ">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare4}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare4}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare4}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare4}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom5"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index ">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare5}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare5}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare5}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare5}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom6"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index ">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare6}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare6}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare6}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare6}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom7"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare7}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare7}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare7}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare7}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="offcanvas offcanvas-bottom"
          tabindex="-1"
          id="offcanvasBottom8"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasBottomLabel"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="offcanvas-body small offcanvas-index ">
            <div className="row2">
              <p class="offcanvas-title share-to" id="offcanvasBottomLabel">
                แชร์ไปที่
              </p>
              <div className="center">
                <div className="box-shareMobile">
                  <FacebookShareButton url={urlShare8}>
                    <img src={facebook} className="icon-share" />
                  </FacebookShareButton>
                  <LineShareButton url={urlShare8}>
                    <img src={line} className="icon-share" />
                  </LineShareButton>
                  <WhatsappShareButton url={urlShare8}>
                    <img src={whatsApp} className="icon-share" />
                  </WhatsappShareButton>
                </div>
              </div>
              <div className="copy-link">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="copyLink"
                    placeholder="Copy"
                    value={urlShare8}
                    disabled
                  />
                  <button
                    className="button-copyLink"
                    id="button-copyLink"
                    onClick={(e) => this.copyLink()}
                  >
                    <img className="copyLink-img" src={copyLink} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ authUser, challenges, exerciseVideos, get }) => {
  const { user } = authUser;
  const {
    exerciseVideo,
    statusVideoList,
    week,
    videoExerciseSnack,
    statsGetExerciseSnack,
  } = exerciseVideos;
  const { allMemberStayFit } = get;
  const {
    friend_request_sent,
    statusGetFriendRequestSent,
    statusCancelFriendRequest,
    rank,
    logWeightCount,
    isReducedWeight,
    logWeightTeamCount,
    numberOfMembers,
    dailyTeamWeightBonusCount,
    numberOfTeamNotFull,
    statusGetNumberOfTeamNotFull,
    statusLeaveTeam,
    membersOfTeam,
    group_name,
    totalScoreOfTeam,
    teamRank,
    individualRank,
    statusCreateTeam,
    challengePeriod,
    friend_list,
    statusGetFriendList,
    max_friends,
    statusGetMaxFriends,
    statusSendFriendRequest,
    friend_request,
    statusGetFriendRequest,
    statusAcceptFriend,
    statusRejectFriend,
    statusDeleteFriend,
    friendsRank,
    statusGetFriendsRank,
    statusSendTeamInvite,
    statusGetTeamInvite,
    team_invite,
    statusAcceptTeamInvite,
    statusRejectTeamInvite,
    statusGetAchievement,
    achievementLog,
    statusUpdateAchievement,
    statusCheckAllMissionComplete,
    statusGetLeaderBoard,
    statusGetTeamInviteSent,
    team_invite_sent,
    statusCancelTeamInvite,
    waistInWeekResult,
  } = challenges;
  return {
    user,
    rank,
    logWeightCount,
    exerciseVideo,
    statusVideoList,
    isReducedWeight,
    logWeightTeamCount,
    numberOfMembers,
    dailyTeamWeightBonusCount,
    numberOfTeamNotFull,
    statusGetNumberOfTeamNotFull,
    statusLeaveTeam,
    membersOfTeam,
    group_name,
    totalScoreOfTeam,
    teamRank,
    individualRank,
    statusCreateTeam,
    challengePeriod,
    friend_list,
    statusGetFriendList,
    max_friends,
    statusGetMaxFriends,
    statusSendFriendRequest,
    friend_request,
    statusGetFriendRequest,
    statusAcceptFriend,
    statusRejectFriend,
    statusDeleteFriend,
    friendsRank,
    statusGetFriendsRank,
    statusSendTeamInvite,
    statusGetTeamInvite,
    team_invite,
    statusAcceptTeamInvite,
    statusRejectTeamInvite,
    statusGetAchievement,
    achievementLog,
    statusUpdateAchievement,
    statusCheckAllMissionComplete,
    statusGetLeaderBoard,
    allMemberStayFit,
    friend_request_sent,
    statusGetFriendRequestSent,
    statusCancelFriendRequest,
    statusGetTeamInviteSent,
    team_invite_sent,
    statusCancelTeamInvite,
    waistInWeekResult,
    week,
    videoExerciseSnack,
    statsGetExerciseSnack,
  };
};

const mapActionsToProps = {
  getRank,
  getLogWeight,
  getIsReducedWeight,
  getLogWeightTeam,
  getDailyTeamWeightBonus,
  getNumberOfTeamNotFull,
  assignGroupToMember,
  getGroupID,
  clearChallenges,
  createChallengeGroup,
  leaveTeam,
  getMembersAndRank,
  getGroupName,
  getScoreOfTeam,
  getLeaderboard,
  getChallengePeriod,
  getFriendList,
  getMaxFriends,
  checkUpdateMaxFriends,
  sendFriendRequest,
  getFriendRequest,
  acceptFriend,
  rejectFriend,
  deleteFriend,
  getFriendsRank,
  sendTeamInvite,
  getTeamInvite,
  acceptTeamInvite,
  rejectTeamInvite,
  getAchievementLog,
  updateAchievementLog,
  checkAllMissionComplete,
  getAllMemberStayFit,
  getFriendRequestSent,
  cancelFriendRequest,
  getTeamInviteSent,
  cancelTeamInvite,
  getIsReducedWaist,
  getExerciseSnack,
};

export default connect(mapStateToProps, mapActionsToProps)(Challenges);
