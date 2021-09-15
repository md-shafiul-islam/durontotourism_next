/* eslint-disable import/no-anonymous-default-export */
import {
  SET_BANK_ACCOUNT_OPTIONS,
  SET_BANK_NAMES,
  SET_RECHARGE,
  SET_SELCTED_BANK_ACCOUNT,
} from "../types";

const initialState = {
  bankNames: [],
  bankAccountsOptions: {},
  bankAccount: {},
  rechargeStatus: false,
  rechargeAdd: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BANK_NAMES:
      return {
        ...state,
        bankNames: action.payload,
      };

    case SET_BANK_ACCOUNT_OPTIONS:
      return {
        ...state,
        bankAccountsOptions: action.payload,
      };

    case SET_SELCTED_BANK_ACCOUNT:
      return {
        ...state,
        bankAccount: action.payload,
      };

    case SET_RECHARGE:
      return {
        ...state,
        rechargeStatus: action.payload.status,
        rechargeAdd: action.payload.recharge,
      };

    default:
      return state;
  }
}
