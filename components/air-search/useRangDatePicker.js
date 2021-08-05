import React, { useState, Component } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import { addDays } from "date-fns";

/**
 *
 * @param {getSelectionDate, currentFocuse} props
 * @callback getSelectionDate
 * @Array [0,0] currentFocuse
 */
const UseRangDatePicker = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const changeHandeller = (item) => {
    setState([item.selection]);

    props.getSelectionDate(item.selection);
    console.log("Date Item: ", item);
  };

  return (
    <React.Fragment>
      {/*<DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        
      />*/}
      <DateRange
        editableDateInputs={true}
        onChange={(item) => changeHandeller(item)}
        moveRangeOnFirstSelection={false}
        ranges={state}
        initialFocusedRange={props.currentFocuse}
      />
    </React.Fragment>
  );
};

export default UseRangDatePicker;
