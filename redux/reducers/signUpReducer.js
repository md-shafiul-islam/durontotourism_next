/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  REST_USER_SIGNUP,
  SET_ADD_SIGNUP_ERROR,
  SET_SIGNUP_RESP,
} from "../types";

const initialState = {
  signUpStatus: false,
  signUpError: {},
  signUp: {},
  addSignUp: {},
};

const getSignUpResp = (data) => {
  const addSUp = { status: false, msg: "", signUp: {} };

  console.log("Get Signup Resp Redux Reducer, ", data);
  if (!helperIsEmpty(data)) {
    addSUp.status = data.status;
    addSUp.msg = data.message;
    addSUp.signUp = data.data;
  }
  return addSUp;
};

const getRestAction = (state, status) => {
  if (status) {
    return {
      ...state,
      addSUp: { status: false, msg: "", signUp: {} },
    };
  }
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

    case REST_USER_SIGNUP:
      return getRestAction(state, action.payload);
    default:
      return state;
  }
}
