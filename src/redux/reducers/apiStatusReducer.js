import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsWithSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsWithSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
