export const iniPhoneCountryOptions = (params) => {
  if (params.countryPhoneOptions) {
    if (params.countryPhoneOptions.length === 0) {
      params.getCountryPhonCodeOptions();
    }
  } else {
    params.getCountryPhonCodeOptions();
  }
};

export const esHelperOnlyDate = (date) => {
  if (date) {
    date = new Date(date);

    return date.toDateString();
  }
  return "";
};

/**
 * 
 * @param {*} date 
 * @returns Date as String Thu, 25 Nov 2021 
 */
export const esUtilGetDate = (date=new Date())=>{
  let strDate =  date.toUTCString().substring(0, 17);
  console.log("Curent UTC DATE ", strDate);
  console.log("Curent UTC DATE ", date.toISOString());
  return strDate;
}