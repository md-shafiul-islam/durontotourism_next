const options = [
  {
    id: 951,
    iataCode: "BSA",
    icaoCode: "HCMF",
    name: "Bender Qassim International Airport",
    location: "Bosaso, Somalia",
    srtLocation: null,
    label: "BSA Bender Qassim International Airport Bosaso, Somalia",
    value: "BSA",
  },
];

import React, { useState } from "react";
import Select from "react-select";

const customOption = (props) => {
  console.log("CST Search Custom Options, ", props);

  return (
    <React.Fragment key={props.iataCode}>
      <li className="option-item-content">
        <span className="option-content">
          <span className="text">{props.name}</span>
          <span className="code">{props.iataCode}</span>
        </span>
        <span className="location">{props.location}</span>
      </li>
    </React.Fragment>
  );
};

const customComponentOption = (props) => {
  console.log("Custome Commponent Options, ", props);

  return {
    ...props,
    setValue: (value) => {
      console.log("Current Selected Value, ", value);
    },
  };
};

// const customStyle = {
//   container:
// }

const cstFilterOption = (option, inputData) => {
  console.log("Customfilter props, ", option);
  console.log("Customfilter inputData, ", inputData);
  console.log("Customfilter props, Option Data, ", option.data);

  let { iataCode, icaoCode, location, name, srtLocation } = option.data;

  const regEx = new RegExp(`${inputData}`, "i");
  const regExUp = new RegExp(`^${inputData}`);

  console.log("Curent Data UP IATA CODE , ", regExUp.test(iataCode));
  console.log("Curent Data name , ", regEx.test(name));
  console.log("Curent Data location , ", regEx.test(location));

  if (regExUp.test(iataCode)) {
    return true;
  }

  if (srtLocation !== undefined && srtLocation !== null) {
    if (srtLocation.length > 0) {
      if (regEx.test(srtLocation)) {
        return true;
      }
    }
  }

  if (regEx.test(name)) {
    return true;
  }

  if (regEx.test(location)) {
    return true;
  }
  return false;
};

const CstSearchField = (params) => {
  const [currentOpt, setCurrentOpt] = useState(null);
  return (
    <React.Fragment>
      <Select
        classNamePrefix={`cst-search-selcet`}
        id={`search-${params.fieldName}`}
        // styles={customStyle}
        formatOptionLabel={customOption}
        options={options}
        onChange={(item) => {
          console.log("Current change option, ", item);
          setCurrentOpt(item.iataCode);
        }}
        // filterOption={cstFilterOption}
      />
    </React.Fragment>
  );
};

export default CstSearchField;
