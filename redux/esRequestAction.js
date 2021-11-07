import axios from "axios";
import { REQUEST_HEADER, REQUEST_HEADER_GET } from "./types";

export const setAxiosHeaderToken = (data) => {
  if (data) {
    if (data.accessToken) {
        
       REQUEST_HEADER.Authorization= data.accessToken;
       REQUEST_HEADER_GET.Authorization= data.accessToken;

       console.log("After Set data.accessToken Authorization GET, ", REQUEST_HEADER_GET)
       console.log("After Set data.accessToken Authorization, ", REQUEST_HEADER)
    }
  }
};
