import { helperIsEmpty } from "../helper/helperAction";

export const getCountItemByValue = (arr, val) => {
  let count = 0;
  if (!helperIsEmpty(arr) && val !== undefined) {
    if (Array.isArray(arr)) {
      arr.forEach((item, idx) => {
        if (val === item.code) {
          count++;
        }
      });
    }
  }

  return count;
};

export const getPassengerCount = (passengers) => {
    
  if (!helperIsEmpty(passengers)) {
    let adt = 0,
      cnn = 0,
      inf = 0;

    passengers.forEach((item, idx) => {
      item.code === "ADT" ? adt++ : "";
      item.code === "CNN" ? cnn++ : "";
      item.code === "INF" ? inf++ : "";
    });

    return { adt, cnn, inf };
  }
  return { adt: 0, cnn: 0, inf: 0 };
};

export const getEsCabinClass = (cClass) => {
  if (cClass === "Economy") {
    return "Economy";
  } else if (cClass === "PremiumEconomy") {
    return "Premium Economy";
  } else if (cClass === "Business") {
    return "Business";
  }
};
