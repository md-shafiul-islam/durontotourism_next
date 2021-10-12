import axios from "axios";
import { localDataStore } from "../../utils/helper/localDataStore";
import { CUSTOMER_LOGIN, CUSTOMER_LOGIN_ERROR, GET_BACK_END_URL, REQUEST_HEADER } from "../types";

export const getUserLogin = (loginData)=> async (dispatch)=>{
    loginData = JSON.stringify(loginData);

    console.log("Current Url ", GET_BACK_END_URL);

    const resp = await axios.post(`${GET_BACK_END_URL}/customers/login`, loginData, {headers:REQUEST_HEADER});
    console.log("User Login action Response, ", resp);

    
    try {
        if(resp.data){
            if(resp.data.token){
                localDataStore.addUserJwtToken(resp.data.token);
            }
        }
        dispatch({
            type:CUSTOMER_LOGIN,
            payload:resp&&resp.data,
        })
    } catch (err) {
        dispatch({
            type:CUSTOMER_LOGIN_ERROR,
            payload:{status:true, error:err}
        })
    }
}