import React, { Component } from "react";
import { components, SingleValueProps, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { getAirPortOptionsAction } from "../../../redux/actions/searchEsAction";

class StickySerchLocationSelect extends Component {
  changeHandeler = (item) => {
    this.props.onChangeHandler(item);
  };

  loadOptionsAction = async (searchKey) => {
    return await getAirPortOptionsAction(searchKey);
  };

  customOption = (props) => {
    return (
      <li className="option-item-content">
        <span className="option-content">
          <span className="text">{props.name}</span>
          <span className="code">{props.iataCode}</span>
        </span>
        <span className="location">{props.location}</span>
      </li>
    );
  };

  singleValue = (props) => {
    let { data } = props;
    return (
      <components.SingleValue {...props}>
        <li className="single-option-content">
          <span className="single-content">
            <span className="code">{data.iataCode}</span>
            <span className="text">{data.name}</span>
          </span>
          <span className="location">{data.location}</span>
        </li>
      </components.SingleValue>
    );
  };

  

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="sticy-search-wrapper">
            <label
              htmlFor={`search-${this.props.fieldName}`}
              className="sticy-label"
            >
              {this.props.label}
            </label>
            <AsyncSelect
              placeholder={this.props.placeholder}
              classNamePrefix={`sticy-search-selcet`}
              id={`search-${this.props.fieldName}`}
              formatOptionLabel={this.customOption} //
              loadOptions={this.loadOptionsAction}
              options={this.props.airPortOptions}
              onChange={(item) => {
                console.log("Current change option, ", item);
                this.changeHandeler(item);
              }}
              value={this.props.value}
              components={{
                DropdownIndicator: null,
                IndicatorSeparator: null,
                SingleValue: this.singleValue,
              }}
            />
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default StickySerchLocationSelect;
