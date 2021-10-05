import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

const FlyDetailsCard = (props) => {
  const { airFareInfs, airSegments, flightDetailsList, pricePoint } = props;
  const [airLeg, setAirLeg] = useState([]);
  const [egments, setAirSegments] = useState(airSegments);
  const [fareInf, setAirFareInf] = useState(airFareInfs);
  const [airPricePoint, setPricePoint] = useState(pricePoint);

  console.log("fly Details Props: ", props);

  const getFarePrice = (amountParam) => {
    if (amountParam !== undefined) {
      return amountParam.substring(3);
    }
  };
  const getCurrencyType = (amountParam) => {
    if (amountParam !== undefined) {
      return amountParam.substring(0, 3);
    }
  };

  const itemSelectedAction = (
    e,
    item,
    flyIndex,
    bookIdx,
    optionIndex,
    elKey
  ) => {
    props.getSelectedFly(
      {
        fly: flyIndex,
        book: bookIdx,
        opId: optionIndex,
        elmKey: elKey,
      },
      item
    );
    console.log("Add Book Inf !!!");
  };

  const getMinToHrAndMin = (mins) => {
    let hr,
      mint,
      nHr,
      rMin = 0;
    if (mins > 60) {
      hr = mins / 60;
      hr = Math.floor(hr);
      nHr = hr * 60;
      mint = mins - nHr;
    } else {
      mint = mins;
    }
    return `${hr} Hr(s) ${mint} Min(s)`;
  };

  const getSelectedClass = (fIdx, bIdx, idx) => {
    let slClass = "";
    props.preSelectOption.map((pItem, psIdx) => {
      const { preSelectOption } = props;

      if (
        pItem.fly === fIdx &&
        pItem.book === bIdx &&
        pItem.opId === idx &&
        pItem.elmKey === props.elementKey &&
        pItem.bookInf !== null
      ) {
        slClass = "selected";
        console.log(
          " Selected Item Match!! : ",
          pItem,
          " Class Name: ",
          slClass
        );
      }
    });

    return slClass;
  };

  const isAdded = (e, item, flyIndex, bookIdx, optionIndex, elKey) => {
    const { preSelectOption } = props;
    let haveItem = false;
    preSelectOption.map((preItem, idx) => {
      if (
        preItem.fly === flyIndex &&
        preItem.book === bookIdx &&
        preItem.opId === optionIndex &&
        preItem.elmKey === elKey &&
        preItem.bookInf !== null
      ) {
        haveItem = true;
      }
    });
    return haveItem;
  };

  const selectedItemRemoveAction = (
    e,
    item,
    flyIndex,
    bookIdx,
    optionIndex,
    elKey
  ) => {
    console.log("Remove Book Inf !!!");
    props.removeFlyAction(item, flyIndex, bookIdx, optionIndex, elKey);
  };

  return (
    <React.Fragment>
      <Card className="slc-airs">
        <Card.Title>Departure Flight </Card.Title>
        <React.Fragment>
          <Card.Body>
            {props.availavleFlight.flightOptions.map((option, idx) => {
              return (
                <div
                  className="callout callout-info position-relative p-3"
                  key={`fldc-${idx}`}
                >
                  <React.Fragment>
                    <div className="ribbon-wrapper ribbon-lg">
                      <div className="ribbon bg-primary">
                        <h6>Trip : {option.airLeg.group + 1}</h6>
                      </div>
                    </div>
                    <div className="travel-inf">
                      <span className="dep-inf">
                        {`${option.origin} To ${option.destination} `}{" "}
                      </span>
                      <span className="fly-time">{""}</span>
                    </div>

                    {option.flyOptions &&
                      option.flyOptions.map((flyOptn, fIdx) => {
                        return (
                          <React.Fragment key={`fldcfop-${fIdx}`}>
                            <Col md={12}>
                              <Row>
                                <Col md={12}>
                                  {flyOptn.bookInfos &&
                                    flyOptn.bookInfos.map((book, bIdx) => {
                                      let {
                                        bookingCode,
                                        bookingCount,
                                        cabinClass,
                                        fareInfos,
                                        segment,
                                      } = book;
                                      let {
                                        amount,
                                        baggageAllowance,
                                        fareBasis,
                                        brand,
                                      } = fareInfos;
                                      let {
                                        arrivalTime,
                                        carrier,
                                        classOfService,
                                        departureTime,
                                        destination,
                                        distance,
                                        flightNumber,
                                        flightTime,
                                        origin,
                                      } = segment;
                                      let depDate = new Date(departureTime);
                                      let arrivDate = new Date(arrivalTime);

                                      return (
                                        <React.Fragment
                                          key={`flii-${fIdx}-${bIdx}`}
                                        >
                                          <div
                                            className={`fly-item ${getSelectedClass(
                                              fIdx,
                                              bIdx,
                                              idx
                                            )}`}
                                            onClick={(e) => {
                                              if (
                                                !isAdded(
                                                  e,
                                                  book,
                                                  fIdx,
                                                  bIdx,
                                                  idx,
                                                  props.elementKey
                                                )
                                              ) {
                                                console.log("Add Funs Init");
                                                itemSelectedAction(
                                                  e,
                                                  book,
                                                  fIdx,
                                                  bIdx,
                                                  idx,
                                                  props.elementKey
                                                );
                                              } else {
                                                console.log("Remove Funs Init");

                                                selectedItemRemoveAction(
                                                  e,
                                                  book,
                                                  fIdx,
                                                  bIdx,
                                                  idx,
                                                  props.elementKey
                                                );
                                              }
                                            }}
                                          >
                                            <Row>
                                              <Col md={6}>
                                                <div className="provider-inf-area">
                                                  <span className="providre-icon"></span>
                                                  <span className="providre-text">
                                                    {carrier} | {fareBasis}
                                                  </span>
                                                </div>
                                              </Col>
                                              <Col md={6}>
                                                <div className="book-inf">
                                                  Booking Code:{" "}
                                                  <span className="label label-important label-inf arrowed-right">
                                                    {" "}
                                                    {bookingCode}
                                                  </span>
                                                </div>
                                                <div className="book-inf">
                                                  <span className="label label-important arrowed-in">
                                                    {cabinClass}
                                                  </span>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row className="fly-details">
                                              <Col md={9}>
                                                <Row>
                                                  <Col
                                                    md={3}
                                                    className="fly-dep-ret"
                                                  >
                                                    <span className="fly-time">
                                                      {`${
                                                        depDate.getHours() + 1
                                                      }:${depDate.getMinutes()}`}
                                                    </span>
                                                    <span className="fly-date">
                                                      {`${depDate.getDate()}/${
                                                        depDate.getMonth() + 1
                                                      }/${depDate.getFullYear()}`}
                                                    </span>
                                                    <span className="fly-location">
                                                      {` ${origin}`}
                                                    </span>
                                                  </Col>
                                                  <Col
                                                    md={3}
                                                    className="in-air"
                                                  >
                                                    <span>
                                                      {getMinToHrAndMin(
                                                        flightTime
                                                      )}
                                                    </span>
                                                  </Col>
                                                  <Col
                                                    md={3}
                                                    className="fly-dep-ret"
                                                  >
                                                    <span className="fly-time">
                                                      {`${
                                                        arrivDate.getHours() + 1
                                                      }:${arrivDate.getMinutes()}`}
                                                    </span>
                                                    <span className="fly-date">
                                                      {`${arrivDate.getDate()}/${
                                                        arrivDate.getMonth() + 1
                                                      }/${arrivDate.getFullYear()}`}
                                                    </span>
                                                    <span className="fly-location">
                                                      {` ${destination}`}
                                                    </span>
                                                  </Col>

                                                  <Col
                                                    md={3}
                                                    className="fly-price-text"
                                                  >
                                                    <span className="currency-type">
                                                      {`${getCurrencyType(
                                                        amount
                                                      )}`}
                                                    </span>
                                                    <span className="amount">
                                                      {`${getFarePrice(
                                                        amount
                                                      )}`}
                                                    </span>
                                                  </Col>
                                                </Row>
                                              </Col>
                                              <Col md={3} className="mp-0">
                                                <Row className="pas-details">
                                                  <Col
                                                    md={12}
                                                    className="p-title"
                                                  >
                                                    <p>
                                                      <span>BAGGAGE :</span>

                                                      <span>&nbsp;</span>
                                                    </p>

                                                    <p>
                                                      <span>
                                                        Max Weight :{" "}
                                                        {baggageAllowance &&
                                                          baggageAllowance.maxWeight &&
                                                          baggageAllowance
                                                            .maxWeight.value}
                                                      </span>

                                                      <span>
                                                        {baggageAllowance &&
                                                          baggageAllowance.maxWeight &&
                                                          baggageAllowance
                                                            .maxWeight.unit}
                                                      </span>
                                                    </p>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          </div>
                                        </React.Fragment>
                                      );
                                    })}
                                </Col>
                              </Row>
                            </Col>
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                </div>
              );
            })}
          </Card.Body>
        </React.Fragment>
      </Card>
    </React.Fragment>
  );
};

export default FlyDetailsCard;
