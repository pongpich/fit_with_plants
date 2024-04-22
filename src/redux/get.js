import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";
/* ACTION Section */

export const types = {
  GET_ALL_MEMBER_STAY_FIT: "GET_ALL_MEMBER_STAY_FIT",
  GET_ALL_MEMBER_STAY_FIT_SUCCESS: "GET_ALL_MEMBER_STAY_FIT_SUCCESS",
  GET_CHECK_DISPAY_NAME: "GET_CHECK_DISPAY_NAME",
  GET_CHECK_DISPAY_NAME_FALE: "GET_CHECK_DISPAY_NAME_FALE",
  GET_CHECK_DISPAY_NAME_SUCCESS: "GET_CHECK_DISPAY_NAME_SUCCESS",
  GET_MEMBER_INFO: "GET_MEMBER_INFO",
  GET_MEMBER_INFO_SUCCESS: "GET_MEMBER_INFO_SUCCESS",
  CHECK_4WEEKS_PROMPT: "CHECK_4WEEKS_PROMPT",
  CHECK_4WEEKS_PROMPT_SUCCESS: "CHECK_4WEEKS_PROMPT_SUCCESS",
  CHECK_RENEW_PROMPT: "CHECK_RENEW_PROMPT",
  CHECK_RENEW_PROMPT_SUCCESS: "CHECK_RENEW_PROMPT_SUCCESS",
  CHECK_QUESTIONNAIRE_LOG: "CHECK_QUESTIONNAIRE_LOG",
  CHECK_QUESTIONNAIRE_LOG_SUCCESS: "CHECK_QUESTIONNAIRE_LOG_SUCCESS",
  CHECK_NEWS_LOG: "CHECK_NEWS_LOG",
};

/* END OF ACTION Section */

export const checkNewsLog = (user_id, log) => ({
  type: types.CHECK_NEWS_LOG,
  payload: {
    user_id,
    log,
  },
});

export const checkQuestionnaireLog = (user_id, log) => ({
  type: types.CHECK_QUESTIONNAIRE_LOG,
  payload: {
    user_id,
    log,
  },
});

export const checkRenewPrompt = (user_id) => ({
  type: types.CHECK_RENEW_PROMPT,
  payload: {
    user_id,
  },
});

export const check4WeeksPrompt = (user_id) => ({
  type: types.CHECK_4WEEKS_PROMPT,
  payload: {
    user_id,
  },
});

export const getCheckDisplayName = (display_name) => ({
  type: types.GET_CHECK_DISPAY_NAME,
  payload: {
    display_name,
  },
});

export const getMemberInfo = (user_id) => ({
  type: types.GET_MEMBER_INFO,
  payload: {
    user_id,
  },
});

export const getAllMemberStayFit = (fb_group) => ({
  type: types.GET_ALL_MEMBER_STAY_FIT,
  payload: {
    fb_group,
  },
});

