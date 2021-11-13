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
  VERIFY_MAIL_SEND,
} from "../types";

const getMailSendResp = (mailSend) => {
  if (mailSend) {
    return mailSend;
  } else {
    return {
      status: false,
      message: "Mail send failed. Please try again later",
    };
  }
};

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
        message: "Connection Error Please try your netwark connection or proxy",
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

export const getSmsVerifyResendAction = (reqData) => async (dispatch) => {
  dispatch({
    type: SMS_VERIFY,
    payload: {},
  });
  const reSendData = { id: reqData.id, type: 2 };
  const resp = await axios.post(
    `${BASE_BOOKING_URL}/verify/resend`,
    reSendData,
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

export const getMailVerifyResendAction = (reqData) => async (dispatch) => {
  dispatch({
    type: MAIL_VERIFY,
    payload: {},
  });
  const reSendData = { id: reqData.id, type: 1 };
  const resp = await axios.put(
    `${GET_BACK_END_URL}/verify/resend`,
    reSendData,
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

export const getMailVerifySendAction = (token, user) => async (dispatch) => {
  REQUEST_HEADER.Authorization = token;
  let mailReq = { id: user.id };
  if (user) {
    mailReq = { id: user.id };
  }

  const resp = await axios.post(
    `${GET_BACK_END_URL}/customers/verify/mail`,
    JSON.stringify(mailReq),
    { headers: REQUEST_HEADER }
  );

  console.log("Cutomer Mail Send Resp, ", resp);
  const mailSend = getMailSendResp(resp.data);
  console.log("Befor Set Response Data, ", mailSend);
  try {
    dispatch({
      type: VERIFY_MAIL_SEND,
      payload: mailSend,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_MAIL_SEND,
      payload: {
        status: false,
        message:
          "Connection Error Please check your network connection or proxy",
      },
    });
  }
};
