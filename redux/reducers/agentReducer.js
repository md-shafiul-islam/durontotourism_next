/* eslint-disable import/no-anonymous-default-export */

import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  REST_AGENT_OWNER_ADD,
  REST_AGENT_OWNER_UPDATE,
  SET_AGENT_COMPANY_UPDATE,
  SET_AGENT_COMPANY_UPDATE_ERROR,
  SET_AGENT_OWNER_ADD,
  SET_AGENT_OWNER_ADD_ERROR,
  SET_AGENT_OWNER_UPDATE,
  SET_AGENT_OWNER_UPDATE_ERROR,
  SET_AGENT_SIGNUP_RESP,
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
  agentSignUp: {},
  upAgentOwner: undefined,
  addAgentOwner: undefined,
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

const getRestAgentUpdate = (status, state) => {
  if (status) {
    return {
      ...state,
      upAgentOwner: undefined,
    };
  }

  return state;
};

const getAgentAddRest = (status, state) => {
  if (status) {
    return {
      ...state,
      addAgentOwner: undefined,
    };
  }
  return state;
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

    case REST_AGENT_OWNER_ADD:
      return getAgentAddRest(action.payload, state);

    case SET_AGENT_OWNER_ADD:
      return {
        ...state,
        addAgentOwner: action.payload,
      };
    case SET_AGENT_OWNER_ADD_ERROR:
      return {
        ...state,
        addAgentOwnerError: action.payload,
      };

    case SET_AGENT_SIGNUP_RESP:
      return {
        ...state,
        agentSignUp: action.payload,
      };

    case REST_AGENT_OWNER_UPDATE:
      return getRestAgentUpdate(action.payload, state);
    default:
      return state;
  }
}
