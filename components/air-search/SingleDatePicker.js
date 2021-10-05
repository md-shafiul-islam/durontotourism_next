import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-date-range";
import { Col, Card, Row } from "react-bootstrap";

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

const SingleDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [display, setDisplay] = useState(true);

  const refDate = useRef(undefined);

  useEffect(() => {
    props.getDate(props.preSetDate);
    setDate(props.preSetDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStringMonth = (month, lenght) => {
    let stMonth =
      months[month] && months[month].toString().substring(0, lenght);
    return `${stMonth}'`;
  };

  const getStringYear = (year, lenght) => {
    if (year !== undefined) {
      return year.toString().substring(0, lenght);
    }
  };

  const toggoleDate = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (refDate.current && !refDate.current.contains(event.target)) {
        if (display === true) {
          setDisplay(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refDate]);

  useEffect(() => {
    setDisplay(!display);
    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <React.Fragment>
        <Col md={12} ref={refDate}>
          <Row>
            <Col md={12} className="no-margin-padding">
              <div className="com-title" onClick={toggoleDate}>
                DEPARTURE &nbsp;{" "}
                <i
                  className="fas fa-angle-down icon-trans"
                  style={{
                    transform: `${display ? "rotateZ(-180deg)" : ""}`,
                  }}
                ></i>
              </div>
              <div className="date-card-body" onClick={toggoleDate}>
                <p>
                  {date && (
                    <React.Fragment>
                      <span className="search-bstyle">
                        {date !== undefined ? date.getDate() : "0"}
                      </span>
                      <span className="search-nstyle">
                        &nbsp;
                        {getStringMonth(date.getMonth(), 3)}
                        {getStringYear(date.getFullYear(), 2)}{" "}
                      </span>
                    </React.Fragment>
                  )}
                </p>
                <p>{date && `${days[date.getDay()]}`}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              md={12}
              style={{ display: display === true ? "block" : "none" }}
            >
              <Card className="singel-date">
                <Card.Body>
                  <Calendar
                    onChange={(item) => {
                      setDate(item);
                      props.getDate(item);
                      toggoleDate();
                    }}
                    date={date}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </React.Fragment>
    </React.Fragment>
  );
};

export default SingleDatePicker;
