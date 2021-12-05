import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ContentModal from "../../Modals/ContentModal";
import BasicActionLink from "../BasicActionLink";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ProfileHeader from "../profile/ProfileHeader";
import ChangeEmailOrPhone from "./ChangeEmailOrPhone";
import ChangePassword from "./ChangePassword";

const AgentSecurityContent = (params) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const { agentInf } = params;
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <ProfileHeader title="Security And Login" isEdit={false} />
          <Row>
            <Col md={12}>
              <div className="pfl-table-paren mt-5">
                <table className="table table-hover">
                  <tbody>
                    <tr>
                      <th scope="row">Since</th>
                      <td colSpan="4">{agentInf&&agentInf.since}</td>
                    </tr>
                    <tr>
                      <th scope="row">Agent ID</th>
                      <td colSpan="4">{agentInf&&agentInf.id}</td>
                    </tr>

                    <tr>
                      <th scope="row">Email</th>
                      <td colSpan="3">{agentInf&&agentInf.email}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setEmailModal(true);
                          }}
                        >
                          Change
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Phone</th>
                      <td colSpan="3">
                        {agentInf&&agentInf.phoneCode} {agentInf&&agentInf.phoneNo}
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            setPhoneModal(true);
                          }}
                        >
                          Change
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Change Password</th>
                      <td colSpan="3">************</td>
                      <td>
                        <Button
                          onClick={() => {
                            setChangePasswordModal(true);
                          }}
                        >
                          Change
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ContentModal
        show={changePasswordModal}
        actionClose={(isColse) => {
          setChangePasswordModal(isColse);
        }}
      >
        <ChangePassword />
      </ContentModal>

      <ContentModal
        show={emailModal}
        actionClose={(isColse) => {
          setEmailModal(isColse);
        }}
      >
        <ChangeEmailOrPhone
          type={0}
          email="shafiul2014bd@gmail.com"
          submitAction={(email) => {
            console.log("Email Action ", email);
          }}
        />
      </ContentModal>

      <ContentModal
        show={phoneModal}
        actionClose={(isColse) => {
          setPhoneModal(isColse);
        }}
      >
        <ChangeEmailOrPhone
          type={1}
          phone="1725686029"
          code={5}
          submitAction={(phone) => {
            console.log("Phone Change Action ", phone);
          }}
        />
      </ContentModal>
    </React.Fragment>
  );
};

AgentSecurityContent.prototypes = {
  agentInf: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    agentInf: state.agent.loginAgent && state.agent.loginAgent.agentGenarelInfo,
  };
};

export default connect(mapStateToProps, null)(AgentSecurityContent);
