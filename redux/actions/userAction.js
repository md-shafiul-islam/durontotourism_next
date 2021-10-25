import axios from "axios";
import { localDataStore } from "../../utils/helper/localDataStore";
import {
  CUSTOMER_LOGIN,
  CUSTOMER_LOGIN_ERROR,
  GET_BACK_END_URL,
  REQUEST_HEADER,
  SET_USER_SIGNUP,
  SET_USER_SIGNUP_ERROR,
} from "../types";

const getUserSignUpData = (resp)=>{
    if(resp){
        if(resp.data){
            if(resp.data.data){
                return resp.data.data;
            }
        }
    }

    return {status:false, data:null, message:"user create faield"}
}

export const getUserLogin = (loginData) => async (dispatch) => {
  loginData = JSON.stringify(loginData);

  console.log("Current Url ", GET_BACK_END_URL);

  const resp = await axios.post(
    `${GET_BACK_END_URL}/customers/login`,
    loginData,
    { headers: REQUEST_HEADER }
  );
  console.log("User Login action Response, ", resp);

  try {
    if (resp.data) {
      if (resp.data.token) {
        localDataStore.addUserJwtToken(resp.data.token);
      }
    }
    dispatch({
      type: CUSTOMER_LOGIN,
      payload: resp && resp.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_LOGIN_ERROR,
      payload: { status: true, error: err },
    });
  }
};

export const getUserSignUp = (userSignup) = async (dispatch) => {
  if (userSignup) {
    userSignup = JSON.stringify(userSignup);

    const resp = await axios.post(
      `${GET_BACK_END_URL}/customers/signup`,
      userSignup,
      { headers: REQUEST_HEADER });
    
      try {
        dispatch({
          type:SET_USER_SIGNUP,
          payload:getUserSignUpData(resp),
      })
      } catch (error) {
        dispatch({
          type:SET_USER_SIGNUP_ERROR,
          payload:error,
      })
      }
  }
};
