import axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  GET_BACK_END_URL,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  SET_AGENT_COMPANY_UPDATE,
  SET_AGENT_COMPANY_UPDATE_ERROR,
  SET_LOGIN_AGENT,
  SET_LOGIN_AGENT_ERROR,
} from "../types";

const getAgentData = (resp) => {
  if (!helperIsEmpty(resp)) {
    if (resp.data) {
      return {
        status: resp.data.status,
        msg: resp.data.message,
        data: resp.data.data,
      };
    }
  }
  return {
    status: false,
    msg: "Please try again later...",
    data: null,
  };
};

export const getUpdateAgentCompanyAction =
  (agentCompany) => async (dispatch) => {
    const resp = await axios.put(
      `${GET_BACK_END_URL}/agents/company`,
      agentCompany,
      {
        headers: REQUEST_HEADER,
      }
    );

    try {
      dispatch({
        type: SET_AGENT_COMPANY_UPDATE,
        payload: getAgentData(resp),
      });
    } catch (err) {
      dispatch({
        type: SET_AGENT_COMPANY_UPDATE_ERROR,
        payload: { status: true, msg: "Please try again later", error: err },
      });
    }
  };

export const getCurrentAgentAction = () => async (dispatch) => {
  const resp = await axios.get(`${GET_BACK_END_URL}/agents/current`, {
    headers: REQUEST_HEADER_GET,
  });

  try {
    dispatch({
      type: SET_LOGIN_AGENT,
      payload: getAgentData(resp).data,
    });
  } catch (err) {
    dispatch({
      type: SET_LOGIN_AGENT_ERROR,
      payload: { error: err, loginStatus: false, status: true },
    });
  }
};

export const getUpdateAgentOwnerAction = (agentOwner) => async (dispatch) => {
  const resp = await axios.put(
    `${GET_BACK_END_URL}/agentowners`,
    agentCompany,
    {
      headers: REQUEST_HEADER,
    }
  );

  try {
    dispatch({
      type: SET_AGENT_OWNER_UPDATE,
      payload: getAgentData(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_AGENT_OWNER_UPDATE_ERROR,
      payload: { status: true, msg: "Please try again later", error: err },
    });
  }
};
