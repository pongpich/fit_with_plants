import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  GET_RANK: "GET_RANK",
  GET_RANK_SUCCESS: "GET_RANK_SUCCESS",
  GET_LOG_WEIGHT: "GET_LOG_WEIGHT",
  GET_LOG_WEIGHT_SUCCESS: "GET_LOG_WEIGHT_SUCCESS",
  GET_LOG_WEIGHT_TEAM: "GET_LOG_WEIGHT_TEAM",
  GET_LOG_WEIGHT_TEAM_SUCCESS: "GET_LOG_WEIGHT_TEAM_SUCCESS",
  GET_NUMBER_OF_MEMBERS_TEAM: "GET_NUMBER_OF_MEMBERS_TEAM",
  GET_IS_REDUCED_WEIGHT: "GET_IS_REDUCED_WEIGHT",
  GET_IS_REDUCED_WEIGHT_SUCCESS: "GET_IS_REDUCED_WEIGHT_SUCCESS",
  GET_IS_REDUCED_WAIST: "GET_IS_REDUCED_WAIST",
  GET_IS_REDUCED_WAIST_SUCCESS: "GET_IS_REDUCED_WAIST_SUCCESS",
  GET_DAILY_TEAM_WEIGHT_BONUS: "GET_DAILY_TEAM_WEIGHT_BONUS",
  GET_DAILY_TEAM_WEIGHT_BONUS_SUCCESS: "GET_DAILY_TEAM_WEIGHT_BONUS_SUCCESS",
  GET_DAILY_WEIGH_CHALLENGE: "GET_DAILY_WEIGH_CHALLENGE",
  GET_DAILY_WEIGH_CHALLENGE_SUCCESS: "GET_DAILY_WEIGH_CHALLENGE_SUCCESS",
  POST_DAILY_WEIGH_CHALLENGE: "POST_DAILY_WEIGH_CHALLENGE",
  POST_DAILY_WEIGH_CHALLENGE_SUCCESS: "POST_DAILY_WEIGH_CHALLENGE_SUCCESS",
  GET_NUMBER_OF_TEAM_NOT_FULL: "GET_NUMBER_OF_TEAM_NOT_FULL",
  GET_NUMBER_OF_TEAM_NOT_FULL_SUCCESS: "GET_NUMBER_OF_TEAM_NOT_FULL_SUCCESS",
  ASSIGN_GROUP_TO_MEMBER: "ASSIGN_GROUP_TO_MEMBER",
  ASSIGN_GROUP_TO_MEMBER_SUCCESS: "ASSIGN_GROUP_TO_MEMBER_SUCCESS",
  CLEAR_CHALLENGES: "CLEAR_CHALLENGES",
  CREATE_CHALLENGE_GROUP: "CREATE_CHALLENGE_GROUP",
  CREATE_CHALLENGE_GROUP_SUCCESS: "CREATE_CHALLENGE_GROUP_SUCCESS",
  CREATE_CHALLENGE_GROUP_FAIL: "CREATE_CHALLENGE_GROUP_FAIL",
  LEAVE_TEAM: "LEAVE_TEAM",
  LEAVE_TEAM_SUCCESS: "LEAVE_TEAM_SUCCESS",
  GET_MEMBERS_AND_RANK: "GET_MEMBERS_AND_RANK",
  GET_MEMBERS_AND_RANK_SUCCESS: "GET_MEMBERS_AND_RANK_SUCCESS",
  GET_GROUP_NAME: "GET_GROUP_NAME",
  GET_GROUP_NAME_SUCCESS: "GET_GROUP_NAME_SUCCESS",
  GET_SCORE_OF_TEAM: "GET_SCORE_OF_TEAM",
  GET_SCORE_OF_TEAM_SUCCESS: "GET_SCORE_OF_TEAM_SUCCESS",
  GET_LEADER_BOARD: "GET_LEADER_BOARD",
  GET_LEADER_BOARD_SUCCESS: "GET_LEADER_BOARD_SUCCESS",
  GET_CHALLENGE_PERIOD: "GET_CHALLENGE_PERIOD",
  GET_CHALLENGE_PERIOD_SUCCESS: "GET_CHALLENGE_PERIOD_SUCCESS",
  SELECT_MEMBER_EVENT_LOG: "SELECT_MEMBER_EVENT_LOG",
  SELECT_MEMBER_EVENT_LOG_SUCCESS: "SELECT_MEMBER_EVENT_LOG_SUCCESS",
  GET_FRIEND_LIST: "GET_FRIEND_LIST",
  GET_FRIEND_LIST_SUCCESS: "GET_FRIEND_LIST_SUCCESS",
  GET_FRIEND_LIST_FAIL: "GET_FRIEND_LIST_FAIL",
  GET_MAX_FRIENDS: "GET_MAX_FRIENDS",
  GET_MAX_FRIENDS_SUCCESS: "GET_MAX_FRIENDS_SUCCESS",
  GET_MAX_FRIENDS_FAIL: "GET_MAX_FRIENDS_FAIL",
  SEND_FRIEND_REQUEST: "SEND_FRIEND_REQUEST",
  SEND_FRIEND_REQUEST_SUCCESS: "SEND_FRIEND_REQUEST_SUCCESS",
  SEND_FRIEND_REQUEST_FAIL: "SEND_FRIEND_REQUEST_FAIL",
  GET_FRIEND_REQUEST: "GET_FRIEND_REQUEST",
  GET_FRIEND_REQUEST_SUCCESS: "GET_FRIEND_REQUEST_SUCCESS",
  GET_FRIEND_REQUEST_FAIL: "GET_FRIEND_REQUEST_FAIL",
  ACCEPT_FRIEND: "ACCEPT_FRIEND",
  ACCEPT_FRIEND_SUCCESS: "ACCEPT_FRIEND_SUCCESS",
  ACCEPT_FRIEND_FAIL: "ACCEPT_FRIEND_FAIL",
  REJECT_FRIEND: "REJECT_FRIEND",
  REJECT_FRIEND_SUCCESS: "REJECT_FRIEND_SUCCESS",
  REJECT_FRIEND_FAIL: "REJECT_FRIEND_FAIL",
  DELETE_FRIEND: "DELETE_FRIEND",
  DELETE_FRIEND_SUCCESS: "DELETE_FRIEND_SUCCESS",
  DELETE_FRIEND_FAIL: "DELETE_FRIEND_FAIL",
  GET_FRIENDS_RANK: "GET_FRIENDS_RANK",
  GET_FRIENDS_RANK_SUCCESS: "GET_FRIENDS_RANK_SUCCESS",
  GET_FRIENDS_RANK_FAIL: "GET_FRIENDS_RANK_FAIL",
  SEND_TEAM_INVITE: "SEND_TEAM_INVITE",
  SEND_TEAM_INVITE_SUCCESS: "SEND_TEAM_INVITE_SUCCESS",
  SEND_TEAM_INVITE_FAIL: "SEND_TEAM_INVITE_FAIL",
  GET_TEAM_INVITE: "GET_TEAM_INVITE",
  GET_TEAM_INVITE_SUCCESS: "GET_TEAM_INVITE_SUCCESS",
  GET_TEAM_INVITE_FAIL: "GET_TEAM_INVITE_FAIL",
  REJECT_TEAM_INVITE: "REJECT_TEAM_INVITE",
  REJECT_TEAM_INVITE_SUCCESS: "REJECT_TEAM_INVITE_SUCCESS",
  REJECT_TEAM_INVITE_FAIL: "REJECT_TEAM_INVITE_FAIL",
  ACCEPT_TEAM_INVITE: "ACCEPT_TEAM_INVITE",
  ACCEPT_TEAM_INVITE_SUCCESS: "ACCEPT_TEAM_INVITE_SUCCESS",
  ACCEPT_TEAM_INVITE_FAIL: "ACCEPT_TEAM_INVITE_FAIL",
  GET_ACHIEVEMENT_LOG: "GET_ACHIEVEMENT_LOG",
  GET_ACHIEVEMENT_LOG_SUCCESS: "GET_ACHIEVEMENT_LOG_SUCCESS",
  GET_ACHIEVEMENT_LOG_FAIL: "GET_ACHIEVEMENT_LOG_FAIL",
  UPDATE_ACHIEVEMENT_LOG: "UPDATE_ACHIEVEMENT_LOG",
  UPDATE_ACHIEVEMENT_LOG_SUCCESS: "UPDATE_ACHIEVEMENT_LOG_SUCCESS",
  UPDATE_ACHIEVEMENT_LOG_FAIL: "UPDATE_ACHIEVEMENT_LOG_FAIL",
  CHECK_ALL_MISSION_COMPLETE: "CHECK_ALL_MISSION_COMPLETE",
  CHECK_ALL_MISSION_COMPLETE_SUCCESS: "CHECK_ALL_MISSION_COMPLETE_SUCCESS",
  CHECK_ALL_MISSION_COMPLETE_FAIL: "CHECK_ALL_MISSION_COMPLETE_FAIL",
  GET_FRIEND_REQUEST_SENT: "GET_FRIEND_REQUEST_SENT",
  GET_FRIEND_REQUEST_SENT_SUCCESS: "GET_FRIEND_REQUEST_SENT_SUCCESS",
  GET_FRIEND_REQUEST_SENT_FAIL: "GET_FRIEND_REQUEST_SENT_FAIL",
  CANCEL_FRIEND_REQUEST: "CANCEL_FRIEND_REQUEST",
  CANCEL_FRIEND_REQUEST_SUCCESS: "CANCEL_FRIEND_REQUEST_SUCCESS",
  GET_TEAM_INVITE_SENT: "GET_TEAM_INVITE_SENT",
  GET_TEAM_INVITE_SENT_SUCCESS: "GET_TEAM_INVITE_SENT_SUCCESS",
  GET_TEAM_INVITE_SENT_FAIL: "GET_TEAM_INVITE_SENT_FAIL",
  CANCEL_TEAM_INVITE: "CANCEL_TEAM_INVITE",
  CANCEL_TEAM_INVITE_SUCCESS: "CANCEL_TEAM_INVITE_SUCCESS",
}

