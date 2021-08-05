import { combineReducers } from "redux";
import airPriceReducer from "./airPriceReducer";
import airQueryReducer from "./airQueryReducer";
import airSearchReducer from "./airSearchReducer";
import errorReducer from "./errorReducer";
import filterReducer from "./filterReducer";
import pricingDetailsReducer from "./pricingDetailsReducer";

export default combineReducers({
  airSearch: airSearchReducer,
  errors: errorReducer,
  searchQuery: airQueryReducer,
  airPrice: airPriceReducer,
  airPriceDetails:pricingDetailsReducer,
  airFilters:filterReducer,
});
