import Axios from "axios";
import {
  EX_BOOKING_URL,
  GET_BACK_END_URL,
  GET_ERRORS,
  GET_ROUND_TRIP_BOOKING,
  REQUEST_HEADER,
  SET_BANK_NAMES,
} from "../types";
import { AxiosIns } from "./AxiosInstance ";

export const getRoundTripBookingAction = (query) => async (dispatch) => {
  let url = EX_BOOKING_URL;

  const result = await Axios.post(url, query, {
    headers: REQUEST_HEADER,
  });

  console.log(
    "BOOKING Result, ",
    result && result.data && JSON.stringify(result.data.request, null, 2)
  );

  try {
    dispatch({
      type: GET_ROUND_TRIP_BOOKING,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Found Or Air Price not found  "
          : "Error: Network Connection  ",
    });
  }
};

