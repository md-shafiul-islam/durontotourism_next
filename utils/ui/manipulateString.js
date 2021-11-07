export const getHideMailString = (start = 0, text) => {
  if (text !== undefined && text !== null) {
    const size = text.length;
    let startPart = "",
      midPart = "",
      endPart = "",
      firstPart = "",
      lastPart = "",
      nSize = 0;
    const splitString = text.split("@");
    console.log("Split String, ", splitString);
    firstPart = splitString[0];
    lastPart = splitString[1];

    const fisrtPartSize = firstPart.length;

    if (start < fisrtPartSize) {
      startPart = firstPart.substring(0, start);
      midPart = firstPart.substring(start);
    } else {
      nSize = fisrtPartSize / 2;
      nSize = Math.round(nSize);
      console.log("Current Mail NSize, ", nSize);
      startPart = text.substring(0, nSize);
      midPart = firstPart.substring(nSize);
    }

    midPart = getSymboleByLenght(midPart.length, "*");

    return `${startPart}${midPart}@${lastPart}`;
  }
};

export const getSymboleByLenght = (size, rCahr) => {
  let str = "";
  for (let index = 0; index < size; index++) {
    str += rCahr;
  }
  return str;
};

export const getHideStringUsingEndPoint = (start = 0, end = 0, text) => {
  start = Number(start);
  end = Number(end);
  if (text !== undefined && text !== null) {
    let sString = "",
      mString = "",
      eString = "";
    let totalPoint = start + end;
    if (text.length > totalPoint) {
      sString = text.substring(0, start);
      mString = text.substring(start, text.length - end);
      eString = text.substring(text.length - end);
    } else {
      let eSize = text.length / 3;
      eSize = Math.floor(eSize);

      sString = text.substring(0, eSize);
      mString = text.substring(eSize, text.length - eSize);
      eString = text.substring(text.length - eSize);
    }

    mString = getSymboleByLenght(mString.length, "*");

    return `${sString}${mString}${eString}`;
  }
};
