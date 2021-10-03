/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  SET_AGENT_COMPANY_UPDATE,
  SET_AGENT_COMPANY_UPDATE_ERROR,
  SET_AGENT_OWNER_UPDATE,
  SET_AGENT_OWNER_UPDATE_ERROR,
  SET_LOGIN_AGENT,
  SET_LOGIN_AGENT_ERROR,
} from "../types";

const initialState = {
  agent: {},
  upStatus: {},
  upCompanyError: {},
  upAgentCompany: { status: undefined, msg: "", agent: undefined },
  loginError: {},
  loginAgent: {},
};

const getUpAgentResp = (payload) => {
  const agent = { status: false, msg: "", agent: {} };
  if (!helperIsEmpty(payload)) {
    agent.status = payload.status;
    agent.msg = payload.msg;
    agent.agent = payload.data;
  }
  return agent;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AGENT_COMPANY_UPDATE:
      return {
        ...state,
        upAgentCompany: getUpAgentResp(action.payload),
      };
    case SET_AGENT_COMPANY_UPDATE_ERROR:
      return {
        ...state,
        upError: action.payload,
      };
    case SET_LOGIN_AGENT:
      return {
        ...state,
        loginAgent: action.payload,
      };
    case SET_LOGIN_AGENT_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };

      case SET_AGENT_OWNER_UPDATE:
      return {
        ...state,
        upAgentOwner: action.payload,
      };
    case SET_AGENT_OWNER_UPDATE_ERROR:
      return {
        ...state,
        upAgentOwnerError: action.payload,
      };

    default:
      return state;
  }
}
