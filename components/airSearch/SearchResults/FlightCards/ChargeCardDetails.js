import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const ChargeCardDetails = (props) => {
  console.log("ChargeCardDetails, ", props);

  const getPriceFormat = (price) => {
    if (price === undefined) {
      return " 0.0";
    } else {
      if (price !== null) {
        let stPrice = price.substring(3);
        let type = price.substring(0, 3);

        return ` ${type}. ${stPrice}`;
      }
    }
  };

  return (
    <React.Fragment>
      <Card className="slc-airs">
        <Card.Title>
          <span className="title-icon">Icon</span>
          <span className="travel-dt-inf">{props.fareCalc}</span>
        </Card.Title>
        <Card.Body className="penalty-area">
          <Row className="charge-inf">
            <Col md={6}>
              <span>Passenger</span>
            </Col>
            <Col md={6} className="charge-details">
              <span>
                Time frame & Amount
                <small> (From Scheduled flight departure)</small>
              </span>
            </Col>
          </Row>

          {props.data&&props.data.map((item, idx)=>{
            return(
              <Row>
              <React.Fragment>
                <Col className="passenger-type" md={6}>
                  {item && item.key}
                </Col>
                <Col md={6} className="penalty">
                  {item.penalty &&
                    item.penalty.map((item, pIdx) => {
                      return (
                        <React.Fragment key={`cp-${pIdx}`}>
                          <Row>
                            <Col md={12}>
                              <span className="cond">
                                {item.penaltyApplies}
                              </span>
                              <span className="amount">
                                {item.amount === null ? "0.0" : getPriceFormat(item.amount)}
                              </span>
                            </Col>
                          </Row>
                        </React.Fragment>
                      );
                    })}
                </Col>
              </React.Fragment>
            </Row>
            )
          })}
          
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ChargeCardDetails;
