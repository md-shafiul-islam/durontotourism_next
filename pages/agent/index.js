import React, { Component } from "react";
import { Breadcrumb, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import AgentCompanyInfo from "../../components/agent/profile/AgentCompanyInfo";
import AgentGeneralInfo from "../../components/agent/profile/AgentGeneralInfo";
import AgentOwnerInfo from "../../components/agent/profile/AgentOwnerInfo";
import AgentSecurityContent from "../../components/agent/securityAndLogin/AgentSecurityContent";
import SubAgentTab from "../../components/agent/subagent/SubAgentTab";
import ProfileBasicInfo from "../../components/user/profileBasicInfo";

class GetAgentIndexPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className="gx-5">
          <Col md={12}>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">My Account</Breadcrumb.Item>
              <Breadcrumb.Item active>My Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="agent-area">
            <Tab.Container id="left-tabs-example" defaultActiveKey="general">
              <Row>
                <Col sm={3} className="agent-sidebar gx-5 gy-4">
                  <Card>
                    <Card.Body>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="general">General</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="company">Company</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="owner">Owner</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="security">
                            Security & Login
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="subAgent">Sub Agent</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={9} className="agent-content gx-5 gy-4">
                  <Tab.Content>
                    <Tab.Pane eventKey="general">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={12}>
                              <AgentGeneralInfo title="General Information" />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="company">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={12}>
                              <AgentCompanyInfo />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="owner">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={12}>
                              <AgentOwnerInfo />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="subAgent">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={12}>
                              <SubAgentTab />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="security">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={12}>
                              <AgentSecurityContent />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default GetAgentIndexPage;
