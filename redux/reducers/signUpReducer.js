/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import { SET_ADD_SIGNUP_ERROR, SET_SIGNUP_RESP } from "../types";

const initialState = {
  signUpStatus: false,
  signUpError: {},
  signUp: {},
  addSignUp: {},
};

const getSignUpResp = (data) => {
  const addSUp = { status: false, msg: "", signUp: {} };
  if (!helperIsEmpty(data)) {
    addSUp.status = data.status;
    addSUp.msg = data.message;
    addSUp.signUp = data.data;
  }
  return addSUp;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIGNUP_RESP:
      return {
        ...state,
        addSignUp: getSignUpResp(action.payload),
      };
    case SET_ADD_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    default:
      return state;
  }
}