export const cancelTeamInvite = (
  sender_id,
  receiver_id
) => ({
  type: types.CANCEL_TEAM_INVITE,
  payload: {
    sender_id,
    receiver_id
  }
})

export const cancelFriendRequest = (
  sender_id,
  receiver_id
) => ({
  type: types.CANCEL_FRIEND_REQUEST,
  payload: {
    sender_id,
    receiver_id
  }
})

export const getFriendRequestSent = (user_id) => ({
  type: types.GET_FRIEND_REQUEST_SENT,
  payload: {
    user_id
  }
});

export const getTeamInviteSent = (user_id) => ({
  type: types.GET_TEAM_INVITE_SENT,
  payload: {
    user_id
  }
});

export const getAchievementLog = (user_id) => ({
  type: types.GET_ACHIEVEMENT_LOG,
  payload: {
    user_id
  }
})

export const updateAchievementLog = (
  user_id,
  achievement_name
) => ({
  type: types.UPDATE_ACHIEVEMENT_LOG,
  payload: {
    user_id,
    achievement_name
  }
});

export const checkAllMissionComplete = (
  user_id
) => ({
  type: types.CHECK_ALL_MISSION_COMPLETE,
  payload: {
    user_id
  }
});

export const acceptTeamInvite = (user_id, group_id, log_id) => ({
  type: types.ACCEPT_TEAM_INVITE,
  payload: {
    user_id, group_id, log_id
  }
});

export const rejectTeamInvite = (log_id) => ({
  type: types.REJECT_TEAM_INVITE,
  payload: {
    log_id
  }
});

export const getTeamInvite = (user_id) => ({
  type: types.GET_TEAM_INVITE,
  payload: {
    user_id
  }
});

export const sendTeamInvite = (user_id, to) => ({
  type: types.SEND_TEAM_INVITE,
  payload: {
    user_id,
    to
  }
})

export const getFriendsRank = (user_id) => ({
  type: types.GET_FRIENDS_RANK,
  payload: {
    user_id
  }
})

export const deleteFriend = (user_id, friend_email) => ({
  type: types.DELETE_FRIEND,
  payload: {
    user_id,
    friend_email
  }
});

export const rejectFriend = (log_id) => ({
  type: types.REJECT_FRIEND,
  payload: {
    log_id
  }
});

export const acceptFriend = (user_id, sender_id, log_id) => ({
  type: types.ACCEPT_FRIEND,
  payload: {
    user_id, sender_id, log_id
  }
});

export const getFriendRequest = (user_id) => ({
  type: types.GET_FRIEND_REQUEST,
  payload: {
    user_id
  }
});

export const sendFriendRequest = (user_id, to) => ({
  type: types.SEND_FRIEND_REQUEST,
  payload: {
    user_id,
    to
  }
})

export const getMaxFriends = (user_id) => ({
  type: types.GET_MAX_FRIENDS,
  payload: {
    user_id
  }
});

export const getFriendList = (user_id) => ({
  type: types.GET_FRIEND_LIST,
  payload: {
    user_id
  }
});

export const selectMemberEventLog = (email) => ({
  type: types.SELECT_MEMBER_EVENT_LOG,
  payload: {
    email
  }
});

export const getChallengePeriod = () => ({
  type: types.GET_CHALLENGE_PERIOD
})

export const getLeaderboard = () => ({
  type: types.GET_LEADER_BOARD
})

export const getScoreOfTeam = (group_id) => ({
  type: types.GET_SCORE_OF_TEAM,
  payload: {
    group_id
  }
})

export const getGroupName = (group_id) => ({
  type: types.GET_GROUP_NAME,
  payload: {
    group_id
  }
})

export const getMembersAndRank = (group_id, start_date) => ({
  type: types.GET_MEMBERS_AND_RANK,
  payload: {
    group_id,
    start_date
  }
})

export const leaveTeam = (user_id) => ({
  type: types.LEAVE_TEAM,
  payload: {
    user_id
  }
})

export const createChallengeGroup = (user_id, group_name, start_date, fb_group) => ({
  type: types.CREATE_CHALLENGE_GROUP,
  payload: {
    user_id,
    group_name,
    start_date,
    fb_group
  }
})

