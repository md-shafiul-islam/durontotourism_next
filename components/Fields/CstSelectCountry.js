/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select, { components, SingleValueProps } from "react-select";

const SingleValueItem = (props) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <React.Fragment key={data.value}>
        <div className="single-country-option-container">
          <span className="option-content">
            <span className="flag">
              <span
                className={`flag-icon flag-icon-${
                  data.value && data.value.toLowerCase()
                }`}
              ></span>
            </span>

            <span>&nbsp;{data.label}</span>
          </span>
        </div>
      </React.Fragment>
    </components.SingleValue>
  );
};

const CstSelectCountry = ({
  arrowStatus = true,
  name,
  label = undefined,
  placeholder,
  options,
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
    getDefaultValue(defaultStringVal);
  }, [options]);

  const getCommponetSets = () => {
    // IndicatorSeparator: () => null,
    if (isSmall) {
      return {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        SingleValue: SingleValueItem,
      };
    }
    return {
      SingleValue: SingleValueItem,
    };
  };

  const customOption = (props) => {
    return (
      <React.Fragment key={props.value}>
        <div className="country-option-container">
          <span className="option-content">
            <span className="flag">
              <span
                className={`flag-icon flag-icon-${
                  props.value && props.value.toLowerCase()
                } `}
              ></span>
            </span>

            <span className="code">&nbsp;{props.label}</span>
          </span>
        </div>
      </React.Fragment>
    );
  };

  const getDefaultValue = (code="BD") => {
    let idx = 0;
    if (options) {
      options.find((item, i) => {
        // console.log("Country Each Item, ", item);
        if (item.value === code) {
          setSelectedItem(item);
          onChange(item);
          return true;
        }
      });
    }
    return idx;
  };

  return (
    <React.Fragment>
      {label ? (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}

      <Select
        placeholder={placeholder}
        classNamePrefix={`phone-code-selcet`}
        id={`phone-code-${name}`}
        formatOptionLabel={customOption}
        options={options}
        onChange={(item) => {
          onChange(item);
          setSelectedItem(item);
        }}
        components={getCommponetSets()}
        value={selectedItem}
        // filterOption={cstFilterOption}
      />

      <div className="invalid-feedback">{errorMsg}</div>
    </React.Fragment>
  );
};

export default CstSelectCountry;
