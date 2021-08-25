/* eslint-disable import/no-anonymous-default-export */
import { GET_ROUND_TRIP_BOOKING } from "../types";

const initialState = {
    rndBookingResponse:{}
}

export default function (state=initialState, action){

    switch (action.type) {
        case GET_ROUND_TRIP_BOOKING:
            return {
                ...state, rndBookingResponse:action.payload
            }
    
        default:
            return state;
    }
}