export const clearChallenges = () => ({
  type: types.CLEAR_CHALLENGES
})

export const assignGroupToMember = (user_id, start_date, fb_group) => ({
  type: types.ASSIGN_GROUP_TO_MEMBER,
  payload: {
    user_id,
    start_date,
    fb_group
  }
})

export const getNumberOfTeamNotFull = (fb_group) => ({
  type: types.GET_NUMBER_OF_TEAM_NOT_FULL,
  payload: {
    fb_group
  }
})

export const postDailyWeighChallenge = (user_id, weight) => ({
  type: types.POST_DAILY_WEIGH_CHALLENGE,
  payload: {
    user_id,
    weight
  }
});

export const getDailyWeighChallenge = (user_id) => ({
  type: types.GET_DAILY_WEIGH_CHALLENGE,
  payload: {
    user_id
  }
});

export const getDailyTeamWeightBonus = (user_id) => ({
  type: types.GET_DAILY_TEAM_WEIGHT_BONUS,
  payload: {
    user_id
  }
});

export const getRank = (user_id, start_date) => ({
  type: types.GET_RANK,
  payload: {
    user_id,
    start_date
  }
});

export const getLogWeight = (user_id) => ({
  type: types.GET_LOG_WEIGHT,
  payload: {
    user_id
  }
});

export const getLogWeightTeam = (group_id) => ({
  type: types.GET_LOG_WEIGHT_TEAM,
  payload: {
    group_id
  }
});

export const getIsReducedWeight = (user_id) => ({
  type: types.GET_IS_REDUCED_WEIGHT,
  payload: {
    user_id
  }
});

export const getIsReducedWaist = (user_id) => ({
  type: types.GET_IS_REDUCED_WAIST,
  payload: {
    user_id
  }
});

/* END OF ACTION Section */

/* SAGA Section */

