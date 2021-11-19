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
};
