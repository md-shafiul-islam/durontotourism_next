/* eslint-disable import/no-anonymous-default-export */

import { CUSTOMER_LOGIN, CUSTOMER_LOGIN_ERROR } from "../types";

const initialState = {
    loginResp: {},
    loginError: {},
  };
  
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case CUSTOMER_LOGIN:
        return {
          ...state,
          loginResp: action.payload,
        };
      case CUSTOMER_LOGIN_ERROR:
        return {
          ...state,
          loginError: action.payload,
        };
      default:
        return state;
    }
  }
  