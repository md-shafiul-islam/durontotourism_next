import React, { useEffect, useState, useRef} from "react";
import { Calendar } from "react-date-range";
import { Card, Col, Row } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const CstSingleDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [fieldStrValue, setFieldStrValue] = useState("");
  const refDate = useRef(undefined);


  useEffect(() => {
    props.getSelectedDate&&props.getSelectedDate(selectedDate);
  }, [selectedDate])

  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Curent click event, ",isActive, " ", event);
      console.log("Curent click event, ", event.target);
      if (refDate.current && !refDate.current.contains(event.target)) {
        console.log("Reflect Content Display None", isActive);
        setIsActive(false);
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
    if (props.defaultDate !== undefined && props.defaultDate !== null) {
      setSelectedDate(props.defaultDate);
    }
  }, [props.defaultDate]);

  const getDateSringAndSetToField = (value) => {
    if (value !== undefined && value !== null) {
      let d = 0,
        m = 0,
        y = 0;
      d = value.getDate() ? value.getDate() : 0;
      m = value.getMonth() ? value.getMonth() : 0;
      y = value.getFullYear() ? value.getFullYear() : 0;
      m = m > 0 ? m + 1 : 0;

      d = d < 10 ? `0${d}` : d;
      m = m < 10 ? `0${m}` : m;

      setFieldStrValue(`${d}/${m}/${y}`);
    }
  };
  const dateChaneAction = (value) => {
    setSelectedDate(value);
    setIsActive(false);
    getDateSringAndSetToField(value);
  };

  const keyPressAction = (e) => {
    if (e.target) {
      let value = e.target.value;
      let valueStr = value;
      let vLength = value.length;

      if (e.code === "Backspace" || e.keyCode === 8 || e.key === "Backspace") {
        if (vLength === 3 || vLength === 6) {
          valueStr = valueStr.substring(0, valueStr.length - 1);
        }
        setFieldStrValue(valueStr);
        return;
      }
    }
  };

  const getDayByMonth = (d, m, y) => {
    let date = new Date();
    let cDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let ld = Number(d);
    y = y ? y : date.getFullYear();
    m = Number(m);
    if (!isNaN(ld) && !isNaN(m)) {
      const lsd = monthLastDay(m, y);
      cDate = lsd < ld ? lsd : ld < 10 ? `0${ld}` : ld;
      if (m === 2) {
        cDate = ld > 29 ? 29 : ld < 10 ? `0${ld}` : ld;
      }
    }
    return cDate;
  };

  const getMonth = (m) => {
    const date = new Date();
    let cM = date.getMonth();
    cM = cM < 10 ? `0${cM}` : cM;
    let lm = Number(m);
    console.timeLog("Current Month param ", m, " lM ", lm);

    if (!isNaN(lm)) {

      if(lm <= 12){
        return lm < 10 ? `0${lm}` : lm;
      }
      return cM;      
    }
    return cM;
  };

  const getNumberStr = (value, type) => {
    const date = new Date();
    const num = Number(value);
    console.log("Curent Day is Number, ", num);
    if (type === 1) {
      return isNaN(num) ? date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() : value;
    }else if(type === 2){
      return isNaN(num) ? date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()+1 : value;
    }else if(type === 3){
      return isNaN(num) ? date.getFullYear() : value;
    }
  };

  const textToDateFormat = (e) => {
    let date = new Date();
    let month = date.getMonth(),
      day = date.getDate(),
      year = date.getFullYear();

    e.preventDefault();
    // console.log("Event , ", e);
    const regX = /^-?\d*$/;
    if (e) {
      if (e.target) {
        let value = e.target.value;
        let valueStr = value;
        let vLength = value.length;

        if (value !== undefined && value !== null) {
          if (vLength === 2) {
            day = getNumberStr(value.substring(0, 2), 1);
            valueStr = `${day}/`;
          }
          if (vLength === 3) {
            day = getNumberStr(value.substring(0, 2), 1);
            let eW = value.substring(2);
            // console.log("Extra Word ", eW);
            if (eW !== "/") {
              eW = regX.test(eW) ? eW : 0;
              valueStr = `${day}/${eW}`;
            }
          }
          if (vLength === 5) {
            day = getNumberStr(value.substring(0, 2), 1);
            month = getNumberStr(value.substring(3, 5), 2);
            month = getMonth(month);
            day = getDayByMonth(day, month, year);
            valueStr = `${day}/${month}/`;
          }

          if (vLength === 6) {
            day = getNumberStr(value.substring(0, 2), 1);
            month = getNumberStr(value.substring(3, 5), 2);
            let subStr = value.substring(0, 5);
            let eW = value.substring(5);
            if (eW !== "/") {
              eW = regX.test(eW) ? eW : 0;
              valueStr = `${subStr}/${eW}`;
            }
            month = getMonth(month);
            day = getDayByMonth(day, month, year);
          }
          if (vLength === 10) {
            year = getNumberStr(value.substring(6, 10), 3);
            day = getNumberStr(value.substring(0, 2), 1);
            month = getNumberStr(value.substring(3, 5), 2);
            valueStr = `${day}/${month}/${year}`;
          }
          
          month = getMonth(month);
          day = getDayByMonth(day, month, undefined);
          const date = new Date(`${month}/${day}/${year}`);
          setSelectedDate(date);
          setFieldStrValue(valueStr);
        }
      }
    }
  };

  const monthLastDay = (m, y) => {
    let lday = new Date(y, m, 0).getDate();
    return lday;
  };

  const actionToggle = () => {
    const lActive = isActive;

    setIsActive(!lActive);
  };
  return (
    <React.Fragment>
      <Row>
        <Col md={12} ref={refDate} className="cst-date-container">
          <div className="cst-single-dtpk-parent">
            <div
              className={`content ${isActive ? "active" : ""}`}
              onClick={actionToggle}
            >
              <span>{props.label}</span>
              <span className="value">
                <input
                  type="text"
                  className="form-control"
                  onKeyUp={keyPressAction}
                  value={fieldStrValue}
                  onChange={textToDateFormat}
                  placeholder={props.placeholder}
                />
              </span>
            </div>
            {isActive ? (
              <Card.Body className="shadow cst-single-dtpk">
                <Calendar date={selectedDate} onChange={dateChaneAction} />
              </Card.Body>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstSingleDatePicker;
