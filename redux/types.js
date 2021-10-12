export const GET_ERRORS = "GET_ERRORS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIY = "GET_COUNTRIY";
export const DELET_COUNTRIY = "DELET_COUNTRIY";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORY = "GET_CATEGORY";
export const DELET_CATEGORY = "DELET_CATEGORY";

export const AUT_TOKEN =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiRGV2ZWxvcGVyIiwiZnVsbE5hbWUiOiJNZCBTaGFmaXVsIElzbGFtIiwiaWQiOiI1ZWI5MjU5ODkyMjg0NzBlYjk0NTIzYmNjMTQ3ZWFiODIwMjEyMTI0MjQ5IiwiZXhwIjoxNjMyMjAzOTY2LCJpYXQiOjE2MzE3NzE5NjYsInVzZXJuYW1lIjoibWQuc2hhZml1bC5pc2xhbTIwMTRiZEBnbWFpbC5jb20ifQ.bzvBNu2lB-YXk0zqacxZAHEGb3SoqfRL0m5r9F2NRWQaDdzDRmKJRzB9Kn-L_acsW8fZwq55A9WTEw4lWY4SCQ";

export const COMMON_REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
};
export const REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  Authorization: "",
};

export const REQUEST_HEADER_GET = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  Authorization: "",
};

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_USER_ERROR = "SET_CURRENT_USER_ERROR";

export const GET_ACCESSES = "GET_ACCESSES";
export const GET_ACCESS = "GET_ACCESS";

//Type for backlog Actions
export const GET_BACKLOG = "GET_BACKLOG";
export const SET_TOKEN = "SET_TOKEN";

console.log(process.env.REACT_APP_API_URL);

/** URLS */

export const GET_BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const HOST_ADD = "http://localhost"; //"http://durontotrip.com"; //http://3.137.195.192

export const EXT_BASE_URL = `${HOST_ADD}:8050`; // `http://dto.durontotour.com`; //
export const BASE_URL = `${EXT_BASE_URL}/api`;

export const EXT_PRICE_URL = `${HOST_ADD}:8181`;

export const BASE_BOOKING_URL = `${HOST_ADD}:9000`;
export const EX_BOOKING_URL = `${BASE_BOOKING_URL}/cutom-book-request`;

export const GET_ROUND_TRIP_BOOKING = "GET_ROUND_TRIP_BOOKING";

export const GET_PACK_CATEGORIES = "GET_PACK_CATEGORIES";
export const GET_PACK_CATEGORY = "GET_PACK_CATEGORY";
export const PACK_CAT_DELETE = "GET_PACK_DELETE";

export const GET_DESIGNATIONS = "GET_DESIGNATIONS";
export const GET_DESIGNATION = "GET_DESIGNATION";

export const GET_AIR_SEARCH_RESPONSE = "GET_AIR_SEARCH_RESPONSE";
export const GET_SEARCH_QUERY = "GET_SEARCH_QUERY";

export const GET_DEPARTURE_FLIGHTS = "GET_DEPARTURE_FLIGHTS";
export const GET_RETURN_FLIGHTS = "GET_RETURN_FLIGHTS";

export const GET_AIR_PRICE_RESPONSE = "GET_AIR_PRICE_RESPONSE";
export const GET_SELECTED_AIR_PRICE = "GET_SELECTED_AIR_PRICE";

export const GET_SELECTED_AIR_ROUND_TRIP_PRICE =
  "GET_SELECTED_AIR_ROUND_TRIP_PRICE";
export const GET_AIRLINES = "GET_AIRLINES";
export const GET_AIRPORTS = "GET_AIRPORTS";
export const GET_AIRPORTS_ARR = "GET_AIRPORTS_ARR";

export const GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS =
  "GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS";

export const GET_MOD_AIR_PRICE_DEP = "AIR_PRICE_DEP";
export const GET_MOD_AIR_PRICE_RET = "AIR_PRICE_RET";

export const GET_SELECTED_ROUND_TRIP_SOLUTION =
  "GET_SELECTED_ROUND_TRIP_SOLUTION";

export const GET_PASSENGER = [
  { key: "ADT", value: "Adult" },
  { key: "CHD", value: "Children" },
  { key: "INF", value: "Infant" },
  { key: "CNN", value: "Children" },
];
export const GET_DAYES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const GET_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Air Filter related Constant

export const GET_ONWARD_FLIGHT_FILTER = "GET_ONWARD_FLIGHT_FILTER";
export const GET_RETURN_FLIGHT_FILTER = "GET_RETURN_FLIGHT_FILTER";
export const GET_SEL_AIR_FLIGHT_FILTER = "GET_SEL_AIR_FLIGHT_FILTER";

export const GET_FILTER_DEP_TIME = "GET_FILTER_DEP_TIME";
export const GET_FILTER_RET_TIME = "GET_FILTER_RET_TIME";

export const GET_FILTER_DEP_STOPS = "GET_FILTER_DEP_STOPS";
export const GET_FILTER_RET_STOPS = "GET_FILTER_RET_STOPS";

/* BANKS */

export const SET_BANK_NAMES = "SET_BANK_NAMES";

export const SET_BANK_ACCOUNT_OPTIONS = "SET_BANK_ACCOUNT_OPTIONS";
export const SET_SELCTED_BANK_ACCOUNT = "SET_SELCTED_BANK_ACCOUNT";

export const SET_RECHARGE = "SET_RECHARGE";

export const SET_BANK_ACCOUNTS = "SET_BANK_ACCOUNTS";
export const SET_MOBILE_BANK_ACCOUNTS = "SET_MOBILE_BANK_ACCOUNTS";
export const SET_BANK_ERROR = "SET_BANK_ERROR";

//WithDarw Type
export const SET_ADD_WITHDRAW_STATUS = "SET_ADD_WITHDRAW_STATUS";
export const SET_ADD_WITHDRAW_ERROR = "SET_ADD_WITHDRAW_ERROR";

//Sign Up

export const SET_SIGNUP_RESP = "SET_SIGNUP_RESP";
export const SET_ADD_SIGNUP_ERROR = "SET_ADD_SIGNUP_ERROR";

//agent
export const SET_AGENT_COMPANY_UPDATE = "SET_AGENT_COMPANY_UPDATE";
export const SET_AGENT_COMPANY_UPDATE_ERROR = "SET_AGENT_COMPANY_UPDATE_ERROR";
export const SET_LOGIN_AGENT = "SET_LOGIN_AGENT";
export const SET_LOGIN_AGENT_ERROR = "SET_LOGIN_AGENT_ERROR";
export const SET_AGENT_OWNER_UPDATE = "SET_AGENT_OWNER_UPDATE";
export const SET_AGENT_OWNER_UPDATE_ERROR = "SET_AGENT_OWNER_UPDATE_ERROR";

//User Or Customer
export const CUSTOMER_LOGIN = "CUSTOMER_LOGIN";
export const CUSTOMER_LOGIN_ERROR = "CUSTOMER_LOGIN_ERROR";
