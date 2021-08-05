import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DatePickerRange = (props) => {
  const refDate = useRef(null);
  const [display, setDisplay] = useState(true);
  const [focusStatus, setFocusStatus] = useState([0, 0]);
  const [changeFocus, setChangeFocus] = useState([0, 0]);
  const [returnStatus, setReturnStatus] = useState(false);
  const [retDisplay, setRetDisplay] = useState(true);
  const [depDate, setDepDate] = useState(new Date());

  useEffect(() => {
    let dDate =
      props.preSetDepDate !== undefined ? props.preSetDepDate : new Date();
    setDepDate(dDate);
  }, []);

  useEffect(() => {
    let dDate =
      props.preSetDepDate !== undefined ? props.preSetDepDate : new Date();
    setDepDate(dDate);
  }, [props.preSetDepDate]);

  const [state, setState] = useState([
    {
      startDate:
        props.preSetDepDate !== undefined ? props.preSetDepDate : depDate,
      endDate: addDays(
        props.preSetDepDate !== undefined ? props.preSetDepDate : depDate,
        5
      ),
      key: "selection",
    },
  ]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event) {
      if (refDate.current && !refDate.current.contains(event.target)) {
        if (display === true) {
          setDisplay(false);
        }

        if (retDisplay) {
          setRetDisplay(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDate]);

  useEffect(() => {
    setDisplay(!display);
    setRetDisplay(!retDisplay);
    return;
  }, []);

  const changeHandeller = (item) => {
    setState([item.selection]);

    let selected = item.selection;

    let stDate =
      selected !== undefined
        ? selected.startDate !== undefined
          ? selected.startDate
          : ""
        : "";
    let enDate =
      selected !== undefined
        ? selected.endDate !== undefined
          ? selected.endDate
          : ""
        : "";

    props.getStartDate(stDate);
    props.getEndDate(enDate);

    if (changeFocus[1] === 1) {
      setDisplay(false);
    }

    if (item.selection.endDate && returnStatus) {
      setRetDisplay(false);
    }

    if (props.oneWayTrip && returnStatus) {
      props.roundGetAction();
    }
  };

  const toggoleDateRange = (e, status) => {
    setFocusStatus(status);
    setReturnStatus(true);
    setRetDisplay(!retDisplay);

    if (status[1] === 1) {
      state[0].endDate = null;
    }
  };

  const toggoleDateRangeDep = (e, status) => {
    if (status[0] === 0) {
      state[0].endDate = null;
    }

    setReturnStatus(false);
    setDisplay(!display);
    setFocusStatus(status);
  };

  const getStringMonth = (month, lenght) => {
    if (month !== undefined && month !== "" && month !== null) {
      let stMonth =
        months[month] && months[month].toString().substring(0, lenght);

      if (
        stMonth !== undefined &&
        stMonth !== null &&
        stMonth !== "" &&
        stMonth !== "NaN" &&
        stMonth !== "Na"
      ) {
        return stMonth;
      }
    }

    return "";
  };

  const getStringYear = (year, lenght) => {
    if (year === undefined || year === "" || year === null) {
      return "";
    }
    let stYear = year.toString().substring(0, lenght);

    if (
      stYear !== undefined &&
      stYear !== null &&
      stYear !== "" &&
      stYear !== "NaN" &&
      stYear !== "Na"
    ) {
      return stYear;
    }
    return "";
  };

  const getDayByDate = (vDate) => {
    if (vDate !== undefined && vDate !== null && "" !== vDate) {
      let stringDay = days[state[0].endDate.getDay()];

      if (
        stringDay !== null &&
        stringDay !== "" &&
        stringDay !== undefined &&
        stringDay !== "NaN" &&
        stringDay !== "Na"
      ) {
        return stringDay;
      }
    }

    return "";
  };

  const getDateByState = (dateVal) => {
    if (dateVal !== undefined && dateVal !== null && dateVal !== "") {
      let strDate = dateVal.getDate();

      if (
        strDate === null ||
        strDate === "" ||
        strDate !== undefined ||
        strDate !== "NaN" ||
        strDate !== "Na"
      ) {
        return "";
      } else {
        return strDate;
      }
    }

    return " ";
  };

  return (
    <React.Fragment>
      <Row ref={refDate}>
        <Col md={12}>
          <Row className="mp-0">
            <Col md={6} className="no-margin-padding each-content dtp-ara">
              <div
                className="com-title"
                onClick={(e) => toggoleDateRangeDep(e, [0, 0])}
              >
                DEPARTURE &nbsp;{" "}
                <i
                  className="fas fa-angle-down icon-trans"
                  style={{
                    transform: `${display ? "rotateZ(-180deg)" : ""}`,
                  }}
                ></i>
              </div>
              <div
                className="date-card-body"
                onClick={(e) => toggoleDateRangeDep(e, [0, 0])}
              >
                <p>
                  {state && state[0].startDate && (
                    <React.Fragment>
                      <span className="search-bstyle">
                        {state[0].startDate.getDate()}
                      </span>
                      <span className="search-nstyle">
                        &nbsp;
                        {getStringMonth(state[0].startDate.getMonth(), 3)}
                        {getStringYear(
                          state[0].startDate.getFullYear(),
                          2
                        )}{" "}
                      </span>
                    </React.Fragment>
                  )}
                </p>
                <p>
                  {state &&
                    state[0].startDate &&
                    `${days[state[0].startDate.getDay()]}`}
                </p>
              </div>
            </Col>
            <Col md={6} className="no-margin-padding">
              <div
                className="com-title"
                onClick={(e) => toggoleDateRange(e, [0, 1])}
              >
                RETURN &nbsp;{" "}
                <i
                  className="fas fa-angle-down icon-trans"
                  style={{
                    transform: `${retDisplay ? "rotateZ(-180deg)" : ""}`,
                  }}
                ></i>
              </div>
              <div
                className="date-card-body"
                onClick={(e) => toggoleDateRange(e, [0, 1])}
              >
                {props.oneWayTrip === true ? (
                  <p className="text-disable">
                    Tap to add a return date for bigger discounts
                  </p>
                ) : (
                  <React.Fragment>
                    <p>
                      {state &&
                        (state[0] !== undefined ? (
                          state[0].endDate !== undefined ? (
                            <React.Fragment>
                              <span className="search-bstyle">
                                {getDateByState(state[0].endDate)}
                              </span>
                              <span className="search-nstyle">
                                &nbsp;
                                {getStringMonth(
                                  state[0].endDate &&
                                    state[0].endDate.getMonth(),
                                  3
                                )}
                                {getStringYear(
                                  state[0].endDate &&
                                    state[0].endDate.getFullYear(),
                                  2
                                )}
                              </span>
                            </React.Fragment>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        ))}
                    </p>
                    <p>
                      {state && state[0] === undefined
                        ? getDayByDate(state[0].endDate)
                        : null}
                    </p>
                  </React.Fragment>
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          {display || retDisplay ? (
            <Card className="date-picker-card">
              <Card.Body>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => changeHandeller(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  initialFocusedRange={focusStatus}
                  onRangeFocusChange={(e) => setChangeFocus(e)}
                  startDatePlaceholder="Departure"
                  endDatePlaceholder="Return"
                />
              </Card.Body>
            </Card>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DatePickerRange;
