import axios from "axios";
import { GET_BACK_END_URL, REQUEST_HEADER } from "../types";

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
      return {status:false, message:error.message, path:null};
    }
  }
  return {status:false, message:"File Not added", path:null};
};
