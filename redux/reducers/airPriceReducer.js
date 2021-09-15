import {
  GET_MOD_AIR_PRICE_DEP,
  GET_MOD_AIR_PRICE_RET,
  GET_SELECTED_AIR_PRICE,
  GET_SELECTED_AIR_ROUND_TRIP_PRICE,
  GET_SELECTED_ROUND_TRIP_SOLUTION,
} from "../types";

const initialState = {
  selectedAir: {},
  selectedRoundTripAir: {},
  rndModalRetPrices: {},
  rndModalDepPrices: {},
  rndSolution: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SELECTED_AIR_PRICE:
      return {
        ...state,
        selectedAir: action.payload,
      };

    case GET_SELECTED_AIR_ROUND_TRIP_PRICE:
      return {
        ...state,
        selectedRoundTripAir: action.payload,
      };
    case GET_MOD_AIR_PRICE_DEP:
      return {
        ...state,
        rndModalDepPrices: action.payload,
      };
    case GET_MOD_AIR_PRICE_RET:
      return {
        ...state,
        rndModalRetPrices: action.payload,
      };

    case GET_SELECTED_ROUND_TRIP_SOLUTION:
      return {
        ...state,
        rndSolution: action.payload,
      };

    default:
      return state;
  }
}
