/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  SET_CUSTOMER,
  SET_CUSTOMER_ERROR,
  SET_CUSTOMER_UPDATE,
  SET_CUSTOMER_UPDATE_ERROR,
} from "../types";

const initialState = {
  customer: {},
  upStatus: {},
  upCustomerError: {},
  customerError: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case SET_CUSTOMER_ERROR:
      return {
        ...state,
        customerError: action.payload,
      };
    case SET_CUSTOMER_UPDATE:
      return {
        ...state,
        upStatus: action.payload,
      };
    case SET_CUSTOMER_UPDATE_ERROR:
      return {
        ...state,
        upCustomerError: action.payload,
      };

    default:
      return state;
  }
}
