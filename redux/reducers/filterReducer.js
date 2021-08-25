import {
  GET_FILTER_DEP_STOPS,
  GET_FILTER_DEP_TIME,
  GET_FILTER_RET_STOPS,
  GET_FILTER_RET_TIME,
  GET_ONWARD_FLIGHT_FILTER,
  GET_RETURN_FLIGHT_FILTER,
  GET_SEL_AIR_FLIGHT_FILTER,
} from "../types";

const initialState = {
  onwardFilterOptions: {},
  returnFilterOptions: {},
  oneWayFilterOptions: {},
  multyCityFilterOptions: {},
  selectedAirCodes: [],
  returnAirTimes: [],
  departureAirTimes: [],
  stopsDepFlights: [],
  stopsRetFlights: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ONWARD_FLIGHT_FILTER:
      return {
        ...state,
        onwardFilterOptions: action.payload,
      };
    case GET_RETURN_FLIGHT_FILTER:
      return {
        ...state,
        returnFilterOptions: action.payload,
      };
    case GET_SEL_AIR_FLIGHT_FILTER:
      return {
        ...state,
        selectedAirCodes: action.payload,
      };
    case GET_FILTER_DEP_TIME:
      return {
        ...state,
        departureAirTimes: action.payload,
      };
    case GET_FILTER_RET_TIME:
      return {
        ...state,
        returnAirTimes: action.payload,
      };

    case GET_FILTER_DEP_STOPS:
      return {
        ...state,
        stopsDepFlights: action.payload,
      };

    case GET_FILTER_RET_STOPS:
      return {
        ...state,
        stopsRetFlights: action.payload,
      };
    default:
      return state;
  }
}
