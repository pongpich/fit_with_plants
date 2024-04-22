import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  UPDATE_FITTO_PLANT: "UPDATE_FITTO_PLANT",
  UPDATE_FITTO_PLANT_SUCCESS: "UPDATE_FITTO_PLANT_SUCCESS",
  UPDATE_ADDRESS: "UPDATE_ADDRESS",
  UPDATE_ADDRESS_SUCCESS: "UPDATE_ADDRESS_SUCCESS",
  UPDATE_DISPLAY_NAME: "UPDATE_DISPLAY_NAME",
  UPDATE_DISPLAY_NAME_SUCCESS: "UPDATE_DISPLAY_NAME_SUCCESS",
  UPDATE_DISPLAY_NAME_FAIL: "UPDATE_DISPLAY_NAME_FAIL",
  UPDATE_STATUS_LOW_IMPACT: "UPDATE_STATUS_LOW_IMPACT",
  UPDATE_STATUS_LOW_IMPACT_SUCCESS: "UPDATE_STATUS_LOW_IMPACT_SUCCESS",
  UPDATE_PROGRAM_LEVEL: "UPDATE_PROGRAM_LEVEL",
  UPDATE_PROGRAM_LEVEL_SUCCESS: "UPDATE_PROGRAM_LEVEL_SUCCESS",
  UPDATE_PROGRAM_PROMPT_LOG: "UPDATE_PROGRAM_PROMPT_LOG",
  UPDATE_PROGRAM_PROMPT_LOG_SUCCESS: "UPDATE_PROGRAM_PROMPT_LOG_SUCCESS",
  CHECK_PROGRAM_LEVEL: "CHECK_PROGRAM_LEVEL",
  CHECK_PROGRAM_LEVEL_SUCCESS: "CHECK_PROGRAM_LEVEL_SUCCESS",
  INSERT_QUESTIONNAIRE_LOG: "INSERT_QUESTIONNAIRE_LOG",
  INSERT_QUESTIONNAIRE_LOG_SUCCESS: "INSERT_QUESTIONNAIRE_LOG_SUCCESS",
  INSERT_NEWS_LOG: "INSERT_NEWS_LOG",
  INSERT_NEWS_LOG_SUCCESS: "INSERT_NEWS_LOG_SUCCESS",
}

export const insertQuestionnaireLog = (
  user_id,
  log
) => ({
  type: types.INSERT_QUESTIONNAIRE_LOG,
  payload: {
    user_id,
    log
  }
})

export const insertNewsLog = (
  user_id,
  log
) => ({
  type: types.INSERT_NEWS_LOG,
  payload: {
    user_id,
    log
  }
})

export const checkProgramLevel = (
  user_id
) => ({
  type: types.CHECK_PROGRAM_LEVEL,
  payload: {
    user_id
  }
})

export const updateProgramPromptLog = (
  user_id,
  log_name, // 4 weeks prompt, renew prompt
  log_value // level up, not level up
) => ({
  type: types.UPDATE_PROGRAM_PROMPT_LOG,
  payload: {
    user_id,
    log_name,
    log_value
  }
});

export const updateStatusLowImpact = (
  user_id,
  status_low_impact //yes or no
) => ({
  type: types.UPDATE_STATUS_LOW_IMPACT,
  payload: {
    user_id,
    status_low_impact
  }
});

export const updateProgramLevel = (
  user_id,
  program_level //bfr_lv1 or bfr_lv2
) => ({
  type: types.UPDATE_PROGRAM_LEVEL,
  payload: {
    user_id,
    program_level
  }
});

export const updateDisplayName = (user_id, display_name) => ({
  type: types.UPDATE_DISPLAY_NAME,
  payload: {
    user_id,
    display_name
  }
})

export const updateFittoPlant = (user_id, data) => ({
  type: types.UPDATE_FITTO_PLANT,
  payload: {
    user_id,
    data
  }
})
export const updateAddress = (user_id, data) => ({
  type: types.UPDATE_ADDRESS,
  payload: {
    user_id,
    data
  }
})

/* END OF ACTION Section */

/* SAGA Section */

