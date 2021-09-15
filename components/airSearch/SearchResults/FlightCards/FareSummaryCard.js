import React from "react";
import { Col, Row } from "react-bootstrap";

const FareSummaryCard = (props) => {
  
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="fare-summary-title">
          Fare breakup
        </Col>
        <Col md={7} className="fare-summary">
          <Row className="air-total-price">
            <Col md={6}>Total</Col>
            <Col md={6} className="fare-amount">
              {`${props.currencyType}. ${props.fareSummary&&props.fareSummary.totalPrice}`}
            </Col>
          </Row>

          <Row className="air-base-price">
            <Col md={6}>Base Fare</Col>
            <Col md={6} className="fare-amount">
              {`${props.currencyType}. ${props.fareSummary&&props.fareSummary.basePrice}`}
            </Col>
          </Row>

          <Row className="air-tax">
            <Col md={6}>Tax</Col>
            <Col md={6} className="fare-amount">
              {`${props.currencyType}. ${props.fareSummary&&props.fareSummary.taxes}`}
            </Col>
          </Row>
        </Col>
        <Col md={5}></Col>
      </Row>
    </React.Fragment>
  );
};

export default FareSummaryCard;
