/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Select from "react-select";

const CstSelectValidateField = ({
  arrowStatus = true,
  name,
  label = undefined,
  placeholder,
  options = [],
  onChange,
  blurHandler,
  clazzName,
  errorMsg,
  isSmall = false,
  defaultStringVal,
  defaultOption,
  value,
  ...props
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    setSelectedItem(defaultOption);
  }, []);

  const getCommponetSets = () => {
    if (!arrowStatus) {
      return {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      };
    }

    return null;
  };

  useEffect(() => {
    console.log("Current CST Valid Select value ", value);
    if (value !== "" && value !== null && value !== undefined) {
      let slItem = null;
      
      options&&options.forEach((item) => {
        console.log("Option Item, ", item);
        if(item.value === value){
          console.log("Option Item, Found ", item);
          slItem = item;
          return true;
        }       
      });
      setSelectedItem(slItem);
    } else {
      setSelectedItem(null);
    }
  }, [value]);

  return (
    <React.Fragment>
      {label ? (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}
      {console.log("IsSmall ", isSmall)}
      <Select
        aria-label={name}
        name={name}
        id={name}
        placeholder={placeholder}
        options={options}
        onBlur={(e) => {
          e.preventDefault();
          props.setFieldTouched(true);
        }}
        onChange={(item) => {
          onChange && onChange(item);
          setSelectedItem(item);
        }}
        className={`${
          isSmall ? "vselect-sm-item " : "vselect-item "
        }${clazzName}`}
        components={getCommponetSets()}
        defaultInputValue={defaultStringVal ? defaultStringVal : ""}
        defaultValue={defaultOption ? defaultOption : null}
        value={selectedItem}
      />

      <div className="invalid-feedback">{errorMsg}</div>
    </React.Fragment>
  );
};

export default CstSelectValidateField;
