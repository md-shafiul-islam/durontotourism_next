import Axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  AUT_TOKEN,
  GET_BACK_END_URL,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  SET_BANK_ACCOUNTS,
  SET_BANK_ACCOUNT_OPTIONS,
  SET_BANK_ERROR,
  SET_BANK_NAMES,
  SET_MOBILE_BANK_ACCOUNTS,
  SET_RECHARGE,
  SET_SELCTED_BANK_ACCOUNT,
} from "../types";

const getValidtData = (resp) => {
  if (resp !== undefined) {
    if (resp.data !== undefined) {
      return resp.data.data;
    }
  }
};

export const getBankAccountsNames =
  (token = undefined) =>
  async (dispatch) => {
    REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;
    const resp = await Axios.get(`${GET_BACK_END_URL}/bankaccounts/name`, {
      headers: REQUEST_HEADER,
    });

    try {
      console.log("getBankAccountsNames Response ", resp);

      dispatch({
        type: SET_BANK_NAMES,
        payload: resp.data.data,
      });
    } catch (error) {
      console.log("getBankAccountsNames Response error, ", error);
    }
  };

const getAccountsOptions = (data) => {
  console.log("Bank Accounts Options, ", data);

  if (data) {
    const bankAccount = {
      bankAccountNo: [],
      banksAccountName: [],
      banksBranch: [],
    };

    if (data.banksAccountNo) {
      bankAccount.bankAccountNo = data.banksAccountNo;
    }

    if (data.banksAccountName) {
      bankAccount.banksAccountName = data.banksAccountName;
    }

    if (data.banksBranch) {
      bankAccount.banksBranch = data.banksBranch;
    }

    return bankAccount;
  }
};

export const getBankAccountsByName =
  (name, token = undefined) =>
  async (dispatch) => {
    REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;
    const resp = await Axios.get(`${GET_BACK_END_URL}/banks?name=${name}`, {
      headers: REQUEST_HEADER,
    });

    try {
      console.log("getBankAccountsByName Response ", resp);

      dispatch({
        type: SET_BANK_ACCOUNT_OPTIONS,
        payload: getAccountsOptions(resp.data),
      });
    } catch (error) {
      console.log("getBankAccountsByName Response error, ", error);
    }
  };

export const getBankAccountsByAcNo =
  (acNo, token = undefined) =>
  async (dispatch) => {
    REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;
    const resp = await Axios.get(`${GET_BACK_END_URL}/bankaccounts/account/${acNo}`, {
      headers: REQUEST_HEADER,
    });

    try {
      console.log("getBankAccountsByAcNo Response ", resp);

      dispatch({
        type: SET_SELCTED_BANK_ACCOUNT,
        payload: resp.data.status ? resp.data.data : null,
      });
    } catch (error) {
      console.log("getBankAccountsByName Response error, ", error);
    }
  };

const createRecharge = (recharge, filePath) => {
  if (recharge && filePath !== undefined) {
    let { values, type, accountId } = recharge;
    let { amount, referenceNumber, transectionId, transectionDate } = values;

    const requestData = {
      accountId: accountId,
      amount: amount,
      transectionId: transectionId,
      refferenceNote: referenceNumber,
      transectionDate: transectionDate,
      transType: type,
      attach: filePath,
    };

    return requestData;
  }
};

const getRechargeOptions = (rechargeRes) => {
  console.log("Recharge Response ", rechargeRes);
  if (!helperIsEmpty(rechargeRes)) {
    return {
      status: false,
      recharge: rechargeRes.data,
    };
  }
  return {
    status: true,
    recharge: null,
  };
};
export const addRechargeAction = (recharge, token) => async (dispatch) => {
  REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;
  dispatch({
    type: SET_RECHARGE,
    payload: getRechargeOptions(undefined),
  });

  const dateFile = new FormData();
  dateFile.append("attachFile", recharge.values.slipeAttachment);
  const resp = await Axios.put(
    `${GET_BACK_END_URL}/uploadfile/account/recharge`,
    dateFile,
    { headers: REQUEST_HEADER }
  );

  try {
    const rechargeRequest = createRecharge(recharge, resp.data);
    console.log("After Account file uplodaed, ", rechargeRequest);

    const rechargeRes = await Axios.post(
      `${GET_BACK_END_URL}/recharges`,
      rechargeRequest,
      { headers: REQUEST_HEADER }
    );

    try {
      dispatch({
        type: SET_RECHARGE,
        payload: getRechargeOptions(rechargeRes.data),
      });
    } catch (err) {
      console.log("Add Recharge Error, ", err);
    }
  } catch (error) {
    console.log("Upload Error, ", error);
  }
};

export const getBnakAccounts = (token) => async (dispatch) => {
  REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;

  console.log("REQUEST_HEADER, ", REQUEST_HEADER);

  const resp = await Axios.get(`${GET_BACK_END_URL}/recharges/bankaccounts`, {
    headers: REQUEST_HEADER,
  });

  try {
    dispatch({
      type: SET_BANK_ACCOUNTS,
      payload: getValidtData(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_BANK_ERROR,
      payload: err,
    });
  }
};

export const getMobillBnakAccounts = (token) => async (dispatch) => {
  REQUEST_HEADER.Authorization = token ? token : AUT_TOKEN;

  const resp = await Axios.get(
    `${GET_BACK_END_URL}/recharges/bankaccounts?type=mobile_banking`,
    { headers: REQUEST_HEADER }
  );

  console.log("Mobile Banking Accounts Resp, ", resp);

  try {
    dispatch({
      type: SET_MOBILE_BANK_ACCOUNTS,
      payload: getValidtData(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_BANK_ERROR,
      payload: err,
    });
  }
};
