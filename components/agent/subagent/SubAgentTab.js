import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import RequestWithDarwList from "../../wallet/withDraw/RequestWithDarwList";
import WithDrawRequest from "../../wallet/withDraw/WithDrawRequest";
import AddSubAgent from "./AddSubAgent";
import SubAgentList from "./SubAgentList";

const SubAgentTab = (props) => {
  return (
    <React.Fragment>
      <Tab.Container id="witdDrawContent" defaultActiveKey="addSubAgentList">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="addSubAgent">
                  Add Sub Agent / Empolyee
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="addSubAgentList">
                  Sub Agent / Empolyee List
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="addSubAgent">
                <AddSubAgent />
              </Tab.Pane>
              <Tab.Pane eventKey="addSubAgentList">
                <SubAgentList />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default SubAgentTab;
