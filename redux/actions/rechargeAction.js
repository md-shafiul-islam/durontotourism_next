import axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  AUT_TOKEN,
  GET_BACK_END_URL,
  REQUEST_HEADER,
  SET_BANK_ACCOUNT_OPTIONS,
  SET_BANK_NAMES,
  SET_RECHARGE,
  SET_SELCTED_BANK_ACCOUNT,
} from "../types";

export const getBankAccountsNames =
  (token = undefined) =>
  async (dispatch) => {
    const axiosIns = axios.create();
    axiosIns.defaults.headers.common["Authorization"] = token
      ? token
      : AUT_TOKEN;

    const resp = await axiosIns.get(`${GET_BACK_END_URL}/banks/name`);

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
    const axiosIns = axios.create();
    axiosIns.defaults.headers.common["Authorization"] = token
      ? token
      : AUT_TOKEN;

    const resp = await axiosIns.get(`${GET_BACK_END_URL}/banks?name=${name}`);

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
    const axiosIns = axios.create();
    axiosIns.defaults.headers.common["Authorization"] = token
      ? token
      : AUT_TOKEN;

    const resp = await axiosIns.get(
      `${GET_BACK_END_URL}/banks/account/${acNo}`
    );

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

  const createRecharge = (recharge, filePath)=>{

    if(recharge && filePath !== undefined){
      let {values, type, accountId} = recharge;
      let {amount, referenceNumber, transectionId, transectionDate} = values;
      console.log("Recharge Options ", recharge);
      console.log("Recharge Uploded file path ", filePath);
      console.log("Recharge Date ", transectionDate);

      const requestData = {
        accountId:accountId,
        amount:amount,
        transectionId:transectionId,
        refferenceNote:referenceNumber,
        transectionDate: transectionDate,
        transType:type,
        attach:filePath
    };

      return requestData;
    }
  }

  const getRechargeOptions = (rechargeRes)=>{
    console.log("Recharge Response ", rechargeRes);
    if(!helperIsEmpty(rechargeRes)){
      return {
        status:false,
        recharge:rechargeRes.data,
      }
    }
    return {
      status:true,
      recharge:null,
    }
  }
export const addRechargeAction =  (recharge, token) => async (dispatch) => {

  dispatch({
    type:SET_RECHARGE,
    payload: getRechargeOptions(undefined),
  })

  const axiosIns = axios.create();
  axiosIns.defaults.headers.common["Authorization"] = token ? token : AUT_TOKEN;

  const dateFile = new FormData();
  dateFile.append("attachFile", recharge.values.slipeAttachment);
  const resp = await axiosIns.put(
    `${GET_BACK_END_URL}/uploadfile/account/recharge`,
    dateFile
  );
  
  try {
    const rechargeRequest = createRecharge(recharge, resp.data);
    console.log("After Account file uplodaed, ", rechargeRequest);

    const rechargeRes = await axiosIns.post(`${GET_BACK_END_URL}/recharges`, rechargeRequest, {headers:REQUEST_HEADER});

    try {
      dispatch({
        type:SET_RECHARGE,
        payload: getRechargeOptions(rechargeRes.data),
      })
    } catch (err) {
      console.log("Add Recharge Error, ", err);
    }
    
  } catch (error) {
    console.log("Upload Error, ", error);
  }
  
 
  
};
