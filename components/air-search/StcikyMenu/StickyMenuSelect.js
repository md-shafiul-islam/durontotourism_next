import React, { useState } from "react";
import Select, {components, SingleValue} from "react-select";

const StickyMenuSelect = (params) => {
  const customOptionLabel = (props) => {
    return (
      <React.Fragment key={props.value}>
        <li className="option-item-content">{props.label}</li>
      </React.Fragment>
    );
  };

  const singleValue = (props)=>{

    console.log("Search type Menu ", props);
    return(
      <components.SingleValue {...props}>
        <span className="travel-type">{props.data.label}</span>
      </components.SingleValue>
    )
  }

  const getCommponetSets = ()=>{
    return{
      IndicatorSeparator: () => null,
      SingleValue: singleValue
    }
  }

  const options = [
    { label: "One Way", value: "one" },
    { label: "Round Trip", value: "roundTrip" },
    { label: "Multi City", value: "multiCity" },
  ];

  const [currentOpt, setCurrentOpt] = useState(null);
  return (
    <React.Fragment>
      <div className="search-type-container mitembg">
        <label className="form-label">Trip Type</label>
        <Select
          classNamePrefix={`cst-search-type`}
          id={`search-${params.fieldName}`}
          defaultValue={options[0]}
          formatOptionLabel={customOptionLabel}
          isSearchable={false}
          options={options}
          onChange={(item) => {
            setCurrentOpt(item.iataCode);
          }}
          components={getCommponetSets()}
        />
      </div>
    </React.Fragment>
  );
};

export default StickyMenuSelect;
