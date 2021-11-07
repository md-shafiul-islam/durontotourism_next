import axios from "axios";
import {
  BASE_BOOKING_URL,
  GET_BACK_END_URL,
  MAIL_VERIFY,
  MAIL_VERIFY_ERROR,
  MAIL_VERIFY_TOKE,
  MAIL_VERIFY_TOKE_ERROR,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  RESEND_MAIL_VERIFY,
  RESEND_MAIL_VERIFY_ERROR,
  RESEND_SMS_VERIFY,
  RESEND_SMS_VERIFY_ERROR,
  SMS_VERIFY,
  SMS_VERIFY_ERROR,
} from "../types";

export const getSmsVerifyAction = (smsRequest) => async (dispatch) => {
  smsRequest = JSON.stringify(smsRequest);
  console.log("SMS Request, ", smsRequest);
  const resp = await axios.put(`${GET_BACK_END_URL}/verify/sms`, smsRequest, {
    headers: REQUEST_HEADER,
  });
  console.log("SMS Verify resp, ", resp);

  try {
    dispatch({
      type: SMS_VERIFY,
      payload: resp.data && resp.data,
    });
  } catch (error) {
    dispatch({
      type: SMS_VERIFY_ERROR,
      payload: { status: true, message: "Connection Error", error },
    });
  }
};

export const getMailVerifyAction = (code) => async (dispatch) => {
  console.log("axios header, ", REQUEST_HEADER);
  console.log("REQUEST_HEADER_GET , ", REQUEST_HEADER_GET);

  const resp = await axios.put(
    `${GET_BACK_END_URL}/verify/mail`,
    JSON.stringify(code),
    { headers: REQUEST_HEADER }
  );

  console.log("Maile Verify resp, ", resp);
  try {
    dispatch({
      type: MAIL_VERIFY,
      payload: resp.data && resp.data,
    });
  } catch (error) {
    dispatch({
      type: MAIL_VERIFY_ERROR,
      payload: {
        status: true,
        message: "Connection Error SMS verification failed",
        error,
      },
    });
  }
};

export const getMailVerifyUsingTokenAction = (token) => async (dispatch) => {
  const resp = await axios.put(
    `${GET_BACK_END_URL}/verify/mail-token`,
    JSON.stringify(token),
    { headers: REQUEST_HEADER }
  );

  try {
    dispatch({
      type: MAIL_VERIFY_TOKE,
      payload: resp.data && resp.data,
    });
  } catch (error) {
    dispatch({
      type: MAIL_VERIFY_TOKE_ERROR,
      payload: {
        status: true,
        message: "Connection Error Mail verification failed ",
        error,
      },
    });
  }
};

export const getSmsVerifyResendAction = (resendData) => async (dispatch) => {
  dispatch({
    type: SMS_VERIFY,
    payload: {},
  });
  const resp = await axios.post(
    `${BASE_BOOKING_URL}/verify/resend`,
    resendData,
    { headers: REQUEST_HEADER }
  );

  try {
    dispatch({
      type: RESEND_SMS_VERIFY,
      payload: resp.data && resp.data.data,
    });
  } catch (error) {
    dispatch({
      type: RESEND_SMS_VERIFY_ERROR,
      payload: {
        status: true,
        message: "Connection Error Can't Resend veryfication code",
        error,
      },
    });
  }
};

export const getMailVerifyResendAction = (resendData) => async (dispatch) => {
  dispatch({
    type: MAIL_VERIFY,
    payload: {},
  });
  const resp = await axios.post(
    `${BASE_BOOKING_URL}/verify/resend`,
    resendData,
    { headers: REQUEST_HEADER }
  );

  try {
    dispatch({
      type: RESEND_MAIL_VERIFY,
      payload: resp.data && resp.data.data,
    });
  } catch (error) {
    dispatch({
      type: RESEND_MAIL_VERIFY_ERROR,
      payload: {
        status: true,
        message: "Connection Error Can't Resend veryfication code",
        error,
      },
    });
  }
};
