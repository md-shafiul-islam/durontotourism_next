import axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  AIR_SEARCH_URL,
  REQUEST_HEADER,
  SET_AIRPORT_SEARCH_IATA,
  SET_AIRPORT_SEARCH_IATA_ERROR,
  SET_AIRPORT_SEARCH_OPTIONS,
  SET_AIRPORT_SEARCH_OPTIONS_ERROR,
} from "../types";

export const getAirPortOptionsByKey = (key) => async (dispatch) => {
  const resp = await axios.get(`${AIR_SEARCH_URL}/airports-query/${key}`);

  try {
    dispatch({
      type: SET_AIRPORT_SEARCH_OPTIONS,
      payload: resp.data && resp.data.ports,
    });
  } catch (error) {
    dispatch({
      type: SET_AIRPORT_SEARCH_OPTIONS_ERROR,
      payload: error,
    });
  }
};

export const getAirPortOptionsAction = async (key) => {
  const resp = await axios.get(`${AIR_SEARCH_URL}/airports-query/${key}`, {
    headers: REQUEST_HEADER,
  });
  return resp.data && resp.data.ports;
};

export const getAirPortByIATACode = (code) => async (dispatch) => {
  console.log("getAirPortByIATACode Run ....")
  const resp = await axios.get(`${AIR_SEARCH_URL}/airport-iata/${code}`, {
    headers: REQUEST_HEADER,
  });

  console.log("IATA Code Response, ", resp.data.airport);

  try {
    if (!helperIsEmpty(resp.data.airport)) {
      dispatch({
        type: SET_AIRPORT_SEARCH_IATA,
        payload: resp.data && resp.data.airport,
      });

    }
    return;
  } catch (error) {
    dispatch({
      type: SET_AIRPORT_SEARCH_IATA_ERROR,
      payload: error,
    });
  }
};
