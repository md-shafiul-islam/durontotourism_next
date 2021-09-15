import React from "react";
import { Field, Form, Formik } from "formik";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import WithDrawRequest from "./withDraw/WithDrawRequest";
import RequestWithDarwList from "./withDraw/RequestWithDarwList";

const WithDrawContent = (params) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="recharg-option-nav">
          <Tab.Container id="witdDrawContent" defaultActiveKey="witdDrawRequest">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="witdDrawRequest">
                      Make Withdraw Request
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="requestList">Witddarw Request List</Nav.Link>
                  </Nav.Item>

                </Nav>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="witdDrawRequest">
                    <WithDrawRequest />
                  </Tab.Pane>
                  <Tab.Pane eventKey="requestList">
                    <RequestWithDarwList />
                  </Tab.Pane>
                  
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>

     </React.Fragment>
  );
};

export default WithDrawContent;
