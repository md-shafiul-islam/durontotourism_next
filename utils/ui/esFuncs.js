export const initCountryOptions = (params) =>{
    
    if (params.countryOptions) {
      if (params.countryOptions.length === 0) {
        params.getCountryOptions();
      }
    } else {
      params.getCountryOptions();
    }
  }