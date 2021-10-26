/* eslint-disable import/no-anonymous-default-export */
import { GET_SEARCH_QUERY } from "../types";

const initialState = {
  sQuery: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_QUERY:
      return {
        ...state,
        sQuery: action.payload,
      };

    default:
      return state;
  }
}
