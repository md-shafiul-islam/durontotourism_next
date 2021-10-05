import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const MultiCityOptionsCards = (params) => {
  const [display, setDisplay] = useState(false);
  const [totalTravelTime, setTotalTravelTime] = useState("");

  useEffect(() => {
    setTotalTravelTime();
    /*getTotalFlyTime(
        params.flyOption.flyDepartureTime,
        params.flyOption.flyArrivalTime
      )*/
  }, []);
  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const getTotalFlyTime = (prevDateTime, cDateTime) => {
    //1000 milsec to sec
    const preDate = new Date(prevDateTime);
    const curDate = new Date(cDateTime);

    let diffTime = Math.abs(curDate - preDate);

    let hrs,
      hMints = 0;
    let mints = Number(Math.floor(diffTime / 60000));
    let sec = ((diffTime % 60000) / 1000).toFixed(0);
    hrs = Number(Math.floor(mints / 60));

    if (hrs > 0) {
      hMints = hrs * 60;
    }

    hMints = Number(hMints);
    mints = Number(mints);

    if (hMints > 0) {
      mints = mints - hMints;
    }

    return `${hrs} hr ${mints} min`;
  };

  const getTimeFormatHr = (timeValue) => {
    if (timeValue != undefined) {
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

  const getTimeFormatMin = (timeValue) => {
    if (timeValue != undefined) {
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
    }
  };

  const getPrice = (amount) => {
    let price = "";

    if (amount === undefined) {
      return "";
    } else {
      price = `${amount.substring(0, 3)}: ${amount.substring(3)}`;
    }

    return price;
  };

  const getFlyOptionAndTime = (fOption) => {
    let airStop = "";

    airStop = fOption.airStops.length;

    return (
      <React.Fragment>
        <div>
          <span>
            {getTotalFlyTime(fOption.flyDepartureTime, fOption.flyArrivalTime)}
          </span>
        </div>
        <div className="line-area">
          <ul className="route-air-line">
            {fOption.airStops &&
              fOption.airStops.map((item, idx) => {
                return <li key={`itemempty-${idx}`} className="air-point">&nbsp;</li>;
              })}
          </ul>
        </div>
        <div className="line-airport">
          <p>
            {airStop > 0 ? airStop : "Non"} stop {airStop > 0 ? " via" : ""}{" "}
            {fOption.airStops &&
              fOption.airStops.map((stop, i) => {
                return <span key={`itemempty-stp-${idx}`}>{stop}</span>;
              })}
          </p>
        </div>
      </React.Fragment>
    );
  };

  console.log("MultiCity Options Cards: ", params);

  const pricingAction = (x)=>{
    console.log("MultiCity Options Cards Price Action: SL items, ", x);
    console.log("MultiCity Options Cards Price Action: ", params.flighAirPricetList);
  }
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Row>
            {params.flighAirPricetList.multyOptions &&
              params.flighAirPricetList.multyOptions.map((mOption, mOpIdx) => {
                return (
                  <React.Fragment key={`airplmcop-${mOpIdx}`}>
                    <Col md={12}>
                      <Card className="multi-city-area">
                        <Card.Title>
                          <Row>
                            <Col md={6}>Air Lin Name: Duration</Col>
                            <Col md={6}>
                              <Button onClick={()=>{pricingAction(mOption)}}>Book Now</Button>
                            </Col>
                          </Row>
                        </Card.Title>
                        <Card.Body>
                          {mOption.multiCityAirOptions &&
                            mOption.multiCityAirOptions.map((item, iDx) => {
                              return (
                                <React.Fragment key={`airplmcop-item-${iDx}-${mOpIdx}`}>
                                  {item.flyOptions &&
                                    item.flyOptions.map((flyOption, flyIdx) => {
                                      return (
                                        <React.Fragment key={`airplmcop-eitem-${flyIdx}-${iDx}-${mOpIdx}`}>
                                          <Row className="fly-inf-area">
                                            <Col md={3}>
                                              <div>
                                                {flyOption.carriers &&
                                                  flyOption.carriers.map(
                                                    (cCode, idx) => {
                                                      return (
                                                        <span className="air-icon" key={`airicon-${flyIdx}-${iDx}-${mOpIdx}-${idx}`}>
                                                          {cCode}
                                                        </span>
                                                      );
                                                    }
                                                  )}
                                              </div>

                                              <div>
                                                {flyOption.flightNumbers &&
                                                  flyOption.flightNumbers.map(
                                                    (fNum, fidx) => {
                                                      return (
                                                        <React.Fragment key={`airnf-${flyIdx}-${iDx}-${mOpIdx}-${idx}`}>
                                                          <span className="air-number">
                                                            {fidx > 0
                                                              ? " | "
                                                              : " "}{" "}
                                                            {fNum}
                                                          </span>
                                                        </React.Fragment>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </Col>

                                            <Col md={5}>
                                              <Row>
                                                <Col md={4}>
                                                  <div className="fly-time-inf">
                                                    <span className="fly-hour">
                                                      {getTimeFormatHr(
                                                        flyOption.flyDepartureTime
                                                      )}
                                                      {":"}
                                                    </span>
                                                    <span className="fly-min">
                                                      {getTimeFormatMin(
                                                        flyOption.flyDepartureTime
                                                      )}
                                                    </span>
                                                  </div>
                                                  <div className="fly-loc-inf">
                                                    <span>
                                                      {flyOption.firstOrigin}
                                                    </span>
                                                  </div>
                                                </Col>

                                                <Col md={4}>
                                                  <span className="travel-time">
                                                    {getFlyOptionAndTime(
                                                      flyOption
                                                    )}
                                                  </span>
                                                </Col>

                                                <Col md={4}>
                                                  <div className="fly-time-inf">
                                                    <span className="fly-hour">
                                                      {getTimeFormatHr(
                                                        flyOption.flyArrivalTime
                                                      )}
                                                      {":"}
                                                    </span>
                                                    <span className="fly-min">
                                                      {getTimeFormatMin(
                                                        flyOption.flyArrivalTime
                                                      )}
                                                    </span>
                                                  </div>
                                                  <span className="fly-loc-inf">
                                                    {flyOption.lastDestination}
                                                  </span>
                                                </Col>
                                              </Row>
                                            </Col>

                                            <Col md={4}>
                                              <Row>
                                                <Col md={7}>
                                                  <span className="price">
                                                    {getPrice(
                                                      flyOption.totalPrice
                                                    )}
                                                  </span>
                                                </Col>

                                                <Col md={5}></Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </React.Fragment>
                                      );
                                    })}
                                </React.Fragment>
                              );
                            })}
                        </Card.Body>
                      </Card>
                    </Col>
                  </React.Fragment>
                );
              })}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MultiCityOptionsCards;
