import Axios from "axios";
import { EXT_PRICE_URL, REQUEST_HEADER } from "../../redux/types";

//2021-02-26T23:30:00.000+06:00
/**
 *
 * @param {Date} date
 * @returns @actionDate like: 2021-02-26T23:30:00.000+06:00
 */
export const helperGetActionDateTime = (date = new Date()) => {
  let dateStr = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  dateStr = dateStr < 10 ? `0${dateStr}` : dateStr;
  month = month < 10 ? `0${month}` : month;

  // console.log("Current Action Date, ", `${year}-${month}-${dateStr}T23:30:00.000+06:00`);
  return `${year}-${month}-${dateStr}T23:30:00.000+06:00`;
};
/**
 *
 * @param {amountString like BDT89247897} amountSting
 * @returns {{Number} amount 89247897}
 */
export const helperGetAmount = (amountSting) => {
  if (amountSting) {
    return Number(amountSting.substring(3));
  }
  return 0;
};

export const helperGetMltyplyTwoNumber = (val, val2) => {
  if (val && val2) {
    val = Number(val);
    val2 = Number(val2);

    return val * val2;
  }
  return 0;
};
/**
 * @params {JS Date date}
 * @return { date String like yyyy-mm-dd 2021-07-15 }
 */
export const helperGetDateFormate = (date) => {
  if (date !== undefined && date !== null) {
    let month = date.getMonth() + 1;
    let dayOfMont = date.getDate();
    month = month < 10 ? `0${month}` : month;
    dayOfMont = dayOfMont < 10 ? `0${dayOfMont}` : dayOfMont;
    let dateString = `${date.getFullYear()}-${month}-${dayOfMont}`;

    console.log("helperGetDateFormate ", dateString);

    return dateString;
  }
};

export const helperGoBookingOption = (priceBooking) => {
  this.props.setPriceDetails(priceBooking);

  this.setState({ bookingAction: true });
};

export const helperGetTooglePriceView = () => {
  let { priceDisplay } = this.state;
  this.setState({ priceDisplay: !priceDisplay });
};

