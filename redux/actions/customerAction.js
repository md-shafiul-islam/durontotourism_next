import axios from "axios";
import { GET_BACK_END_URL, REQUEST_HEADER_GET, SET_ADD_SIGNUP_ERROR, SET_CUSTOMER, SET_CUSTOMER_ERROR } from "../types";
import { initialJwTokenToAuth } from "./initialAction";

export const getCustomerAction = () => async (dispatch) => {
    console.log("Get Customer Action ... ")
    initialJwTokenToAuth();

    const resp = axios.get(`${GET_BACK_END_URL}/customers/current`, {headers:REQUEST_HEADER_GET});
    console.log("Current Customer Response, ", resp);
    try {
        dispatch({
            type:SET_CUSTOMER,
            payload:resp
        })
    } catch (err) {
        dispatch({
            type:SET_CUSTOMER_ERROR,
            payload:err,
        })
    }

};
