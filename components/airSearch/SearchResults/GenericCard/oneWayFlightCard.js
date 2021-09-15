import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setPriceDetails } from "../../../../redux/actions/priceAction";
import {
  EXT_PRICE_URL,
  GET_SELECTED_AIR_PRICE,
  REQUEST_HEADER,
} from "../../../../redux/types";
import {
  helperGetPrice,
  helperGetTimeFormatHr,
  helperGetTimeFormatMin,
  helperGetTotalFlyTimeReadable,
  helperGoBookingOption,
} from "../../../../utils/helper/helperAction";
import HelperRedirect from "../../../../utils/helper/helperRedirect";
import OneWayPriceCard from "../FlightCards/OneWayPriceCard";
import SelectedTab from "../SelectedTab";

/**
 *
 * @param {
 *  airPriceInfos: {approximateFees: , approximateTaxes: "USD401.05", approximateTotalPrice: "USD851.05", basePrice: "USD450.00", taxes: "USD401.05", approximateBasePrice: "USD450.00"}
 *           airSegments: [] *
 * cancelPenalty: []
 * changePenalty: []
 * destination: "NYC"
 * id: 0
 * option: {bookingInfo: Array(2), connection: Array(1), key: "mns5KhAqWDKA57h6AAAAAA==", travelTime: "P0DT20H55M0S"}
 * origin: "DAC"
 *
 * } params
 * @returns {One Way Search Result Card}
 */