export const helperGetPriceDetailsRequest = async (priceQuery) => {
  let url = `${EXT_PRICE_URL}/api/v_1_0/buildfromproducts`;

  if (!this.state.dataLoadStatus) {
    await Axios.post(url, priceQuery, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        this.setState({ priceInfo: res.data });
        this.setState({ priceStatus: true });
        this.setState({ dataLoadStatus: true });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } else {
    console.log(
      "Data Price Is Loaded: ",
      this.state.priceInfo,
      " Status: ",
      this.state.dataLoadStatus
    );
  }

  //this.setState({priceInf:dataRes.data, priceStatus:true});
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

export const helperGetToggleDisplay = () => {
  let { display } = this.state;
  this.setState({ display: !display });
};

export const helperGetPriceDetails = (flyOption) => {
  console.log("Option Price Details: ", flyOption);
  console.log("Book Item Card this.props: ", this.props);

  let { priceDetails } = this.state;
  let bookOptions = [];

  if (priceDetails === null && flyOption !== undefined) {
    console.log("Data Price Details: IF ", priceDetails);

    flyOption.bookInfos &&
      flyOption.bookInfos.map((itemBook, bIdx) => {
        let { segment, cabinClass, bookingCode, fareInfos } = itemBook;

        if (itemBook.segment !== undefined) {
          let priceInf = {
            "@type": "SpecificFlightCriteria",
            carrier: segment.carrier,
            flightNumber: segment.flightNumber,
            departureDate: this.getDateOnly(segment.departureTime),
            departureTime: this.getTimeOnly(segment.departureTime),
            arrivalDate: this.getDateOnly(segment.arrivalTime),
            arrivalTime: this.getTimeOnly(segment.arrivalTime),
            from: segment.origin,
            to: segment.destination,
            cabin: cabinClass,
            classOfService: bookingCode,
            segmentSequence: bIdx,
          };

          bookOptions.push(priceInf);
        }
      });

    console.log("Booking Item Card Props: ", this.props);
    let pasengerProps =
      this.props &&
      this.props.searchQuery &&
      this.props.searchQuery.sQuery &&
      this.props.searchQuery.sQuery.searchQuery &&
      this.props.searchQuery.sQuery.searchQuery.traveler;
    let passengers = new Array();

    if (pasengerProps !== undefined) {
      if (pasengerProps.ADT.value > 0) {
        passengers.push({ value: "ADT", number: 1 });
      }

      if (pasengerProps.CNN.value > 0) {
        passengers.push({ value: "CNN", number: 1 });
      }

      if (pasengerProps.INF.value > 0) {
        passengers.push({ value: "INF", number: 1 });
      }
    } else {
      passengers.push({ value: "ADT", number: 1 });
    }

    let priceQuery = {
      OfferQueryBuildFromProducts: {
        BuildFromProductsRequest: {
          "@type": "BuildFromProductsRequestAir",
          PassengerCriteria: passengers,
          ProductCriteriaAir: [
            {
              "@type": "ProductCriteriaAir",
              SpecificFlightCriteria: bookOptions,
            },
          ],
        },
      },
    };

    console.log("Befor Send Price Request: ", priceQuery);
    this.getPriceDetailsRequest(priceQuery);
  } else {
    console.log("Data Price Details: Else", priceDetails);
  }
};

export const helperGetTotalFlyTime = (prevDateTime, cDateTime) => {
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

export const helperGetPrice = (amount) => {
  let price = "";

  if (amount === undefined) {
    return "";
  } else {
    price = `${amount.substring(0, 3)}: ${amount.substring(3)}`;
  }

  return price;
};

/**
 *
 * @param {DateTime Like P1DT1H30M0S} travelTime
 * @returns {date Pluse 1 Day 1 Hour 30 Min}
 */
export const helperGetTotalFlyTimeReadable = (travelTime) => {
  if (travelTime !== undefined) {
    // console.log("DateTime: ", travelTime);
    let p = travelTime.split("P");
    p = p[1].split("D");
    p = p[0];
    // console.log("P Day: ", p);

    let hr = travelTime.split("T");
    hr = hr[1].split("H");
    hr = hr[0];
    // console.log("Hr: ", hr);

    let min = travelTime.split("H");
    min = min[1].split("M");
    // console.log("Min: ", min[0]);

    return `${p} Day ${hr} Hour ${min[0]} Min`;
  }
};

export const helperIsEmpty = (obj) => {
  if (obj === null || obj === undefined || typeof obj === "undefined" || obj === "") {
    return true;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }

  return false;
};

export const esIsFieldError = (errors, touched, fieldName) => {
  let msg = undefined;

  if (!helperIsEmpty(errors)) {
    if (!helperIsEmpty(errors[fieldName])) {
      console.log(
        "esIsFieldError Field Name, ",
        fieldName,
        " Error, ",
        errors[fieldName]
      );
      msg = errors[fieldName];
    }
  }

  console.log(fieldName, " Field Have Error, ", msg);
  if (!helperIsEmpty(touched)) {
    if (touched[fieldName] !== undefined) {
      if (touched[fieldName]) {
        if (msg) {
          console.log("Set it to error obj in touch");
          return { cls: "is-invalid", msg: msg, status: true };
        } else {
          return { cls: "is-valid", msg: "", status: false };
        }
      }
    }
  }

  return { cls: "", msg: msg, status: false };
};

export const esIsPhoneFieldError = (errors, touched, codeName, phoneName) => {
  let errorObj = { cls: "", status: false, msg: "" };
  if (!helperIsEmpty(touched)) {
    if (touched[codeName] || touched[phoneName]) {
      errorObj = { cls: "is-valid", status: false, msg: "" };

      if (errors[phoneName] !== undefined) {
        if (errors[phoneName] !== "") {
          errorObj = {
            cls: "is-invalid",
            status: true,
            msg: errors[phoneName],
          };
        }
      }

      if (errorObj.msg === "") {
        if (errors[codeName] !== undefined) {
          if (errors[codeName] !== "") {
            errorObj = {
              cls: "is-invalid",
              status: true,
              msg: errors[codeName],
            };
          }
        }
      }
    }
  }

  return errorObj;
};

export const esIsFunction = (checkFunc) => {
  if (checkFunc) {
    return checkFunc && {}.toString.call(checkFunc) === "[object Function]";
  }

  return false;
};

export const isEmptyString = (v) => {
  if (v !== undefined && v !== null) {
    if (v.length) {
      return false;
    }
  }

  return true;
};

export const esIsFile = (file, bytSize) => {
  if (file) {
    if (file.isFile) console.log("Selected File Check ", file);
    return true;
  }

  return false;
};
