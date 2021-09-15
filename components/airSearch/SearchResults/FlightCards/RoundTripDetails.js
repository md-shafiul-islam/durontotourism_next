import React from "react";
import { Col, Row } from "react-bootstrap";
import { GET_DAYES, GET_MONTHS } from "../../../../redux/types";

const RoundTripDetails = (params) => {
  // console.log("Round Trip Details: Params ", params);

  const getBaggage = (mxWeight)=>{

    if(mxWeight !== undefined && mxWeight !== null){

      if(mxWeight.value !== null && mxWeight.value !== undefined){
        return `${mxWeight.value} ${mxWeight.unit}`;
      }
    }
    return " Not Available ";
  }

  const getTimeFormatHr = (timeValue) => {
    if (timeValue != undefined) {
      if (timeValue === null) {
        return "0.0";
      }

      let dateTime = new Date(timeValue);
      let hr = null;

      if (dateTime) {
        hr =
          dateTime.getHours() < 9
            ? `0${dateTime.getHours() + 1}`
            : `${dateTime.getHours() + 1}`;

        if (!isNaN(hr)) {
          return hr;
        }
      }
    }
    return "00";
  };

  let { fareinfo, segment } = params;
  let baggageAllowance = fareinfo&&fareinfo.baggageAllowance;
  let maxWeight = baggageAllowance&&baggageAllowance.maxWeight;

  const getTimeFormatMin = (timeValue) => {
    if (timeValue != undefined) {
      if (timeValue === null) {
        return "0.0";
      }

      let dateTime = new Date(timeValue);
      let min = null;

      if (dateTime) {
        min =
          9 >= dateTime.getMinutes()
            ? `0${dateTime.getMinutes()}`
            : `${dateTime.getMinutes()}`;

        if (!isNaN(min)) {
          return min;
        }
      }

      return "00";
    } else {
      return "00";
    }
  };

  const getTotalFlyTime = (prevDateTime, cDateTime) => {
    //1000 milsec to sec
    const preDate = new Date(prevDateTime);
    const curDate = new Date(cDateTime);

    let diffTime = Math.abs(curDate - preDate);

    let hrs,
      hMints,
      day = 0;

    let mints = Number(Math.floor(diffTime / 60000));
    let sec = ((diffTime % 60000) / 1000).toFixed(0);
    hrs = Number(Math.floor(mints / 60));

    day = Math.floor(hrs / 24);

    let dayHr = day * 24;
    let dayAfterHr = Math.floor(hrs - dayHr);

    if (hrs > 0) {
      hMints = hrs * 60;
    }

    hMints = Number(hMints);
    mints = Number(mints);

    if (hMints > 0) {
      mints = mints - hMints;
    }

    let timeFare = day > 0 ? `${day} D` : "";

    timeFare += `${hrs} hr ${mints} min`;

    return timeFare;
  };

  const getFullDate = (timeValue) => {
    if (timeValue === undefined) {
      return "Date Not Available ";
    }
    let date = new Date(timeValue);

    let day,
      mont,
      year = "";

    day = GET_DAYES[date.getDay()].substring(0, 3);
    mont = GET_MONTHS[date.getMonth()].substring(0, 3);

    year = date.getFullYear().toString().substring(2);

    return `${day}, ${date.getDate()} ${mont} ${year}`;
  };

  const getLocation = (locationCode) => {
    if (locationCode === undefined) {
      return "";
    }

    return locationCode;
  };

  return (
    <React.Fragment>
      <Row className="rnd-iclc-area">
        <Col md={12}>
          <div className="rnd-icon"></div>
          <div className="rnd-air-name">
            <span>{segment&&segment.carrier}</span> <span>{`${segment&&segment.carrier}-${segment&&segment.flightNumber}`}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="rnd-inf">
          <div className="rnd-time">{`${getTimeFormatHr(
            segment && segment.departureTime
          )}:${getTimeFormatMin(segment && segment.departureTime)}`}</div>
          <div className="rnd-date">
            {getFullDate(segment && segment.departureTime)}
          </div>
          <div className="rnd-location">
            {getLocation(segment && segment.origin)}
          </div>
        </Col>
        <Col md={4} className="rnd-time-fram">
          <span className="rnd-fly-duration">
            {getTotalFlyTime(
              segment && segment.departureTime,
              segment && segment.arrivalTime
            )}
          </span>
        </Col>
        <Col md={4} className="rnd-inf">
          <div className="rnd-time">{`${getTimeFormatHr(
            segment && segment.arrivalTime
          )}:${getTimeFormatMin(segment && segment.arrivalTime)}`}</div>
          <div className="rnd-date">
            {getFullDate(segment && segment.arrivalTime)}
          </div>
          <div className="rnd-location">
            {getLocation(segment && segment.destination)}
          </div>
        </Col>
      </Row>
      <Row className="rnd-baggage-alw">
        <Col md={12}>
          <p>BAGGAGE :</p>
        </Col>
        <Col md={6}>Total:</Col>
        <Col md={6}>
          { getBaggage(maxWeight)}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RoundTripDetails;
