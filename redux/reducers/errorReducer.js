/* eslint-disable import/no-anonymous-default-export */
import { GET_ERRORS } from "../types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
