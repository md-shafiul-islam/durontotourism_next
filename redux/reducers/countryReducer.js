/* eslint-disable import/no-anonymous-default-export */
import {
  COUNTRIY_OPTIONS,
  COUNTRIY_OPTIONS_ERROR,
  GET_COUNTRIES,
  GET_ERRORS,
} from "../types";

const initialState = {
  countryOptions: [],
  countriesError: {},
  countryOptionsStatus: false,
};

const getCountries = (resp, state) => {
  if (resp) {
    if (resp.status) {
      return {
        ...state,
        countryOptions: resp.countries,
        countryOptionsStatus: resp.status,
      };
    }
  }

  return state;
};

export default function countryReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTRIY_OPTIONS:
      return getCountries(action.payload, state);

    case COUNTRIY_OPTIONS_ERROR:
      return {
        ...state,
        countriesError: action.payload,
      };

    default:
      return state;
  }
}
