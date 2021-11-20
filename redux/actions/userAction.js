import axios from "axios";
import { localDataStore } from "../../utils/helper/localDataStore";
import {
  ADD_CUSTOMER_TRAVEL,
  CUSTOMER_ADD_TRAVELER_INFO_SEND,
  CUSTOMER_LOGIN,
  CUSTOMER_LOGIN_ERROR,
  CUSTOMER_TRAVEL_UPDATE,
  CUSTOMER_UPDATE_INFO_SEND,
  GET_BACK_END_URL,
  GET_TRAVELERS,
  REQUEST_HEADER,
  SET_USER_MAIL_CHANGE,
  SET_USER_PHONE_NO_CHANGE,
  SET_USER_PROFILE_CHANGE,
  SET_USER_SIGNUP,
  SET_USER_SIGNUP_ERROR,
} from "../types";
import { esUploadFile, esUploadProfileImage } from "./esAction";

const getPesonalInfoRes = (resp) => {
  if (resp) {
    if (resp.data) {
      return { status: resp.data.status, message: resp.data.message };
    }
  }

  return { status: false, message: "Personal information update failed" };
};

const getUserSignUpData = (resp) => {
  if (resp) {
    if (resp.data) {
      if (resp.data.data) {
        return resp.data.data;
      }
    }
  }

  return { status: false, data: null, message: "user create faield" };
};

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

export const getUserSignUp = (userSignup) => async (dispatch) => {
  if (userSignup) {
    userSignup = JSON.stringify(userSignup);

    const resp = await axios.post(
      `${GET_BACK_END_URL}/customers/signup`,
      userSignup,
      { headers: REQUEST_HEADER }
    );

    try {
      dispatch({
        type: SET_USER_SIGNUP,
        payload: getUserSignUpData(resp),
      });
    } catch (error) {
      dispatch({
        type: SET_USER_SIGNUP_ERROR,
        payload: error,
      });
    }
  }
};

export const getPesonalInformationUpdate = (inf) => async (dispatch) => {
  if (inf) {
    dispatch({
      type:CUSTOMER_UPDATE_INFO_SEND,
      payload:true,
    })
    const pasthUrl = await esUploadFile(inf.passportAttach, "passport");
    inf.passportAttach = pasthUrl;
    inf = JSON.stringify(inf, null, 2);
    const resp = await axios.put(
      `${GET_BACK_END_URL}/customers/travelers`,
      inf,
      { headers: REQUEST_HEADER }
    );

    try {
      dispatch({
        type: CUSTOMER_TRAVEL_UPDATE,
        payload: getPesonalInfoRes(resp),
      });

    } catch (error) {
      dispatch({
        payload: { status: false, message: `Failed, ${error.message}` },
        type: CUSTOMER_TRAVEL_UPDATE,
      });
    }
  }
};

export const addGuestTraveler = (inf) => async (dispatch) => {
  if (inf) {
    dispatch({
      type:CUSTOMER_ADD_TRAVELER_INFO_SEND,
      payload:true,
    })
    const pasthUrl = await esUploadFile(inf.passportAttach, "passport");
    inf.passportAttach = pasthUrl;
    inf = JSON.stringify(inf, null, 2);
    console.log("Traveler Added, ", inf);
    const resp = await axios.post(
      `${GET_BACK_END_URL}/customers/travelers`,
      inf,
      { headers: REQUEST_HEADER }
    );

    try {
      dispatch({
        type: ADD_CUSTOMER_TRAVEL,
        payload: getPesonalInfoRes(resp),
      });

    } catch (error) {
      dispatch({
        payload: { status: false, message: `Failed, ${error.message}` },
        type: ADD_CUSTOMER_TRAVEL,
      });
    }
  }
};

export const getUserTravelers = ()=>async (dispatch)=>{

  const resp = await axios.get(`${GET_BACK_END_URL}/customers/travelers`, {headers:REQUEST_HEADER});
  console.log("getUserTravelers, Response ", resp);
  try {
    dispatch({
      type:GET_TRAVELERS,
      payload:resp.data,
    })
  } catch (error) {
    dispatch({
      type:GET_TRAVELERS,
      payload:{status:false, message:error.message, travelers:null}
    })
  }


}

export const getUserPhoneChaneAction = (phone)=>async (dispatch) =>{
  phone = JSON.stringify(phone);
  const resp = await axios.put(`${GET_BACK_END_URL}/changes/phone`, phone, {headers:REQUEST_HEADER});
  try {
    dispatch({
      type:SET_USER_PHONE_NO_CHANGE,
      payload:resp.data,
    })
  } catch (error) {
    dispatch({
      type:SET_USER_PHONE_NO_CHANGE,
      payload:{status:false, message:error.message},
    })
  }
}

export const getUserMailChaneAction = (mail)=>async (dispatch) =>{
  mail = JSON.stringify(mail);
  const resp = await axios.put(`${GET_BACK_END_URL}/changes/mail`, mail, {headers:REQUEST_HEADER});

  try {
    dispatch({
      type:SET_USER_MAIL_CHANGE,
      payload:resp.data,
    })
  } catch (error) {
    dispatch({
      type:SET_USER_MAIL_CHANGE,
      payload:{status:false, message:error.message},
    })
  }
  
}

export const getUserProfileImageAddUpdateAction = (image)=>async (dispatch) =>{
  const url = await esUploadProfileImage(image);
  image = JSON.stringify({url:url});
  const resp = await axios.put(`${GET_BACK_END_URL}/changes/profile-image`, image, {headers:REQUEST_HEADER});

  try {
    dispatch({
      type:SET_USER_PROFILE_CHANGE,
      payload:resp.data,
    })
  } catch (error) {
    dispatch({
      type:SET_USER_PROFILE_CHANGE,
      payload:{status:false, message:error.message},
    })
  }
  
}