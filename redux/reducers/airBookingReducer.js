/* eslint-disable import/no-anonymous-default-export */
import { GET_ROUND_TRIP_BOOKING, SET_BANK_NAMES } from "../types";

const initialState = {
  rndBookingResponse: {},
  bankNames:[],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROUND_TRIP_BOOKING:
      return {
        ...state,
        rndBookingResponse: action.payload,
      };

    default:
      return state;
  }
}