const updateFittoPlantSagaAsync = async (
  user_id,
  data
) => {
  try {
    const apiResult = await API.post("bebe", "/updateFittoPlant", {
      body: {
        user_id,
        data
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const updateAddressSagaAsync = async (
  user_id,
  data
) => {
  try {
    const apiResult = await API.post("bebe", "/updateAddress", {
      body: {
        user_id,
        data
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const updateDisplayNameSagaAsync = async (
  user_id,
  display_name
) => {
  try {
    const apiResult = await API.post("bebe", "/updateDisplayName", {
      body: {
        user_id,
        display_name
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const checkProgramLevelSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.put("bebe", "/checkProgramLevel", {
      body: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const insertQuestionnaireLogSagaAsync = async (
  user_id,
  log
) => {
  try {
    const apiResult = await API.post("bebe", "/insertQuestionnaireLog", {
      body: {
        user_id,
        log
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const insertNewsLogSagaAsync = async (
  user_id,
  log
) => {
  try {
    const apiResult = await API.post("bebe", "/insertNewsLog", {
      body: {
        user_id,
        log
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const updateStatusLowImpactSagaAsync = async (
  user_id,
  status_low_impact
) => {
  try {
    const apiResult = await API.put("bebe", "/updateStatusLowImpact", {
      body: {
        user_id,
        status_low_impact
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const updateProgramLevelSagaAsync = async (
  user_id,
  program_level
) => {
  try {
    const apiResult = await API.put("bebe", "/updateProgramLevel", {
      body: {
        user_id,
        program_level
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const updateProgramPromptLogSagaAsync = async (
  user_id,
  log_name,
  log_value
) => {
  try {
    const apiResult = await API.post("bebe", "/updateProgramPromptLog", {
      body: {
        user_id,
        log_name,
        log_value
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

/* END OF SAGA Section */

function* updateFittoPlantSaga({ payload }) {
  const {
    user_id,
    data
  } = payload

  try {
    const apiResult = yield call(
      updateFittoPlantSagaAsync,
      user_id,
      data
    );
    yield put({
      type: types.UPDATE_FITTO_PLANT_SUCCESS
    })
    console.log("apiResult  :", apiResult);
  } catch (error) {
    console.log("error from updateFittoPlantSaga :", error);
  }
}

function* updateAddressSaga({ payload }) {
  const {
    user_id,
    data
  } = payload

  try {
    const apiResult = yield call(
      updateAddressSagaAsync,
      user_id,
      data
    );
    yield put({
      type: types.UPDATE_ADDRESS_SUCCESS
    })
    console.log("apiResult  :", apiResult);
  } catch (error) {
    console.log("error from updateFittoPlantSaga :", error);
  }
}

function* updateDisplayNameSaga({ payload }) {
  const {
    user_id,
    display_name
  } = payload

  try {
    const apiResult = yield call(
      updateDisplayNameSagaAsync,
      user_id,
      display_name
    );
    yield put({
      type: types.UPDATE_DISPLAY_NAME_SUCCESS
    })
    /*  if (apiResult.results.message === "new") {
       yield put({
         type: types.UPDATE_DISPLAY_NAME_SUCCESS
       })
     }
     if (apiResult.results.message === "exist") {
       yield put({
         type: types.UPDATE_DISPLAY_NAME_FAIL
       })
     } */
  } catch (error) {
    console.log("error from updateDisplayNameSaga :", error);
  }
}

function* checkProgramLevelSaga({ payload }) {
  const {
    user_id,
  } = payload

  try {
    const apiResult = yield call(
      checkProgramLevelSagaAsync,
      user_id,
    );
    yield put({
      type: types.CHECK_PROGRAM_LEVEL_SUCCESS
    })

  } catch (error) {
    console.log("error from checkProgramLevelSaga :", error);
  }
}

function* insertQuestionnaireLogSaga({ payload }) {
  const {
    user_id,
    log
  } = payload

  try {
    const apiResult = yield call(
      insertQuestionnaireLogSagaAsync,
      user_id,
      log
    );
    yield put({
      type: types.INSERT_QUESTIONNAIRE_LOG_SUCCESS
    })

  } catch (error) {
    console.log("error from insertQuestionnaireLogSaga :", error);
  }
}
function* insertNewsLogSaga({ payload }) {
  const {
    user_id,
    log
  } = payload

  try {
    const apiResult = yield call(
      insertNewsLogSagaAsync,
      user_id,
      log
    );
    yield put({
      type: types.INSERT_NEWS_LOG_SUCCESS
    })

  } catch (error) {
    console.log("error from insertNewsLogSaga :", error);
  }
}

function* updateStatusLowImpactSaga({ payload }) {
  const {
    user_id,
    status_low_impact
  } = payload

  try {
    const apiResult = yield call(
      updateStatusLowImpactSagaAsync,
      user_id,
      status_low_impact
    );
    yield put({
      type: types.UPDATE_STATUS_LOW_IMPACT_SUCCESS
    })
  } catch (error) {
    console.log("error from updateStatusLowImpactSaga :", error);
  }
}

function* updateProgramLevelSaga({ payload }) {
  const {
    user_id,
    program_level
  } = payload

  try {
    const apiResult = yield call(
      updateProgramLevelSagaAsync,
      user_id,
      program_level
    );
    yield put({
      type: types.UPDATE_PROGRAM_LEVEL_SUCCESS
    })
  } catch (error) {
    console.log("error from updateProgramLevelSaga :", error);
  }
}

function* updateProgramPromptLogSaga({ payload }) {
  const {
    user_id,
    log_name,
    log_value
  } = payload

  try {
    const apiResult = yield call(
      updateProgramPromptLogSagaAsync,
      user_id,
      log_name,
      log_value
    );
    yield put({
      type: types.UPDATE_PROGRAM_PROMPT_LOG_SUCCESS
    })
  } catch (error) {
    console.log("error from updateProgramPromptLogSaga :", error);
  }
}

export function* watchupdateFittoPlant() {
  yield takeEvery(types.UPDATE_FITTO_PLANT, updateFittoPlantSaga)
}
export function* watchupdateAddress() {
  yield takeEvery(types.UPDATE_ADDRESS, updateAddressSaga)
}
export function* watchupdateDisplayName() {
  yield takeEvery(types.UPDATE_DISPLAY_NAME, updateDisplayNameSaga)
}
export function* watchUpdateStatusLowImpact() {
  yield takeEvery(types.UPDATE_STATUS_LOW_IMPACT, updateStatusLowImpactSaga)
}

export function* watchUpdateProgramLevel() {
  yield takeEvery(types.UPDATE_PROGRAM_LEVEL, updateProgramLevelSaga)
}

export function* watchUpdateProgramPromptLog() {
  yield takeEvery(types.UPDATE_PROGRAM_PROMPT_LOG, updateProgramPromptLogSaga)
}

export function* watchCheckProgramLevel() {
  yield takeEvery(types.CHECK_PROGRAM_LEVEL, checkProgramLevelSaga)
}

export function* watchInsertQuestionnaireLogSaga() {
  yield takeEvery(types.INSERT_QUESTIONNAIRE_LOG, insertQuestionnaireLogSaga)
}

export function* watchInsertNewsLogSaga() {
  yield takeEvery(types.INSERT_NEWS_LOG, insertNewsLogSaga)
}

export function* saga() {
  yield all([
    fork(watchupdateFittoPlant),
    fork(watchupdateAddress),
    fork(watchupdateDisplayName),
    fork(watchUpdateStatusLowImpact),
    fork(watchUpdateProgramPromptLog),
    fork(watchCheckProgramLevel),
    fork(watchUpdateProgramLevel),
    fork(watchInsertQuestionnaireLogSaga),
    fork(watchInsertNewsLogSaga),
  ]);
}

/* REDUCER Section */

const INIT_STATE = {
  fittoPlant: "default",
  statusAddress: "default",
  statusUpdateDisplayName: "default",
  statusUpdateLowImpact: "default",
  statusUpdateProgramLevel: "default",
  statusUpdateProgramPromptLog: "default",
  statusInsertQuestionnaireLog: "default",
  statusInsertNewsLog: "default"
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.INSERT_QUESTIONNAIRE_LOG:
      return {
        ...state,
        statusInsertQuestionnaireLog: "loading"
      }
    case types.INSERT_QUESTIONNAIRE_LOG_SUCCESS:
      return {
        ...state,
        statusInsertQuestionnaireLog: "success"
      }
    case types.INSERT_NEWS_LOG:
      return {
        ...state,
        statusInsertNewsLog: "loading"
      }
    case types.INSERT_NEWS_LOG_SUCCESS:
      return {
        ...state,
        statusInsertNewsLog: "success"
      }
    case types.CHECK_PROGRAM_LEVEL:
      return {
        ...state
      }
    case types.CHECK_PROGRAM_LEVEL_SUCCESS:
      return {
        ...state
      }
    case types.UPDATE_PROGRAM_PROMPT_LOG:
      return {
        ...state,
        statusUpdateProgramPromptLog: "loading"
      }
    case types.UPDATE_PROGRAM_PROMPT_LOG_SUCCESS:
      return {
        ...state,
        statusUpdateProgramPromptLog: "success"
      }
    case types.UPDATE_PROGRAM_LEVEL:
      return {
        ...state,
        statusUpdateProgramLevel: "loading"
      }
    case types.UPDATE_PROGRAM_LEVEL_SUCCESS:
      return {
        ...state,
        statusUpdateProgramLevel: "success"
      }
    case types.UPDATE_STATUS_LOW_IMPACT:
      return {
        ...state,
        statusUpdateLowImpact: "loading"
      }
    case types.UPDATE_STATUS_LOW_IMPACT_SUCCESS:
      return {
        ...state,
        statusUpdateLowImpact: "success"
      }
    case types.UPDATE_DISPLAY_NAME:
      return {
        ...state,
        statusUpdateDisplayName: "loading"
      }
    case types.UPDATE_DISPLAY_NAME_SUCCESS:
      return {
        ...state,
        statusUpdateDisplayName: "success"
      }
    case types.UPDATE_DISPLAY_NAME_FAIL:
      return {
        ...state,
        statusUpdateDisplayName: "fail"
      }
    case types.UPDATE_FITTO_PLANT_SUCCESS:
      return {
        ...state,
        fittoPlant: "success"
      }
    case types.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        statusAddress: "success"
      }
    default:
      return { ...state };
  }
}
