/* eslint-disable import/no-anonymous-default-export */
import {
  SET_BANK_ACCOUNTS,
  SET_BANK_ACCOUNT_OPTIONS,
  SET_BANK_NAMES,
  SET_MOBILE_BANK_ACCOUNTS,
  SET_RECHARGE,
  SET_SELCTED_BANK_ACCOUNT,
} from "../types";

const initialState = {
  bankNames: [],
  bankAccountsOptions: {},
  bankAccount: {},
  rechargeStatus: false,
  rechargeAdd: {},
  bankAccounts:[],
  mobileBanks:[],
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
    case SET_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccounts:action.payload,
      }
    case SET_MOBILE_BANK_ACCOUNTS:
      return {
        ...state,
        mobileBanks:action.payload,
      }  
    default:
      return state;
  }
}
