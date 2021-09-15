import React from "react";
import { Col, Row } from "react-bootstrap";

const PricingLayover = (params) => {

    console.log("Pricing Layover: ", params);
  return (
    <React.Fragment>
      <Row className="rnd-layover ">
        <Col md={12} className="rnd-layover-position">
          <div className="rnd-layover-overlay-container"></div>
          <div className="rnd-layover-content">
            <p>
              Change of Planes | {params.timeDiff} Layover in {params.layoverOrigin}
            </p>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PricingLayover;