const cancelFriendRequestSagaAsync = async (
  sender_id,
  receiver_id
) => {
  try {
    const apiResult = await API.put("bebe", "/cancelFriendRequest", {
      body: {
        sender_id,
        receiver_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const cancelTeamInviteSagaAsync = async (
  sender_id,
  receiver_id
) => {
  try {
    const apiResult = await API.put("bebe", "/cancelTeamInvite", {
      body: {
        sender_id,
        receiver_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getFriendRequestSentSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getFriendRequestSent", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getTeamInviteSentSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getTeamInviteSent", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const checkAllMissionCompleteSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.post("bebe", "/checkAllMissionCompelete", {
      body: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const updateAchievementLogSagaAsync = async (
  user_id,
  achievement_name
) => {
  try {
    const apiResult = await API.post("bebe", "/updateAchievementLog", {
      body: {
        user_id,
        achievement_name
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getAchievementLogSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getAchievementLog", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const acceptTeamInviteSagaAsync = async (
  user_id,
  group_id,
  log_id
) => {
  try {
    const apiResult = await API.put("bebe", "/acceptTeamInvite", {
      body: {
        user_id,
        group_id,
        log_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const rejectTeamInviteSagaAsync = async (
  log_id
) => {
  try {
    const apiResult = await API.put("bebe", "/rejectTeamInvite", {
      body: {
        log_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getTeamInviteSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getTeamInvite", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const sendTeamInviteSagaAsync = async (
  user_id,
  to
) => {
  try {
    const apiResult = await API.post("bebe", "/sendTeamInvite", {
      body: {
        user_id,
        to
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getFriendsRankSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getFriendsRank", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const deleteFriendSagaAsync = async (
  user_id,
  friend_email
) => {
  try {
    const apiResult = await API.put("bebe", "/deleteFriend", {
      body: {
        user_id,
        friend_email
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const rejectFriendSagaAsync = async (
  log_id
) => {
  try {
    const apiResult = await API.put("bebe", "/rejectFriend", {
      body: {
        log_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const acceptFriendSagaAsync = async (
  user_id,
  sender_id,
  log_id
) => {
  try {
    const apiResult = await API.put("bebe", "/acceptFriend", {
      body: {
        user_id,
        sender_id,
        log_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getFriendRequestSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getFriendRequest", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const sendFriendRequestSagaAsync = async (
  user_id,
  to
) => {
  try {
    const apiResult = await API.post("bebe", "/sendFriendRequest", {
      body: {
        user_id,
        to
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getMaxFriendsSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getMaxFriends", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getFriendListSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getFriendList", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getRankSagaAsync = async (
  user_id,
  start_date
) => {
  try {
    const apiResult = await API.get("bebe", "/getRank", {
      queryStringParameters: {
        user_id,
        start_date
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getLogWeightSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getLogWeight", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getNumberOfTeamNotFullSagaAsync = async (
  fb_group
) => {
  try {
    const apiResult = await API.get("bebe", "/getNumberOfTeamNotFull", {
      queryStringParameters: {
        fb_group
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getLeaderboardSagaAsync = async (

) => {
  try {
    const apiResult = await API.get("bebe", "/getLeaderboard", {
      queryStringParameters: {
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getChallengePeriodSagaAsync = async (

) => {
  try {
    const apiResult = await API.get("bebe", "/getChallengePeriod", {
      queryStringParameters: {
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getLogWeightTeamSagaAsync = async (
  group_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getLogWeightTeam", {
      queryStringParameters: {
        group_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getIsReducedWeightSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getIsReducedWeight", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getIsReducedWaistSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getIsReducedWaist", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const selectMemberEventLogSagaAsync = async (
  email
) => {
  try {
    const apiResult = await API.get("bebe", "/selectMemberEventLog", {
      queryStringParameters: {
        email
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getDailyWeighChallengeSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getDailyWeighChallenge", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const postDailyWeighChallengeSagaAsync = async (
  user_id,
  weight
) => {
  try {
    const apiResult = await API.post("bebe", "/daily_weight_score", {
      body: {
        user_id,
        weight
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const assignGroupToMemberSagaAsync = async (
  user_id,
  start_date,
  fb_group
) => {
  try {
    const apiResult = await API.post("bebe", "/assignGroupToMember", {
      body: {
        user_id,
        start_date,
        fb_group
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const createChallengeGroupSagaAsync = async (
  user_id,
  group_name,
  start_date,
  fb_group
) => {
  try {
    const apiResult = await API.post("bebe", "/createChallengeGroup", {
      body: {
        user_id,
        group_name,
        start_date,
        fb_group
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const leaveTeamSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.post("bebe", "/leaveTeam", {
      body: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getMembersAndRankSagaAsync = async (
  group_id,
  start_date
) => {
  try {
    const apiResult = await API.get("bebe", "/getMembersAndRank", {
      queryStringParameters: {
        group_id,
        start_date
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getGroupNameSagaAsync = async (
  group_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getGroupName", {
      queryStringParameters: {
        group_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getScoreOfTeamSagaAsync = async (
  group_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getScoreOfTeam", {
      queryStringParameters: {
        group_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const getDailyTeamWeightBonusSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getDailyTeamWeightBonus", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

function* checkAllMissionCompleteSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      checkAllMissionCompleteSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.CHECK_ALL_MISSION_COMPLETE_SUCCESS
      })
    } else {
      yield put({
        type: types.CHECK_ALL_MISSION_COMPLETE_FAIL
      })
    }

  } catch (error) {
    console.log("error from acceptFriendSaga :", error);
  }
}

function* getAchievementLogSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getAchievementLogSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_ACHIEVEMENT_LOG_SUCCESS,
        payload: apiResult.results.achievementLog
      })
    } else {
      yield put({
        type: types.GET_ACHIEVEMENT_LOG_FAIL
      })
    }

  } catch (error) {
    console.log("error from getAchievementLogSaga :", error);
  }
}

function* acceptTeamInviteSaga({ payload }) {
  const {
    user_id,
    group_id,
    log_id
  } = payload
  try {
    const apiResult = yield call(
      acceptTeamInviteSagaAsync,
      user_id,
      group_id,
      log_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.ACCEPT_TEAM_INVITE_SUCCESS
      })
    } else if (apiResult.results.message === "already_have_team") {
      yield put({
        type: types.ACCEPT_TEAM_INVITE_FAIL
      })
    }

  } catch (error) {
    console.log("error from acceptTeamInviteSaga :", error);
  }
}

function* updateAchievementLogSaga({ payload }) {
  const {
    user_id,
    achievement_name
  } = payload
  try {
    const apiResult = yield call(
      updateAchievementLogSagaAsync,
      user_id,
      achievement_name
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.UPDATE_ACHIEVEMENT_LOG_SUCCESS
      })
    } else {
      yield put({
        type: types.UPDATE_ACHIEVEMENT_LOG_FAIL
      })
    }

  } catch (error) {
    console.log("error from acceptFriendSaga :", error);
  }
}

function* rejectTeamInviteSaga({ payload }) {
  const {
    log_id
  } = payload
  try {
    const apiResult = yield call(
      rejectTeamInviteSagaAsync,
      log_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.REJECT_TEAM_INVITE_SUCCESS
      })
    }
  } catch (error) {
    console.log("error from rejectTeamInviteSaga :", error);
  }
}

function* getTeamInviteSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getTeamInviteSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_TEAM_INVITE_SUCCESS,
        payload: apiResult.results.team_invite
      })
    } else if (apiResult.results.message === "no_team_invite") {
      yield put({
        type: types.GET_TEAM_INVITE_FAIL
      })
    }

  } catch (error) {
    console.log("error from getTeamInviteSaga :", error);
  }
}

function* sendTeamInviteSaga({ payload }) {
  const {
    user_id,
    to
  } = payload
  try {
    const apiResult = yield call(
      sendTeamInviteSagaAsync,
      user_id,
      to
    );
    if (apiResult.results.message === "success" || apiResult.results.message === "team_invite_exists") {
      yield put({
        type: types.SEND_TEAM_INVITE_SUCCESS
      })
    } else if (apiResult.results.message === "user_not_exists") {
      yield put({
        type: types.SEND_TEAM_INVITE_FAIL
      })
    }
  } catch (error) {
    console.log("error from sendTeamInviteSaga :", error);
  }
}

function* cancelFriendRequestSaga({ payload }) {
  const {
    sender_id,
    receiver_id
  } = payload
  try {
    const apiResult = yield call(
      cancelFriendRequestSagaAsync,
      sender_id,
      receiver_id
    );

    yield put({
      type: types.CANCEL_FRIEND_REQUEST_SUCCESS
    })

  } catch (error) {
    console.log("error from cancelFriendRequestSaga :", error);
  }
}

function* cancelTeamInviteSaga({ payload }) {
  const {
    sender_id,
    receiver_id
  } = payload
  try {
    const apiResult = yield call(
      cancelTeamInviteSagaAsync,
      sender_id,
      receiver_id
    );

    yield put({
      type: types.CANCEL_TEAM_INVITE_SUCCESS
    })

  } catch (error) {
    console.log("error from cancelTeamInviteSaga :", error);
  }
}

function* getFriendsRankSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getFriendsRankSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_FRIENDS_RANK_SUCCESS,
        payload: apiResult.results.friend_list
      })
    } else if (apiResult.results.message === "friendless") {
      yield put({
        type: types.GET_FRIENDS_RANK_FAIL
      })
    }

  } catch (error) {
    console.log("error from getFriendsRankSaga :", error);
  }
}

function* rejectFriendSaga({ payload }) {
  const {
    log_id
  } = payload
  try {
    const apiResult = yield call(
      rejectFriendSagaAsync,
      log_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.REJECT_FRIEND_SUCCESS
      })
    }
  } catch (error) {
    console.log("error from rejectFriendSaga :", error);
  }
}

function* getFriendRequestSentSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getFriendRequestSentSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_FRIEND_REQUEST_SENT_SUCCESS,
        payload: apiResult.results.friend_request
      })
    } else if (apiResult.results.message === "no_friend_request") {
      yield put({
        type: types.GET_FRIEND_REQUEST_SENT_FAIL
      })
    }

  } catch (error) {
    console.log("error from getFriendRequestSentSaga :", error);
  }
}

function* getTeamInviteSentSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getTeamInviteSentSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_TEAM_INVITE_SENT_SUCCESS,
        payload: apiResult.results.team_invite
      })
    } else if (apiResult.results.message === "no_team_invite") {
      yield put({
        type: types.GET_TEAM_INVITE_SENT_FAIL
      })
    }

  } catch (error) {
    console.log("error from getTeamInviteSentSaga :", error);
  }
}

function* deleteFriendSaga({ payload }) {
  const {
    user_id,
    friend_email
  } = payload
  try {
    const apiResult = yield call(
      deleteFriendSagaAsync,
      user_id,
      friend_email
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.DELETE_FRIEND_SUCCESS
      })
    } else if (apiResult.results.message === "friendless") {
      yield put({
        type: types.DELETE_FRIEND_FAIL
      })
    }
  } catch (error) {
    console.log("error from deleteFriendSaga :", error);
  }
}

function* acceptFriendSaga({ payload }) {
  const {
    user_id,
    sender_id,
    log_id
  } = payload
  try {
    const apiResult = yield call(
      acceptFriendSagaAsync,
      user_id,
      sender_id,
      log_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.ACCEPT_FRIEND_SUCCESS
      })
    } else if (apiResult.results.message === "friend_list_exist") {
      yield put({
        type: types.ACCEPT_FRIEND_FAIL
      })
    }

  } catch (error) {
    console.log("error from acceptFriendSaga :", error);
  }
}

function* getFriendListSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getFriendListSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_FRIEND_LIST_SUCCESS,
        payload: apiResult.results.friend_list
      })
    } else if (apiResult.results.message === "friendless") {
      yield put({
        type: types.GET_FRIEND_LIST_FAIL
      })
    }

  } catch (error) {
    console.log("error from getFriendListSaga :", error);
  }
}

function* getFriendRequestSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getFriendRequestSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_FRIEND_REQUEST_SUCCESS,
        payload: apiResult.results.friend_request
      })
    } else if (apiResult.results.message === "no_friend_request") {
      yield put({
        type: types.GET_FRIEND_REQUEST_FAIL
      })
    }

  } catch (error) {
    console.log("error from getFriendRequestSaga :", error);
  }
}

function* getMaxFriendsSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getMaxFriendsSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_MAX_FRIENDS_SUCCESS,
        payload: apiResult.results.max_friends
      })
    }

  } catch (error) {
    console.log("error from getMaxFriendsSaga :", error);
  }
}

function* getRankSaga({ payload }) {
  const {
    user_id,
    start_date
  } = payload
  try {
    const apiResult = yield call(
      getRankSagaAsync,
      user_id,
      start_date
    );
    yield put({
      type: types.GET_RANK_SUCCESS,
      payload: apiResult.results.start_rank
    })
  } catch (error) {
    console.log("error from getRankSaga :", error);
  }
}

function* getLogWeightSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getLogWeightSagaAsync,
      user_id
    );
    yield put({
      type: types.GET_LOG_WEIGHT_SUCCESS,
      payload: Number(apiResult.results.logWeightCount)
    })
  } catch (error) {
    console.log("error from getLogWeightSaga :", error);
  }
}

function* getLogWeightTeamSaga({ payload }) {
  const {
    group_id
  } = payload
  try {
    const apiResult = yield call(
      getLogWeightTeamSagaAsync,
      group_id
    );
    yield put({
      type: types.GET_LOG_WEIGHT_TEAM_SUCCESS,
      payload: Number(apiResult.results.logWeightTeamCount)
    })
    yield put({
      type: types.GET_NUMBER_OF_MEMBERS_TEAM,
      payload: Number(apiResult.results.numberOfMembers)
    })
  } catch (error) {
    console.log("error from getLogWeightTeamSaga :", error);
  }
}

function* getNumberOfTeamNotFullSaga({ payload }) {
  const {
    fb_group
  } = payload
  try {
    const apiResult = yield call(
      getNumberOfTeamNotFullSagaAsync,
      fb_group
    );
    yield put({
      type: types.GET_NUMBER_OF_TEAM_NOT_FULL_SUCCESS,
      payload: Number(apiResult.results.numberOfTeamNotFull)
    })
  } catch (error) {
    console.log("error from getNumberOfTeamNotFullSaga :", error);
  }
}

function* getLeaderboardSaga() {
  try {
    const apiResult = yield call(
      getLeaderboardSagaAsync
    );
    yield put({
      type: types.GET_LEADER_BOARD_SUCCESS,
      payload: apiResult.results
    })
  } catch (error) {
    console.log("error from getLeaderboardSaga :", error);
  }
}

function* getChallengePeriodSaga() {
  try {
    const apiResult = yield call(
      getChallengePeriodSagaAsync
    );
    yield put({
      type: types.GET_CHALLENGE_PERIOD_SUCCESS,
      payload: apiResult.results
    })
  } catch (error) {
    console.log("error from getChallengePeriodSaga :", error);
  }
}

function* selectMemberEventLogSaga({ payload }) {
  const {
    email
  } = payload
  try {
    const apiResult = yield call(
      selectMemberEventLogSagaAsync,
      email
    );
    yield put({
      type: types.SELECT_MEMBER_EVENT_LOG_SUCCESS,
      payload: apiResult.results.memberEventLog
    })
  } catch (error) {
    console.log("error from selectMemberEventLogSaga :", error);
  }
}


function* sendFriendRequestSaga({ payload }) {
  const {
    user_id,
    to
  } = payload
  try {
    const apiResult = yield call(
      sendFriendRequestSagaAsync,
      user_id,
      to
    );
    if (apiResult.results.message === "success" || apiResult.results.message === "friend_request_exists") {
      yield put({
        type: types.SEND_FRIEND_REQUEST_SUCCESS
      })
    } else if (apiResult.results.message === "user_not_exists") {
      yield put({
        type: types.SEND_FRIEND_REQUEST_FAIL
      })
    }
  } catch (error) {
    console.log("error from sendFriendRequestSaga :", error);
  }
}

function* getIsReducedWeightSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getIsReducedWeightSagaAsync,
      user_id
    );
    yield put({
      type: types.GET_IS_REDUCED_WEIGHT_SUCCESS,
      payload: (apiResult.results.isReducedWeight)
    })
  } catch (error) {
    console.log("error from getIsReducedWeightSaga :", error);
  }
}

function* getIsReducedWaistSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getIsReducedWaistSagaAsync,
      user_id
    );
    yield put({
      type: types.GET_IS_REDUCED_WAIST_SUCCESS,
      payload: (apiResult.results.waistInWeekResult)
    })
  } catch (error) {
    console.log("error from getIsReducedWaistSaga :", error);
  }
}

function* getDailyWeighChallengeSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getDailyWeighChallengeSagaAsync,
      user_id
    );
    yield put({
      type: types.GET_DAILY_WEIGH_CHALLENGE_SUCCESS,
      payload: (apiResult.results.dailyWeighChallenge)
    })
  } catch (error) {
    console.log("error from getDailyWeighChallengeSaga :", error);
  }
}

function* postDailyWeighChallengeSaga({ payload }) {
  const {
    user_id,
    weight
  } = payload
  try {
    const apiResult = yield call(
      postDailyWeighChallengeSagaAsync,
      user_id,
      weight
    );
    yield put({
      type: types.POST_DAILY_WEIGH_CHALLENGE_SUCCESS
    })
  } catch (error) {
    console.log("error from postDailyWeighChallengeSaga :", error);
  }
}

function* assignGroupToMemberSaga({ payload }) {
  const {
    user_id,
    start_date,
    fb_group
  } = payload
  try {
    const apiResult = yield call(
      assignGroupToMemberSagaAsync,
      user_id,
      start_date,
      fb_group
    );
    yield put({
      type: types.ASSIGN_GROUP_TO_MEMBER_SUCCESS
    })
  } catch (error) {
    console.log("error from assignGroupToMemberSaga :", error);
  }
}

function* createChallengeGroupSaga({ payload }) {
  const {
    user_id,
    group_name,
    start_date,
    fb_group
  } = payload
  try {
    const apiResult = yield call(
      createChallengeGroupSagaAsync,
      user_id,
      group_name,
      start_date,
      fb_group
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.CREATE_CHALLENGE_GROUP_SUCCESS
      })
    } else if (apiResult.results.message === "teamNameExist") {
      yield put({
        type: types.CREATE_CHALLENGE_GROUP_FAIL
      })
    }
  } catch (error) {
    console.log("error from createChallengeGroupSaga :", error);
  }
}

function* leaveTeamSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      leaveTeamSagaAsync,
      user_id
    );
    yield put({
      type: types.LEAVE_TEAM_SUCCESS
    })
  } catch (error) {
    console.log("error from leaveTeamSaga :", error);
  }
}

function* getMembersAndRankSaga({ payload }) {
  const {
    group_id,
    start_date
  } = payload
  try {
    const apiResult = yield call(
      getMembersAndRankSagaAsync,
      group_id,
      start_date
    );
    yield put({
      type: types.GET_MEMBERS_AND_RANK_SUCCESS,
      payload: apiResult.results.members
    })
  } catch (error) {
    console.log("error from getMembersAndRankSaga :", error);
  }
}

function* getGroupNameSaga({ payload }) {
  const {
    group_id
  } = payload
  try {
    const apiResult = yield call(
      getGroupNameSagaAsync,
      group_id
    );
    yield put({
      type: types.GET_GROUP_NAME_SUCCESS,
      payload: apiResult.results.group_name
    })
  } catch (error) {
    console.log("error from getGroupNameSaga :", error);
  }
}

function* getScoreOfTeamSaga({ payload }) {
  const {
    group_id
  } = payload
  try {
    const apiResult = yield call(
      getScoreOfTeamSagaAsync,
      group_id
    );
    yield put({
      type: types.GET_SCORE_OF_TEAM_SUCCESS,
      payload: apiResult.results.totalScoreOfTeam
    })
  } catch (error) {
    console.log("error from getScoreOfTeamSaga :", error);
  }
}

function* getDailyTeamWeightBonusSaga({ payload }) {
  const {
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getDailyTeamWeightBonusSagaAsync,
      user_id
    );
    yield put({
      type: types.GET_DAILY_TEAM_WEIGHT_BONUS_SUCCESS,
      payload: Number(apiResult.results.dailyTeamWeightBonusCount)
    })
  } catch (error) {
    console.log("error from getDailyTeamWeightBonusSaga :", error);
  }
}

export function* watchGetRank() {
  yield takeEvery(types.GET_RANK, getRankSaga)
}

export function* watchGetLogWeight() {
  yield takeEvery(types.GET_LOG_WEIGHT, getLogWeightSaga)
}

export function* watchGetLogWeightTeam() {
  yield takeEvery(types.GET_LOG_WEIGHT_TEAM, getLogWeightTeamSaga)
}

export function* watchGetIsReducedWeight() {
  yield takeEvery(types.GET_IS_REDUCED_WEIGHT, getIsReducedWeightSaga)
}

export function* watchGetIsReducedWaist() {
  yield takeEvery(types.GET_IS_REDUCED_WAIST, getIsReducedWaistSaga)
}

export function* watchGetDailyWeighChallenge() {
  yield takeEvery(types.GET_DAILY_WEIGH_CHALLENGE, getDailyWeighChallengeSaga)
}

export function* watchPostDailyWeighChallenge() {
  yield takeEvery(types.POST_DAILY_WEIGH_CHALLENGE, postDailyWeighChallengeSaga)
}

export function* watchGetDailyTeamWeightBonus() {
  yield takeEvery(types.GET_DAILY_TEAM_WEIGHT_BONUS, getDailyTeamWeightBonusSaga)
}

export function* watchGetNumberOfTeamNotFull() {
  yield takeEvery(types.GET_NUMBER_OF_TEAM_NOT_FULL, getNumberOfTeamNotFullSaga)
}

export function* watchAssignGroupToMember() {
  yield takeEvery(types.ASSIGN_GROUP_TO_MEMBER, assignGroupToMemberSaga)
}

export function* watchCreateChallengeGroup() {
  yield takeEvery(types.CREATE_CHALLENGE_GROUP, createChallengeGroupSaga)
}

export function* watchLeaveTeam() {
  yield takeEvery(types.LEAVE_TEAM, leaveTeamSaga)
}

export function* watchGetMembersAndRank() {
  yield takeEvery(types.GET_MEMBERS_AND_RANK, getMembersAndRankSaga)
}

export function* watchGetGroupName() {
  yield takeEvery(types.GET_GROUP_NAME, getGroupNameSaga)
}

export function* watchGetScoreOfTeam() {
  yield takeEvery(types.GET_SCORE_OF_TEAM, getScoreOfTeamSaga)
}

export function* watchGetLeaderboard() {
  yield takeEvery(types.GET_LEADER_BOARD, getLeaderboardSaga)
}

export function* watchGetChallengePeriod() {
  yield takeEvery(types.GET_CHALLENGE_PERIOD, getChallengePeriodSaga)
}

export function* watchSelectMemberEventLog() {
  yield takeEvery(types.SELECT_MEMBER_EVENT_LOG, selectMemberEventLogSaga)
}

export function* watchGetFriendList() {
  yield takeEvery(types.GET_FRIEND_LIST, getFriendListSaga)
}

export function* watchGetMaxFriends() {
  yield takeEvery(types.GET_MAX_FRIENDS, getMaxFriendsSaga)
}

export function* watchSendFriendRequest() {
  yield takeEvery(types.SEND_FRIEND_REQUEST, sendFriendRequestSaga)
}

export function* watchGetFriendRequest() {
  yield takeEvery(types.GET_FRIEND_REQUEST, getFriendRequestSaga)
}

export function* watchAcceptFriend() {
  yield takeEvery(types.ACCEPT_FRIEND, acceptFriendSaga)
}

export function* watchRejectFriend() {
  yield takeEvery(types.REJECT_FRIEND, rejectFriendSaga)
}

export function* watchDeleteFriend() {
  yield takeEvery(types.DELETE_FRIEND, deleteFriendSaga)
}

export function* watchGetFriendsRank() {
  yield takeEvery(types.GET_FRIENDS_RANK, getFriendsRankSaga)
}

export function* watchSendTeamInvite() {
  yield takeEvery(types.SEND_TEAM_INVITE, sendTeamInviteSaga)
}

export function* watchGetTeamInvite() {
  yield takeEvery(types.GET_TEAM_INVITE, getTeamInviteSaga)
}

export function* watchRejectTeamInvite() {
  yield takeEvery(types.REJECT_TEAM_INVITE, rejectTeamInviteSaga)
}

export function* watchAcceptTeamInvite() {
  yield takeEvery(types.ACCEPT_TEAM_INVITE, acceptTeamInviteSaga)
}

export function* watchGetAchievementLog() {
  yield takeEvery(types.GET_ACHIEVEMENT_LOG, getAchievementLogSaga)
}

export function* watchUpdateAchievementLog() {
  yield takeEvery(types.UPDATE_ACHIEVEMENT_LOG, updateAchievementLogSaga)
}

export function* watchCheckAllMissionComplete() {
  yield takeEvery(types.CHECK_ALL_MISSION_COMPLETE, checkAllMissionCompleteSaga)
}

export function* watchGetFriendRequestSent() {
  yield takeEvery(types.GET_FRIEND_REQUEST_SENT, getFriendRequestSentSaga)
}

export function* watchGetTeamInviteSent() {
  yield takeEvery(types.GET_TEAM_INVITE_SENT, getTeamInviteSentSaga)
}

export function* watchCancelFriendRequest() {
  yield takeEvery(types.CANCEL_FRIEND_REQUEST, cancelFriendRequestSaga)
}

export function* watchCancelTeamInvite() {
  yield takeEvery(types.CANCEL_TEAM_INVITE, cancelTeamInviteSaga)
}

export function* saga() {
  yield all([
    fork(watchGetRank),
    fork(watchGetLogWeight),
    fork(watchGetLogWeightTeam),
    fork(watchGetIsReducedWeight),
    fork(watchGetIsReducedWaist),
    fork(watchGetDailyWeighChallenge),
    fork(watchGetDailyTeamWeightBonus),
    fork(watchPostDailyWeighChallenge),
    fork(watchGetNumberOfTeamNotFull),
    fork(watchAssignGroupToMember),
    fork(watchCreateChallengeGroup),
    fork(watchLeaveTeam),
    fork(watchGetMembersAndRank),
    fork(watchGetGroupName),
    fork(watchGetScoreOfTeam),
    fork(watchGetLeaderboard),
    fork(watchGetChallengePeriod),
    fork(watchSelectMemberEventLog),
    fork(watchGetFriendList),
    fork(watchGetMaxFriends),
    fork(watchSendFriendRequest),
    fork(watchGetFriendRequest),
    fork(watchAcceptFriend),
    fork(watchRejectFriend),
    fork(watchDeleteFriend),
    fork(watchGetFriendsRank),
    fork(watchSendTeamInvite),
    fork(watchGetTeamInvite),
    fork(watchRejectTeamInvite),
    fork(watchAcceptTeamInvite),
    fork(watchGetAchievementLog),
    fork(watchUpdateAchievementLog),
    fork(watchCheckAllMissionComplete),
    fork(watchGetFriendRequestSent),
    fork(watchCancelFriendRequest),
    fork(watchGetTeamInviteSent),
    fork(watchCancelTeamInvite),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  rank: null,
  logWeightCount: 0,
  isReducedWeight: false,
  waistInWeekResult: 0,
  logWeightTeamCount: 0,
  numberOfMembers: 0,
  dailyTeamWeightBonusCount: 0,
  dailyWeighChallenge: false,
  statusPostDailyWeighChallenge: "default",
  numberOfTeamNotFull: 0,
  statusGetNumberOfTeamNotFull: "default",
  statusLeaveTeam: "default",
  membersOfTeam: [],
  group_name: "",
  totalScoreOfTeam: 0,
  teamRank: [],
  individualRank: [],
  friendsRank: [],
  statusCreateTeam: "default",
  challengePeriod: true,
  memberEventLog: [],
  friend_list: [],
  statusGetFriendList: "default",
  statusGetMaxFriends: "default",
  max_friends: 1,
  statusSendFriendRequest: "default",
  friend_request: [],
  friend_request_sent: [],
  statusGetFriendRequest: "default",
  statusGetFriendRequestSent: "default",
  statusAcceptFriend: "default",
  statusRejectFriend: "default",
  statusDeleteFriend: "default",
  statusGetFriendsRank: "default",
  statusSendTeamInvite: "default",
  statusGetTeamInvite: "default",
  statusGetTeamInviteSent: "default",
  team_invite: [],
  team_invite_sent: [],
  statusRejectTeamInvite: "default",
  statusAcceptTeamInvite: "default",
  statusGetAchievement: "default",
  achievementLog: [],
  statusUpdateAchievement: "default",
  statusCheckAllMissionComplete: "default",
  statusGetLeaderBoard: "default",
  statusCancelFriendRequest: "default",
  statusCancelTeamInvite: "default",
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.CANCEL_TEAM_INVITE:
      return {
        ...state,
        statusCancelTeamInvite: "loading"
      }
    case types.CANCEL_TEAM_INVITE_SUCCESS:
      return {
        ...state,
        statusCancelTeamInvite: "success"
      }
    case types.CANCEL_FRIEND_REQUEST:
      return {
        ...state,
        statusCancelFriendRequest: "loading"
      }
    case types.CANCEL_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        statusCancelFriendRequest: "success"
      }
    case types.GET_FRIEND_REQUEST_SENT:
      return {
        ...state,
        statusGetFriendRequestSent: "loading"
      }
    case types.GET_FRIEND_REQUEST_SENT_SUCCESS:
      return {
        ...state,
        friend_request_sent: action.payload,
        statusGetFriendRequestSent: "success"
      }
    case types.GET_FRIEND_REQUEST_SENT_FAIL:
      return {
        ...state,
        friend_request_sent: [],
        statusGetFriendRequestSent: "fail"
      }
    case types.GET_TEAM_INVITE_SENT:
      return {
        ...state,
        statusGetTeamInviteSent: "loading"
      }
    case types.GET_TEAM_INVITE_SENT_SUCCESS:
      return {
        ...state,
        team_invite_sent: action.payload,
        statusGetTeamInviteSent: "success"
      }
    case types.GET_TEAM_INVITE_SENT_FAIL:
      return {
        ...state,
        team_invite_sent: [],
        statusGetTeamInviteSent: "fail"
      }
    case types.CHECK_ALL_MISSION_COMPLETE:
      return {
        ...state,
        statusCheckAllMissionComplete: "loading"
      }
    case types.CHECK_ALL_MISSION_COMPLETE_SUCCESS:
      return {
        ...state,
        statusCheckAllMissionComplete: "success"
      }
    case types.CHECK_ALL_MISSION_COMPLETE_FAIL:
      return {
        ...state,
        statusCheckAllMissionComplete: "fail"
      }
    case types.UPDATE_ACHIEVEMENT_LOG:
      return {
        ...state,
        statusUpdateAchievement: "loading"
      }
    case types.UPDATE_ACHIEVEMENT_LOG_SUCCESS:
      return {
        ...state,
        statusUpdateAchievement: "success"
      }
    case types.UPDATE_ACHIEVEMENT_LOG_FAIL:
      return {
        ...state,
        statusUpdateAchievement: "fail"
      }
    case types.GET_ACHIEVEMENT_LOG:
      return {
        ...state,
        statusGetAchievement: "loading"
      }
    case types.GET_ACHIEVEMENT_LOG_SUCCESS:
      return {
        ...state,
        statusGetAchievement: "success",
        achievementLog: action.payload
      }
    case types.GET_ACHIEVEMENT_LOG_FAIL:
      return {
        ...state,
        statusGetAchievement: "fail",
        achievementLog: []
      }
    case types.REJECT_TEAM_INVITE:
      return {
        ...state,
        statusRejectTeamInvite: "loading"
      }
    case types.REJECT_TEAM_INVITE_SUCCESS:
      return {
        ...state,
        statusRejectTeamInvite: "success"
      }
    case types.ACCEPT_TEAM_INVITE:
      return {
        ...state,
        statusAcceptTeamInvite: "loading"
      }
    case types.ACCEPT_TEAM_INVITE_SUCCESS:
      return {
        ...state,
        statusAcceptTeamInvite: "success"
      }
    case types.ACCEPT_TEAM_INVITE_FAIL:
      return {
        ...state,
        statusAcceptTeamInvite: "fail"
      }
    case types.GET_TEAM_INVITE:
      return {
        ...state,
        statusGetTeamInvite: "loading"
      }
    case types.GET_TEAM_INVITE_SUCCESS:
      return {
        ...state,
        statusGetTeamInvite: "success",
        team_invite: action.payload
      }
    case types.GET_TEAM_INVITE_FAIL:
      return {
        ...state,
        statusGetTeamInvite: "fail"
      }
    case types.SEND_TEAM_INVITE:
      return {
        ...state,
        statusSendTeamInvite: "loading"
      }
    case types.SEND_TEAM_INVITE_SUCCESS:
      return {
        ...state,
        statusSendTeamInvite: "success"
      }
    case types.SEND_TEAM_INVITE_FAIL:
      return {
        ...state,
        statusSendTeamInvite: "fail"
      }
    case types.GET_FRIENDS_RANK:
      return {
        ...state,
        statusGetFriendsRank: "loading"
      }
    case types.GET_FRIENDS_RANK_SUCCESS:
      return {
        ...state,
        friendsRank: action.payload,
        statusGetFriendsRank: "success"
      }
    case types.GET_FRIENDS_RANK_FAIL:
      return {
        ...state,
        friendsRank: [],
        statusGetFriendsRank: "fail"
      }
    case types.DELETE_FRIEND:
      return {
        ...state,
        statusDeleteFriend: "loading"
      }
    case types.DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        statusDeleteFriend: "success"
      }
    case types.DELETE_FRIEND_FAIL:
      return {
        ...state,
        statusDeleteFriend: "fail"
      }
    case types.REJECT_FRIEND:
      return {
        ...state,
        statusRejectFriend: "loading"
      }
    case types.REJECT_FRIEND_SUCCESS:
      return {
        ...state,
        statusRejectFriend: "success"
      }
    case types.ACCEPT_FRIEND:
      return {
        ...state,
        statusAcceptFriend: "loading"
      }
    case types.ACCEPT_FRIEND_SUCCESS:
      return {
        ...state,
        statusAcceptFriend: "success"
      }
    case types.ACCEPT_FRIEND_FAIL:
      return {
        ...state,
        statusAcceptFriend: "fail"
      }
    case types.GET_FRIEND_REQUEST:
      return {
        ...state,
        statusGetFriendRequest: "loading"
      }
    case types.GET_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friend_request: action.payload,
        statusGetFriendRequest: "success"
      }
    case types.GET_FRIEND_REQUEST_FAIL:
      return {
        ...state,
        statusGetFriendRequest: "fail"
      }
    case types.SEND_FRIEND_REQUEST:
      return {
        ...state,
        statusSendFriendRequest: "loading"
      }
    case types.SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        statusSendFriendRequest: "success"
      }
    case types.SEND_FRIEND_REQUEST_FAIL:
      return {
        ...state,
        statusSendFriendRequest: "fail"
      }
    case types.GET_MAX_FRIENDS:
      return {
        ...state,
        statusGetMaxFriends: "loading"
      }
    case types.GET_MAX_FRIENDS_SUCCESS:
      return {
        ...state,
        statusGetMaxFriends: "success",
        max_friends: action.payload
      }
    case types.GET_FRIEND_LIST:
      return {
        ...state,
        statusGetFriendList: "loading"
      }
    case types.GET_FRIEND_LIST_SUCCESS:
      return {
        ...state,
        friend_list: action.payload,
        statusGetFriendList: "success"
      }
    case types.GET_FRIEND_LIST_FAIL:
      return {
        ...state,
        friend_list: [],
        statusGetFriendList: "fail"
      }
    case types.SELECT_MEMBER_EVENT_LOG_SUCCESS:
      return {
        ...state,
        memberEventLog: action.payload
      }
    case types.GET_RANK_SUCCESS:
      return {
        ...state,
        rank: action.payload
      }
    case types.GET_LOG_WEIGHT_SUCCESS:
      return {
        ...state,
        logWeightCount: action.payload
      }
    case types.GET_LOG_WEIGHT_TEAM_SUCCESS:
      return {
        ...state,
        logWeightTeamCount: action.payload
      }
    case types.GET_NUMBER_OF_MEMBERS_TEAM:
      return {
        ...state,
        numberOfMembers: action.payload
      }
    case types.GET_DAILY_TEAM_WEIGHT_BONUS_SUCCESS:
      return {
        ...state,
        dailyTeamWeightBonusCount: action.payload
      }
    case types.GET_NUMBER_OF_TEAM_NOT_FULL:
      return {
        ...state,
        statusGetNumberOfTeamNotFull: "loading"
      }
    case types.GET_NUMBER_OF_TEAM_NOT_FULL_SUCCESS:
      return {
        ...state,
        numberOfTeamNotFull: action.payload,
        statusGetNumberOfTeamNotFull: "success"
      }
    case types.GET_LEADER_BOARD:
      return {
        ...state,
        statusGetLeaderBoard: "loading"
      }
    case types.GET_LEADER_BOARD_SUCCESS:
      return {
        ...state,
        teamRank: action.payload.teamRank,
        individualRank: action.payload.individualRank,
        statusGetLeaderBoard: "success"
      }
    case types.GET_CHALLENGE_PERIOD_SUCCESS:
      return {
        ...state,
        challengePeriod: action.payload.challengePeriod
      }
    case types.ASSIGN_GROUP_TO_MEMBER_SUCCESS:
      return {
        ...state,
        statusGetNumberOfTeamNotFull: "default",
        statusLeaveTeam: "default"
      }
    case types.CREATE_CHALLENGE_GROUP:
      return {
        ...state,
        statusCreateTeam: "loading"
      }
    case types.CREATE_CHALLENGE_GROUP_SUCCESS:
      return {
        ...state,
        statusCreateTeam: "success",
        statusGetNumberOfTeamNotFull: "default",
        statusLeaveTeam: "default"
      }
    case types.CREATE_CHALLENGE_GROUP_FAIL:
      return {
        ...state,
        statusCreateTeam: "fail"
      }
    case types.LEAVE_TEAM_SUCCESS:
      return {
        ...state,
        statusLeaveTeam: "success"
      }
    case types.GET_IS_REDUCED_WEIGHT_SUCCESS:
      return {
        ...state,
        isReducedWeight: action.payload
      }
    case types.GET_IS_REDUCED_WAIST_SUCCESS:
      return {
        ...state,
        waistInWeekResult: action.payload
      }
    case types.GET_DAILY_WEIGH_CHALLENGE_SUCCESS:
      return {
        ...state,
        dailyWeighChallenge: action.payload,
        statusPostDailyWeighChallenge: "default"
      }
    case types.POST_DAILY_WEIGH_CHALLENGE:
      return {
        ...state,
        statusPostDailyWeighChallenge: "loading"
      }
    case types.POST_DAILY_WEIGH_CHALLENGE_SUCCESS:
      return {
        ...state,
        statusPostDailyWeighChallenge: "success",
        dailyWeighChallenge: false
      }
    case types.GET_MEMBERS_AND_RANK_SUCCESS:
      return {
        ...state,
        membersOfTeam: action.payload
      }
    case types.GET_GROUP_NAME_SUCCESS:
      return {
        ...state,
        group_name: action.payload
      }
    case types.GET_SCORE_OF_TEAM_SUCCESS:
      return {
        ...state,
        totalScoreOfTeam: action.payload
      }
    case types.CLEAR_CHALLENGES:
      return INIT_STATE;
    default:
      return { ...state };
  }
}