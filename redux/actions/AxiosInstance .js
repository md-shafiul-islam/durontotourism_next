
import axios from "axios";
import { AUT_TOKEN } from "../types";

export const AxiosIns = (token)=>{

    const axiosIns  = axios.create();
    return axiosIns.defaults.headers.common['Authorization'] = token ? token : AUT_TOKEN;
}

