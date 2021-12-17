import axios from "axios";
import { GET_BACK_END_URL, REQUEST_HEADER } from "../types";
import { helperIsEmpty } from "../../utils/helper/helperAction";

export const esUploadFile = async (fileData, dirPath) => {
  if (fileData) {
    const dateFile = new FormData();
    dateFile.append("attachFile", fileData);
    console.log("File Uploading ...");
    const resp = await axios.put(
      `${GET_BACK_END_URL}/uploadfile/user/traveler/${dirPath}`,
      dateFile,
      { headers: REQUEST_HEADER }
    );

    try {
      if (resp) {
        if (resp.data) {
          return resp.data;
        }
      }
    } catch (error) {
      console.log("ES File Upload Action Error ", error);
      return null;
    }
  }
  return null;
};

export const esUploadProfileImage = async (fileData, dirPath) => {
  if (fileData) {
    const dateFile = new FormData();
    dateFile.append("attachFile", fileData);
    console.log("File Uploading ...", fileData);
    const resp = await axios.put(
      `${GET_BACK_END_URL}/uploadfile/user/profile`,
      dateFile,
      { headers: REQUEST_HEADER }
    );
    console.log("Image Upload Response, ", resp);
    try {
      if (resp) {
        if (resp.data) {
          return resp.data;
        }
      }
    } catch (error) {
      console.log("ES File Upload Action Error ", error);
      return { status: false, message: error.message, path: null };
    }
  }
  return { status: false, message: "File Not added", path: null };
};

export const esRechargeFileUpload = async (fileData, type="general") => {
  console.log("Recharge Upload, ", fileData);
  const url = `${GET_BACK_END_URL}/uploadfile/recharges`;
  const formDate = new FormData();
  formDate.append("attachFile", fileData);
  formDate.append("dirName", type);

  try {
    const resp = await axios.put(url, formDate, { headers: REQUEST_HEADER });

    if (!helperIsEmpty(resp.data)) {
      if (resp.data.status) {
        return resp.data.path;
      } else {
        return "";
      }
    } else {
      return "";
    }
  } catch (error) {
    console.log("Recharge File Upload Failed, ", error.message);
  }

  return "";
};
