import React,{useState} from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import ChargeCardDetails from "../airSearch/SearchResults/FlightCards/ChargeCardDetails";
import AirPenaltyOrRuleDetails from "./airPenaltyOrRuleDetails";

const FareRuleCard = (params) => {
  const [key, setKey] = useState("flightDetails");

  return (
    <React.Fragment>
      <Tab.Container id="menu-tabs" defaultActiveKey="cancellation">
        <Row>
          <Col sm={12} className="price-fare-rule-tab">
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link eventKey="cancellation" ><span className="price-arrow-down"></span>Cancellation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="dateChange" ><span className="price-arrow-down"></span>Date Change</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="cancellation">
                <AirPenaltyOrRuleDetails penaltyList={params.cancelPenalty}/>
              </Tab.Pane>
              <Tab.Pane eventKey="dateChange">
              
                <AirPenaltyOrRuleDetails penaltyList={params.changePenalty}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default FareRuleCard;
