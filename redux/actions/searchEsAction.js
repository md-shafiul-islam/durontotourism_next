import axios from "axios";
import { AIR_SEARCH_URL, REQUEST_HEADER, SET_AIRPORT_SEARCH_OPTIONS, SET_AIRPORT_SEARCH_OPTIONS_ERROR } from "../types";


export const getAirPortOptionsByKey = (key) => async (dispatch) => {
    const resp = await axios.get(`${AIR_SEARCH_URL}/airports-query/${key}`);

    try {
        dispatch({
            type:SET_AIRPORT_SEARCH_OPTIONS,
            payload:resp.data&&resp.data.ports,
        })
    } catch (error) {
        dispatch({
            type:SET_AIRPORT_SEARCH_OPTIONS_ERROR,
            payload:error,
        })
    }
};

export const getAirPortOptionsAction = async (key)=>{
    const resp = await axios.get(`${AIR_SEARCH_URL}/airports-query/${key}`, {headers:REQUEST_HEADER});
    return resp.data&&resp.data.ports;
}
