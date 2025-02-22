import {
  GET_AIR_SEARCH_RESPONSE,
  GET_ERRORS,
  REQUEST_HEADER,
  GET_SEARCH_QUERY,
  GET_AIRLINES,
  GET_AIRPORTS,
  GET_AIRPORTS_ARR,
  GET_DEPARTURE_FLIGHTS,
  GET_RETURN_FLIGHTS,
  AIR_SEARCH_URL,
  RET_RESP_DATA_STATUS,
  DEP_RESP_DATA_STATUS,
  GET_AIR_SEARCH_RESPONSE_ERROR,
  SET_MODIFY_SEARCH,
} from "../types";
import Axios from "axios";
import { isEmpty } from "../actions/helperAction";
import { localDataStore } from "../../utils/helper/localDataStore";

export const getAirSearchRequest = (requestData) => async (dispatch) => {
  try {
    let url = `${AIR_SEARCH_URL}/flights`;

    console.log("Send Search Request and wait ...");

    const res = await Axios.post(url, requestData, { headers: REQUEST_HEADER });

    console.log("getAirSearchRequest Response Data: ", res.data);

    dispatch({
      type: GET_AIR_SEARCH_RESPONSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });

    dispatch({
      type: GET_AIR_SEARCH_RESPONSE_ERROR,
      payload: true,
    });
  }
};

/**
 *
 * @param {String}  requestData  Query String
 * @param {String} type Search Type
 * @param {Function} completeAction callback if needed
 * @returns
 */
export const getAirSearchRequestType =
  (requestData, type, completeAction) => async (dispatch) => {
    try {
      let url = `${AIR_SEARCH_URL}/flights`;

      console.log("Send Search Request and wait ...");

      const res = await Axios.post(url, requestData, {
        headers: REQUEST_HEADER,
      });

      console.log(
        "getAirSearchRequestType Response type, ",
        type,
        " Data: ",
        res.data
      );

      if (!localDataStore.isActiveLocalStore()) {
        if (!isEmpty(window)) {
          localDataStore.activeLocalStore(window);
        }
      }

      if (type === "departureFlights") {
        localDataStore.setDeptartureFlight(res.data);
        dispatch({
          type: GET_DEPARTURE_FLIGHTS,
          payload: !isEmpty(res.data) ? true : false,
        });

        dispatch({
          type: DEP_RESP_DATA_STATUS,
          payload: res.data && res.data.data && res.data.data.status,
        });
      }

      if (type === "returnFlights") {
        localDataStore.setReturnFlight(res.data);

        dispatch({
          type: GET_RETURN_FLIGHTS,
          payload: !isEmpty(res.data) ? true : false,
        });
        dispatch({
          type: RET_RESP_DATA_STATUS,
          payload: res.data && res.data.data && res.data.data.status,
        });
      }

      completeAction();
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload:
          err !== undefined
            ? err.res !== undefined
              ? err.res.data
              : "Error: Response  not Or Air not found  "
            : "Error: Network Connection  ",
      });
    }
  };

export const getOneWayAirSearchRequest =
  (requestData, modifiStatus) => async (dispatch) => {
    if(modifiStatus){
      dispatch({
        type:SET_MODIFY_SEARCH,
        payload:true,
      })
    }
    let url = `${AIR_SEARCH_URL}/flights`;
    const res = await Axios.post(url, JSON.stringify(requestData, null, 2), {
      headers: REQUEST_HEADER,
    });
    console.log("One Way Request Response: ", res.data);

    try {
      dispatch({
        type: GET_AIR_SEARCH_RESPONSE,
        payload: res.data,
      });
      if(modifiStatus){
        dispatch({
          type:SET_MODIFY_SEARCH,
          payload:false,
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload:
          err !== undefined
            ? err.res !== undefined
              ? err.res.data
              : "Error: Response  not Or Air not found  "
            : "Error: Network Connection  ",
      });
      dispatch({
        type: GET_AIR_SEARCH_RESPONSE_ERROR,
        payload: true,
      });
    }
  };

export const getSearchResult = (requestData) => async (dispatch) => {
  try {
    let url = `${AIR_SEARCH_URL}/catalogofferings`;

    const res = await Axios.post(url, JSON.stringify(requestData, null, 2), {
      headers: REQUEST_HEADER,
    });

    dispatch({
      type: GET_AIR_SEARCH_RESPONSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

const getProperDate = (pValue) => {
  if (pValue !== undefined && pValue !== null) {
    let cDate = pValue;

    let mnt = cDate.getMonth();
    let mntString = "";

    if (mnt === undefined || mnt === "NaN" || mnt === "Na") {
      mntString = " ";
    } else {
      mnt = mnt + 1;

      mntString = mnt.toString();

      if (mntString.length < 2) {
        mntString = `0${mntString}`;
      }
    }

    console.log("Month IS: ", mntString);

    let strDate = `${cDate.getFullYear()}-${mntString}-${cDate.getDate()}`;

    if (strDate === undefined || strDate === "NaN" || strDate === "Na") {
      return "";
    } else {
      return strDate;
    }
  }
};

export const getAirLines = () => async (dispatch) => {
  try {
    let url = `${AIR_SEARCH_URL}/airline?type=1`;

    const res = await Axios.get(url, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_AIRLINES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

export const getAirports = () => async (dispatch) => {
  try {
    let url = `${AIR_SEARCH_URL}/airport?type=1`;

    const res = await Axios.get(url, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_AIRPORTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

export const setSearchQuery = (data) => async (dispatch) => {
  dispatch({
    type: GET_SEARCH_QUERY,
    payload: data,
  });
};

export const airPortsArray = () => async (dispatch) => {
  try {
    let url = `${AIR_SEARCH_URL}/airport?type=0`;

    const res = await Axios.get(url, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_AIRPORTS_ARR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};
