import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { helperGetTotalFlyTimeReadable } from "../../../../utils/helper/helperAction";

const BookingCardRoundTripOptions = (params) => {
  console.log("BookingCardRoundTripOptions params, ", params);
  const [display, setDisplay] = useState(false);
  const [totalTravelTime, setTotalTravelTime] = useState("");
  const [selectedItem, setSelectedItem] = useState(false);
  let {loadingStatus} = params;
  useEffect(() => {
    setTotalTravelTime();
    /*getTotalFlyTime(
        params.flyItem.flyDepartureTime,
        params.flyItem.flyArrivalTime
      )*/
    console.log(
      "BookingCardRoundTripOptions params, loadingStatus, ",
      params.loadingStatus
    );

    if (params.elmKey === params.preSetItem) {
      params.getSelectedItem({ elmKey: params.elmKey, flight: params.flight });
    }
  }, [loadingStatus]);

  

  const toggleDisplay = () => {
    setDisplay(!display);
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
    if (amount === undefined) {
      return "";
    }

    return (
      <React.Fragment>
        <span className="curreny-code">{`${amount.substring(0, 3)}: `}</span>
        <span>{amount.substring(3)}</span>
      </React.Fragment>
    );
  };

  const getFlyOptionAndTime = (option) => {
    if (option !== undefined && option !== null) {
      return (
        <React.Fragment key={params.elmKey}>
          <div>
            <span>{helperGetTotalFlyTimeReadable(option.travelTime)}</span>
          </div>
          <div className="line-area">
            <ul className="route-air-line">
              {option &&
                option.stops.map((item, i) => {
                  return (
                    <li key={`stp-${i}`} className="air-point">
                      &nbsp;
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="line-airport-round">
            {option.stops.length > 0 ? option.stops.length : "Non"} stop{" "}
            {option.stops.length > 0 ? " via" : ""}{" "}
            {option.stops &&
              option.stops.map((stop, i) => {
                return <span key={`si-${i}`}>{stop}</span>;
              })}
          </div>
        </React.Fragment>
      );
    }
    return "";
  };

  const getCarirers = (carriers, flightNumbers) => {
    // console.log(
    //   "Aire BCRTO,  carriers, flightNumbers, ",
    //   carriers,
    //   flightNumbers
    // );

    let flightItem = "";
    let carrierItem = "";

    carriers &&
      carriers.map((carrier, idx) => {
        carrierItem += idx > 0 ? ` | ${carrier}` : `${carrier}`;
      });

    flightNumbers &&
      flightNumbers.map((flightNumbers, fIdx) => {
        flightItem += fIdx > 0 ? ` | ${flightNumbers}` : `${flightNumbers}`;
      });

    return `${carrierItem}, ${flightItem}`;
  };

  const toggleSelectedIte = (selectedItem) => {
    const nowSItem = selectedItem;
    setSelectedItem(!nowSItem);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment key={params.elmKey}>
      <Card className="booking-card">
        <Card.Body
          className={params.elmKey === params.preSetItem ? "op-active" : ""}
        >
          <Row className={`round-trip-title`}>
            <Col md={12}>
              <div
                className="check-box"
                onClick={() => {
                  toggleSelectedIte(selectedItem);
                  params.getSelectedItem({
                    elmKey: params.elmKey,
                    flight: params.flight,
                  });
                }}
              >
                {params.elmKey === params.preSetItem ? (
                  <i className="far fa-dot-circle"></i>
                ) : (
                  <i className="far fa-circle"></i>
                )}
              </div>
              <div className="rnd-air-inf">
                {getCarirers(
                  params.flight.option && params.flight.option.carriers,
                  params.flight.option && params.flight.option.flightNums
                )}
              </div>
            </Col>
          </Row>

          <Row className="round-trip-content">
            <Col md={2} className="rt-icon">
              Icon
            </Col>
            <Col md={7} className="mp-0">
              <Row className="rnd-trevel-inf">
                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {getTimeFormatHr(
                        params.flight.option &&
                          params.flight.option.departureDateTime
                      )}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {getTimeFormatMin(
                        params.flight.option &&
                          params.flight.option.departureDateTime
                      )}
                    </span>
                  </div>
                  <div className="fly-loc-inf">
                    <span>{params.flight.origin}</span>
                  </div>
                </Col>

                <Col md={4}>
                  <span className="travel-time">
                    {getFlyOptionAndTime(params.flight && params.flight.option)}
                  </span>
                </Col>

                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {getTimeFormatHr(
                        params.flight.option &&
                          params.flight.option.arrivalDateTime
                      )}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {getTimeFormatMin(
                        params.flight.option &&
                          params.flight.option.arrivalDateTime
                      )}
                    </span>
                  </div>
                  <span className="fly-loc-inf">
                    {params.flight.destination}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <span className="price">
                {getPrice(
                  params.flight.eachPrices &&
                    params.flight.eachPrices.eachTotalPrice
                )}
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default BookingCardRoundTripOptions;
