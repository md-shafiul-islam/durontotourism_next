/* eslint-disable import/no-anonymous-default-export */
import {
  DEP_RESP_DATA_STATUS,
  GET_AIRLINES,
  GET_AIRPORTS,
  GET_AIRPORTS_ARR,
  GET_AIR_SEARCH_RESPONSE,
  GET_DEPARTURE_FLIGHTS,
  GET_RETURN_FLIGHTS,
  RET_RESP_DATA_STATUS,
  GET_AIR_SEARCH_RESPONSE_ERROR,
  ONE_WAY_REDIRECT_STATUS
} from "../types";

const initialState = {
  airSearchResponse: [],
  searchData: {},
  airLinesList: [],
  airPortsList: [],
  departureResStatus: false,
  returnResStatus: false,
  searcResStatus: false,
  rndResSuccessStatus: { depStatus: false, retStatus: false },
  multyCityStatus: false,
  searchResErrorStatus:false,
  rndResErrorStatus:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AIR_SEARCH_RESPONSE:
      return {
        ...state,
        airSearchResponse:action.payload,
        searcResStatus:true,
      };
      case GET_AIR_SEARCH_RESPONSE_ERROR:
        return {
          ...state,
          searchResErrorStatus: action.payload,
        };  

    case GET_AIRLINES:
      return {
        ...state,
        airLinesList: action.payload,
      };

    case GET_AIRPORTS:
      return {
        ...state,
        airPortsList: action.payload,
      };
    case GET_AIRPORTS_ARR:
      return {
        ...state,
        airPortsArr: action.payload,
      };

    case GET_DEPARTURE_FLIGHTS:
      return {
        ...state,
        departureResStatus: action.payload,
      };

    case GET_RETURN_FLIGHTS:
      return {
        ...state,
        returnResStatus: action.payload,
      };
    case DEP_RESP_DATA_STATUS:
      return {
        ...state,

        rndResSuccessStatus: { ...rndTripStatus, depStatus: true },
      };
    case RET_RESP_DATA_STATUS:
      return {
        ...state,
        rndResSuccessStatus: { ...rndTripStatus, retStatus: true },
      };

    default:
      return state;
  }
}
