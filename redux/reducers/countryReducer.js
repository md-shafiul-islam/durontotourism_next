/* eslint-disable import/no-anonymous-default-export */
import {
  COUNTRIY_OPTIONS,
  COUNTRIY_OPTIONS_ERROR,
  COUNTRY_PHONE_CODE_OPTIONS,
  COUNTRY_PHONE_CODE_OPTIONS_ERROR,
} from "../types";

const initialState = {
  countryOptions: [],
  countriesError: {},
  countryOptionsStatus: false,
  countryPhoneOptions: [],
  countryPhoneOptionsStatus: false,
  countryPhoneOptionsError: {},
};

const getPhoneCodeOptions = (resp) => {
  if (resp) {
    if (resp.countries) {
      return resp.countries;
    }
  }
  return [];
};

const getCountries = (resp, state) => {
  console.log("Countries List Phone code Options, ", resp);
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

    case COUNTRY_PHONE_CODE_OPTIONS:
      return {
        ...state,
        countryPhoneOptions: getPhoneCodeOptions(action.payload),
      };

    case COUNTRY_PHONE_CODE_OPTIONS_ERROR:
      return {
        ...state,
        countryPhoneOptionsError: action.payload,
      };

    default:
      return state;
  }
}
