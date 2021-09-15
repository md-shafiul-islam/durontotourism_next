import React from "react";
import { Col, Row } from "react-bootstrap";
import { helperGetFullDateFormatFYear } from "../../../redux/actions/helperAction";
import PricingAirlinceInfo from "./pricingAirlinceInfo";
import { shallowEqual, useSelector } from "react-redux";

/**
 *
 * @param {airSegment[segment], airPorts[{airPort}], carriers=["AI", "H1"], flightNumbers=[{num:1445, cNum:"AI-1445"}], destination="DAC", origin="BOM", departureTime={deptureDate}, layovers=["BOM", "DAC"]} params
 * @returns render html
 */

const PricingFlyDetails = (params) => {
  const reduxAirPortList = useSelector(
    (state) => state.airSearch.airPortsList,
    shallowEqual
  );

  console.log("Params: PricingFlyDetails: , ", params);

  const getLayOver = (layovers) => {
    if (layovers !== undefined) {
      return (
        <React.Fragment>
          <span>
            {layovers.length > 0
              ? `${layovers.length} Stop via ${layovers.map((layItem, lIdx) => {
                  return lIdx > 0
                    ? ", " + getAirportName(layItem)
                    : getAirportName(layItem);
                })}`
              : "Non Stop "}{" "}
          </span>
        </React.Fragment>
      );
    }
  };

  const getAirportName = (name) => {
    let port = undefined;
    let portName = name;

    if (reduxAirPortList !== undefined && name !== undefined) {
      let slIdx = undefined;

      console.log("reduxAirPortList[name], ", reduxAirPortList[name]);
      port = reduxAirPortList[name];

      if (port !== undefined) {
        portName = port.location;
      }
    }

    return portName;
  };

  const getFullDateTime = (dateTime) => {
    if (dateTime !== undefined) {
      return helperGetFullDateFormatFYear(dateTime);
    }
    return "";
  };
  return (
    <React.Fragment>
      <PricingAirlinceInfo
        airLinces={params.carriers && params.carriers}
        flyNum={params && params.flightNumbers}
      />

      <Row>
        <Col md={12} className="pricing-locs">
          {params&& getAirportName(params.origin)} To{" "}
          {params&& getAirportName(params.destination)}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="pricing-layover">
          {getLayOver(params&& params.layovers)}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="pricing-timefrem">
          Onward Departure |{" "}
         
          {getFullDateTime(params.departureTime)}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PricingFlyDetails;
