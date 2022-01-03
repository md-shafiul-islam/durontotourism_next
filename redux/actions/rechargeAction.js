import axios from "axios";
import Axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  AUT_TOKEN,
  BANK_NAME_OPTIONS,
  GET_BACK_END_DOMAIN_NAME,
  GET_BACK_END_URL,
  RECHARGE_REQUESTS_LIST,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  SET_ACCOUNT_BY_BANK_NAME,
  SET_ACCOUNT_BY_BANK_NAME_BRANCH,
  SET_BANK_ACCOUNTS,
  SET_BANK_ACCOUNT_OPTIONS,
  SET_BANK_ERROR,
  SET_BANK_NAMES,
  SET_MOBILE_BANK_ACCOUNTS,
  SET_RECHARGE,
  SET_RECHARGING_STATUS,
  SET_SELCTED_BANK_ACCOUNT,
} from "../types";
import { esRechargeFileUpload } from "./esAction";

const getValidtData = (resp) => {
  if (resp !== undefined) {
    if (resp.data !== undefined) {
      return resp.data.data;
    }
  }
};

export const getBankAccountsByBankName = (name) => async (dispatch) => {
  if (name !== undefined && name !== null) {
    const actionUrl = `${GET_BACK_END_URL}/bankaccounts/bankname/${name}`;

    try {
      const resp = await axios.get(actionUrl, { headers: REQUEST_HEADER });

      console.log("Account Response ", resp);
      dispatch({
        type: SET_ACCOUNT_BY_BANK_NAME,
        payload: { errStatus: false, data: resp.data },
      });
    } catch (error) {
      console.log("Bank account using bank name Error ", error);
      dispatch({
        type: SET_ACCOUNT_BY_BANK_NAME,
        payload: { errStatus: true, message: error.message, data: null },
      });
    }
  }
};

export const getBankAccountsByBankNameAndBranchName =
  (query) => async (dispatch) => {
    console.log("Bank Account, ", query);
    if (query !== undefined && query !== null) {
      const actionUrl = `${GET_BACK_END_URL}/bankaccounts/query`;

      try {
        const resp = await axios.post(actionUrl, query, {
          headers: REQUEST_HEADER,
        });

        console.log("Account Query Response  ", resp);
        dispatch({
          type: SET_ACCOUNT_BY_BANK_NAME_BRANCH,
          payload: { errStatus: false, data: resp.data },
        });
      } catch (error) {
        console.log("Bank account using bank name Error ", error);
        dispatch({
          type: SET_ACCOUNT_BY_BANK_NAME_BRANCH,
          payload: { errStatus: true, message: error.message, data: null },
        });
      }
    }
  };

