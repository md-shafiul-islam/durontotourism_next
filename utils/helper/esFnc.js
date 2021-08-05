/**
 *
 * @param {String day Start 1} d
 * @param {String month Start 1} m
 * @param {year} y
 */
export const getAge = (d, m, y) => {
  let date = new Date();
  d = d || 1;
  m = m || 0;
  if (y) {
    m = Number(m);
    d = Number(d);
    y = Number(y);
    m = m > 0 ? Number(m) - 1 : 0;
    date = new Date(y, m, d);
  }

  const ageDifMs = new Date().getTime() - date.getTime();
  const ageDate = new Date(ageDifMs);

  console.log(
    "DIF Age, ",
    ageDate,
    " MOnth, ",
    ageDate.getMonth(),
    " Day, ",
    ageDate.getDate()
  );

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const getAgeDetails = (d, m, y) => {
  let bDate = new Date();

  m = m || 0;
  d = d || 1;
  if (y) {
    m = Number(m) - 1;

    m = m >= 0 ? m : 0;
    d = Number(d);
    bDate = new Date(Number(y), m, d);
  }

  let bDay = bDate.getDate();
  let bM = bDate.getMonth();
  let bY = bDate.getFullYear();

  const cDate = new Date();

  let cD = cDate.getDate();
  let cM = cDate.getMonth();
  let cY = cDate.getFullYear();

  let age = { year: 0, months: 0, days: 0 };
  let ageString = "";

  let yearAge = cY - bY;
  let mAge = 0;
  let dateAge = 0;
  if (cM >= bM) {
    mAge = cM - bM;
  } else {
    yearAge--;
    mAge = 12 + cM - bM;
  }

  if (cD >= bDay) {
    dateAge = cD - bDay;
  } else {
    mAge--;
    dateAge = 31 + cD - bDay;

    if (mAge < 0) {
      mAge = 11;
      yearAge--;
    }
  }

  age.year = yearAge;
  age.months = mAge;
  age.days = dateAge;

  console.log("Age: ", JSON.stringify(age, null, 2));
  return age;
};

export const helperPreSetTravelr = (passenger, phone, email, status) => {
  // {
  //   bookingTravelerName: {
  //     first: "",
  //     last: "",
  //   },
  //   phoneNumber: null,
  //   email: null,
  //   travelerType: "",
  //   gender:"",
  // }

  const traveler = {
    bookingTravelerName: {
      first: "",
      last: "",
    },
    travelerType: "",
    gender: "",
  };

  let gender = "";

  if (passenger) {
    if (passenger.gender === "Male") {
      gender = "M";
    }

    if (passenger.gender === "Female") gender = "F";

    traveler.travelerType = passenger.type;
    traveler.bookingTravelerName.first = passenger.firstName;
    traveler.bookingTravelerName.last = passenger.lastName;
    traveler.gender = gender;
    traveler.passAge = passenger.passAge;

    if (passenger.type) {
      if (passenger.type === "INF") {
          let age = traveler.passAge = getAgeDetails(
            passenger.day,
            passenger.month,
            passenger.year
          );
          traveler.passAge = age ? age.year : 0;

        //Date Formatt yyyy-MM-dd
        let month = passenger.month + 1;
        month = month < 10 ? `0${month}` : month;
        let dateString = `${passenger.year}-${month}-${passenger.day}`;
        traveler.dateOfB = `${passenger.year}-${month}-${passenger.day}T00:00:00.000`;
        traveler.dob = `${passenger.year}-${month}-${passenger.day}T00:00:00.000`;
      }
    }
  }

  if (status) {
    let phoneNums = [];
    let emails = [];

    if (email) {
      emails.push({ emailID: email });
    }

    if (phone) {
      phoneNums.push({
        countryCode: phone.countryCode,
        number: phone.number,
      });
    }

    traveler.phoneNumber = phoneNums;
    traveler.email = emails;
  }

  return traveler;
};

/**
 *
 * @param {Number} count
 * @param {Number} base
 * @param {Number} status
 */
export const getNmsOptions = (count, base, status) => {
  const options = [];
  if (status === 1) {
    const date = new Date();

    let curentYear = date.getFullYear();
    for (let i = base; i < count; i++) {
      options.push({ label: curentYear, value: curentYear });
      curentYear--;
    }

    return options;
  }

  if (status === 0) {
    count = count + base;

    for (let i = base; i < count; i++) {
      if (base === 0) {
        options.push({ label: i + 1, value: i });
      } else {
        options.push({ label: i, value: i });
      }
    }
    return options;
  }
};

export const preSetBookingOption = (bookOption) => {
  if (bookOption) {
    let { airPriceOpt, segment } = bookOption;
    console.log("solution, ", airPriceOpt);
    console.log("segments, ", segment);

    let conn = {
      fareNote: null,
      changeOfPlane: false,
      changeOfTerminal: false,
      changeOfAirport: false,
      stopOver: false,
      minConnectionTime: null,
      duration: null,
      segmentIndex: 0,
      flightDetailsIndex: null,
      includeStopOverToFareQuote: null,
    };

    let {
      airPricingInfo,
      approximateBasePrice,
      approximateFees,
      approximateTaxes,
      approximateTotalPrice,
      basePrice,
      completeItinerary,
      equivalentBasePrice,
      fareNote,
      fees,
      hostToken,
      key,
      taxes,
      totalPrice,
      optionalServices,
      quoteDate,
      itinerary,
      services,
    } = airPriceOpt;

    let segs =
    segment &&
    segment.map((seg, idx) => {
        let {
          key,
          status,
          passive,
          travelOrder,
          providerSegmentOrder,
          elStat,
          keyOverride,
          sponsoredFltInfo,
          codeshareInfo,
          airAvailInfo,
          flightDetails,
          connection,
          sellMessage,
          railCoachDetails,
          openSegment,
          group,
          carrier,
          cabinClass,
          flightNumber,
          classOfService,
          equipment,
          marriageGroup,
          numberOfStops,
          seamless,
          changeOfPlane,
          guaranteedPaymentCarrier,
          hostTokenRef,
          providerReservationInfoRef,
          passiveProviderReservationInfoRef,
          optionalServicesIndicator,
          availabilitySource,
          blackListed,
          operationalStatus,
          numberInParty,
          railCoachNumber,
          bookingDate,
          flownSegment,
          scheduleChange,
          brandIndicator,
          flightTime,
          travelTime,
          distance,
          origin,
          destination,
          departureTime,
          arrivalTime,
          participantLevel,
          linkAvailability,
          polledAvailabilityOption,
          availabilityDisplayType,
          providerCode,
          supplierCode,
          eticketability,
          apisrequirementsRef,
        } = seg;

        if (connection !== undefined || connection !== null) {
          if (idx === 0) {
            conn = connection;
          }
        }else{
          if(segment.length > 1 && idx < segment.length){
            conn.segmentIndex = idx;
          }
        }

        return {
          key,
          status,
          passive,
          travelOrder,
          providerSegmentOrder,
          elStat,
          keyOverride,
          sponsoredFltInfo,
          codeshareInfo,
          airAvailInfo,
          flightDetails,
          connection: conn,
          sellMessage,
          railCoachDetails,
          openSegment,
          group,
          carrier,
          cabinClass,
          flightNumber,
          classOfService,
          equipment,
          marriageGroup,
          numberOfStops,
          seamless,
          changeOfPlane,
          guaranteedPaymentCarrier,
          hostTokenRef,
          providerReservationInfoRef,
          passiveProviderReservationInfoRef,
          optionalServicesIndicator,
          availabilitySource,
          blackListed,
          operationalStatus,
          numberInParty,
          railCoachNumber,
          bookingDate,
          flownSegment,
          scheduleChange,
          brandIndicator,
          flightTime,
          travelTime,
          distance,
          origin,
          destination,
          departureTime,
          arrivalTime,
          participantLevel,
          linkAvailability,
          polledAvailabilityOption,
          availabilityDisplayType,
          providerCode,
          supplierCode,
          eticketability,
          apisrequirementsRef,
        };
    });

    console.log("Preperd Booking Solution air Price: , ", airPricingInfo);
    return {
      airSegment: segs,
      bookingInfo: airPricingInfo,
      fareNote: fareNote,
      hostToken: hostToken,
      optionalServices: optionalServices,
      key: key,
      completeItinerary: completeItinerary,
      quoteDate: quoteDate,
      itinerary: itinerary,
      totalPrice: totalPrice,
      basePrice: basePrice,
      approximateTotalPrice: approximateTotalPrice,
      approximateBasePrice: approximateBasePrice,
      equivalentBasePrice: equivalentBasePrice,
      taxes: taxes,
      fees: fees,
      services: services,
      approximateTaxes: approximateTaxes,
      approximateFees: approximateFees,
    };
  }
  return null;
};

/**
 * 
 * @param {String} dateStr 
 * @returns -1, Or 0-23
 */
export const esHelperGetTime = (dateStr)=>{

  // console.log("Current Time, ", dateStr);

  if(dateStr){
    let splitDateTime = dateStr.split("T");
    // console.log("Date Split Time, ", splitDateTime);
    let time = splitDateTime[0] ? splitDateTime[1].split(":") : "";
    time = Number(time[0]);
    // console.log("Current Hour, ", time);
    return time;
  }
  return -1;

}

export const esHelperGetFilterOption = (hour)=>{

  if(hour >= 0 &&  4 >= hour){
    return "before6AM";
  }else if(hour >= 5 && hour <= 11){
    return "6AM-12PM";
  }else if(hour > 11 && hour <= 17){
    return "12PM-6PM";
  }else if(hour > 17){
    return "After6PM"
  }

}

const getPriceAmount = (price)=>{
  if(price){
    let amount = price.substring(3);

    return Number(amount);
  }
}

const getFilterTravelTimeAndPrice = (travelTime, value, price)=>{
  console.log("Before Traveler Times, ", travelTime);
  if(travelTime){

    travelTime.value = value;
    travelTime.price = (getPriceAmount(travelTime.price) > 0 && getPriceAmount(travelTime.price) > price) ? price : travelTime.price;
    console.log("Traveler Times, ", travelTime);
    
  }else{
    travelTime = {value, price}
  }  
  console.log("Before Return Traveler Times, ", travelTime);
  return travelTime;
}


export const esHelperAdditemExcPosition = (arr, value, price)=>{

  console.log("esHelperAdditemExcPosition, ", value);
  if(Array.isArray(arr)){

    if("before6AM" === value){
      arr[0] = getFilterTravelTimeAndPrice(arr[0], value, price);
    }else if("6AM-12PM" === value){
      arr[1] = getFilterTravelTimeAndPrice(arr[1], value, price);
    }else if("12PM-6PM" === value){
      arr[2] = getFilterTravelTimeAndPrice(arr[2], value, price);
    }else if("After6PM" === value){
      arr[3] = getFilterTravelTimeAndPrice(arr[3], value, price);
    }
  } 

  return arr;
}

export const getPriceAndType = (priceStr, types)=>{
  if(priceStr){

    let amount = priceStr.substring(3);
    let currencyType = priceStr.substring(0, 3);

    console.log("Currency Type: ", currencyType, " Amount ", amount);

    if(Array.isArray(types)){

      if(!types.includes(currencyType)){
        types.push(currencyType);
      }

    }

    if(amount){
      return Number(amount);
    }
  }

  return 0;
}


export const esGetRoundTripBookingQuery = (bookSolutions)=>{

  // console.log("Book Action Booking Solution, ", bookSolutions);

  if(bookSolutions){

    let retSolutions = {airSegment:[], approximateBasePrice:null, approximateFees:null, approximateTaxes:null, 
      approximateTotalPrice:null, basePrice:null, bookingInfo:[], completeItinerary:true,
      equivalentBasePrice:null, fees:null, hostToken:[], key:null, quoteDate:null, taxes:null, totalPrice:null};

    let totalPricetype = [], approximateBasePriceType= [], approximateFeesType = [],
        approximateTotalPriceType = [], basePriceType = [], equivalentBasePriceType = [],
        fessType = [], taxesType = [], approximateTaxesType =[];

    let lcApproximateBasePrice = 0, lcApproximateFees = 0, lcApproximateTaxes = 0, 
        lcApproximateTotalPrice = 0, lcBasePrice = 0, lcEquivalentBasePrice = 0, 
        lcFees = 0, lcTaxes = 0, lcTotalPrice = 0,
        lcHostToken = [], lcQuoteDate = "", lcKey="", lcSegments=[], 
        lcBookInf=[];

    bookSolutions.forEach((solution, idx) => {
      let {
          airSegment, approximateBasePrice, approximateFees, approximateTaxes, 
          approximateTotalPrice, basePrice, bookingInfo, completeItinerary,
          equivalentBasePrice, fees, hostToken, key, quoteDate, taxes, totalPrice
        } = solution;

        console.log("approximateTaxes, ", approximateTaxes);

        lcApproximateBasePrice += getPriceAndType(approximateBasePrice, approximateBasePriceType);
        lcApproximateFees += getPriceAndType(approximateFees, approximateFeesType);
        lcApproximateTaxes += getPriceAndType(approximateTaxes, approximateTaxesType);
        lcApproximateTotalPrice += getPriceAndType(approximateTotalPrice, approximateTotalPriceType);
        lcBasePrice += getPriceAndType(basePrice, basePriceType);
        lcEquivalentBasePrice += getPriceAndType(equivalentBasePrice, equivalentBasePriceType);
        lcFees += getPriceAndType(fees, fessType);
        lcTaxes += getPriceAndType(taxes, taxesType);
        lcTotalPrice += getPriceAndType(totalPrice, totalPricetype);

        lcKey = key;
        lcQuoteDate = quoteDate;
        

        hostToken&&hostToken.forEach(item=>{
          lcHostToken.push(item);
        });

        airSegment&&airSegment.forEach((segment)=>{
          lcSegments.push(segment);
        });

        bookingInfo&&bookingInfo.forEach((bInf)=>{
          lcBookInf.push(bInf);
        })


    });

    retSolutions.airSegment = lcSegments;
    retSolutions.bookingInfo = lcBookInf;
    retSolutions.hostToken = lcHostToken;
    retSolutions.key = lcKey;
    retSolutions.quoteDate = lcQuoteDate;
    

    if(approximateBasePriceType.length === 1){
        retSolutions.approximateBasePrice = `${approximateBasePriceType[0]}${lcApproximateBasePrice}`;        
    }

    if(approximateFeesType.length === 1){
      retSolutions.approximateFees = `${approximateFeesType[0]}${lcApproximateFees}`;
    }

    if(approximateTaxesType.length === 1){
      retSolutions.approximateTaxes = `${approximateTaxesType[0]}${lcApproximateTaxes}`;
    }

    if(approximateTotalPriceType.length === 1){
      retSolutions.approximateTotalPrice = `${approximateTotalPriceType[0]}${lcApproximateTotalPrice}`;
    }

    if(basePriceType.length === 1){
      retSolutions.basePrice = `${basePriceType[0]}${lcBasePrice}`;
    }

    if(equivalentBasePriceType.length === 1){
      retSolutions.equivalentBasePrice = `${equivalentBasePriceType[0]}${lcEquivalentBasePrice}`;
    }

    if(fessType.length === 1){
      retSolutions.fees = `${fessType[0]}${lcFees}`;
    }
    
    if(taxesType.length === 1){
      retSolutions.taxes = `${taxesType[0]}${lcTaxes}`;
    }

    if(totalPricetype.length === 1){
      retSolutions.totalPrice = `${totalPricetype[0]}${lcTotalPrice}`;
    }

    if(fessType.length === 1){
      retSolutions.fees = `${fessType[0]}${lcFees}`;
    }
    
    console.log("Return Booking Solution, ", retSolutions);

    return retSolutions;
  }

  


}