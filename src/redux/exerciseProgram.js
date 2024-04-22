import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  SELECT_PROGRAM: "SELECT_PROGRAM",
  SELECT_PROGRAM_SUCCESS: "SELECT_PROGRAM_SUCCESS",
  CLEAR_PROGRAM: "CLEAR_PROGRAM"
}

export const selectProgram = (program_id) => ({
  type: types.SELECT_PROGRAM,
  payload: {
    program_id
  }
});

export const clearProgram= () => ({
  type: types.CLEAR_PROGRAM
})

/* END OF ACTION Section */

/* SAGA Section */

const selectProgramSagaAsync = async (
  program_id
) => {
  try {
    const apiResult = await API.get("bebe", "/selectProgram", {
      queryStringParameters: {
        program_id
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* selectProgramSaga({ payload }) {
  const {
    program_id
  } = payload
  try {
    const apiResult = yield call(
      selectProgramSagaAsync,
      program_id
    );
    yield put({
      type: types.SELECT_PROGRAM_SUCCESS,
      payload: apiResult.results.program
    })
  } catch (error) {
    return { error, messsage: error.message };
  }
}

export function* watchSelectProgram() {
  yield takeEvery(types.SELECT_PROGRAM, selectProgramSaga)
}

export function* saga() {
  yield all([
    fork(watchSelectProgram)
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  program: null
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.SELECT_PROGRAM_SUCCESS:
      return {
        ...state,
        program: action.payload
      };
    case types.CLEAR_PROGRAM:
      return INIT_STATE;
    default:
      return { ...state };
  }
}