export const getBankAccountsNames =
  (token = undefined) =>
  async (dispatch) => {
    if (!helperIsEmpty(token)) {
      REQUEST_HEADER.Authorization = token;
    }

    try {
      const resp = await Axios.get(`${GET_BACK_END_URL}/bankaccounts/name`, {
        headers: REQUEST_HEADER,
      });
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

export const getAllBankOptions = () => async (dispatch) => {
  const actionUrl = `${GET_BACK_END_URL}/banks/bank/options`;
  if (
    REQUEST_HEADER.Authorization === "" ||
    REQUEST_HEADER.Authorization === undefined ||
    REQUEST_HEADER.Authorization === null
  ) {
    console.log("getAllBankOptions Aut Not Set");
  }
  try {
    const resp = await Axios.get(actionUrl);
    console.log("Bank name Options bank/options ", resp);
    dispatch({
      type: BANK_NAME_OPTIONS,
      payload: resp.data && resp.data.data,
    });
  } catch (error) {
    console.log(
      "Bank EU name options Error, ",
      error,
      " Header, ",
      REQUEST_HEADER
    );
  }
};

export const getBankAccountsByName =
  (name, token = undefined) =>
  async (dispatch) => {
    if (token) {
      REQUEST_HEADER.Authorization = token;
    }

    console.log("Action Bank Name ", name);
    try {
      const resp = await Axios.get(
        `${GET_BACK_END_URL}/bankaccounts?name=${name}`,
        {
          headers: REQUEST_HEADER,
        }
      );
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
    if (!helperIsEmpty(token)) {
      REQUEST_HEADER.Authorization = token;
    }
    try {
      const resp = await Axios.get(
        `${GET_BACK_END_URL}/bankaccounts/account/${acNo}`,
        {
          headers: REQUEST_HEADER,
        }
      );
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
    let {
      amount,
      refferenceNote,
      transectionId,
      transectionDate,
      type,
      accountId,
    } = recharge;
    return {
      accountId: accountId,
      amount: amount,
      transectionId: transectionId,
      refferenceNote: refferenceNote,
      transectionDate: transectionDate,
      transType: type,
      attach: filePath,
    };
  }

  return null;
};

const getRechargeOptions = (rechargeRes) => {
  console.log("Recharge Response ", rechargeRes);
  if (!helperIsEmpty(rechargeRes)) {
    return {
      errorStatus: false,
      ...rechargeRes.data,
    };
  }
  return {
    errorStatus: true,
    status: false,
    message: "Recharge Add failed, Please try again later",
    data: null,
  };
};


export const addRechargeAction = (recharge, token) => async (dispatch) => {
  if (!helperIsEmpty(token)) {
    REQUEST_HEADER.Authorization = token;
  }

  dispatch({
    type: SET_RECHARGING_STATUS,
    payload: true,
  });
  console.log("Recharge Request Data, ", recharge);

  const attachUrl = await esRechargeFileUpload(
    recharge.slipeAttachment,
    recharge.type
  );
  console.log("Customer ", attachUrl);
  recharge = createRecharge(recharge, attachUrl);
  const actionUrl = `${GET_BACK_END_URL}/recharges`;

  console.log(
    "Create Recharge Request Data, ",
    JSON.stringify(recharge, null, 2)
  );

  if (recharge !== undefined && recharge !== null) {
    try {
      const resp = await axios.post(actionUrl, recharge, {
        headers: REQUEST_HEADER,
      });

      dispatch({
        type: SET_RECHARGE,
        payload: getRechargeOptions(resp),
      });
      dispatch({
        type: SET_RECHARGING_STATUS,
        payload: false,
      });
    } catch (error) {
      console.log("Recharge Action Error, ", error.message);
      dispatch({
        type: SET_RECHARGING_STATUS,
        payload: false,
      });
      dispatch({
        type: SET_RECHARGE,
        payload: {
          errorStatus: true,
          message: `Recharge added failed.  ${error.message}`,
        },
      });
    }
  }
};

export const getBnakAccounts = (token) => async (dispatch) => {
  if (!helperIsEmpty(token)) {
    REQUEST_HEADER.Authorization = token;
  }

  console.log("REQUEST_HEADER, ", REQUEST_HEADER);

  try {
    const resp = await Axios.get(`${GET_BACK_END_URL}/recharges/bankaccounts`, {
      headers: REQUEST_HEADER,
    });
    dispatch({
      type: SET_BANK_ACCOUNTS,
      payload: getValidtData(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_BANK_ERROR,
      payload: err,
    });
    console.log("Recharge Banking Accounts Error, ", err);
  }
};

export const getMobillBnakAccounts = (token) => async (dispatch) => {
  if (!helperIsEmpty(token)) {
    REQUEST_HEADER.Authorization = token;
  }
  try {
    const resp = await Axios.get(
      `${GET_BACK_END_URL}/recharges/bankaccounts?type=mobile_banking`,
      { headers: REQUEST_HEADER }
    );

    console.log("Mobile Banking Accounts Resp, ", resp);
    dispatch({
      type: SET_MOBILE_BANK_ACCOUNTS,
      payload: getValidtData(resp),
    });
  } catch (err) {
    console.log("Mobile Banking Accounts Resp, ", err);
    dispatch({
      type: SET_BANK_ERROR,
      payload: err,
    });
  }
};

export const getWalletRechargeRequest = () => async (dispatch) => {
  const actionUrl = `${GET_BACK_END_URL}/recharges`;
  console.log("Recharge URL, ", actionUrl);
  try {
    const response = await axios.get(actionUrl, { headers: REQUEST_HEADER });
    dispatch({
      type: RECHARGE_REQUESTS_LIST,
      payload: { errorStatus: false, ...response.data },
    });
  } catch (err) {
    dispatch({
      type: RECHARGE_REQUESTS_LIST,
      payload: {
        errorStatus: true,
        data: null,
        status: false,
        message: err.message,
      },
    });
  }
};

export const getWalletTransactions = () => async (dispatch) => {
  const actionUrl = `${GET_BACK_END_URL}/`;

  try {
    const response = await axios.get(actionUrl, { headers: REQUEST_HEADER });
    dispatch({
      type: WALLET_TRANSACTION,
      payload: { errorStatus: false, ...response.data },
    });
  } catch (err) {
    dispatch({
      type: WALLET_TRANSACTION,
      payload: {
        errorStatus: true,
        data: null,
        status: false,
        message: err.message,
      },
    });
  }
};
