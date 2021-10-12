/* eslint-disable import/no-anonymous-default-export */

import { SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from "../types";

const initialState = {
    currentUser: {},
    currentUserError: {},
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
      default:
        return state;
    }
  }
  