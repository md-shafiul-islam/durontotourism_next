import { combineReducers } from "redux";
import airBookingReducer from "./airBookingReducer";
import airPriceReducer from "./airPriceReducer";
import airQueryReducer from "./airQueryReducer";
import airSearchReducer from "./airSearchReducer";
import errorReducer from "./errorReducer";
import filterReducer from "./filterReducer";
import pricingDetailsReducer from "./pricingDetailsReducer";
import rechargeReducer from "./rechargeReducer";
import signUpReducer from "./signUpReducer";
import withDrawReducer from "./withDrawReducer";
import agentReducer from "./agentReducer"
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import customerReducer from "./customerReducer";
import esSearchReducer from "./esSearchReducer";
import veryfiReducer from "./verifyReducer";
import countryReducer from "./countryReducer";

export default combineReducers({
  airSearch: airSearchReducer,
  errors: errorReducer,
  searchQuery: airQueryReducer,
  airPrice: airPriceReducer,
  airPriceDetails:pricingDetailsReducer,
  airFilters:filterReducer,
  airBooking:airBookingReducer,
  recharge:rechargeReducer,
  withdraw:withDrawReducer,
  signup:signUpReducer,
  agent:agentReducer,
  login:loginReducer,
  user:userReducer,
  customer:customerReducer,
  airPort:esSearchReducer,
  verify:veryfiReducer,
  country:countryReducer,
});
