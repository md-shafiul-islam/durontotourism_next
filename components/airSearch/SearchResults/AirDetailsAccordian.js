import React, { useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";

const AirDetailsAccordian = (props) => {
  return (
    <Col md={12} style={{ margin: 0, padding: 0 }}>
      <Accordion defaultActiveKey="">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Flight Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="accordian-tab">{props.children}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Col>
  );
};

export default AirDetailsAccordian;
