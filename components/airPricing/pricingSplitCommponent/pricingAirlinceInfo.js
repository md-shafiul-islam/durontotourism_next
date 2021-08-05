import React from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from 'react-redux';
import IconView from "../../airSearch/iconView";

const PricingAirlinceInfo = (params) => {

  const reduxAirLinceList = useSelector((state)=>state.airSearch.airLinesList, shallowEqual);

  const getAirLineName = (cCode) => {
    let rCode = "";
    let airLinse = undefined;

    if (reduxAirLinceList !== undefined && cCode !== undefined) {
      let sIdx = undefined;

      airLinse = reduxAirLinceList[cCode];

      if (airLinse !== undefined) {
        rCode = airLinse.name;
      }

      return rCode;
    }

    return rCode;
  };

  const getAirNameAndNo = (flyNums) => {
    if (flyNums) {
      return (
        <React.Fragment>
          {flyNums.map((fItem, idx) => {
            return idx > 0 ? (
              <span>{`, ${fItem.cNum}`}</span>
            ) : (
              <span>{`${fItem.cNum}`}</span>
            );
          })}
        </React.Fragment>
      );
    }
  };
  return (
    <Row>
      <Col md={3} className="pricing-icon">
        <IconView
          airlinseList={reduxAirLinceList}
          selectedAirs={params.airLinces}
          iconSizeClass="icon-view-area-medium"
        />
      </Col>
      <Col md={9} className="pricing-air-inf">
        {getAirNameAndNo(params.flyNum)}
      </Col>
    </Row>
  );
};

export default PricingAirlinceInfo;
