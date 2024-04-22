import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

/* ACTION Section */

export const types = {
  REGISTER: "REGISTER",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  SIGNUP_USER: "SIGNUP_USER",
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",
  CHECK_USER: "CHECK_USER",
  CHECK_USER_SUCCESS: "CHECK_USER_SUCCESS",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  LOGOUT_USER: "LOGOUT_USER",
  SET_PASSWORD: "SET_PASSWORD",
  SET_PASSWORD_SUCCESS: "SET_PASSWORD_SUCCESS",
  TRIAL_PACKAGE: "TRIAL_PACKAGE",
  TRIAL_PACKAGE_SUCCESS: "TRIAL_PACKAGE_SUCCESS",
  GET_EXPIRE_DATE: "GET_EXPIRE_DATE",
  GET_EXPIRE_DATE_SUCCESS: "GET_EXPIRE_DATE_SUCCESS",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAIL: "RESET_PASSWORD_FAIL",
  IMPORT_MEMBERS: "IMPORT_MEMBERS",
  IMPORT_MEMBERS_SUCCESS: "IMPORT_MEMBERS_SUCCESS",
  IMPORT_MEMBERS_FAIL: "IMPORT_MEMBERS_FAIL",
  GET_GROUP_ID: "GET_GROUP_ID",
  GET_GROUP_ID_SUCCESS: "GET_GROUP_ID_SUCCESS",
  CHANGE_EMAIL: "CHANGE_EMAIL",
  CHANGE_EMAIL_SUCCESS: "CHANGE_EMAIL_SUCCESS",
  CHECK_UPDATE_MAX_FRIENDS: "CHECK_UPDATE_MAX_FRIENDS",
}

export const checkUpdateMaxFriends = (user_id) => ({
  type: types.CHECK_UPDATE_MAX_FRIENDS,
  payload: {
    user_id
  }
})

export const changeEmail = (
  email,
  new_email
) => ({
  type: types.CHANGE_EMAIL,
  payload: {
    email,
    new_email
  }
})

export const getGroupID = (
  user_id
) => ({
  type: types.GET_GROUP_ID,
  payload: {
    user_id
  }
})

export const resetPassword = (
  email,
  user_id,
  expire_time
) => ({
  type: types.RESET_PASSWORD,
  payload: {
    email,
    user_id,
    expire_time
  }
})

export const forgotPassword = (email) => ({
  type: types.FORGOT_PASSWORD,
  payload: { email }
});

export const getExpireDate = (email) => ({
  type: types.GET_EXPIRE_DATE,
  payload: {
    email
  }
})

export const trialPackage = (email, expire_date) => ({
  type: types.TRIAL_PACKAGE,
  payload: {
    email,
    expire_date
  }
})

export const setPassword = (email, password) => ({
  type: types.SET_PASSWORD,
  payload: {
    email,
    password
  }
})

export const logoutUser = () => ({
  type: types.LOGOUT_USER
});

export const checkUser = (email) => ({
  type: types.CHECK_USER,
  payload: {
    email
  }
});

export const loginUser = (email, password) => ({
  type: types.LOGIN_USER,
  payload: {
    email,
    password
  }
});

export const updateProfile = (
  email,
  other_attributes,
  displayName) => ({
    type: types.UPDATE_PROFILE,
    payload: {
      email,
      other_attributes,
      displayName
    }
  });

export const importMembers = (members, start_date, expire_date, member_type, exercise_day) => ({
  type: types.IMPORT_MEMBERS,
  payload: {
    members,
    start_date,
    expire_date,
    member_type,
    exercise_day
  }
})


export const register = (email, password, firstname, lastname, phone) => ({
  type: types.REGISTER,
  payload: {
    email,
    password,
    firstname,
    lastname,
    phone
  }
});

export const signupUser = (email, password, firstname, lastname, phone) => ({
  type: types.SIGNUP_USER,
  payload: {
    email,
    password,
    firstname,
    lastname,
    phone
  }
});

/* END OF ACTION Section */

/* SAGA Section */

const checkUpdateMaxFriendsSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.put("bebe", "/checkUpdateMaxFriends", {
      body: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const checkUserSagaAsync = async (
  email
) => {
  try {
    const apiResult = await API.get("bebe", "/check_user", {
      queryStringParameters: {
        email: email
      }
    });
    return apiResult
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message }
  }
}

const setPasswordSagaAsync = async (
  email,
  password
) => {
  try {
    const apiResult = await API.put("bebe", "/setPassword", {
      body: {
        email: email,
        password: password,
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const trialPackageSagaAsync = async (
  email
) => {
  try {
    const apiResult = await API.put("bebe", "/trialPackage", {
      body: {
        email: email,
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const importMembersSagaAsync = async (
  members,
  start_date,
  expire_date,
  member_type,
  exercise_day
) => {
  try {
    const apiResult = await API.post("bebe", "/import_members", {
      body: {
        members,
        start_date,
        expire_date,
        member_type,
        exercise_day
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const registerSagaAsync = async (
  email,
  password,
  firstname,
  lastname,
  phone
) => {
  try {
    const apiResult = await API.post("bebe", "/register", {
      body: {
        email: email,
        password: password,
        first_name: firstname,
        last_name: lastname,
        phone: phone
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateProfileSagaAsync = async (
  email,
  other_attributes,
  displayName
) => {
  try {
    const apiResult = await API.post("bebe", "/updateProfile", {
      body: {
        email: email,
        other_attributes,
        displayName
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const signupUserSagaAsync = async (
  email,
  password,
  firstname,
  lastname,
  phone
) => {
  try {
    const apiResult = await API.post("bebe", "/signup", {
      body: {
        email: email,
        password: password,
        first_name: firstname,
        last_name: lastname,
        phone: phone
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getExpireDateSagaAsync = async (
  email
) => {
  try {
    const apiResult = await API.get("bebe", "/getExpireDate", {
      queryStringParameters: {
        email
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const changeEmailSagaAsync = async (
  email,
  new_email
) => {
  try {
    const apiResult = await API.put("bebe", "/changeEmail", {
      body: {
        email,
        new_email
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const getGroupIDSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("bebe", "/getGroupID", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const resetPasswordSagaAsync = async (
  email,
  user_id,
  expire_time
) => {
  try {
    const apiResult = await API.put("bebe", "/resetPassword", {
      body: {
        email,
        user_id,
        expire_time
      }
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const forgotPasswordSagaAsync = async (
  email
) => {
  try {
    const apiResult = await API.get("bebe", "/forgotPassword", {
      queryStringParameters: {
        email
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const loginUserSagaAsync = async (
  email,
  password
) => {
  try {
    const apiResult = await API.get("bebe", "/login", {
      queryStringParameters: {
        email: email,
        password: password
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* checkUserSaga({ payload }) {
  const {
    email
  } = payload

  try {
    const apiResult = yield call(
      checkUserSagaAsync,
      email
    );
    yield put({
      type: types.CHECK_USER_SUCCESS,
      payload: apiResult.results.message
    })
  } catch (error) {
    console.log("error from checkUserSaga :", error);
  }
}

function* checkUpdateMaxFriendsSaga({ payload }) {
  const {
    user_id
  } = payload

  try {
    const apiResult = yield call(
      checkUpdateMaxFriendsSagaAsync,
      user_id
    );
  } catch (error) {
    console.log("error from checkUpdateMaxFriendsSaga :", error);
  }
}

function* updateProfileSaga({ payload }) {
  const {
    email,
    other_attributes,
    displayName
  } = payload

  try {
    yield call(
      updateProfileSagaAsync,
      email,
      other_attributes,
      displayName
    );
    yield put({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: other_attributes
    })
  } catch (error) {
    console.log("error from updateProfile :", error);
  }
}

function* signupUserSaga({ payload }) {
  const {
    email,
    password,
    firstname,
    lastname,
    phone
  } = payload

  try {
    const apiResult = yield call(
      signupUserSagaAsync,
      email,
      password,
      firstname,
      lastname,
      phone
    );
    console.log("signupUser : ", apiResult);
  } catch (error) {
    console.log("error from signupUser :", error);
  }
}

function* setPasswordSaga({ payload }) {
  const {
    email,
    password
  } = payload

  try {
    yield call(
      setPasswordSagaAsync,
      email,
      password
    );
    yield put({
      type: types.SET_PASSWORD_SUCCESS
    })
  } catch (error) {
    console.log("error from setPasswordSaga :", error);
  }
}

function* trialPackageSaga({ payload }) {
  const {
    email,
    expire_date
  } = payload

  try {
    yield call(
      trialPackageSagaAsync,
      email
    );
    yield put({
      type: types.TRIAL_PACKAGE_SUCCESS,
      payload: expire_date
    })
  } catch (error) {
    console.log("error from trialPackageSaga :", error);
  }
}

function* importMembersSaga({ payload }) {
  const {
    members,
    start_date,
    expire_date,
    member_type,
    exercise_day
  } = payload

  try {
    const apiResult = yield call(
      importMembersSagaAsync,
      members,
      start_date,
      expire_date,
      member_type,
      exercise_day
    )
    console.log("apiResult :", apiResult);
    if (apiResult && apiResult.results.message === "success") {
      yield put({
        type: types.IMPORT_MEMBERS_SUCCESS
      })
    } else {
      yield put({
        type: types.IMPORT_MEMBERS_FAIL
      })
    }
  } catch (error) {
    yield put({
      type: types.IMPORT_MEMBERS_FAIL
    })
    console.log("error from importMembersSaga :", error);
  }
}

function* registerSaga({ payload }) {
  const {
    email,
    password,
    firstname,
    lastname,
    phone
  } = payload

  try {
    yield call(
      registerSagaAsync,
      email,
      password,
      firstname,
      lastname,
      phone
    );
    yield put({
      type: types.REGISTER_SUCCESS
    })
  } catch (error) {
    console.log("error from register :", error);
  }
}

function* getExpireDateSaga({ payload }) {
  const {
    email
  } = payload

  try {
    const apiResult = yield call(
      getExpireDateSagaAsync,
      email
    );
    yield put({
      type: types.GET_EXPIRE_DATE_SUCCESS,
      payload: apiResult.results.expire_date
    })
  } catch (error) {
    console.log("error from getExpireDateSaga :", error);
  }
}

function* getGroupIDSaga({ payload }) {
  const {
    user_id
  } = payload

  try {
    const apiResult = yield call(
      getGroupIDSagaAsync,
      user_id
    );
    yield put({
      type: types.GET_GROUP_ID_SUCCESS,
      payload: apiResult.results.group_id
    })
  } catch (error) {
    console.log("error from getGroupIDSaga :", error);
  }
}

function* changeEmailSaga({ payload }) {
  const {
    email,
    new_email
  } = payload

  try {
    const apiResult = yield call(
      changeEmailSagaAsync,
      email,
      new_email
    );
    yield put({
      type: types.CHANGE_EMAIL_SUCCESS,
      payload: apiResult.results.message
    })
    yield put({
      type: types.CHANGE_EMAIL_FAIL,
      payload: apiResult.results.message
    })
  } catch (error) {
    console.log("error from changeEmailSaga :", error);
  }
}

function* resetPasswordSaga({ payload }) {
  const {
    email,
    user_id,
    expire_time
  } = payload;
  try {
    const apiResult = yield call(
      resetPasswordSagaAsync,
      email,
      user_id,
      expire_time
    )
    if (apiResult.results.message === "success") {
      yield put({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: apiResult.results.user
      })
    } else if (apiResult.results.message === "fail" || apiResult.results.message === "no_user") {
      yield put({
        type: types.RESET_PASSWORD_FAIL
      })
    }
  } catch (error) {
    console.log("error from resetPasswordSaga :", error);
  }
}

function* forgotPasswordSaga({ payload }) {
  const { email } = payload;
  try {
    yield call(
      forgotPasswordSagaAsync,
      email
    );
  } catch (error) {
    console.log("error from forgotPasswordSaga :", error);
  }
}

function* loginUserSaga({ payload }) {
  const {
    email,
    password
  } = payload

  try {
    console.log("hhhhh");
    const loginResult = yield call(
      loginUserSagaAsync,
      email,
      password
    );
    console.log(loginResult);
    if (loginResult.results.message === "success") {
      console.log("user :", loginResult.results.user);
      yield put({
        type: types.LOGIN_USER_SUCCESS,
        payload: loginResult.results.user
      })
    } else if (loginResult.results.message === "fail" || loginResult.results.message === "no_user") {
      console.log("user :", loginResult.results.user);
      yield put({
        type: types.LOGIN_USER_FAIL
      })
    }
  } catch (error) {
    console.log("error form login", error);
  }
}

export function* watchCheckUser() {
  yield takeEvery(types.CHECK_USER, checkUserSaga)
}

export function* watchLoginUser() {
  yield takeEvery(types.LOGIN_USER, loginUserSaga)
}

export function* watchSignupUser() {
  yield takeEvery(types.SIGNUP_USER, signupUserSaga);
}

export function* watchRegister() {
  yield takeEvery(types.REGISTER, registerSaga)
}

export function* watchUpdateProfile() {
  yield takeEvery(types.UPDATE_PROFILE, updateProfileSaga)
}

export function* watchSetPassword() {
  yield takeEvery(types.SET_PASSWORD, setPasswordSaga)
}

export function* watchTrialPackage() {
  yield takeEvery(types.TRIAL_PACKAGE, trialPackageSaga)
}

export function* watchGetExpireDate() {
  yield takeEvery(types.GET_EXPIRE_DATE, getExpireDateSaga)
}

export function* watchForgotPassword() {
  yield takeEvery(types.FORGOT_PASSWORD, forgotPasswordSaga);
}

export function* watchResetPassword() {
  yield takeEvery(types.RESET_PASSWORD, resetPasswordSaga)
}

export function* watchImportMembers() {
  yield takeEvery(types.IMPORT_MEMBERS, importMembersSaga);
}

export function* watchGetGroupID() {
  yield takeEvery(types.GET_GROUP_ID, getGroupIDSaga);
}

export function* watchChangeEmail() {
  yield takeEvery(types.CHANGE_EMAIL, changeEmailSaga);
}

export function* watchCheckUpdateMaxFriends() {
  yield takeEvery(types.CHECK_UPDATE_MAX_FRIENDS, checkUpdateMaxFriendsSaga)
}

export function* saga() {
  yield all([
    fork(watchLoginUser),
    fork(watchRegister),
    fork(watchCheckUser),
    fork(watchSignupUser),
    fork(watchUpdateProfile),
    fork(watchSetPassword),
    fork(watchTrialPackage),
    fork(watchGetExpireDate),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchImportMembers),
    fork(watchGetGroupID),
    fork(watchChangeEmail),
    fork(watchCheckUpdateMaxFriends),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  user: null,
  status: "default",
  loading: false,
  statusRegister: "default",
  statusResetPassword: "default",
  statusChangeEmail: "default",
  statusImportMembers: "default"
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.IMPORT_MEMBERS:
      return {
        ...state,
        statusImportMembers: "loading"
      }
    case types.IMPORT_MEMBERS_SUCCESS:
      return {
        ...state,
        statusImportMembers: "success"
      }
    case types.IMPORT_MEMBERS_FAIL:
      return {
        ...state,
        statusImportMembers: "fail"
      }
    case types.GET_EXPIRE_DATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          expire_date: action.payload
        }
      }
    case types.GET_GROUP_ID_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          group_id: action.payload
        }
      }
    case types.CHECK_USER_SUCCESS:
      return {
        ...state,
        statusRegister: action.payload
      }
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        statusResetPassword: "success"
      };
    case types.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        statusResetPassword: "default"
      }
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        status: "success",
        statusRegister: "default",
        statusResetPassword: "default"
      };
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        status: "fail",
        statusRegister: "default",
        statusResetPassword: "default"
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        statusRegister: "success"
      }
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          other_attributes: action.payload
        }
      }
    case types.TRIAL_PACKAGE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          expire_date: action.payload
        }
      };
    case types.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        statusChangeEmail: action.payload
      }
    case types.LOGOUT_USER:
      return INIT_STATE;
    default:
      return { ...state };
  }
}