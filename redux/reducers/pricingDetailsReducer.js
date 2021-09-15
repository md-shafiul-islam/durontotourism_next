import { GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS } from "../types";

const initState = {
  rndDetailsPrice: {},
};

const haveData = (data) => {
  if (data !== undefined) {
    return true;
  }
  return false;
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS:
      return {
        ...state,
        rndDetailsPrice: haveData(action.payload) ? action.payload : {},
      };

    default:
      return state;
  }
}
