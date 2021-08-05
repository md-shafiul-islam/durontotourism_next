import React, { useState, useEffect } from "react";
import { Tabs, Tab, Nav, Row, Col, Card } from "react-bootstrap";
import { GET_MONTHS } from "../../../../redux/types";
import { helperGetTotalFlyTimeReadable } from "../../../../utils/helper/helperAction";
import RoundTripChargeDetailsCard from "../GenericCard/roundTripChargeDetailsCard";
import ChargeCardDetails from "./ChargeCardDetails";
import FareSummaryCard from "./FareSummaryCard";

import RoundTripDetails from "./RoundTripDetails";

const RoundSelectedTab = (params) => {

  // console.log("RoundSelectedTab Params, ", params);
  
  const [key, setKey] = useState("flightDetails");

  const selectedBookingOptionAction = (ids, item) => {
    params.getSelectedOption(item, ids);
  };

  let prevArvTime = "";

  // let { departureOption, returnOption } = params&&params.flyOption;

  const getDayAndMonth = (dateTime) => {

    let localDate = null;
    let month,
      dayOfMonth = 0;

    if (dateTime === undefined || dateTime === null) {
      localDate = new Date();
    } else {
      localDate = new Date(dateTime);
    }

    month = GET_MONTHS[localDate.getMonth()]&&GET_MONTHS[localDate.getMonth()].substring(0, 3);
    dayOfMonth = localDate.getDate();
    return `${dayOfMonth} ${month}`;
  };

  const setLauoverInf = (prevDateTime, cDateTime) => {
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
      hMints = Number(hMints);
    }

    if (hMints > 0) {
      mints = mints - hMints;
    }

    prevArvTime = "";
    return `${hrs} hr ${mints} min`;
  };

  const getTravelLocation = (locCode) => {
    if (locCode === undefined) {
      return "";
    }

    if (locCode === null) {
      return "";
    }

    return locCode;
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
    
  return (
    <React.Fragment>
      <Tab.Container id="menu-tabs" defaultActiveKey="flightDetails">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link eventKey="flightDetails">Flight Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fareSummary">Fare Summary</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="cancellation">Cancellation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="dateChange">Date Change</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="flightDetails">
                <Row className="rnd-tvdtls-row">
                  <Col md={6} className="rnd-travel-details">
                    <div className="rnd-dcontent">
                      <Row className="rnd-travel-locs">
                        <Col md={6} className="rnd-travel-title-inf">
                          {getTravelLocation(
                            params.selectedAir && params.selectedAir.dep&&
                            params.selectedAir.dep.origin
                          )}{" "}
                          To{" "}
                          {getTravelLocation(
                            params.selectedAir && params.selectedAir.dep&&
                            params.selectedAir.dep.destination
                          )}
                          ,{" "}
                          {getDayAndMonth(
                            params.selectedAir && params.selectedAir.dep&&
                            params.selectedAir.dep.option.departureDateTime
                          )}
                        </Col>
                        <Col md={6} className="rnd-travel-title-time">
                          {params.selectedAir !== null
                            ? helperGetTotalFlyTimeReadable(params.selectedAir && params.selectedAir.dep&&
                            params.selectedAir.dep.option&&params.selectedAir.dep.option.travelTime)
                            : ""}
                        </Col>
                      </Row>

                      {params.selectedAir && params.selectedAir.dep&&
                            params.selectedAir.dep.option&&params.selectedAir.dep.option.bookingInfos&&
                            params.selectedAir.dep.option.bookingInfos.map((book, ibx) => {
                          {/* console.log("RST book, ", book); */}
                          let { bookingCode, bookingCount, cabinClass, fareInf, segment } = book;

                          if(segment === undefined || segment === null) return "";
                          
                          let timeDeff = "";
                          let { origin } = segment;
                          if (prevArvTime !== undefined) {
                            if (prevArvTime.length > 3) {
                              timeDeff = setLauoverInf(
                                prevArvTime,
                                segment.departureTime
                              );
                            }
                          }
                          prevArvTime = segment && segment.arrivalTime;

                          return (
                            <React.Fragment key={`slp-${ibx}`}>
                              {ibx > 0 ? (
                                <Row className="rnd-layover">
                                  <Col md={12} className="rnd-layover-position">
                                    <div className="rnd-layover-overlay-container"></div>
                                    <div className="rnd-layover-content">
                                      <p>
                                        Change of Planes | {timeDeff} Layover in{" "}
                                        {origin}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}

                              <RoundTripDetails 
                                // bookInf={book} 
                                fareinfo={fareInf}
                                segment={segment}
                              />
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </Col>
                  <Col md={6} className="rnd-travel-details">
                    <div className="rnd-dcontent">
                      <Row className="rnd-travel-locs">
                        <Col md={6} className="rnd-travel-title-inf">
                          {getTravelLocation(
                            params.selectedAir && params.selectedAir.ret&&
                            params.selectedAir.ret.origin
                          )}{" "}
                          To{" "}
                          {getTravelLocation(
                            params.selectedAir && params.selectedAir.ret&&
                            params.selectedAir.ret.destination
                          )}
                          ,{" "}
                          {getDayAndMonth(
                            params.selectedAir && params.selectedAir.ret&&
                            params.selectedAir.ret.option&&params.selectedAir.ret.option.departureDateTime
                          )}
                        </Col>
                        <Col md={6} className="rnd-travel-title-time">
                          {params.selectedAir !== null && params.selectedAir !== undefined
                            ? helperGetTotalFlyTimeReadable(params.selectedAir && params.selectedAir.ret&&
                            params.selectedAir.ret.option&&params.selectedAir.ret.option.travelTime)
                            : ""}
                        </Col>
                      </Row>

                      {params.selectedAir && params.selectedAir.ret&&
                            params.selectedAir.ret.option&&params.selectedAir.ret.option.bookingInfos&&
                            params.selectedAir.ret.option.bookingInfos.map((book, ibx) => {
                              let { bookingCode, bookingCount, cabinClass, fareInf, segment } = book;
                          
                          let timeDeff = "";
                          let origin = segment&&segment.origin;
                          if (prevArvTime !== undefined) {
                            if (prevArvTime.length > 3) {
                              timeDeff = setLauoverInf(
                                prevArvTime,
                                segment.departureTime
                              );
                            }
                          }
                          prevArvTime = segment && segment.arrivalTime;

                          return (
                            <React.Fragment key={`flo-${ibx}`}>
                              {ibx > 0 ? (
                                <Row className="rnd-layover">
                                  <Col md={12} className="rnd-layover-position">
                                    <div className="rnd-layover-overlay-container"></div>
                                    <div className="rnd-layover-content">
                                      <p>
                                        Change of Planes | {timeDeff} Layover in{" "}
                                        {origin}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}

                              <RoundTripDetails 
                                // bookInf={book} 
                                fareinfo = {fareInf}
                                segment = {segment}
                              />
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="fareSummary">
                <FareSummaryCard fareSummary={params.fareSummary} currencyType={params.currencyType} />
              </Tab.Pane>

              <Tab.Pane eventKey="cancellation">
                <Row className="charge-details-container">
                  <Col md={12}>
                    <RoundTripChargeDetailsCard 
                      departurePenalties={params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.cancelPenalties} 
                      returnPenalties={params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.cancelPenalties} 
                      depCarrier={params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.platingCarrier}
                      retCarrier={params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.platingCarrier}
                      depTitle={`${params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.origin}-${params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.destination}`}
                      retTitle={`${params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.origin}-${params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.destination}`}
                    />
                  </Col>
                </Row>                
              </Tab.Pane>
              <Tab.Pane eventKey="dateChange">
                <RoundTripChargeDetailsCard 
                  departurePenalties={params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.changePenalties} 
                  returnPenalties={params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.changePenalties} 
                  depCarrier={params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.platingCarrier}
                  retCarrier={params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.platingCarrier}
                  depTitle={`${params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.origin}-${params.selectedAir&&params.selectedAir.dep&&params.selectedAir.dep.destination}`}
                  retTitle={`${params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.origin}-${params.selectedAir&&params.selectedAir.ret&&params.selectedAir.ret.destination}`}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default RoundSelectedTab;
