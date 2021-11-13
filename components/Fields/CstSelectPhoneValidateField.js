/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select, { components, SingleValueProps } from "react-select";
import { Col, Row } from "react-bootstrap";

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
                  data.isoCode && data.isoCode.toLowerCase()
                }`}
              ></span>
            </span>
            <span className="code">&nbsp;{data.isoCode}</span>
            <span className="dial-code">&nbsp;{data.dialCode}</span>
          </span>
        </div>
      </React.Fragment>
    </components.SingleValue>
  );
};

const CstSelectPhoneValidateField = ({
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
    getDefaultValue();
  }, [options]);

  const cstFilterOption = (option, inputData) => {
    let { dialCode, isoCode, isoCode3, label } = option.data;

    const regEx = new RegExp(`${inputData}`, "i");

    if (regEx.test(isoCode)) {
      return true;
    }

    if (regEx.test(label)) {
      return true;
    }

    if (regEx.test(dialCode)) {
      return true;
    }

    if (regEx.test(isoCode3)) {
      return true;
    }
    return false;
  };

  const getCommponetSets = () => {
    // IndicatorSeparator: () => null,
    return {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
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
                  props.isoCode && props.isoCode.toLowerCase()
                } `}
              ></span>
            </span>
            <span className="dial-code">&nbsp;{props.name}</span>
            <span className="code">&nbsp;{props.isoCode}</span>
            <span className="dial-code">&nbsp;{props.dialCode}</span>
          </span>
        </div>
      </React.Fragment>
    );
  };

  const getDefaultValue = () => {
    let idx = 0;
    if (options) {
      options.find((item, i) => {
        console.log("Each Item, ", item);
        if (item.isoCode === "BD") {
          setSelectedItem(item);
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

export default CstSelectPhoneValidateField;
