import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  CREATE_CUSTOM_WEEK_FOR_USER: "CREATE_CUSTOM_WEEK_FOR_USER",
  CREATE_CUSTOM_WEEK_FOR_USER_SUCCESS: "CREATE_CUSTOM_WEEK_FOR_USER_SUCCESS",
  UPDATE_PLAYTIME: "UPDATE_PLAYTIME",
  UPDATE_PLAYTIME_SUCCESS: "UPDATE_PLAYTIME_SUCCESS",
  UPDATE_PLAYTIME_LASTWEEK: "UPDATE_PLAYTIME_LASTWEEK",
  UPDATE_PLAYTIME_LASTWEEK_SUCCESS: "UPDATE_PLAYTIME_LASTWEEK_SUCCESS",
  UPDATE_PLAYTIME_LASTWEEK_SELECTED: "UPDATE_PLAYTIME_LASTWEEK_SELECTED",
  UPDATE_PLAYTIME_LASTWEEK_SELECTED_SUCCESS:
    "UPDATE_PLAYTIME_LASTWEEK_SELECTED_SUCCESS",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  UPDATE_PLAYLIST_SUCCESS: "UPDATE_PLAYLIST_SUCCESS",
  UPDATE_BODY_INFO: "UPDATE_BODY_INFO",
  UPDATE_BODY_INFO_SUCCESS: "UPDATE_BODY_INFO_SUCCESS",
  VIDEO_LIST_FOR_USER: "VIDEO_LIST_FOR_USER",
  VIDEO_LIST_FOR_USER_SUCCESS: "VIDEO_LIST_FOR_USER_SUCCESS",
  VIDEO_LIST_FOR_USER_FAIL: "VIDEO_LIST_FOR_USER_FAIL",
  GET_WEEK: "GET_WEEK",
  VIDEO_LIST_FOR_USER_LASTWEEK: "VIDEO_LIST_FOR_USER_LASTWEEK",
  VIDEO_LIST_FOR_USER_LASTWEEK_SUCCESS: "VIDEO_LIST_FOR_USER_LASTWEEK_SUCCESS",
  VIDEO_LIST_FOR_USER_LASTWEEK_FAIL: "VIDEO_LIST_FOR_USER_LASTWEEK_FAIL",
  GET_LASTWEEK: "GET_LASTWEEK",
  RANDOM_VIDEO: "RANDOM_VIDEO",
  RANDOM_VIDEO_SUCCESS: "RANDOM_VIDEO_SUCCESS",
  RANDOM_VIDEO_FAIL: "RANDOM_VIDEO_FAIL",
  SELECT_CHANGE_VIDEO: "SELECT_CHANGE_VIDEO",
  SELECT_CHANGE_VIDEO_SUCCESS: "SELECT_CHANGE_VIDEO_SUCCESS",
  SELECT_CHANGE_VIDEO_FAIL: "SELECT_CHANGE_VIDEO_FAIL",
  RESET_STATUS: "RESET_STATUS",
  SELECT_PROGRAM_IN_WEEK: "SELECT_PROGRAM_IN_WEEK",
  SELECT_PROGRAM_IN_WEEK_SUCCESS: "SELECT_PROGRAM_IN_WEEK_SUCCESS",
  SELECT_MEMBER_INFO: "SELECT_MEMBER_INFO",
  SELECT_MEMBER_INFO_SUCCESS: "SELECT_MEMBER_INFO_SUCCESS",
  SELECT_BODY_INFO: "SELECT_BODY_INFO",
  SELECT_BODY_INFO_SUCCESS: "SELECT_BODY_INFO_SUCCESS",
  DELETE_PROGRAM_IN_WEEK: "DELETE_PROGRAM_IN_WEEK",
  CLEAR_VIDEO_LIST: "CLEAR_VIDEO_LIST",
  CLEAR_VIDEOS: "CLEAR_VIDEOS",
  GET_ALL_EXERCISE_ACTIVITY: "GET_ALL_EXERCISE_ACTIVITY",
  GET_ALL_EXERCISE_ACTIVITY_SUCCESS: "GET_ALL_EXERCISE_ACTIVITY_SUCCESS",
  GET_ALL_EXERCISE_ACTIVITY_FAIL: "GET_ALL_EXERCISE_ACTIVITY_FAIL",
  HIDE_POPUP_VIDEO_PLAYER: "HIDE_POPUP_VIDEO_PLAYER",
  HIDE_POPUP_VIDEO_PLAYER_LIST: "HIDE_POPUP_VIDEO_PLAYER_LIST",
  SET_ENDED_VIDEO_PLAYER_LIST: "SET_ENDED_VIDEO_PLAYER_LIST",
  CREATE_BRAVE_AND_BURN_CHALLENGE: "CREATE_BRAVE_AND_BURN_CHALLENGE",
  CREATE_BRAVE_AND_BURN_CHALLENGE_SUCCESS:
    "CREATE_BRAVE_AND_BURN_CHALLENGE_SUCCESS",
  CREATE_BRAVE_AND_BURN_CHALLENGE_FAIL: "CREATE_BRAVE_AND_BURN_CHALLENGE_FAIL",
  GET_BRAVE_AND_BURN_CHALLENGE: "GET_BRAVE_AND_BURN_CHALLENGE",
  GET_BRAVE_AND_BURN_CHALLENGE_SUCCESS: "GET_BRAVE_AND_BURN_CHALLENGE_SUCCESS",
  GET_BRAVE_AND_BURN_CHALLENGE_FAIL: "GET_BRAVE_AND_BURN_CHALLENGE_FAIL",
  UPDATE_VIDEO_STATUS_BRAVE_AND_BURN: "UPDATE_VIDEO_STATUS_BRAVE_AND_BURN",
  UPDATE_VIDEO_STATUS_BRAVE_AND_BURN_SUCCESS:
    "UPDATE_VIDEO_STATUS_BRAVE_AND_BURN_SUCCESS",
  UPDATE_VIDEO_STATUS_BRAVE_AND_BURN_FAIL:
    "UPDATE_VIDEO_STATUS_BRAVE_AND_BURN_FAIL",
  UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN:
    "UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN",
  UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN_SUCCESS:
    "UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN_SUCCESS",
  UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN_FAIL:
    "UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN_FAIL",
  CREATE_EXERCISE_SNACK: "CREATE_EXERCISE_SNACK",
  CREATE_EXERCISE_SNACK_SUCCESS: "CREATE_EXERCISE_SNACK_SUCCESS",
  CREATE_EXERCISE_SNACK_FALE: "CREATE_EXERCISE_SNACK_FALE",
  GET_EXERCISE_SNACK: "GET_EXERCISE_SNACK",
  GET_EXERCISE_SNACK_SUCCESS: "GET_EXERCISE_SNACK_SUCCESS",
  GET_EXERCISE_SNACK_FALE: "GET_EXERCISE_SNACK_FALE",
  UPDATE_VIDEO_SNACK: "UPDATE_VIDEO_SNACK",
  UPDATE_VIDEO_SNACK_SUCCESS: "UPDATE_VIDEO_SNACK_SUCCESS",
  UPDATE_VIDEO_SNACK_FALE: "UPDATE_VIDEO_SNACK_FALE",
  HIDE_POPUP_VIDEO_PLAYER_SNACK: "HIDE_POPUP_VIDEO_PLAYER_SNACK",
  GET_VIDEO_SNACK: "GET_VIDEO_SNACK",
  GET_VIDEO_SNACK_SUCCESS: "GET_VIDEO_SNACK_SUCCESS",
  GET_VIDEO_SNACK_FALE: "GET_VIDEO_SNACK_FALE",
  CLEAR_EXERCISE_SNACK: "CLEAR_EXERCISE_SNACK",
  CREATE_EVENT_LOG_SNACK: "CREATE_EVENT_LOG_SNACK",
  CREATE_EVENT_LOG_SNACK_SUCCESS: "CREATE_EVENT_LOG_SNACK_SUCCESS",
  CREATE_EVENT_LOG_SNACK_FALE: "CREATE_EVENT_LOG_SNACK_FALE",
  SNACK_COUNT: "SNACK_COUNT",
};

