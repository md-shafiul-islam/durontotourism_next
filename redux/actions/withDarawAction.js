import axios from "axios";
import { AUT_TOKEN, GET_BACK_END_URL, REQUEST_HEADER, SET_ADD_WITHDRAW_ERROR, SET_ADD_WITHDRAW_STATUS } from "../types";

export const getAddWithDarawAction = (withDraw, token=undefined) => async (dispatsh) => {

    REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;

    const resp = await axios.post(`${GET_BACK_END_URL}/withdraws`, withDraw, {headers:REQUEST_HEADER});

    try {
        dispatsh({
            type:SET_ADD_WITHDRAW_STATUS,
            payload:resp.data&&resp.data.status
        })
    } catch (err) {
        dispatsh({
            type:SET_ADD_WITHDRAW_ERROR,
            payload:err
        })
    }
};
