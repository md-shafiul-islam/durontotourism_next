import { v4 } from "uuid";
import * as Yup from "yup";

export const getValidationCondStringRequirdFirelds = (
  fieldName,
  comValue,
  errorMsg
) => {
  return Yup.string(1).when(fieldName, {
    is: comValue,
    then: Yup.string().required(errorMsg),
  });
};

export const getAllFieldValidation = (passCount) => {
  return Yup.array(
    Yup.object({
      firstName: Yup.string()
        .min(4, "Minimum 4 character or letter")
        .required("Required"),
      lastName: Yup.string().min(1),
      gender: Yup.string(1).required("Please Select Gender"),
      nationality: getValidationCondStringRequirdFirelds(
        `isInternational`,
        true,
        `Please, Select one Nationality`
      ),
      dobDate: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("Please, Select one date"),
      }),
      dobMonth: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("Please, Select one Month"),
      }),
      dobYear: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("Please, Select one Year"),
      }),
      passportNo: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string(4).required("Please, Enter Passport Number"),
      }),
      passportIssuCountry: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("Please, Select passport issuing country"),
      }),
      pasExpDate: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("Please, Select one passport expiry day"),
      }),
      pasExpMonth: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("Please, Select one passport expiry month"),
      }),
      pasExpYear: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required(
          "Please, Select one date passport expiry year"
        ),
      }),
    })
  )
    .min(passCount, `Minimum ${passCount} Adult Traveler Information needed`)
    .max(
      passCount,
      `Can't Added more then ${passCount} Adult Traveler Information`
    );
};

const getTravelersFieldSets = (
  counts = -1,
  passType,
  isInternational = false
) => {
  const passengers = [];

  for (let i = 0; i < counts; i++) {
    passengers.push({
      firstName: "",
      lastName: "",
      gender: "",
      type: passType,
      key: v4(),
      isInternational: isInternational,
      nationality: "",
      dobDate: "",
      dobMonth: "",
      dobYear: "",
      passportNo: "",
      passportIssuCountry: "",
      pasExpDate: "",
      pasExpMonth: "",
      pasExpYear: "",
      passportAttach: "",
      visaAttach: "",
    });
  }

  return passengers;
};

export const initializeTravlerBookingForm = (passCount, isInternational) => {
  let { adtCount, cnnCount, infCount } = passCount;

  const adults = getTravelersFieldSets(adtCount, "ADT", true);
  const childs = getTravelersFieldSets(cnnCount, "CNN", true);
  const infants = getTravelersFieldSets(infCount, "INF", false);

  let countryCode = "",
    phoneNo = "",
    email = "",
    postCode = "";

  return {
    adults: adults,
    childs: childs,
    infants: infants,
    country_code: countryCode,
    phone_no: phoneNo,
    email: email,
    postCode: postCode,
  };
};
