/* eslint-disable import/no-anonymous-default-export */
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  SET_BANK_ACCOUNTS,
  SET_BANK_ACCOUNT_OPTIONS,
  SET_BANK_NAMES,
  SET_MOBILE_BANK_ACCOUNTS,
  SET_RECHARGE,
  SET_SELCTED_BANK_ACCOUNT,
  BANK_NAME_OPTIONS,
  SET_ACCOUNT_BY_BANK_NAME,
  SET_ACCOUNT_BY_BANK_NAME_BRANCH,
  SET_RECHARGING_STATUS,
  SET_RECHARGES_LIST,
  RECHARGE_REQUESTS_LIST,
} from "../types";

const initialState = {
  bankNames: [],
  bankAccountsOptions: {},
  bankAccount: {},
  rechargeStatus: false,
  rechargeAdd: {},
  bankAccounts: [],
  mobileBanks: [],
  bankOptions: [],
  banksAccountBranchOpt: [],
  banksAccountNoOpt: [],
  banksAccountNameOpt: [],
};

const getBankAccoutnUsingName = (state, payload) => {
  console.log("Action Bank Account ", payload);
  if (!helperIsEmpty(payload)) {
    if (payload.data.status) {
      return {
        ...state,
        banksAccountBranchOpt: payload.data && payload.data.banksAccountBranch,
        banksAccountNoOpt: payload.data && payload.data.banksAccountNo,
        banksAccountNameOpt: payload.data && payload.data.banksAccountName,
      };
    }
  }
  return state;
};

const getBankAccountOPtions = (state, payload) => {
  // console.log("Bank Account Option Using Name, Options ", payload);
  if (!helperIsEmpty(payload.data)) {
    let { banksAccountName, banksAccountNo } = payload.data;
    if (!payload.errStatus) {
      return {
        ...state,
        banksAccountNoOpt: banksAccountNo,
        banksAccountNameOpt: banksAccountName,
      };
    }
  }

  return state;
};

const getRechargesList = (response, state) => {
  if (response) {
    if (!response.errorStatus && response.status) {
      return {
        ...state,
        recharges: response.data,
      };
    }
    console.log("List of Recharge Reponse, ", response);
  }
  return {
    ...state,
    recharges: [],
  };
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
    case SET_RECHARGING_STATUS:
      return {
        ...state,
        rechargeStatus: action.payload,
      };
    case SET_RECHARGE:
      return {
        ...state,
        rechargeAdd: action.payload.recharge,
      };
    case SET_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccounts: action.payload,
      };
    case SET_MOBILE_BANK_ACCOUNTS:
      return {
        ...state,
        mobileBanks: action.payload,
      };

    case BANK_NAME_OPTIONS:
      return {
        ...state,
        bankOptions: action.payload,
      };

    case SET_ACCOUNT_BY_BANK_NAME:
      return getBankAccoutnUsingName(state, action.payload);

    case SET_ACCOUNT_BY_BANK_NAME_BRANCH:
      // console.log("Bank Account Option Using Name, Branch Swith ", action.payload);
      return getBankAccountOPtions(state, action.payload);

    case RECHARGE_REQUESTS_LIST:
      return getRechargesList(action.payload, state);
    default:
      return state;
  }
}
