import axios from "axios";
import {
  GET_BACK_END_URL,
  GET_CUSTOMER_INF,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  SET_ADD_SIGNUP_ERROR,
  SET_CUSTOMER,
  SET_CUSTOMER_ERROR,
} from "../types";
import { initialJwTokenToAuth } from "./initialAction";

const getCustomeResp = (resp) => {
  if (resp) {
    if (resp.data) {
      const { customer, status } = resp.data;

      if (status) {
        return customer;
      }
    }
  }
  return {};
};

export const getCustomerAction = () => async (dispatch) => {
  console.log("Get Customer Action ... ");
  initialJwTokenToAuth();

  const resp = await axios.get(`${GET_BACK_END_URL}/customers/current`, {
    headers: REQUEST_HEADER_GET,
  });
  console.log("Current Customer Response, ", resp);
  try {
    dispatch({
      type: SET_CUSTOMER,
      payload: getCustomeResp(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_CUSTOMER_ERROR,
      payload: err,
    });
  }
};

export const getCustomerInformationAction = () => async (dispatch) => {
  const resp = await axios.get(`${GET_BACK_END_URL}/customers/information`, {
    headers: REQUEST_HEADER,
  });

  try {
    dispatch({
      payload: resp.data && resp.data,
      type: GET_CUSTOMER_INF,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_INF,
      payload: { customer: null, status: false, message: error.message },
    });
  }
};
