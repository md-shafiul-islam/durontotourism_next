/* eslint-disable import/no-anonymous-default-export */
import { SET_ADD_WITHDRAW_ERROR, SET_ADD_WITHDRAW_STATUS } from "../types";

const initialState = {
  withDrawals: [],
  withDraw: {},
  addWithDarawStatus: false,
  addWithDarawError: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ADD_WITHDRAW_STATUS:
      return {
        ...state,
        addWithDarawStatus: action.payload,
      };
    case SET_ADD_WITHDRAW_ERROR:
      return {
        ...state,
        addWithDarawError: action.payload,
      };
    default:
      return state;
  }
}
