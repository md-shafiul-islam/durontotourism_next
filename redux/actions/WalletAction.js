import axios from "axios";
import {
  GET_BACK_END_URL,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  SET_CURRENT_WALLET,
  SET_WALLET_DEPOSITS,
  SET_WALLET_FLOWS,
  SET_WALLET_WITHDRAWS,
} from "../types";

export const getWalletAction = (token=undefined) => async (dispatch) => {
  const url = `${GET_BACK_END_URL}/wallet`;
  if(token){
    REQUEST_HEADER.Authorization = token;
    REQUEST_HEADER_GET.Authorization = token;
  }
  console.log("Wallet Action ... URL ", url);
  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });

    console.log("Wallet Action Response ", response);
    dispatch({
      type: SET_CURRENT_WALLET,
      payload: { errorStatus: false, ...response.data },
    });
  } catch (error) {
    console.log("Get Current Wallet Response Error, ", error);

    dispatch({
      type: SET_CURRENT_WALLET,
      payload: {
        errorStatus: true,
        status: false,
        messsage: error.messsage,
        data: undefined,
      },
    });
  }
};

export const getAllWalletFlow = () => async (dispatch) => {
  const url = `${GET_BACK_END_URL}/wallet/details`;

  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });
    console.log("Wallet Flow Response, ", response);
    dispatch({
      type: SET_WALLET_FLOWS,
      payload: { errorStatus: false, ...response.data },
    });
  } catch (error) {
    console.log("Wallet Flow Error ", error);
    dispatch({
      type: SET_WALLET_FLOWS,
      payload: { errorStatus: true, status: false, messsage: error.messsage },
    });
  }
};

export const getWalletDeposits = () => async (dispatch) => {
  const url = `${GET_BACK_END_URL}/wallet/deposits`;

  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });
    console.log("Deposit Response, ", response);
    dispatch({
      type: SET_WALLET_DEPOSITS,
      payload: { errorStatus: false, ...response.data },
    });
  } catch (error) {
    console.log("Wallet Deposit Error ", error);

    dispatch({
      type: SET_WALLET_DEPOSITS,
      payload: { errorStatus: true, status: false, messsage: error.messsage },
    });
  }
};

export const getWalletWithdraws = () => async (dispatch) => {
  const url = `${GET_BACK_END_URL}/wallet/withdraw`;

  try {
    const response = await axios.get(url, { headers: REQUEST_HEADER });

    console.log("Withdaraw Response, ", response);

    dispatch({
      type: SET_WALLET_WITHDRAWS,
      payload: { errorStatus: false, ...response.data },
    });
  } catch (error) {
    console.log("Wallet Withdraw Error ", error);

    dispatch({
      type: SET_WALLET_WITHDRAWS,
      payload: { errorStatus: true, status: false, messsage: error.messsage },
    });
  }
};
