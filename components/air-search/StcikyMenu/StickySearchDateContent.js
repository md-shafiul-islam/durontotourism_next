/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { esGetDateByAdding } from "../../../utils/helper/esDateFunc";

const StickySearchDateContent = (props) => {
  const refDate = useRef(null);
  const [display, setDisplay] = useState(true);
  const [changeFocus, setChangeFocus] = useState([0, 0]);
  const [returnStatus, setReturnStatus] = useState(false);
  const [retDisplay, setRetDisplay] = useState(true);
  const [depDate, setDepDate] = useState(new Date());

  const [dateState, setDateState] = useState([
    {
      startDate: depDate ? depDate : new Date(),
      endDate: esGetDateByAdding(depDate, 2),
      key: "selection",
    },
  ]);

  useEffect(() => {
    let initDepDate =
      props.preSetDepDate !== undefined
        ? esMakeStingToDate(props.preSetDepDate)
        : new Date();
    setDepDate(initDepDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refDate]);

  useEffect(() => {
    setDisplay(!display);
    setRetDisplay(!retDisplay);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rangeFocusChangeHandeler = (cStatus)=>{
    console.log("rangeFocusChangeHandeler Current Change Status, ", cStatus);
  }
  const changeHandeller = (item) => {
    console.log("Date picker change ", item);
    setDateState([item.selection]);

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
      // props.roundGetAction();
    }
  };

  const toggoleDateRange = (e, status) => {
    setChangeFocus([0,1]);
    setReturnStatus(true);
    setRetDisplay(!retDisplay);
  };

  const toggoleDateRangeDep = () => {
    setReturnStatus(false);
    setDisplay(!display);
    setChangeFocus([0,0]);
  };

  const getDateFormat = (type) => {
    //Tue, Dec, 21,2021

    if (dateState[0]) {
      if (type === 1) {
        if (dateState[0].startDate) {
          return dateState[0].startDate.toDateString();
        }
        return "";
      }

      if (type === 2) {
        return dateState[0].endDate ? dateState[0].endDate.toDateString() : "";
      }
    }
  };

  return (
    <React.Fragment>
      <div className="sticky-data-range-wrapper" ref={refDate}>
        <div className="sticky-date-card-area">
          <div
            className="sticky-date-item mitembg"
            onClick={(e) => {
              toggoleDateRangeDep(e, [0, 0]);
            }}
          >
            <span className="sticky-date-label">Departure</span>
            <span className="sticky-date-text">{getDateFormat(1)}</span>
          </div>
          <div
            className="sticky-date-item mitembg"
            onClick={(e) => toggoleDateRange(e, [0, 1])}
          >
            <span className="sticky-date-label">Return</span>
            <span className="sticky-date-text">{getDateFormat(2)}</span>
          </div>
        </div>
        <div className={`sticky-calender-area`}>
          <div
            className={`sticky-calender ${
              display || retDisplay ? " active " : ""
            }`}
          >
            <Card className="sticky-calender-card">
              <Card.Body>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    changeHandeller(item);
                  }}
                  moveRangeOnFirstSelection={false}
                  retainEndDateOnFirstSelection={false}
                  focusedRange={changeFocus}
                 
                  ranges={dateState}
                  initialFocusedRange={changeFocus}
                  onRangeFocusChange={(e) => setChangeFocus(e)}
                  startDatePlaceholder="Departure"
                  endDatePlaceholder="Return"
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StickySearchDateContent;
