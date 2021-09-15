import React from "react";
import { Accordion, Card } from "react-bootstrap";
import RoundSplitCharge from "./roundSplitCharge";
const RoundTripChargeDetailsCard = (params) => {
  // console.log("RoundTripChargeDetailsCard, ", params);

  return (
    <React.Fragment>
      <Accordion defaultActiveKey="ac-departure">
        <Card className="rndt-charge-card">
          <Accordion.Toggle as={Card.Header} eventKey="ac-departure" className="com-title">
            {params.depTitle}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="ac-departure">
            <Card.Body>
              <RoundSplitCharge data={params &&params.departurePenalties} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="rndt-charge-card">
          <Accordion.Toggle as={Card.Header} eventKey="ac-return" className="com-title">
            {params.retTitle}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="ac-return">
            <Card.Body>
                <RoundSplitCharge 
                    data={
                    params &&
                    params.returnPenalties
                    }
                />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </React.Fragment>
  );
};

export default RoundTripChargeDetailsCard;
