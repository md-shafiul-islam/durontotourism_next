/* eslint-disable import/no-anonymous-default-export */
import {
  SET_AIRPORT_SEARCH_OPTIONS,
  SET_AIRPORT_SEARCH_OPTIONS_ERROR,
} from "../types";

const initialState = {
  airPortOptionsError: {},
  portOptions: [],
  portStatus:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AIRPORT_SEARCH_OPTIONS:
      return {
        ...state,
        portOptions: action.payload,
      };

    case SET_AIRPORT_SEARCH_OPTIONS_ERROR:
      return {
        ...state,
        airPortOptionsError: action.payload,
        portStatus:true,
      };
    default:
      return state;
  }
}
