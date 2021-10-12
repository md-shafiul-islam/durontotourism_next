import Axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../types";

export const setJWTToken = (token) => {
  try {
    if (token) {
      Axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete Axios.defaults.headers.common["Authorization"];
    }
  } catch (error) {
    console.log("Set Axios Header Error: ", error);
  }
};

export const setCurrentUserUsingToken = (jwtToken, winObj) => async dispatch=>{
  if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded_jwtToken,
    });

    const currentTime = Date.now() / 1000;
    if (decoded_jwtToken.exp < currentTime) {
      // dispatch(logOut());
      window.location.href = "/";
    }
  }
};