export const updateFbShareStatusBraveAndBurn = (user_id) => ({
  type: types.UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN,
  payload: {
    user_id,
  },
});
export const snacksCount = (number) => ({
  type: types.SNACK_COUNT,
  payload: {
    number,
  },
});

export const updateVideoStatusBraveAndBurn = (user_id) => ({
  type: types.UPDATE_VIDEO_STATUS_BRAVE_AND_BURN,
  payload: {
    user_id,
  },
});

export const createBraveAndBurnChallenge = (user_id) => ({
  type: types.CREATE_BRAVE_AND_BURN_CHALLENGE,
  payload: {
    user_id,
  },
});

export const getBraveAndBurnChallenge = (user_id) => ({
  type: types.GET_BRAVE_AND_BURN_CHALLENGE,
  payload: {
    user_id,
  },
});

export const hidePopupVideoPlayer = (status) => ({
  type: types.HIDE_POPUP_VIDEO_PLAYER,
  payload: {
    status,
  },
});

export const setHidePopupVideoPlayerList = (status) => ({
  type: types.HIDE_POPUP_VIDEO_PLAYER_LIST,
  payload: {
    status,
  },
});
export const setHidePopupVideoPlayerSnack = (status) => ({
  type: types.HIDE_POPUP_VIDEO_PLAYER_SNACK,
  payload: {
    status,
  },
});

export const setEndedVideoPlayerList = (status) => ({
  type: types.SET_ENDED_VIDEO_PLAYER_LIST,
  payload: {
    status,
  },
});

export const getAllExerciseActivity = (user_id) => ({
  type: types.GET_ALL_EXERCISE_ACTIVITY,
  payload: {
    user_id,
  },
});

export const selectBodyInfo = (email) => ({
  type: types.SELECT_BODY_INFO,
  payload: {
    email,
  },
});

export const selectMemberInfo = (email) => ({
  type: types.SELECT_MEMBER_INFO,
  payload: {
    email,
  },
});

export const selectProgramInWeek = (email) => ({
  type: types.SELECT_PROGRAM_IN_WEEK,
  payload: {
    email,
  },
});

export const deleteProgramInWeek = (email) => ({
  type: types.DELETE_PROGRAM_IN_WEEK,
  payload: {
    email,
  },
});

export const createCustomWeekForUser = (
  user_id,
  weight,
  start_date,
  expire_date,
  offset,
  displayName
) => ({
  type: types.CREATE_CUSTOM_WEEK_FOR_USER,
  payload: {
    user_id,
    weight,
    start_date,
    expire_date,
    offset,
    displayName,
  },
});

export const clearVideoList = () => ({
  type: types.CLEAR_VIDEO_LIST,
});

export const clearVideos = () => ({
  type: types.CLEAR_VIDEOS,
});

export const resetStatus = () => ({
  type: types.RESET_STATUS,
});

export const selectChangeVideo = (
  video_id,
  category,
  type,
  user_id,
  exr_position
) => ({
  type: types.SELECT_CHANGE_VIDEO,
  payload: {
    video_id,
    category,
    type,
    user_id,
    exr_position,
  },
});

export const randomVideo = (video_id, category, type, user_id) => ({
  type: types.RANDOM_VIDEO,
  payload: {
    video_id,
    category,
    type,
    user_id,
  },
});

export const updateBodyInfo = (
  user_id,
  start_date,
  expire_date,
  other_attributes
) => ({
  type: types.UPDATE_BODY_INFO,
  payload: {
    user_id,
    start_date,
    expire_date,
    other_attributes,
  },
});

