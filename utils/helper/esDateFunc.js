import { format, parseISO } from "date-fns";

export const esIsDate = (pDate) => {
  if (Object.prototype.toString.call(pDate) === "[object Date]") {
    return true;
  }
  return false;
};

export const esMakeStingToDate = (strDate) => {
  console.log("esMakeStingToDate ", strDate);

  if (strDate !== undefined && strDate !== null) {
    if (esIsDate(strDate)) {
      return strDate;
    } else {
      if (typeof strDate === "string") {
        return parseISO(strDate);
      }
    }
  }

  return new Date();
};

export const esGetDateByAdding = (strDate, add = 0) => {
  console.log("Get Date By Adding ", strDate, " Adding value, ", add);

  if (strDate !== undefined && strDate !== null) {
    if (typeof strDate === "string" || esIsDate(strDate)) {
      return parseISO(strDate, add);
    }
  }

  return parseISO(new Date(), add);
};

export const esGetDateFormat = (date) => {

  if (date) {
    const fDate = format(new Date(date), "EEE, dd MMM yyyy");
    return fDate;
  }
  return "";
};