const OneWayFlightCard = (params) => {
  // console.log("OneWayFlightCard ", params);

  const searchQuery = useSelector(
    (state) => state.searchQuery.sQuery.searchQuery, shallowEqual
  );

  const dispatch = useDispatch();

  // console.log("Search Query: ", searchQuery);

  const [priceDisplay, setPriceDisplay] = useState(false);
  const [display, setDisplay] = useState(false);
  const [price, setPrice] = useState({ loadStatus: false, details: {} });
  const [redirectStatus, setRedirectStatus] = useState(false);

  const [initOpt, setInitOpt] = useState({
    segments: [],
    cabinClasses: [],
    carriers: [],
    flightNumbers: [],
    firstDepartureTime: "",
    lastArrivalTime: "",
    stops: [],
    totalTravelTime: "",
  });

  useEffect(() => {
    const segs = [];
    let carrs = [];
    let flNums = [];
    let cClass = [];
    let dTime = "";
    let aTime = "";
    let stops = [];

    if (params !== undefined) {
      let { option, airPriceInfos, airSegments } = params;
      let totalTime = helperGetTotalFlyTimeReadable(option.travelTime);

      if (airSegments !== undefined && option !== undefined) {
        option.bookingInfo &&
          option.bookingInfo.forEach((bookOpt, idx) => {
            if (bookOpt !== undefined) {
              let sSeg = airSegments[bookOpt.segmentRef];

              if (option.connection !== undefined && option.connection) {
                if (option.connection.length > 0) {
                  option.connection.map((conn, cDx) => {
                    if (conn.segmentIndex === idx) {
                      sSeg.connection = conn;
                    }
                  });
                }
              }
              if (idx === 0) {
                dTime = sSeg.departureTime;
              }

              aTime = sSeg.arrivalTime;

              if (!cClass.includes(bookOpt.cabinClass)) {
                cClass.push(bookOpt.cabinClass);
              }

              if (!flNums.includes(sSeg.flightNumber)) {
                flNums.push(sSeg.flightNumber);
              }

              if (!carrs.includes(sSeg.carrier)) {
                carrs.push(sSeg.carrier);
              }

              if (idx > 0) {
                stops.push(sSeg.origin);
              }

              segs.push(sSeg);
            }
          });
      }

      // console.log("Segments: Use", segs);

      setInitOpt({
        segments: segs,
        cabinClasses: cClass,
        carriers: carrs,
        flightNumbers: flNums,
        firstDepartureTime: dTime,
        lastArrivalTime: aTime,
        stops: stops,
        totalTravelTime: totalTime,
      });
    }

    // console.log("State stops: ", initOpt.stops);
  }, []);

  const getPriceDetails = () => {
    const priceSegments = [];     

    let { passengers } = searchQuery;

    if(price.loadStatus){
      tooglePriceView();
      console.log("tooglePriceView ");
      return;
    }

    passengers =
      passengers &&
      passengers.map((item) => {
        return { passCode: item.code };
      });

    let priceQuery = {
      traceId: params.traceId,
      platingCarrier: params.platingCarrier,
      pssengers: passengers,
      segments: initOpt.segments,
    };

    let url = EXT_PRICE_URL;

    url = `${url}/api/v_1_0/airPriceRequest`;
    priceQuery = JSON.stringify(priceQuery, null, 2);
    // console.log("Befor Send Price Request: ", priceQuery);
    if (!price.loadStatus) {
      Axios.post(url, priceQuery, { headers: REQUEST_HEADER })
        .then((res) => {
          console.log("Air Price Request done!!, ", res);
          if (res.data.status) {
            setPrice({loadStatus: true, details: res.data.orgResponse});
            setPriceDisplay(!priceDisplay);
          }
        })
        .catch((err) => {
          console.log("Air Price Request Error: ", err);
        });
    }
  };

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const tooglePriceView = () => {
    setPriceDisplay(!priceDisplay);
  };

  const goBookingOption = (bookingOption)=>{
    
    if(bookingOption !== undefined && bookingOption !== null){
      bookingOption.origin = params.origin
      bookingOption.destination = params.destination
      bookingOption.platingCarrier = params.platingCarrier
      
      dispatch({
        type: GET_SELECTED_AIR_PRICE,
        payload: bookingOption,
      });
      
      setRedirectStatus(true);
    }

  }
  const flyTimeStops = () => {
    return (
      <React.Fragment>
        <div>
          <span>{initOpt.totalTravelTime}</span>
        </div>
        <div className="line-area">
          <ul className="route-air-line">
            {initOpt.stops &&
              initOpt.stops.map((item, idx) => {
                return (
                  <li key={`ral-${idx}`} className="air-point">
                    &nbsp;
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="line-airport">
          <p>
            {initOpt.stops && initOpt.stops.length > 0
              ? initOpt.stops.length
              : "Non"}{" "}
            stop {initOpt.stops && initOpt.stops.length > 0 ? " via " : ""}
            {""}
            {initOpt.stops &&
              initOpt.stops.map((stop, i) => {
                return <span key={`las-${i}`}>{stop}</span>;
              })}
          </p>
        </div>
      </React.Fragment>
    );
  };

  if(redirectStatus){
    return <HelperRedirect to="/pricing" />
  }
  return (
    <React.Fragment key={`book-option-idx${params.id}`}>
      <Card className="booking-card">
        <Card.Body>
          <Row className="fly-inf-area">
            <Col md={3}>
              <div>
                {initOpt.carriers &&
                  initOpt.carriers.map((carrier, idx) => {
                    return (
                      <span key={`carrier-${idx}`} className="air-icon">
                        {idx > 0 ? " | " : ""}
                        {carrier}
                      </span>
                    );
                  })}
              </div>

              <div>
                {initOpt.flightNumbers &&
                  initOpt.flightNumbers.map((num, fidx) => {
                    return (
                      <React.Fragment key={`flightNumbers-${fidx}`}>
                        <span className="air-number">
                          {fidx > 0 ? " | " : ""} {num}
                        </span>
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>

            <Col md={5}>
              <Row>
                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {helperGetTimeFormatHr(initOpt.firstDepartureTime)}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {helperGetTimeFormatMin(initOpt.firstDepartureTime)}
                    </span>
                  </div>
                  <div className="fly-loc-inf">
                    <span>{params && params.origin}</span>
                  </div>
                </Col>

                <Col md={4}>
                  <span className="travel-time">{flyTimeStops()}</span>
                </Col>

                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {helperGetTimeFormatHr(initOpt.lastArrivalTime)}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {helperGetTimeFormatMin(initOpt.lastArrivalTime)}
                    </span>
                  </div>
                  <span className="fly-loc-inf">
                    {params && params.destination}
                  </span>
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <Row>
                <Col md={7}>
                  <span className="price">
                    {helperGetPrice(
                      params.eachPrices && params.eachPrices.eachTotalPrice
                    )}
                  </span>
                </Col>

                <Col md={5}>
                  <Button
                    onClick={() => {
                      getPriceDetails();                      
                    }}
                  >
                    View Price
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row
            className={`fly-details-area ${
              priceDisplay === true ? " active-price-view" : " "
            }`}
          >
            <Col md={12} className="lfp-0 ">
              <ul
                className={`fly-title`}
                onClick={() => {
                  toggleDisplay();
                }}
              >
                <li
                  className={`fly-details-btn ${
                    display === true ? "expand" : ""
                  }`}
                >
                  Flight Details
                </li>
              </ul>
              <div
                className={`fly-accrodian ${
                  display === true ? "active" : "inactive"
                }`}
              >
                <SelectedTab
                  bookInfos={params.option && params.option.bookingInfo}
                  getTimeFormatHr={helperGetTimeFormatHr}
                  getTimeFormatMin={helperGetTimeFormatMin}
                  carriers={initOpt.carriers}
                  flightNumbers={initOpt.flightNumbers}
                  totalTravelTime={initOpt.totalTravelTime}
                  travelInf={{
                    firstOrigin: params.origin,
                    lastDestination: params.destination,
                  }}
                  fareSummary={params.airPriceInfos}
                  cancel={params.cancelPenalty}
                  change={params.changePenalty}
                  segments={params.airSegments}
                  fareInfos={params.fareInfos}
                />
              </div>
            </Col>
          </Row>

          <Row
            className="one-way-price-details"
            style={{
              display: priceDisplay === true ? "block" : "none",
            }}
          >
            <OneWayPriceCard
              priceInf={price.details}
              getSelectedFlight={(selectedData) => {
                goBookingOption(selectedData);
              }}
            />
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default OneWayFlightCard;