export const updatePlaylist = (
  user_id,
  start_date,
  day_number,
  playlist,
  exerciseVideo
) => ({
  type: types.UPDATE_PLAYLIST,
  payload: {
    user_id,
    start_date,
    day_number,
    playlist,
    exerciseVideo,
  },
});

export const updatePlaytime = (
  user_id,
  start_date,
  expire_date,
  day_number,
  video_number,
  play_time,
  duration,
  exerciseVideo
) => ({
  type: types.UPDATE_PLAYTIME,
  payload: {
    user_id,
    start_date,
    expire_date,
    day_number,
    video_number,
    play_time,
    duration,
    exerciseVideo,
  },
});

export const updatePlaytimeLastWeek = (
  user_id,
  start_date,
  expire_date,
  day_number,
  video_number,
  play_time,
  duration,
  exerciseVideo
) => ({
  type: types.UPDATE_PLAYTIME_LASTWEEK,
  payload: {
    user_id,
    start_date,
    expire_date,
    day_number,
    video_number,
    play_time,
    duration,
    exerciseVideo,
  },
});

export const updatePlaytimeLastWeekSelected = (
  user_id,
  start_date,
  expire_date,
  day_number,
  video_number,
  play_time,
  duration,
  exerciseVideo,
  week_in_program
) => ({
  type: types.UPDATE_PLAYTIME_LASTWEEK_SELECTED,
  payload: {
    user_id,
    start_date,
    expire_date,
    day_number,
    video_number,
    play_time,
    duration,
    exerciseVideo,
    week_in_program,
  },
});

export const videoListForUserLastWeek = (
  user_id,
  weight,
  start_date,
  expire_date,
  offset
) => ({
  type: types.VIDEO_LIST_FOR_USER_LASTWEEK,
  payload: {
    user_id,
    weight,
    start_date,
    expire_date,
    offset,
  },
});

export const videoListForUser = (
  user_id,
  weight,
  start_date,
  expire_date,
  offset
) => ({
  type: types.VIDEO_LIST_FOR_USER,
  payload: {
    user_id,
    weight,
    start_date,
    expire_date,
    offset,
  },
});

export const createExerciseSnack = (user_id) => ({
  type: types.CREATE_EXERCISE_SNACK, //createExerciseSnacksChallenge
  payload: {
    user_id,
  },
});
export const createEventLogSnacks = (user_id, snacks_number) => ({
  type: types.CREATE_EVENT_LOG_SNACK, //createExerciseSnacksChallenge
  payload: {
    user_id,
    snacks_number,
  },
});

export const getExerciseSnack = (user_id, week) => ({
  type: types.GET_EXERCISE_SNACK,
  payload: {
    user_id,
    week,
  },
});

export const updateVideoSnack = (data, id) => ({
  type: types.UPDATE_VIDEO_SNACK, //updateVideoSnack
  payload: {
    data,
    id,
  },
});

export const getVideoSnack = (user_id, week) => ({
  type: types.GET_VIDEO_SNACK,
  payload: { user_id, week },
});

export const clearExerciseSnack = () => ({
  type: types.CLEAR_EXERCISE_SNACK,
  payload: {},
});

/* END OF ACTION Section */

/* SAGA Section */

const getBraveAndBurnChallengeSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("bebe", "/getBraveAndBurnChallenge", {
      queryStringParameters: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateVideoStatusBraveAndBurnSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.put("bebe", "/updateVideoStatusBraveAndBurn", {
      body: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateFbShareStatusBraveAndBurnSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.put(
      "bebe",
      "/updateFbShareStatusBraveAndBurn",
      {
        body: {
          user_id,
        },
      }
    );
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const createBraveAndBurnChallengeSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.post("bebe", "/createBraveAndBurnChallenge", {
      body: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updatePlaylistSagaAsync = async (
  user_id,
  start_date,
  day_number,
  playlist
) => {
  try {
    const apiResult = await API.put("bebe", "/playlist", {
      body: {
        user_id,
        start_date,
        day_number,
        playlist,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updatePlaytimeSagaAsync = async (
  user_id,
  start_date,
  expire_date,
  day_number,
  video_number,
  play_time,
  duration
) => {
  try {
    const apiResult = await API.put("bebe", "/play_time", {
      body: {
        user_id,
        start_date,
        expire_date,
        day_number,
        video_number,
        play_time,
        duration,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updatePlaytimeLastWeekSagaAsync = async (
  user_id,
  start_date,
  expire_date,
  day_number,
  video_number,
  play_time,
  duration
) => {
  try {
    const apiResult = await API.put("bebe", "/play_time_lastweek", {
      body: {
        user_id,
        start_date,
        expire_date,
        day_number,
        video_number,
        play_time,
        duration,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updatePlaytimeLastWeekSelectedSagaAsync = async (
  user_id,
  start_date,
  expire_date,
  day_number,
  video_number,
  play_time,
  duration,
  week_in_program
) => {
  try {
    const apiResult = await API.put("bebe", "/updatePlayTimeLastWeekSelected", {
      body: {
        user_id,
        start_date,
        expire_date,
        day_number,
        video_number,
        play_time,
        duration,
        week_in_program,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const videoListForUserLastWeekSagaAsync = async (
  user_id,
  weight,
  start_date,
  expire_date,
  offset
) => {
  try {
    const apiResult = await API.get("bebe", "/videoListForUserLastWeek", {
      queryStringParameters: {
        user_id,
        weight,
        start_date,
        expire_date,
        offset,
      },
    });
    return apiResult;
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message };
  }
};

const videoListForUserSagaAsync = async (
  user_id,
  weight,
  start_date,
  expire_date,
  offset
) => {
  try {
    const apiResult = await API.get("bebe", "/videoListForUser", {
      queryStringParameters: {
        user_id,
        weight,
        start_date,
        expire_date,
        offset,
      },
    });
    return apiResult;
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message };
  }
};

const selectChangeVideoSagaAsync = async (
  video_id,
  category,
  type,
  user_id,
  exr_position
) => {
  try {
    const apiResult = await API.get("bebe", "/selectChangeVideo", {
      queryStringParameters: {
        video_id,
        category,
        type,
        user_id,
        exr_position,
      },
    });
    return apiResult;
  } catch (error) {}
};

const randomVideoSagaAsync = async (video_id, category, type, user_id) => {
  try {
    const apiResult = await API.get("bebe", "/randomVideo", {
      queryStringParameters: {
        video_id,
        category,
        type,
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateBodyInfoSagaAsync = async (
  user_id,
  start_date,
  expire_date,
  other_attributes
) => {
  try {
    const apiResult = await API.post("bebe", "/updateBodyInfo", {
      body: {
        user_id,
        start_date,
        expire_date,
        other_attributes,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const selectProgramInWeekSagaAsync = async (email) => {
  try {
    const apiResult = await API.get("bebe", "/selectProgramInWeek", {
      queryStringParameters: {
        email,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const selectMemberInfoSagaAsync = async (email) => {
  try {
    const apiResult = await API.get("bebe", "/selectMemberInfo", {
      queryStringParameters: {
        email,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const selectBodyInfoSagaAsync = async (email) => {
  try {
    const apiResult = await API.get("bebe", "/selectBodyInfo", {
      queryStringParameters: {
        email,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const deleteProgramInWeekSagaAsync = async (email) => {
  try {
    const apiResult = await API.post("bebe", "/deleteProgramInWeek", {
      body: {
        email,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getAllExerciseActivitySagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("bebe", "/getAllExerciseActivity", {
      queryStringParameters: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const createCustomWeekForUserSagaAsync = async (
  user_id,
  weight,
  start_date,
  expire_date,
  offset,
  displayName
) => {
  try {
    const apiResult = await API.post("bebe", "/createCustomWeekForUser", {
      body: {
        user_id,
        weight,
        start_date,
        expire_date,
        offset,
        displayName,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getExerciseSnackSagaAsync = async (user_id, week) => {
  try {
    const apiResult = await API.get("bebe", "/getExerciseSnacksChallenge", {
      queryStringParameters: {
        user_id,
        week,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getVideoSnackSagaAsync = async (user_id, week) => {
  try {
    const apiResult = await API.get("bebe", "/getVideoSnack", {
      queryStringParameters: {
        user_id,
        week,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const createExerciseSnackSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.post("bebe", "/createExerciseSnacksChallenge", {
      body: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const createEventLogSnacksSagaAsync = async (user_id, snacks_number) => {
  try {
    const apiResult = await API.post("bebe", "/createEventLogSnacks", {
      body: {
        user_id,
        snacks_number,
      },
    });
    console.log("apiResult", apiResult);
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateVideoSnackSagaAsync = async (data, id) => {
  try {
    const apiResult = await API.put("bebe", "/updateVideoSnack", {
      body: {
        data,
        id,
      },
    });

    return apiResult;
  } catch (error) {
    console.log("error");
    return { error, messsage: error.message };
  }
};

function* updateVideoStatusBraveAndBurnSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      updateVideoStatusBraveAndBurnSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.UPDATE_VIDEO_STATUS_BRAVE_AND_BURN_SUCCESS,
      });
    }
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* updateFbShareStatusBraveAndBurnSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      updateFbShareStatusBraveAndBurnSagaAsync,
      user_id
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN_SUCCESS,
      });
    }
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* getBraveAndBurnChallengeSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(getBraveAndBurnChallengeSagaAsync, user_id);
    if (apiResult.results.message === "success") {
      yield put({
        type: types.GET_BRAVE_AND_BURN_CHALLENGE_SUCCESS,
        payload: apiResult.results.brave_and_burn_challenge,
      });
    }
    if (apiResult.results.message === "fail") {
      yield put({
        type: types.GET_BRAVE_AND_BURN_CHALLENGE_FAIL,
      });
    }
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* createBraveAndBurnChallengeSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(createBraveAndBurnChallengeSagaAsync, user_id);

    if (apiResult.results.message === "success") {
      yield put({
        type: types.CREATE_BRAVE_AND_BURN_CHALLENGE_SUCCESS,
      });
    }
    if (apiResult.results.message === "fail") {
      yield put({
        type: types.CREATE_BRAVE_AND_BURN_CHALLENGE_FAIL,
      });
    }
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* selectChangeVideoSaga({ payload }) {
  const { video_id, category, type, user_id, exr_position } = payload;
  try {
    const apiResult = yield call(
      selectChangeVideoSagaAsync,
      video_id,
      category,
      type,
      user_id,
      exr_position
    );
    if (apiResult.results.message === "no_video") {
      yield put({
        type: types.SELECT_CHANGE_VIDEO_FAIL,
      });
    } else {
      yield put({
        type: types.SELECT_CHANGE_VIDEO_SUCCESS,
        payload: apiResult.results.videos,
      });
    }
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* randomVideoSaga({ payload }) {
  const { video_id, category, type, user_id } = payload;
  try {
    const apiResult = yield call(
      randomVideoSagaAsync,
      video_id,
      category,
      type,
      user_id
    );
    if (apiResult.results.message === "no_video") {
      console.log("user :", apiResult.results);
      yield put({
        type: types.RANDOM_VIDEO_FAIL,
      });
    } else {
      yield put({
        type: types.RANDOM_VIDEO_SUCCESS,
        payload: apiResult.results.video,
      });
    }
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* updatePlaylistSaga({ payload }) {
  const { user_id, start_date, day_number, playlist, exerciseVideo } = payload;
  try {
    const apiResult = yield call(
      updatePlaylistSagaAsync,
      user_id,
      start_date,
      day_number,
      playlist
    );
    let keyDay = "";
    switch (day_number) {
      case 0:
        keyDay = "day1";
        break;
      case 1:
        keyDay = "day2";
        break;
      case 2:
        keyDay = "day3";
        break;
      case 3:
        keyDay = "day4";
        break;
      default:
        break;
    }
    yield put({
      type: types.UPDATE_PLAYLIST_SUCCESS,
      payload: exerciseVideo,
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* updateBodyInfoSaga({ payload }) {
  const { user_id, start_date, expire_date, other_attributes } = payload;
  try {
    yield call(
      updateBodyInfoSagaAsync,
      user_id,
      start_date,
      expire_date,
      other_attributes
    );
    yield put({
      type: types.UPDATE_BODY_INFO_SUCCESS,
    });
  } catch (error) {
    console.log("error from updateBodyInfo :", error);
  }
}

function* selectProgramInWeekSaga({ payload }) {
  const { email } = payload;
  try {
    const apiResult = yield call(selectProgramInWeekSagaAsync, email);

    yield put({
      type: types.SELECT_PROGRAM_IN_WEEK_SUCCESS,
      payload: apiResult.results,
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* selectMemberInfoSaga({ payload }) {
  const { email } = payload;
  try {
    const apiResult = yield call(selectMemberInfoSagaAsync, email);

    yield put({
      type: types.SELECT_MEMBER_INFO_SUCCESS,
      payload: apiResult.results.memberInfo,
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* selectBodyInfoSaga({ payload }) {
  const { email } = payload;
  try {
    const apiResult = yield call(selectBodyInfoSagaAsync, email);

    yield put({
      type: types.SELECT_BODY_INFO_SUCCESS,
      payload: apiResult.results.bodyInfo,
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* deleteProgramInWeekSaga({ payload }) {
  const { email } = payload;
  try {
    const apiResult = yield call(deleteProgramInWeekSagaAsync, email);
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* getAllExerciseActivitySaga({ payload }) {
  const { user_id } = payload;
  try {
    const apiResult = yield call(getAllExerciseActivitySagaAsync, user_id);

    if (apiResult.results && apiResult.results.all_exercise_activity) {
      yield put({
        type: types.GET_ALL_EXERCISE_ACTIVITY_SUCCESS,
        payload: apiResult.results.all_exercise_activity,
      });
    } else {
      yield put({
        type: types.GET_ALL_EXERCISE_ACTIVITY_FAIL,
      });
    }

    return apiResult;
  } catch (error) {
    console.log("error from getAllExerciseActivitySaga :", error);
  }
}

function* updatePlaytimeSaga({ payload }) {
  const {
    user_id,
    start_date,
    expire_date,
    day_number,
    video_number,
    play_time,
    duration,
    exerciseVideo,
  } = payload;
  try {
    const apiResult = yield call(
      updatePlaytimeSagaAsync,
      user_id,
      start_date,
      expire_date,
      day_number,
      video_number,
      play_time,
      duration
    );
    let keyDay = "";
    switch (day_number) {
      case 0:
        keyDay = "day1";
        break;
      case 1:
        keyDay = "day2";
        break;
      case 2:
        keyDay = "day3";
        break;
      case 3:
        keyDay = "day4";
        break;
      default:
        break;
    }
    yield put({
      type: types.UPDATE_PLAYTIME_SUCCESS,
      payload: exerciseVideo,
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* updatePlaytimeLastWeekSaga({ payload }) {
  const {
    user_id,
    start_date,
    expire_date,
    day_number,
    video_number,
    play_time,
    duration,
    exerciseVideo,
  } = payload;
  try {
    const apiResult = yield call(
      updatePlaytimeLastWeekSagaAsync,
      user_id,
      start_date,
      expire_date,
      day_number,
      video_number,
      play_time,
      duration
    );
    let keyDay = "";
    switch (day_number) {
      case 0:
        keyDay = "day1";
        break;
      case 1:
        keyDay = "day2";
        break;
      case 2:
        keyDay = "day3";
        break;
      case 3:
        keyDay = "day4";
        break;
      default:
        break;
    }
    yield put({
      type: types.UPDATE_PLAYTIME_LASTWEEK_SUCCESS,
      payload: exerciseVideo,
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}
function* updatePlaytimeLastWeekSelectedSaga({ payload }) {
  const {
    user_id,
    start_date,
    expire_date,
    day_number,
    video_number,
    play_time,
    duration,
    exerciseVideo,
    week_in_program,
  } = payload;
  try {
    const apiResult = yield call(
      updatePlaytimeLastWeekSelectedSagaAsync,
      user_id,
      start_date,
      expire_date,
      day_number,
      video_number,
      play_time,
      duration,
      week_in_program
    );
    let keyDay = "";
    switch (day_number) {
      case 0:
        keyDay = "day1";
        break;
      case 1:
        keyDay = "day2";
        break;
      case 2:
        keyDay = "day3";
        break;
      case 3:
        keyDay = "day4";
        break;
      default:
        break;
    }
    yield put({
      type: types.UPDATE_PLAYTIME_LASTWEEK_SELECTED_SUCCESS,
      payload: exerciseVideo,
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* videoListForUserLastWeekSaga({ payload }) {
  const { user_id, weight, start_date, expire_date, offset } = payload;
  try {
    const apiResult = yield call(
      videoListForUserLastWeekSagaAsync,
      user_id,
      weight,
      start_date,
      expire_date,
      offset
    );
    if (apiResult.results.length > 0) {
      const activities = JSON.parse(apiResult.results[0].activities);
      const lastweek = JSON.parse(apiResult.results[0].week_in_program);
      if (lastweek > 0) {
        // lastweek > 0 คือ ไม่ใช่สัปดาห์ที่ 1
        yield put({
          type: types.VIDEO_LIST_FOR_USER_LASTWEEK_SUCCESS,
          payload: activities,
        });
        yield put({
          type: types.GET_LASTWEEK,
          payload: lastweek,
        });
      } else {
        yield put({
          // lastweek <= 0 กำหนด isFirstWeek = true
          type: types.VIDEO_LIST_FOR_USER_LASTWEEK_FAIL,
        });
      }
    }
  } catch (error) {
    console.log("error form videoListForUserSaga", error);
  }
}

function* videoListForUserSaga({ payload }) {
  const { user_id, weight, start_date, expire_date, offset } = payload;
  try {
    const apiResult = yield call(
      videoListForUserSagaAsync,
      user_id,
      weight,
      start_date,
      expire_date,
      offset
    );
    if (apiResult.results.length > 0) {
      const activities = JSON.parse(apiResult.results[0].activities);
      const week = JSON.parse(apiResult.results[0].week_in_program);
      yield put({
        type: types.VIDEO_LIST_FOR_USER_SUCCESS,
        payload: activities,
      });
      yield put({
        type: types.GET_WEEK,
        payload: week,
      });
    } else if (apiResult.results.message === "no_video") {
      yield put({
        type: types.VIDEO_LIST_FOR_USER_FAIL,
      });
    }
  } catch (error) {
    console.log("error form videoListForUserSaga", error);
  }
}

function* createCustomWeekForUserSaga({ payload }) {
  const { user_id, weight, start_date, expire_date, offset, displayName } =
    payload;

  try {
    yield call(
      createCustomWeekForUserSagaAsync,
      user_id,
      weight,
      start_date,
      expire_date,
      offset,
      displayName
    );
    yield put({
      type: types.CREATE_CUSTOM_WEEK_FOR_USER_SUCCESS,
    });
  } catch (error) {
    console.log("error from createCustomWeekForUser :", error);
  }
}

function* createExerciseSnackSaga({ payload }) {
  const { user_id } = payload;
  const apiResult = yield call(createExerciseSnackSagaAsync, user_id);

  try {
    yield put({
      type: types.CREATE_EXERCISE_SNACK_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}
function* createEventLogSnacksSaga({ payload }) {
  const { user_id, snacks_number } = payload;
  const apiResult = yield call(
    createEventLogSnacksSagaAsync,
    user_id,
    snacks_number
  );

  try {
    yield put({
      type: types.CREATE_EVENT_LOG_SNACK_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}
function* updateVideoSnackSaga({ payload }) {
  const { data, id } = payload;
  const apiResult = yield call(updateVideoSnackSagaAsync, data, id);

  console.log("apiResult  555");
  try {
    yield put({
      type: types.UPDATE_VIDEO_SNACK_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}
function* getExerciseSnackSaga({ payload }) {
  const { user_id, week } = payload;
  const apiResult = yield call(getExerciseSnackSagaAsync, user_id, week);

  try {
    yield put({
      type: types.GET_EXERCISE_SNACK_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}

function* getVideoSnackSaga({ payload }) {
  const { user_id, week } = payload;
  const apiResult = yield call(getVideoSnackSagaAsync, user_id, week);

  try {
    yield put({
      type: types.GET_VIDEO_SNACK_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}

export function* watchUpdatePlaytime() {
  yield takeEvery(types.UPDATE_PLAYTIME, updatePlaytimeSaga);
}

export function* watchUpdatePlaytimeLastWeek() {
  yield takeEvery(types.UPDATE_PLAYTIME_LASTWEEK, updatePlaytimeLastWeekSaga);
}

export function* watchUpdatePlaytimeLastWeekSelectedSaga() {
  yield takeEvery(
    types.UPDATE_PLAYTIME_LASTWEEK_SELECTED,
    updatePlaytimeLastWeekSelectedSaga
  );
}

export function* watchUpdatePlaylist() {
  yield takeEvery(types.UPDATE_PLAYLIST, updatePlaylistSaga);
}

export function* watchVideoListForUser() {
  yield takeEvery(types.VIDEO_LIST_FOR_USER, videoListForUserSaga);
}

export function* watchVideoListForUserLastWeek() {
  yield takeEvery(
    types.VIDEO_LIST_FOR_USER_LASTWEEK,
    videoListForUserLastWeekSaga
  );
}

export function* watchRandomVideo() {
  yield takeEvery(types.RANDOM_VIDEO, randomVideoSaga);
}

export function* watchSelectChangeVideo() {
  yield takeEvery(types.SELECT_CHANGE_VIDEO, selectChangeVideoSaga);
}

export function* watchCreateCustomWeekForUser() {
  yield takeEvery(
    types.CREATE_CUSTOM_WEEK_FOR_USER,
    createCustomWeekForUserSaga
  );
}

export function* watchUpdateBodyInfo() {
  yield takeEvery(types.UPDATE_BODY_INFO, updateBodyInfoSaga);
}

export function* watchSelectProgramInWeek() {
  yield takeEvery(types.SELECT_PROGRAM_IN_WEEK, selectProgramInWeekSaga);
}

export function* watchSelectMemberInfo() {
  yield takeEvery(types.SELECT_MEMBER_INFO, selectMemberInfoSaga);
}

export function* watchSelectBodyInfo() {
  yield takeEvery(types.SELECT_BODY_INFO, selectBodyInfoSaga);
}

export function* watchDeleteProgramInWeek() {
  yield takeEvery(types.DELETE_PROGRAM_IN_WEEK, deleteProgramInWeekSaga);
}

export function* watchGetAllExerciseActivity() {
  yield takeEvery(types.GET_ALL_EXERCISE_ACTIVITY, getAllExerciseActivitySaga);
}

export function* watchCreateBraveAndBurnChallenge() {
  yield takeEvery(
    types.CREATE_BRAVE_AND_BURN_CHALLENGE,
    createBraveAndBurnChallengeSaga
  );
}

export function* watchGetBraveAndBurnChallenge() {
  yield takeEvery(
    types.GET_BRAVE_AND_BURN_CHALLENGE,
    getBraveAndBurnChallengeSaga
  );
}

export function* watchUpdateVideoStatusBraveAndBurn() {
  yield takeEvery(
    types.UPDATE_VIDEO_STATUS_BRAVE_AND_BURN,
    updateVideoStatusBraveAndBurnSaga
  );
}

export function* watchUpdateFbShareStatusBraveAndBurn() {
  yield takeEvery(
    types.UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN,
    updateFbShareStatusBraveAndBurnSaga
  );
}

export function* watchCreateEventLogSnacksSaga() {
  yield takeEvery(types.CREATE_EVENT_LOG_SNACK, createEventLogSnacksSaga);
}
export function* watchCreateExerciseSnackSaga() {
  yield takeEvery(types.CREATE_EXERCISE_SNACK, createExerciseSnackSaga);
}
export function* watchGetExerciseSnackSaga() {
  yield takeEvery(types.GET_EXERCISE_SNACK, getExerciseSnackSaga);
}
export function* watchGetVideoSnackSaga() {
  yield takeEvery(types.GET_VIDEO_SNACK, getVideoSnackSaga);
}
export function* watchUpdateVideoSnackSaga() {
  yield takeEvery(types.UPDATE_VIDEO_SNACK, updateVideoSnackSaga);
}

export function* saga() {
  yield all([
    fork(watchUpdatePlaytime),
    fork(watchUpdatePlaytimeLastWeek),
    fork(watchUpdatePlaylist),
    fork(watchVideoListForUser),
    fork(watchVideoListForUserLastWeek),
    fork(watchRandomVideo),
    fork(watchSelectChangeVideo),
    fork(watchCreateCustomWeekForUser),
    fork(watchUpdateBodyInfo),
    fork(watchSelectProgramInWeek),
    fork(watchSelectMemberInfo),
    fork(watchSelectBodyInfo),
    fork(watchDeleteProgramInWeek),
    fork(watchGetAllExerciseActivity),
    fork(watchUpdatePlaytimeLastWeekSelectedSaga),
    fork(watchCreateBraveAndBurnChallenge),
    fork(watchGetBraveAndBurnChallenge),
    fork(watchUpdateVideoStatusBraveAndBurn),
    fork(watchUpdateFbShareStatusBraveAndBurn),
    fork(watchCreateExerciseSnackSaga),
    fork(watchGetExerciseSnackSaga),
    fork(watchUpdateVideoSnackSaga),
    fork(watchGetVideoSnackSaga),
    fork(watchCreateEventLogSnacksSaga),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  exerciseVideo: [[], [], [], []],
  exerciseVideoLastWeek: [[], [], [], []],
  week: 0,
  lastweek: 0,
  isFirstWeek: false,
  status: "default",
  video: {},
  videos: [],
  statusVideoList: "default",
  statusUpdateBodyInfo: "default",
  programInWeek: [],
  memberInfo: [],
  bodyInfo: [],
  statusGetAllExAct: "default",
  all_exercise_activity: [],
  statusUpdatePlayTimeWeekAll: "default",
  hidePopUpVideoPlayer: false,
  hidePopUpVideoPlayerList: false,
  endedVideoPlayerList: false,
  statusCreateBraveAndBurn: "default",
  statusGetBraveAndBurn: "default",
  brave_and_burn_challenge: null,
  status_update_video_brave_and_burn: "default",
  status_update_fb_brave_and_burn: "default",
  statsCreateExerciseSnack: "default",
  statsGetExerciseSnack: "default",
  statsUpdateVideoSnack: "default",
  videoExerciseSnack: null,
  hideVideoPopUpSnack: false,
  statsVideoExerciseSnackAll: "default",
  videoExerciseSnackAll: null,
  snackNumber: 0,
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN:
      return {
        ...state,
        status_update_fb_brave_and_burn: "loading",
      };
    case types.UPDATE_FB_SHARE_STATUS_BRAVE_AND_BURN_SUCCESS:
      return {
        ...state,
        status_update_fb_brave_and_burn: "success",
      };
    case types.UPDATE_VIDEO_STATUS_BRAVE_AND_BURN:
      return {
        ...state,
        status_update_video_brave_and_burn: "loading",
      };
    case types.UPDATE_VIDEO_STATUS_BRAVE_AND_BURN_SUCCESS:
      return {
        ...state,
        status_update_video_brave_and_burn: "success",
      };
    case types.GET_BRAVE_AND_BURN_CHALLENGE:
      return {
        ...state,
        statusGetBraveAndBurn: "loading",
      };
    case types.GET_BRAVE_AND_BURN_CHALLENGE_SUCCESS:
      return {
        ...state,
        statusGetBraveAndBurn: "success",
        brave_and_burn_challenge: action.payload,
      };
    case types.GET_BRAVE_AND_BURN_CHALLENGE_FAIL:
      return {
        ...state,
        statusGetBraveAndBurn: "fail",
      };
    case types.CREATE_BRAVE_AND_BURN_CHALLENGE:
      return {
        ...state,
        statusCreateBraveAndBurn: "loading",
      };
    case types.CREATE_BRAVE_AND_BURN_CHALLENGE_SUCCESS:
      return {
        ...state,
        statusCreateBraveAndBurn: "success",
      };
    case types.CREATE_BRAVE_AND_BURN_CHALLENGE_FAIL:
      return {
        ...state,
        statusCreateBraveAndBurn: "fail",
      };
    case types.HIDE_POPUP_VIDEO_PLAYER:
      return {
        ...state,
        hidePopUpVideoPlayer: action.payload,
      };
    case types.HIDE_POPUP_VIDEO_PLAYER_LIST:
      return {
        ...state,
        hidePopUpVideoPlayerList: action.payload.status,
      };
    case types.SET_ENDED_VIDEO_PLAYER_LIST:
      return {
        ...state,
        endedVideoPlayerList: action.payload.status,
      };
    case types.GET_ALL_EXERCISE_ACTIVITY:
      return {
        ...state,
        statusGetAllExAct: "loading",
      };
    case types.GET_ALL_EXERCISE_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusGetAllExAct: "success",
        all_exercise_activity: action.payload,
      };
    case types.GET_ALL_EXERCISE_ACTIVITY_FAIL:
      return {
        ...state,
        statusGetAllExAct: "fail",
      };
    case types.UPDATE_BODY_INFO_SUCCESS:
      return {
        ...state,
        statusUpdateBodyInfo: "success",
      };
    case types.CREATE_CUSTOM_WEEK_FOR_USER_SUCCESS:
      return {
        ...state,
        statusVideoList: "default",
        statusUpdateBodyInfo: "default",
      };
    case types.UPDATE_PLAYLIST:
      return {
        ...state,
        status: "processing",
      };
    case types.UPDATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        exerciseVideo: action.payload,
        status: "success",
      };
    case types.UPDATE_PLAYTIME_SUCCESS:
      return {
        ...state,
        exerciseVideo: action.payload,
      };
    case types.UPDATE_PLAYTIME_LASTWEEK_SUCCESS:
      return {
        ...state,
        exerciseVideoLastWeek: action.payload,
      };
    case types.UPDATE_PLAYTIME_LASTWEEK_SELECTED:
      return {
        ...state,
        statusUpdatePlayTimeWeekAll: "loading",
      };
    case types.UPDATE_PLAYTIME_LASTWEEK_SELECTED_SUCCESS:
      return {
        ...state,
        all_exercise_activity: action.payload,
        statusUpdatePlayTimeWeekAll: "success",
      };
    case types.VIDEO_LIST_FOR_USER_LASTWEEK_SUCCESS:
      return {
        ...state,
        exerciseVideoLastWeek: action.payload,
        isFirstWeek: false,
      };
    case types.GET_LASTWEEK:
      return {
        ...state,
        lastweek: action.payload,
      };
    case types.VIDEO_LIST_FOR_USER_LASTWEEK_FAIL:
      return {
        ...state,
        isFirstWeek: true,
      };
    case types.VIDEO_LIST_FOR_USER_SUCCESS:
      return {
        ...state,
        exerciseVideo: action.payload,
      };
    case types.GET_WEEK:
      return {
        ...state,
        week: action.payload,
      };
    case types.VIDEO_LIST_FOR_USER_FAIL:
      return {
        ...state,
        statusVideoList: "no_video",
      };
    case types.RANDOM_VIDEO_SUCCESS:
      return {
        ...state,
        video: action.payload,
      };
    case types.SELECT_CHANGE_VIDEO_SUCCESS:
      return {
        ...state,
        videos: action.payload,
      };
    case types.SELECT_PROGRAM_IN_WEEK_SUCCESS:
      return {
        ...state,
        programInWeek: JSON.stringify(action.payload),
      };
    case types.SELECT_MEMBER_INFO_SUCCESS:
      return {
        ...state,
        memberInfo: action.payload,
      };
    case types.SELECT_BODY_INFO_SUCCESS:
      return {
        ...state,
        bodyInfo: action.payload,
      };
    case types.RESET_STATUS:
      return {
        ...state,
        status: "default",
      };
    case types.CLEAR_VIDEOS:
      return {
        ...state,
        videos: [],
      };
    case types.CLEAR_VIDEO_LIST:
      return INIT_STATE;
    case types.CREATE_EXERCISE_SNACK:
      return {
        ...state,
        statsCreateExerciseSnack: "loading",
      };
    case types.CREATE_EXERCISE_SNACK_SUCCESS:
      return {
        ...state,
        statsCreateExerciseSnack: "success",
      };
    case types.CREATE_EXERCISE_SNACK_FALE:
      return {
        ...state,
        statsCreateExerciseSnack: "fail",
      };
    case types.UPDATE_VIDEO_SNACK:
      return {
        ...state,
        statsUpdateVideoSnack: "loading",
      };
    case types.UPDATE_VIDEO_SNACK_SUCCESS:
      return {
        ...state,
        statsUpdateVideoSnack: "success",
      };
    case types.UPDATE_VIDEO_SNACK_FALE:
      return {
        ...state,
        statsUpdateVideoSnack: "fail",
      };
    case types.GET_EXERCISE_SNACK:
      return {
        ...state,
        statsGetExerciseSnack: "loading",
      };
    case types.GET_EXERCISE_SNACK_SUCCESS:
      return {
        ...state,
        videoExerciseSnack: action.payload.exerciseSnack,
        statsGetExerciseSnack: "success",
      };
    case types.GET_EXERCISE_SNACK_FALE:
      return {
        ...state,
        statsGetExerciseSnack: "fail",
      };
    case types.GET_VIDEO_SNACK:
      return {
        ...state,
        statsVideoExerciseSnackAll: "loading",
      };
    case types.GET_VIDEO_SNACK_SUCCESS:
      return {
        ...state,
        videoExerciseSnackAll: action.payload.exerciseSnack,
        statsVideoExerciseSnackAll: "success",
      };
    case types.GET_VIDEO_SNACK_FALE:
      return {
        ...state,
        statsVideoExerciseSnackAll: "fail",
      };
    case types.CREATE_EVENT_LOG_SNACK:
      return {
        ...state,
        statsEventLogSnack: "loading",
      };
    case types.CREATE_EVENT_LOG_SNACK_SUCCESS:
      return {
        ...state,
        statsEventLogSnack: "success",
      };
    case types.CREATE_EVENT_LOG_SNACK_FALE:
      return {
        ...state,
        statsEventLogSnack: "fail",
      };
    case types.HIDE_POPUP_VIDEO_PLAYER_SNACK:
      return {
        ...state,
        hideVideoPopUpSnack: action.payload.status,
      };
    case types.CLEAR_EXERCISE_SNACK:
      return {
        ...state,
        statsGetExerciseSnack: "default",
        statsUpdateVideoSnack: "default",
        statsCreateExerciseSnack: "default",
      };
    case types.SNACK_COUNT:
      return {
        ...state,
        snackNumber: action.payload.number,
      };

    default:
      return { ...state };
  }
}
