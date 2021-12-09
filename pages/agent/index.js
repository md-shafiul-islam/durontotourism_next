/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Breadcrumb, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import AgentCompanyInfo from "../../components/agent/profile/AgentCompanyInfo";
import AgentGeneralInfo from "../../components/agent/profile/AgentGeneralInfo";
import AgentOwnerInfo from "../../components/agent/profile/AgentOwnerInfo";
import AgentSecurityContent from "../../components/agent/securityAndLogin/AgentSecurityContent";
import SubAgentTab from "../../components/agent/subagent/SubAgentTab";
import {
  getCurrentAgentAction,
  getSubAgentAction,
} from "../../redux/actions/agentAction";
import { getSession, useSession } from "next-auth/react";
import {
  getCountryOptions,
  getCountryPhonCodeOptions,
} from "../../redux/actions/countriyAction";
import { helperIsEmpty } from "../../utils/helper/helperAction";

const GetAgentIndexPage = (params) => {
  const { status, data } = useSession();
  console.log("GetAgentIndexPage, ", status);
  useEffect(() => {
    if (status === "authenticated") {
      params.getCurrentAgentAction(data.accessToken);
      params.getSubAgentAction(data && data.accessToken);
    }
  }, [status]);

  useEffect(() => {
    if (helperIsEmpty(params.countryPhoneOptions)) {
      params.getCountryPhonCodeOptions();
    } else {
      if (params.countryPhoneOptions.length === 0) {
        params.getCountryPhonCodeOptions();
      }
    }

    if (helperIsEmpty(params.countryOptions)) {
      params.getCountryOptions();
    } else {
      if (params.countryOptions.length === 0) {
        params.getCountryOptions();
      }
    }
    initSubAgents();
  }, []);

  const initSubAgents = () => {
    if (params.subAgents) {
      if (!helperIsEmpty(params.subAgents)) {
        if (params.subAgents.length === 0) {
          params.getSubAgentAction(data && data.accessToken);
        }
      } else {
        params.getSubAgentAction(data && data.accessToken);
      }
    } else {
      params.getSubAgentAction(data && data.accessToken);
    }
  };

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
                          <Col md={12} className="owners-area">
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
};

GetAgentIndexPage.prototypes = {
  getCurrentAgentAction: PropTypes.func.isRequired,
  agent: PropTypes.object.isRequired,
  loginAgent: PropTypes.object.isRequired,
  countryPhoneOptions: PropTypes.object.isRequired,
  countryOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agent: state.agent.agent,
    loginAgent: state.agent.loginAgent,
    countryPhoneOptions: state.country.countryPhoneOptions,
    countryOptions: state.country.countryOptions,
  };
};

export async function getServerSideProps(context) {
  let session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/agent/login",
        permanent: false,
      },
    };
  }
  return {
    props: session && session.user,
  };
}

export default connect(mapStateToProps, {
  getCurrentAgentAction,
  getCountryOptions,
  getCountryPhonCodeOptions,
  getSubAgentAction,
})(GetAgentIndexPage);
