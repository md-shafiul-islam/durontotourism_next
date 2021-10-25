import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { getAirPortOptionsAction } from "../../redux/actions/searchEsAction";

class CstAsyncSerachField extends Component {
  loadOptionsAction = async (searchKey) => {
    return await getAirPortOptionsAction(searchKey);
  };

  getCommponetSets = () => {
    // IndicatorSeparator: () => null,
    return {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
    };
  };

  customOption = (props) => {
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
  render() {
    return (
      <React.Fragment>
        <div className="cst-search-wrapper">
            <label htmlFor={`search-${this.props.fieldName}`} className="cst-label">{this.props.label}</label>
          <AsyncSelect
            placeholder={this.props.placeholder}
            classNamePrefix={`cst-search-selcet`}
            id={`search-${this.props.fieldName}`}
            formatOptionLabel={this.customOption}
            loadOptions={this.loadOptionsAction}
            //   onInputChange={this.handleInputChange}
            options={this.props.airPortOptions}
            onChange={(item) => {
              console.log("Current change option, ", item);
              this.props.onChangeHandler(item);
            }}
            components={this.getCommponetSets()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CstAsyncSerachField;
