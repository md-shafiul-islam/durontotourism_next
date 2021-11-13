import axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  GET_BACK_END_URL,
  REQUEST_HEADER,
  SET_ADD_SIGNUP_ERROR,
  SET_SIGNUP_RESP,
} from "../types";

const getDeta = (resp) => {
  if (!helperIsEmpty(resp)) {
    return resp.data;
  }

  return { status: false, message: "Sign up failed", data: null };
};

export const getAddSignUpAction = (signup) => async (dispatch) => {
  signup = JSON.stringify(signup, null, 2);

  console.log("Current Signup User, ", signup);
  const resp = await axios.post(`${GET_BACK_END_URL}/customers/signup`, signup, {
    headers: REQUEST_HEADER,
  });
  console.log("Current Signup Resp, ", resp)
  try {
    dispatch({
      type: SET_SIGNUP_RESP,
      payload: getDeta(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_ADD_SIGNUP_ERROR,
      payload: { status: err, msg: err.message },
    });
  }
};
