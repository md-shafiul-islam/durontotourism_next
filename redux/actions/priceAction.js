import Axios from "axios";
import {  EXT_PRICE_URL, GET_ERRORS, GET_MOD_AIR_PRICE_DEP, GET_MOD_AIR_PRICE_RET, GET_SELECTED_AIR_PRICE, GET_SELECTED_AIR_ROUND_TRIP_PRICE, GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS, GET_SELECTED_ROUND_TRIP_SOLUTION, REQUEST_HEADER } from "../types";

export const setPriceDetails = (data) => async (dispatch) => {
  console.log("Air Price Details Action: ", data);
  dispatch({
    type: GET_SELECTED_AIR_PRICE,
    payload: data,
  });
};


export const setPriceRoundTrip = (data) => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_AIR_ROUND_TRIP_PRICE,
    payload: data,
  });
};



export const setSelectedPrcingDetailsRoundTrip = (data) => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS,
    payload: data,
  });
}

export const setPrcingRoundTripSelectedItems = (data) => async (dispatch) => {

  dispatch({
    type: GET_SELECTED_ROUND_TRIP_SOLUTION,
    payload: data,
  });
}

export const getPriceSearchAction = (query, type, chaneLoadingStatus)=> async(dispatch)=>{
  let url = `${EXT_PRICE_URL}/api/v_1_0/airPriceRequest`;

  let action = type === 1 ? GET_MOD_AIR_PRICE_DEP : GET_MOD_AIR_PRICE_RET;

  const result = await Axios.post(url, query, {
    headers: REQUEST_HEADER,
  });

  // console.log("Result, ", result);

  chaneLoadingStatus(result);

  try {

    dispatch({
      type: action,
      payload: result.data,
    });

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Found Or Air Price not found  "
          : "Error: Network Connection  ",
    });
  }
  
}