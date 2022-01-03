/* eslint-disable import/no-anonymous-default-export */
import {
  SET_CURRENT_WALLET,
  SET_WALLET_DEPOSITS,
  SET_WALLET_FLOWS,
  SET_WALLET_WITHDRAWS,
} from "../types";

const initialState = {
  walletWithdraw: undefined,
  walletDeposit: undefined,
  walletFlow: undefined,
  wallet: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WALLET_FLOWS:
      return {
        ...state,
        walletFlow: action.payload,
      };

    case SET_WALLET_DEPOSITS:
      return {
        ...state,
        walletDeposit: action.payload,
      };
    case SET_WALLET_WITHDRAWS:
      return {
        ...state,
        walletWithdraw: action.payload,
      };

    case SET_CURRENT_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    default:
      return state;
  }
}
