import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import ProfileHeader from "../profile/ProfileHeader";
import AddSubAgent from "./AddSubAgent";
import SubAgentList from "./SubAgentList";

const SubAgentTab = (props) => {
  return (
    <React.Fragment>
      <Col md={12} className="sub-agent-hrader">
        <span className="strip-left bg-primary"></span>
        <span className="title">Sub Agents</span>
      </Col>
      <Tab.Container id="witdDrawContent" defaultActiveKey="addSubAgentList">
        <Row className="mb-2">
          <Col sm={12}>
            <Nav variant="pills" className="flex-row mp-0">
              <Nav.Item>
                <Nav.Link eventKey="addSubAgentList">
                  Sub Agent / Empolyee List
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="addSubAgent">
                  Add Sub Agent / Empolyee
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
