import axios from "axios";
import {
  COUNTRIY_OPTIONS,
  COUNTRIY_OPTIONS_ERROR,
  GET_BACK_END_URL,
  REQUEST_HEADER_GET,
} from "../types";

export const getCountryOptions = () => async (dispatch) => {
  const resp = await axios.get(`${GET_BACK_END_URL}/option/countries`, {
    headers: REQUEST_HEADER_GET,
  });

  console.log("Countries Options Response, ", resp);

  try {
    dispatch({
      type: COUNTRIY_OPTIONS,
      payload: resp.data && resp.data,
    });
  } catch (error) {
    dispatch({
      payload: {
        countries: [],
        message: "Countries Not found",
        status: false,
        error: error.message,
      },
      type: COUNTRIY_OPTIONS_ERROR,
    });
  }
};
