/* eslint-disable react-hooks/rules-of-hooks */
import { getSession, useSession } from "next-auth/react";
import { REQUEST_HEADER, REQUEST_HEADER_GET } from "../types";

export const initialJwTokenToAuth = (token) => {
  
  if (token) {
    REQUEST_HEADER.Authorization = token;
    REQUEST_HEADER_GET.Authorization = token;
  }
};
