import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

export const types = {
  POST_NUTRITION_FOOD: "POST_NUTRITION_FOOD",
  POST_NUTRITION_FOOD_SUCCESS: "POST_NUTRITION_FOOD_SUCCESS",
  GET_NUTRITION_FOOD: "GET_NUTRITION_FOOD",
  GET_NUTRITION_FOOD_SUCCESS: "GET_NUTRITION_FOOD_SUCCESS",
  GET_NUTRITION_FOOD_ERROR: "GET_NUTRITION_FOOD_ERROR",
  CLEAR_NUTRITION_FOOD: "CLEAR_NUTRITION_FOOD",
};

export const clearNutritionFood = () => ({
  type: types.CLEAR_NUTRITION_FOOD,
  payload: {},
});

export const getNutritionFood = (user_id) => ({
  type: types.GET_NUTRITION_FOOD,
  payload: {
    user_id,
  },
});

export const createNutritionFood = (
  user_id,
  weight,
  daily_food,
  diet_problems
) => ({
  type: types.POST_NUTRITION_FOOD,
  payload: {
    user_id,
    weight,
    daily_food,
    diet_problems,
  },
});

const getNutritionSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("bebe", "/getNutritionFood", {
      queryStringParameters: {
        user_id,
      },
    });   
    return apiResult;
  } catch (error) {
    console.log("error :", error);
    return { error, messsage: error.message };
  }
};

const createNutritionFoodSagaAsync = async (
  user_id,
  weight,
  daily_food,
  diet_problems
) => {
  try {
    const apiResult = await API.post("bebe", "/createNutritionFood", {
      body: {
        user_id,
        weight,
        daily_food,
        diet_problems,
      },
    });
    console.log("apiResult async", apiResult);
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* createNutritionFoodSaga({ payload }) {
  const { user_id, weight, daily_food, diet_problems } = payload;
  try {
    const apiResult = yield call(
      createNutritionFoodSagaAsync,
      user_id,
      weight,
      daily_food,
      diet_problems
    );
    if (apiResult.results.message === "success") {
      yield put({
        type: types.POST_NUTRITION_FOOD_SUCCESS,
      });
    } else {
      yield put({
        type: types.POST_NUTRITION_FOOD,
      });
    }
  } catch (error) {
    console.log("error from createNutritionFoodSaga :", error);
  }
}

function* getNutritionFoodSaga({ payload }) {
  const { user_id } = payload;
  try {
    const apiResult = yield call(getNutritionSagaAsync, user_id);
    yield put({
      type: types.GET_NUTRITION_FOOD_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error from getNutritionSaga :", error);
  }
}

export function* watchPostCreateNutritionFood() {
  yield takeEvery(types.POST_NUTRITION_FOOD, createNutritionFoodSaga);
}

export function* watchGetNutritionFood() {
  yield takeEvery(types.GET_NUTRITION_FOOD, getNutritionFoodSaga);
}

export function* saga() {
  yield all([fork(watchPostCreateNutritionFood), fork(watchGetNutritionFood)]);
}

const INIT_STATE = {
  statusPostNutritionFood: "default",
  statusGetNutritionFood: "default",
  nutritionFoods: [],
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.POST_NUTRITION_FOOD:
      return {
        ...state,
        statusPostNutritionFood: "loading",
      };
    case types.POST_NUTRITION_FOOD_SUCCESS:
      return {
        ...state,
        statusPostNutritionFood: "success",
      };
    case types.GET_NUTRITION_FOOD:
      return {
        ...state,
        statusGetNutritionFood: "loading",
      };
    case types.GET_NUTRITION_FOOD_SUCCESS:
      return {
        ...state,
        nutritionFoods: action.payload,
        statusGetNutritionFood: "success",
      };
    case types.GET_NUTRITION_FOOD_ERROR:
      return {
        ...state,
        nutritionFoods: [],
        statusGetNutritionFood: "fail",
      };
    case types.CLEAR_NUTRITION_FOOD:
      return {
        ...state,
        statusPostNutritionFood: "default",
        statusGetNutritionFood: "default",
      };
    default:
      return { ...state };
  }
}
