import { isEmpty } from "./helperAction";
import { GET_FILTER_DEP_STOPS, GET_FILTER_DEP_TIME, GET_FILTER_RET_STOPS, GET_FILTER_RET_TIME, GET_ONWARD_FLIGHT_FILTER, GET_RETURN_FLIGHT_FILTER } from "../types";

export const setOnwardFlightFilterOptions =
  (airLinces, departureDateTimeList, arrivalDateTimeList, flightStopsTypes) =>
  async (dispatch) => {
    dispatch({
      type: GET_ONWARD_FLIGHT_FILTER,
      payload: {
        airLinces,
        departureDateTimeList,
        arrivalDateTimeList,
        flightStopsTypes,
      },
    });
  };

export const setReturnFlightFilterOptions =
  (airLinces, departureDateTimeList, arrivalDateTimeList, flightStopsTypes) =>
  async (dispatch) => {
    dispatch({
      type: GET_RETURN_FLIGHT_FILTER,
      payload: {
        airLinces,
        departureDateTimeList,
        arrivalDateTimeList,
        flightStopsTypes,
      },
    });
  };

  export const setTravelTimeFilterItems = (items, type)=> async (dispatch)=>{

    if(!isEmpty(items) && type !== undefined && type !== null){
      
      let actionType = type === 1 ? GET_FILTER_RET_TIME : GET_FILTER_DEP_TIME;

      dispatch({
        type:actionType,
        payload:items
      })

    }
  }

export const filterSelectStopsAction  = (stops, type=0)=>async(dispatch)=>{

  let actionType = type === 1 ? GET_FILTER_DEP_STOPS : GET_FILTER_RET_STOPS;
  if(stops){

    dispatch({
      type: actionType,
      payload:stops
    })
    
  }
}