/* SAGA Section */
const getAllMemberStayFitSagaAsync = async (fb_group) => {
  try {
    const apiResult = await API.get("bebe", "/getAllMemberPlatfrom", {
      queryStringParameters: {
        fb_group,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getCheckDisplayNameSagaAsync = async (display_name) => {
  try {
    const apiResult = await API.get("bebe", "/checkDisplayName", {
      queryStringParameters: {
        display_name,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getMemberInfoSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("bebe", "/getMemberInfo", {
      queryStringParameters: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const check4WeeksPromptSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("bebe", "/check4WeeksPrompt", {
      queryStringParameters: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const checkRenewPromptSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("bebe", "/checkRenewPrompt", {
      queryStringParameters: {
        user_id,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const checkQuestionnaireLogSagaAsync = async (user_id, log) => {
  try {
    const apiResult = await API.get("bebe", "/checkQuestionnaireLog", {
      queryStringParameters: {
        user_id,
        log,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const checkNewsLogSagaAsync = async (user_id, log) => {
  try {
    const apiResult = await API.get("bebe", "/checkNewsLog", {
      queryStringParameters: {
        user_id,
        log,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* getAllMemberStayFitSaga({ payload }) {
  const { fb_group } = payload;

  try {
    const apiResult = yield call(getAllMemberStayFitSagaAsync, fb_group);
    yield put({
      type: types.GET_ALL_MEMBER_STAY_FIT_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from getAllMemberStayFitSaga :", error);
  }
}

function* getMemberInfoSagaAsyncSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(getMemberInfoSagaAsync, user_id);

    yield put({
      type: types.GET_MEMBER_INFO_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from getMemberInfoSagaAsyncSaga :", error);
  }
}

function* check4WeeksPromptSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(check4WeeksPromptSagaAsync, user_id);

    yield put({
      type: types.CHECK_4WEEKS_PROMPT_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from check4WeeksPromptSaga :", error);
  }
}

function* checkRenewPromptSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(checkRenewPromptSagaAsync, user_id);

    yield put({
      type: types.CHECK_RENEW_PROMPT_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from checkRenewPromptSaga :", error);
  }
}

function* checkQuestionnaireLogSaga({ payload }) {
  const { user_id, log } = payload;

  try {
    const apiResult = yield call(checkQuestionnaireLogSagaAsync, user_id, log);
    let checkQuestionnaireLog = true;
    if (apiResult.results && apiResult.results.message !== "done") {
      checkQuestionnaireLog = false;
    }
    yield put({
      type: types.CHECK_QUESTIONNAIRE_LOG_SUCCESS,
      payload: checkQuestionnaireLog,
    });
  } catch (error) {
    console.log("error from checkQuestionnaireLogSaga :", error);
  }
}

function* checkNewsLogSaga({ payload }) {
  const { user_id, log } = payload;

  try {
    const apiResult = yield call(checkNewsLogSagaAsync, user_id, log);
    let checkNewsLog = true;
    if (apiResult.results && apiResult.results.message !== "done") {
      checkNewsLog = false;
    }
    yield put({
      type: types.CHECK_NEWS_LOG_SUCCESS,
      payload: checkNewsLog,
    });
  } catch (error) {
    console.log("error from checkNewsLogSaga :", error);
  }
}

function* getCheckDisplayNameSaga({ payload }) {
  const { display_name } = payload;

  try {
    const apiResult = yield call(getCheckDisplayNameSagaAsync, display_name);

    if (apiResult.results.message === "new") {
      yield put({
        type: types.GET_CHECK_DISPAY_NAME_SUCCESS,
      });
    }
    if (apiResult.results.message === "exist") {
      yield put({
        type: types.GET_CHECK_DISPAY_NAME_FALE,
      });
    }
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}

export function* watchGetCheckDisplayNameSaga() {
  yield takeEvery(types.GET_CHECK_DISPAY_NAME, getCheckDisplayNameSaga);
}

export function* watchGetMemberInfoSagaAsyncSaga() {
  yield takeEvery(types.GET_MEMBER_INFO, getMemberInfoSagaAsyncSaga);
}

export function* watchGetAllMemberStayFitSaga() {
  yield takeEvery(types.GET_ALL_MEMBER_STAY_FIT, getAllMemberStayFitSaga);
}

export function* watchCheck4WeeksPromptSaga() {
  yield takeEvery(types.CHECK_4WEEKS_PROMPT, check4WeeksPromptSaga);
}

export function* watchCheckRenewPromptSaga() {
  yield takeEvery(types.CHECK_RENEW_PROMPT, checkRenewPromptSaga);
}

export function* watchCheckQuestionnaireLogSaga() {
  yield takeEvery(types.CHECK_QUESTIONNAIRE_LOG, checkQuestionnaireLogSaga);
}

export function* watchCheckNewsLogSaga() {
  yield takeEvery(types.CHECK_NEWS_LOG, checkNewsLogSaga);
}

export function* saga() {
  yield all([
    fork(watchGetCheckDisplayNameSaga),
    fork(watchGetMemberInfoSagaAsyncSaga),
    fork(watchGetAllMemberStayFitSaga),
    fork(watchCheck4WeeksPromptSaga),
    fork(watchCheckRenewPromptSaga),
    fork(watchCheckQuestionnaireLogSaga),
    fork(watchCheckNewsLogSaga),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  statusDisplayName: "default",
  statusGetMemberInfo: "default",
  member_info: null,
  allMemberStayFit: null,
  statusCheck4WeeksPrompt: false,
  statusGetCheck4WeeksPrompt: "default",
  statusCheckRenewPrompt: false,
  statusGetCheckRenewPrompt: "default",
  statusCheckQuestionnaireLog: true,
  statusGetCheckQuestionnaireLog: "default",
  statusCheckNewsLog: true,
  statusGetCheckNewsLog: "default",
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.GET_ALL_MEMBER_STAY_FIT_SUCCESS:
      return {
        ...state,
        allMemberStayFit: action.payload.allMemberStayFit,
      };
    case types.CHECK_QUESTIONNAIRE_LOG:
      return {
        ...state,
        statusGetCheckQuestionnaireLog: "loading",
      };
    case types.CHECK_QUESTIONNAIRE_LOG_SUCCESS:
      return {
        ...state,
        statusCheckQuestionnaireLog: action.payload,
        statusGetCheckQuestionnaireLog: "success",
      };
    case types.CHECK_NEWS_LOG:
      return {
        ...state,
        statusGetCheckNewsLog: "loading",
      };
    case types.CHECK_NEWS_LOG_SUCCESS:
      return {
        ...state,
        statusCheckNewsLog: action.payload,
        statusGetCheckNewsLog: "success",
      };
    case types.CHECK_RENEW_PROMPT:
      return {
        ...state,
        statusGetCheckRenewPrompt: "loading",
      };
    case types.CHECK_RENEW_PROMPT_SUCCESS:
      return {
        ...state,
        statusCheckRenewPrompt: action.payload.statusCheckRenewPrompt,
        statusGetCheckRenewPrompt: "success",
      };
    case types.CHECK_4WEEKS_PROMPT:
      return {
        ...state,
        statusGetCheck4WeeksPrompt: "loading",
      };
    case types.CHECK_4WEEKS_PROMPT_SUCCESS:
      return {
        ...state,
        statusCheck4WeeksPrompt: action.payload.statusCheck4WeeksPrompt,
        statusGetCheck4WeeksPrompt: "success",
      };
    case types.GET_MEMBER_INFO:
      return {
        ...state,
        statusGetMemberInfo: "loading",
      };
    case types.GET_MEMBER_INFO_SUCCESS:
      return {
        ...state,
        member_info: action.payload.member_info,
        statusGetMemberInfo: "success",
      };
    case types.GET_CHECK_DISPAY_NAME:
      return {
        ...state,
        statusDisplayName: "loading",
      };
    case types.GET_CHECK_DISPAY_NAME_SUCCESS:
      return {
        ...state,
        statusDisplayName: "success",
      };
    case types.GET_CHECK_DISPAY_NAME_FALE:
      return {
        ...state,
        statusDisplayName: "fail",
      };

    default:
      return { ...state };
  }
}
