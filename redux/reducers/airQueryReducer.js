/* eslint-disable import/no-anonymous-default-export */
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  GET_SEARCH_QUERY,
  SET_AIRPORT_SEARCH_IATA,
  SET_AIRPORT_SEARCH_IATA_ERROR,
} from "../types";

const initialState = {
  sQuery: {},
  airportError: {},
  airports: [],
};

const getAirPort = (airPort, state) => {
  if (!helperIsEmpty(state.airports)) {
    if (airPort != null) {
      const airPorts = { ...state.airports };      
      airPorts[airPort.iataCode] = airPort
      console.log("Redux Reducer Before Return AirPorts, ", airPorts);
      return airPorts;
    }
  }

  return { ...state.airPorts };
};

export default function (state = initialState, action) {
  console.log("Air Search Query Type, ", action.type);
  console.log("Air Search Query Payload, , ", action.payload);
  console.log("Air Search Query Payload, State , ", state);
  const lAIrport = Array.isArray(state.airports) ? state.airports : [];
  switch (action.type) {
    case GET_SEARCH_QUERY:
      return {
        ...state,
        sQuery: action.payload,
      };
    case SET_AIRPORT_SEARCH_IATA:
      return {
        ...state,
        airports: getAirPort(action.payload, state),
      };
    case SET_AIRPORT_SEARCH_IATA_ERROR:
      return {
        ...state,
        airportError: action.payload,
      };

    default:
      return state;
  }
}
