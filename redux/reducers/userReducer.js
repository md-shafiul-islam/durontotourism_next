/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  ADD_CUSTOMER_TRAVEL,
  CUSTOMER_ADD_TRAVELER_INFO_SEND,
  CUSTOMER_TRAVEL_UPDATE,
  CUSTOMER_UPDATE_INFO_SEND,
  GET_TRAVELERS,
  REST_CUSTOMER_TRAVEL_UPDATE,
  REST_MAIL_CHANGE,
  REST_PHONE_CHANGE,
  REST_PROFILE_IMG_UPLOAD,
  SET_CURRENT_USER,
  SET_CURRENT_USER_ERROR,
  SET_USER_MAIL_CHANGE,
  SET_USER_PHONE_NO_CHANGE,
  SET_USER_PROFILE_CHANGE,
  USER_IMAGE_UPLOAD_STATUS,
} from "../types";

const initialState = {
  currentUser: {},
  currentUserError: {},
  customerPersonalInfoUpdate: {},
  customerUpdateSendStatus: false,
  travelerAddSendingStatus: false,
  travelerAdded: {},
  travelers: {},
  profileImageChange: {},
  imgUpStartStatus: false,
  phoneChangeStatus: undefined,
  mailChangeStatus: undefined,
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

const getUploadRest = (status, state) => {
  if (status) {
    return {
      ...state,
      profileImageChange: {},
      imgUpStartStatus: false,
    };
  }

  return state;
};

const getRestMailChange = (state, payload) => {
  if (payload) {
    return {
      ...state,
      mailChangeStatus: undefined,
    };
  }

  return state;
};

const getRestPhoneChange = (state, payload) => {
  if (payload) {
    return {
      ...state,
      phoneChangeStatus: undefined,
    };
  }
  return state;
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

    case USER_IMAGE_UPLOAD_STATUS:
      return {
        imgUpStartStatus: action.payload,
      };

    case SET_USER_PROFILE_CHANGE:
      return {
        ...state,
        imgUpStartStatus: false,
        profileImageChange: action.payload,
      };

    case REST_PROFILE_IMG_UPLOAD:
      return getUploadRest(action.payload, state);

    case SET_USER_PHONE_NO_CHANGE:
      return {
        ...state,
        phoneChangeStatus: action.payload,
      };

    case SET_USER_MAIL_CHANGE:
      return {
        ...state,
        mailChangeStatus: action.payload,
      };
    case REST_MAIL_CHANGE:
      return getRestMailChange(state, action.payload);

    case REST_PHONE_CHANGE:
      return getRestPhoneChange(state, action.payload);
    default:
      return state;
  }
}
