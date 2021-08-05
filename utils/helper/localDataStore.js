import { helperIsEmpty } from "./helperAction";

class LocalDataStore {
  constructor() {
    if (typeof window !== "undefined") {
      this.localStore = window.localStorage;
    }
    this.rndPriceFlights = {};
    this.preSetPriceOptions = {};
    this.roundTripFareSummery = {};
    this.searchQuery = {};
  }

  isActiveLocalStore = ()=>{
    if(!helperIsEmpty(this.localStore)){
      return true;
    }
    return false;
  }

  activeLocalStore = (windObj)=>{
    console.log("Create Local store ... ")
    if(typeof windObj !== "undefined"){
      this.localStore = windObj.localStorage;
      console.log("Create Local store Success ")
    }else{
      if(typeof window !== "undefined"){
        this.localStore = window.localStorage;
      }
    }

  }

  setPriceRoundTripFlightsBook = (rndPriceFlights) => {
    if (!helperIsEmpty(rndPriceFlights) && !helperIsEmpty(this.localStore)) {
      this.localStore.setItem(
        "rndBookPriceOptions",
        JSON.stringify(rndPriceFlights)
      );
    }
  };

  getPriceRoundTripFlightsBook = () => {
    if (this.hasRndPriceOptions()) {
      return this.rndPriceFlights;
    }

    return null;
  };

  hasRndPriceOptions = () => {
    if (!helperIsEmpty(this.localStore)) {
      let rndPriceFlightsStr = this.localStore.getItem("rndBookPriceOptions");

      if (rndPriceFlightsStr) {
        this.rndPriceFlights = JSON.parse(rndPriceFlightsStr);
        return true;
      }
    }
    return false;
  };

  setPreSetRndPriceDetails = (preSetPriceOptions) => {
    if (!helperIsEmpty(this.localStore)) {
      if (!helperIsEmpty(preSetPriceOptions)) {
        this.localStore.setItem(
          "preSetRndPriceOptions",
          JSON.stringify(preSetPriceOptions)
        );
      }
    }
  };

  getPreSetRndPriceDetails = () => {
    if (this.hasPreSetRndOptions()) {
      return this.preSetPriceOptions;
    }
    return null;
  };

  hasPreSetRndOptions = () => {
    if (!helperIsEmpty(this.localStore)) {
      let preSetOptionsStr = this.localStore.getItem("preSetRndPriceOptions");

      if (preSetOptionsStr) {
        this.preSetPriceOptions = JSON.parse(preSetOptionsStr);
        return true;
      }
    }
    return false;
  };

  /* Flight Seach Result Start Round Trip*/
  setDeptartureFlight = (depFlights) => {
    this.createStore();
    console.log("LS Set Dep Data ...", depFlights, "local Storage ", this.localStore);
    
    if (this.localStore) {
      console.log("Storage not Empty !! ... ")
      if (depFlights) {
        this.departureFlights = depFlights;
        console.log("Befor Set Storage ... ")
        this.localStore.setItem("departureFlights", JSON.stringify(depFlights));
        console.log("After Set Dep Fligth Data to Local Store ", depFlights);
      }
    }
  };

  setReturnFlight = (returnFlights) => {
    this.createStore();
    console.log("LS Set Ret Data ...", returnFlights);
    
    if (!helperIsEmpty(this.localStore)) {

      if (returnFlights) {
        this.returnFlights = returnFlights;
        this.localStore.setItem("returnFlights", JSON.stringify(returnFlights));
        console.log("After Set Ret Fligth Data to Local Store ", depFlights);

      }
    }
  };

  getDepartureFlights = () => {
    if (this.hasDataInLocalStore("departureFlights")) {
      return this.departureFlights;
    }
  };

  getReturnFlights = () => {
    if (this.hasDataInLocalStore("returnFlights")) {
      return this.returnFlights;
    }
  };

  /**
   *
   * @param {String} keyName
   * @returns
   */
  hasDataInLocalStore = (keyName) => {
    if (!helperIsEmpty(this.localStore)) {
      let dataStr = this.localStore.getItem(keyName);
      if (dataStr) {
        this[keyName] = JSON.parse(dataStr);
        return true;
      }
    }
    return false;
  };

  /* Flight Seach Result Round Trip End*/

  /* Booking Page Repository Function Start */

  /**
   *
   * @param {*} summery
   */
  setRoundTripFarePriceSummery = (summery) => {
    if (!helperIsEmpty(this.localStore)) {
      if (!helperIsEmpty(summery)) {
        this.localStore.setItem("rndFareSummery", JSON.stringify(summery));
      }
    }
  };

  hasRoundTripFareSummery = () => {
    if (!helperIsEmpty(this.localStore)) {
      let fareSummStr = this.localStore.getItem("rndFareSummery");
      if (fareSummStr) {
        this.roundTripFareSummery = JSON.parse(fareSummStr);
        return true;
      }
    }
    return false;
  };

  /**
   *
   * @returns {*} roundTripFareSummery
   */
  getRoundTripFareSummery = () => {
    if (this.hasRoundTripFareSummery()) {
      return this.roundTripFareSummery;
    }
  };

  /* Booking Page Repository Function Start */

  /** Search Query Start */
  setSearchQuery = (searchQry) => {
    if (!helperIsEmpty(this.localStore)) {
      if (!helperIsEmpty(searchQry)) {
        this.localStore.setItem("searchQuery", JSON.stringify(searchQry));
      }
    }
  };

  getSearchQuery = () => {
    if (this.hasSearchQuery()) {
      return this.searchQuery;
    }
  };

  hasSearchQuery = () => {
    if (!helperIsEmpty(this.localStore)) {
      let searchStr = this.localStore.getItem("searchQuery");

      if (searchStr) {
        this.searchQuery = JSON.parse(searchStr);
        return true;
      }
    }
    return false;
  };

  /** Search Query Start */

  /** Set Round Trip Tracid Start */

  setRountTripTraceId = (traceID) => {
    if (!helperIsEmpty(this.localStore)) {
      if (traceID) {
        this.localStore.setItem("rndTraceId", JSON.stringify(traceID));
      }
    }
  };

  getroundTripTraceID = () => {
    if (!helperIsEmpty(this.localStore)) {
      let traceIdStr = this.localStore.getItem("rndTraceId");

      if (traceIdStr) {
        return JSON.parse(traceIdStr);
      }
    }
    return null;
  };

  /** Set Round Trip Tracid End */

  createStore = ()=>{
    console.log("Create Local Storage ...")
    if(helperIsEmpty(this.localStore)){

      if(!helperIsEmpty(window)){
        this.localStore = window.localStorage;
      }
    }
  }
}

export const localDataStore = new LocalDataStore();
