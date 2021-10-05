import React, { useState, useEffect } from "react";
import { Tabs, Tab, Nav, Row, Col } from "react-bootstrap";
import FlyDetailsCard from "./FlightCards/FlyDetailsCard";
import ChargeCardDetails from "./FlightCards/ChargeCardDetails";
import FareSummaryCard from "./FlightCards/FareSummaryCard";
import SelectedAirDetails from "./SelectedAirDetails";
import DetailBookingCard from "./FlightCards/DetailBookingCard";
import { GET_DAYES, GET_MONTHS } from "../../../redux/types";

const SelectedTab = (props) => {
  const [key, setKey] = useState("flightDetails");
  const [dateMonth, setDateMonth] = useState("");

  const selectedBookingOptionAction = (ids, item) => {
    props.getSelectedOption(item, ids);
  };

  console.log("SelectedTab ", props);

  let prevArvTime = "";

  useEffect(() => {
    setDateMonth(getDayAndMonth(props.segment&&props.segment.departureTime));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDayAndMonth = (dateTime) => {
    let localDate = null;
    let month,
      dayOfMonth = 0;

    if (dateTime === undefined) {
      localDate = new Date();
    } else {
      localDate = new Date(dateTime);
    }

    month = GET_MONTHS[localDate.getMonth()].substring(0, 3);
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

  return (
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
              <Row className="travel-locs">
                <Col md={6} className="travel-title-inf">
                  {props.travelInf.firstOrigin} To{" "}
                  {props.travelInf.lastDestination}, {dateMonth}
                </Col>
                <Col md={6} className="travel-title-time">
                  {props.totalTravelTime}
                </Col>
              </Row>
              
              {props.bookInfos&&props.bookInfos.map((bookInf, sIdx)=>{
                  let segment = props.segments&&props.segments[bookInf.segmentRef];
                  let fareInfo = props.fareInfos&&props.fareInfos[bookInf.fareInfoRef];
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
                    <React.Fragment key={`layover-${sIdx}`}>
                      {sIdx > 0 ? (
                        <Row className="layover">
                          <Col md={12} className="layover-position">
                            <div className="border-center "></div>
                            <div className="layover-overlay-conten">
                              <Row>
                                <Col
                                  md={{ span: 6, offset: 3 }}
                                  className="layover-content "
                                >
                                  <p>
                                    Change of Planes | {timeDeff} Layover in{" "}
                                    {origin}
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}

                      <DetailBookingCard
                        //bookInf={segment}
                        totalTravelTime={props.totalTravelTime}
                        travelLocs={props.travelInf}
                        segment={segment}
                        fareInfo={fareInfo}
                      />
                    </React.Fragment>
                  );
              })}
              
            </Tab.Pane>

            <Tab.Pane eventKey="fareSummary">
              <FareSummaryCard fareSummary={props.fareSummary} />
            </Tab.Pane>

            <Tab.Pane eventKey="cancellation">
              <ChargeCardDetails data={props.cancel} />
            </Tab.Pane>
            <Tab.Pane eventKey="dateChange">
              <ChargeCardDetails data={props.cancel} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SelectedTab;
