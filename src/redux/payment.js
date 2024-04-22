import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  GET_TREEPAY_HASH: "GET_TREEPAY_HASH",
  GET_TREEPAY_HASH_SUCCESS: "GET_TREEPAY_HASH_SUCCESS",
  CLEAR_PAYMENT: "CLEAR_PAYMENT",
  CREATE_ORDER: "CREATE_ORDER"
}

export const createOrder = (
  order_no,
  user_id,
  program_id,
  price,
  pay_type,
  urlPaySlip
) => ({
  type: types.CREATE_ORDER,
  payload: {
    order_no,
    user_id,
    program_id,
    price,
    pay_type,
    urlPaySlip
  }
})

export const clearPayment = () => ({
  type: types.CLEAR_PAYMENT
})

export const getTreepayHash = (
  pay_type,
  order_no,
  trade_mony,
  user_id) => ({
    type: types.GET_TREEPAY_HASH,
    payload: {
      pay_type,
      order_no,
      trade_mony,
      user_id
    }
  });


/* END OF ACTION Section */

/* SAGA Section */

const getCreateOrderSagaAsync = async (
  order_no,
  user_id,
  program_id,
  price,
  pay_type,
  urlPaySlip
) => {
  try {
    const apiResult = await API.post("bebe", "/createOrder", {
      body: {
        order_no,
        user_id,
        program_id,
        price,
        pay_type,
        urlPaySlip
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const getTreepayHashSagaAsync = async (
  pay_type,
  order_no,
  trade_mony,
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/treepay_hash", {
      queryStringParameters: {
        pay_type,
        order_no,
        trade_mony,
        user_id
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* getCreateOrderSaga({ payload }) {
  const { order_no, user_id, program_id, price, pay_type, urlPaySlip } = payload;
  try {
    yield call(
      getCreateOrderSagaAsync,
      order_no,
      user_id,
      program_id,
      price,
      pay_type,
      urlPaySlip
    );
  } catch (error) {
    return { error, messsage: error.message };
  }
}

function* getTreepayHashSaga({ payload }) {
  const {
    pay_type,
    order_no,
    trade_mony,
    user_id
  } = payload
  try {
    const apiResult = yield call(
      getTreepayHashSagaAsync,
      pay_type,
      order_no,
      trade_mony,
      user_id
    );
    yield put({
      type: types.GET_TREEPAY_HASH_SUCCESS,
      payload: apiResult.results
    })
  } catch (error) {
    return { error, messsage: error.message };
  }
}

export function* watchGetTreepayHash() {
  yield takeEvery(types.GET_TREEPAY_HASH, getTreepayHashSaga)
}

export function* watchCreateOrder() {
  yield takeEvery(types.CREATE_ORDER, getCreateOrderSaga)
}

export function* saga() {
  yield all([
    fork(watchGetTreepayHash),
    fork(watchCreateOrder)
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  hash_data: null,
  site_cd: null
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.GET_TREEPAY_HASH_SUCCESS:
      return {
        ...state,
        hash_data: action.payload.hash_data,
        site_cd: action.payload.site_cd
      };
    case types.CLEAR_PAYMENT:
      return INIT_STATE;
    default:
      return { ...state };
  }
}