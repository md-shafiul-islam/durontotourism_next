import {
  GET_AIRLINES,
  GET_AIRPORTS,
  GET_AIRPORTS_ARR,
  GET_AIR_SEARCH_RESPONSE,
  GET_DEPARTURE_FLIGHTS,
  GET_RETURN_FLIGHTS,
} from "../types";

const initialState = {
  airSearchResponse: [],
  searchData: {},
  airLinesList: [],
  airPortsList: [],
  departureResStatus:false,
  returnResStatus:false
};

export default function (state = initialState, action) {
  
  switch (action.type) {
    case GET_AIR_SEARCH_RESPONSE:
      return {
        ...state,
        airSearchResponse: action.payload,
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
      return{
        ...state,
        airPortsArr:action.payload
      }  

    case GET_DEPARTURE_FLIGHTS:
      return{
        ...state,
        departureResStatus:action.payload
      }  
    
    case GET_RETURN_FLIGHTS:
      return{
        ...state,
        returnResStatus:action.payload
      }

    default:
      return state;
  }
}
