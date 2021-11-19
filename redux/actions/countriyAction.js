import axios from "axios";
import {
  COUNTRIY_OPTIONS,
  COUNTRIY_OPTIONS_ERROR,
  COUNTRY_PHONE_CODE_OPTIONS,
  GET_BACK_END_URL,
  REQUEST_HEADER_GET,
} from "../types";

export const getCountryPhonCodeOptions = () => async (dispatch) => {
  const resp = await axios.get(`${GET_BACK_END_URL}/option/countries-phone`, {
    headers: REQUEST_HEADER_GET,
  });

  console.log("Countries Phone Code Options Response, ", resp);

  try {
    dispatch({
      type: COUNTRY_PHONE_CODE_OPTIONS,
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
      type: COUNTRY_PHONE_CODE_OPTIONS_ERROR,
    });
  }
};

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
