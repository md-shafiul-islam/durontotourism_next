import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DateRangeCalender = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="staetDateId" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="endDateId" // PropTypes.string.isRequired,
            onDatesChange={
              (({ startDate, endDate }) => setEndDate(endDate),
              setStartDate(startDate))
            } // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => setFocusedInput({ focusedInput })} // PropTypes.func.isRequired,
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DateRangeCalender;
