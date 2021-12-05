import axios from "axios";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  GET_BACK_END_URL,
  REQUEST_HEADER,
  REQUEST_HEADER_GET,
  SET_AGENT_COMPANY_UPDATE,
  SET_AGENT_COMPANY_UPDATE_ERROR,
  SET_AGENT_OWNER_UPDATE,
  SET_AGENT_OWNER_UPDATE_ERROR,
  SET_LOGIN_AGENT,
  SET_LOGIN_AGENT_ERROR,
  SET_AGENT_OWNER_ADD,
  SET_AGENT_OWNER_ADD_ERROR,
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
    const acUrl = `${GET_BACK_END_URL}/agents/company`;
    console.log("Agent Company Update Url , ", acUrl, " Info, ", agentCompany);

    const binUrl = await getAgentFileUpload(
      agentCompany.binAttach,
      "/company/bin"
    );
    const companyLogoUrl = await getAgentFileUpload(
      agentCompany.companyLogoAttach,
      "/company/logo"
    );
    const tinUrl = await getAgentFileUpload(
      agentCompany.tinAttach,
      "/company/tin"
    );
    const tradeUrl = await getAgentFileUpload(
      agentCompany.tradeAttach,
      "/company/trade"
    );

    console.log("Bin ", binUrl);
    console.log("companyLogoUrl ", companyLogoUrl);
    console.log("tinUrl ", tinUrl);
    console.log("tradeUrl ", tradeUrl);

    agentCompany.binAttach = binUrl !== null ? binUrl : "";
    agentCompany.companyLogoAttach =
      companyLogoUrl !== null ? companyLogoUrl : "";
    agentCompany.tinAttach = tinUrl !== null ? tinUrl : "";
    agentCompany.tradeAttach = tradeUrl !== null ? tradeUrl : "";
    console.log("Befor Update Request Send Agent Company, ", agentCompany);
    try {
      const resp = await axios.put(acUrl, agentCompany, {
        headers: REQUEST_HEADER,
      });
      console.log("Resp Agent Company Update Url , ", resp);
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

export const getCurrentAgentAction = (token) => async (dispatch) => {
  const actionUrl = `${GET_BACK_END_URL}/agents/current`;

  if (token) {
    REQUEST_HEADER_GET.Authorization = token;
    REQUEST_HEADER.Authorization = token;
  }

  console.log(" Header ", REQUEST_HEADER_GET);

  try {
    console.log("Header ", REQUEST_HEADER_GET);
    const resp = await axios.get(actionUrl, {
      headers: REQUEST_HEADER,
    });

    console.log("Get Current Login Agent Response, ", resp);
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
  const imageUrl = await getAgentFileUpload(
    agentOwner.ownerImage,
    "/owner/profile"
  );
  const nidUrl = await getAgentFileUpload(
    agentOwner.nationalIdAttach,
    "/owner/nationalid"
  );
  const passportUrl = await getAgentFileUpload(
    agentOwner.passportAttach,
    "/owner/passport"
  );

  agentOwner.ownerImage = imageUrl !== null ? imageUrl : "";
  agentOwner.nationalIdAttach = nidUrl !== null ? nidUrl : "";
  agentOwner.passportAttach = passportUrl !== null ? passportUrl : "";

  console.log("Agent Owner ", JSON.stringify(agentOwner, null, 2));

  try {
    const resp = await axios.put(
      `${GET_BACK_END_URL}/agents/owners`,
      agentOwner,
      {
        headers: REQUEST_HEADER,
      }
    );

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

export const addAgentOwnerAction = (agentOwner) => async (dispatch) => {
  const imageUrl = await getAgentFileUpload(
    agentOwner.ownerImage,
    "/owner/profile"
  );
  const nidUrl = await getAgentFileUpload(
    agentOwner.nationalIdAttach,
    "/owner/nationalid"
  );
  const passportUrl = await getAgentFileUpload(
    agentOwner.passportAttach,
    "/owner/passport"
  );

  agentOwner.ownerImage = imageUrl !== null ? imageUrl : "";
  agentOwner.nationalIdAttach = nidUrl !== null ? nidUrl : "";
  agentOwner.passportAttach = passportUrl !== null ? passportUrl : "";

  try {
    const actionUrl = `${GET_BACK_END_URL}/agents/owners`;
    console.log("Agent action Url ", actionUrl);
    console.log("Before Send Owner Info, ", agentOwner);
    const resp = await axios.post(actionUrl, agentOwner, {
      headers: REQUEST_HEADER,
    });

    console.log("Agent Owner Action response, ", resp);
    dispatch({
      type: SET_AGENT_OWNER_ADD,
      payload: resp.data,
    });
  } catch (error) {
    console.log("Agent Owner Action Error, ", error);
    dispatch({
      type: SET_AGENT_OWNER_ADD_ERROR,
      payload: { message: error.message, status: false },
    });
  }
};

export const getAgentFileUpload = async (file, dirPath = "") => {
  const dataFile = new FormData();
  dataFile.append("attachFile", file);
  dataFile.append("dirName", dirPath);

  try {
    const upload = await axios.put(
      `${GET_BACK_END_URL}/uploadfile/agents`,
      dataFile,
      { headers: REQUEST_HEADER }
    );
    console.log("Upload file Response, ", upload);
    if (upload.data) {
      if (upload.data.status) {
        return upload.data.path;
      }
    }
  } catch (error) {
    return null;
  }
};
