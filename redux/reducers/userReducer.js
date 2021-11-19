/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  ADD_CUSTOMER_TRAVEL,
  CUSTOMER_ADD_TRAVELER_INFO_SEND,
  CUSTOMER_TRAVEL_UPDATE,
  CUSTOMER_UPDATE_INFO_SEND,
  GET_TRAVELERS,
  REST_CUSTOMER_TRAVEL_UPDATE,
  SET_CURRENT_USER,
  SET_CURRENT_USER_ERROR,
} from "../types";

const initialState = {
  currentUser: {},
  currentUserError: {},
  customerPersonalInfoUpdate: {},
  customerUpdateSendStatus: false,
  travelerAddSendingStatus: false,
  travelerAdded: {},
  travelers: {},
};

const getTravelers = (resp, state) => {
  if (!helperIsEmpty(resp)) {
    if (resp.status) {
      return {
        ...state,
        travelers: resp.travelers,
      };
    }
  }

  return state;
};

const getRestCustomerUpdate = (state, status) => {
  if (status) {
    return {
      ...state,
      customerPersonalInfoUpdate: {},
    };
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_CURRENT_USER_ERROR:
      return {
        ...state,
        currentUserError: action.payload,
      };
    case CUSTOMER_TRAVEL_UPDATE:
      return {
        ...state,
        customerPersonalInfoUpdate: action.payload,
      };

    case REST_CUSTOMER_TRAVEL_UPDATE:
      return getRestCustomerUpdate(state, action.payload);

    case CUSTOMER_UPDATE_INFO_SEND:
      return {
        ...state,
        customerUpdateSendStatus: action.payload,
      };
    case CUSTOMER_ADD_TRAVELER_INFO_SEND:
      return {
        ...state,
        travelerAddSendingStatus: action.payload,
      };

    case ADD_CUSTOMER_TRAVEL:
      return {
        ...state,
        travelerAdded: action.payload,
      };
    case GET_TRAVELERS:
      return getTravelers(action.payload);
    default:
      return state;
  }
}
