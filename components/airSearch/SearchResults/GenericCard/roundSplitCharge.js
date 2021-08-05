import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { helperGetPrice } from "../../../../redux/actions/helperAction";

const RoundSplitCharge = (props) => {
  // console.log("RoundSplitCharge, ", props);
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
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

          {props.data &&
            props.data.map((item, idx) => {
              return (
                <Row key={`rnds-${idx}`}>
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
                                    {item.amount === null
                                      ? "0.0"
                                      : helperGetPrice(item.amount)}
                                  </span>
                                </Col>
                              </Row>
                            </React.Fragment>
                          );
                        })}
                    </Col>
                  </React.Fragment>
                </Row>
              );
            })}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default RoundSplitCharge;
