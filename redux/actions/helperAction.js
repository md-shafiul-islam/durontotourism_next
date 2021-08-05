const DAYES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
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

export const helperGetTotalFlyTimeBetweenTwoDate = (
  prevDateTime,
  cDateTime
) => {
  //1000 milsec to sec
  const preDate = new Date(prevDateTime);
  const curDate = new Date(cDateTime);

  let diffTime = Math.abs(curDate - preDate);

  let hrs,
    hMints = 0;
  let mints = Number(Math.floor(diffTime / 60000));
  let sec = ((diffTime % 60000) / 1000).toFixed(0);
  hrs = Number(Math.floor(mints / 60));

  if (hrs > 0) {
    hMints = hrs * 60;
  }

  hMints = Number(hMints);
  mints = Number(mints);

  if (hMints > 0) {
    mints = mints - hMints;
  }

  return `${hrs} hr ${mints} min`;
};

export const helperGetTimeFormatHr = (timeValue) => {
  if (timeValue != undefined) {
    let dateTime = new Date(timeValue);
    let hr = null;

    if (dateTime) {
      hr =
        dateTime.getHours() < 9
          ? `0${dateTime.getHours() + 1}`
          : `${dateTime.getHours() + 1}`;

      if (!isNaN(hr)) {
        return hr;
      }
    }
  }
  return "00";
};

export const helperGetTimeFormatMin = (timeValue) => {
  if (timeValue != undefined) {
    let dateTime = new Date(timeValue);
    let min = null;

    if (dateTime) {
      min =
        9 >= dateTime.getMinutes()
          ? `0${dateTime.getMinutes()}`
          : `${dateTime.getMinutes()}`;

      if (!isNaN(min)) {
        return min;
      }
    }

    return "00";
  }
};

/**
 *
 * @param {String} amount like BDT849814
 * @return Strring Like BDT: 849814
 */
export const helperGetPrice = (amount) => {

  console.log("helperGetPrice amount, ", amount);

  if (amount !== undefined && amount !== null && typeof amount === "string") {
    return `${amount.substring(0, 3)}: ${amount.substring(3)}`;
    
  } 
  return "0.0";
};

/**
 *
 * @param {String} amount
 * @return {Number} only amount Number Format
 */
export const helperGetPriceNumber = (amount) => {
  let price = "";

  if (amount === undefined) {
    return 0;
  } else {
    price = amount.substring(3);
  }

  return Number(price);
};

export const helperGetCurrency = (priceAmt) => {
  if (priceAmt !== undefined) {
    if (priceAmt != null) {
      return priceAmt.substring(0, 3);
    }
  }

  return "";
};

export const helperGetTravelTime = (timeValue) => {
  let hrMin,
    day = 0;

  if (timeValue > 0) {
    let min,
      hr = 0;

    timeValue = Number(timeValue);
    hr = timeValue / 60;

    hr = Math.floor(hr);

    hrMin = 60 * hr;

    timeValue = Number(timeValue);
    hr = Number(hr);

    min = Number(timeValue) - Number(hrMin);

    hr = hr < 10 ? `0${hr}` : hr;
    min = min < 10 ? `0${min}` : min;

    let timeFare = day > 0 ? `${day} D` : "";

    timeFare += `${hr} hr ${min} min`;

    return timeFare;
  }
};

export const helperGetFullDateFormat = (dateTime) => {
  let localDate = null;
  let day,
    month,
    year = "";

  if (dateTime === undefined) {
    localDate = new Date();
  } else {
    localDate = new Date(dateTime);
  }

  if (localDate === null && localDate === undefined) {
    localDate = new Date();
  }
  day = DAYES[localDate.getDay()].substring(0, 3);
  month = MONTHS[localDate.getMonth()].substring(0, 3);
  year = localDate.getFullYear().toString().substring(2);

  return `${day}, ${localDate.getDate()} ${month} ${year}`;
};

export const helperGetFullDateFormatFYear = (dateTime) => {
  let localDate = null;
  let day = "";
  let month = "";
  let year = "";

  if (dateTime === undefined) {
    localDate = new Date();
  } else {
    localDate = new Date(dateTime);
  }

  if (localDate !== undefined) {
    day = DAYES[localDate.getDay()];
    month = MONTHS[localDate.getMonth()];

    if (day !== undefined) {
      day = day.substring(0, 3);
    }

    if (month !== undefined) {
      month = month.substring(0, 3);
    }

    console.log("day, ", day, " month ", month);

    year = localDate.getFullYear().toString();
  }

  return `${day}, ${localDate.getDate()} ${month} ${year}`;
};

export const helperIsNumberString = (stVal) => {
  return /^\d+$/.test(stVal);
};

export const helperGetDateOnly = (dateAndTime) => {
  if (dateAndTime !== undefined) {
    let nDate = dateAndTime.split("T");
    return nDate[0];
  }
};

export const helperGetTimeOnly = (dateAndTime) => {
  if (dateAndTime !== undefined) {
    let nDate = dateAndTime.split("T");
    return nDate[1];
  }
};

export const helperGetPriceReqQuery = (searchItem, traveler, traceId) => {
  console.log("helperGetPriceReqQuery !!! Action, ", searchItem, " Traveler, ", traveler, "Trace ID, ", traceId);

  let passengers = [{ passCode: "ADT" }];

  if(traveler !== undefined && traveler !== null){

    if (traveler.passengers !== undefined && traveler.pushpassengers !== null) {
      passengers = traveler.passengers.map((item, idx) => {
        if(item.code === "CNN" || item.code === "CHD"){
          return {passCode: item.code, age:10}
        }
        return { passCode: item.code };
      });
    } 

  }

  if (
    searchItem !== undefined && searchItem !== null ) {
    let { option, platingCarrier } = searchItem;
    let segments = [];
    if (option !== undefined && option !== null) {
      let { bookingInfos } = option;

      bookingInfos &&
        bookingInfos.map((book, idx) => {
          let { segment, cabinClass, bookingCode, bookingCount } = book;

          segments.push(segment);
        });
    }

    let priceQuery = {
      traceId: traceId,
      platingCarrier: platingCarrier,
      pssengers: passengers,
      segments: segments,
    };

    console.log("helperGetPriceReqQuery !!! priceQuery, ", priceQuery);

    return priceQuery;
  }
};


export const isEmpty = (obj)=>{

  if(obj === null || obj === undefined || typeof obj === "undefined"){
    return true;
  }

  if(obj.length === 0){
    return true;
  } 

  if(obj.length > 0){
    return false;
  }
 
  if(Object.keys(obj).length === 0 && obj.constructor === Object){
    return true;
  }
  return false;
}