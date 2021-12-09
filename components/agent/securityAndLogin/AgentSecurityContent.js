/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ContentModal from "../../Modals/ContentModal";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import ProfileHeader from "../profile/ProfileHeader";
import ChangeEmailOrPhone from "./ChangeEmailOrPhone";
import ChangePassword from "./ChangePassword";
import { esGetDateFormat } from "../../../utils/helper/esDateFunc";
import {
  getChangeAgentPassword,
  getChangeAgentPhone,
  getChangeAgentEmail,
} from "../../../redux/actions/agentAction";
import {
  REST_CHANGE_AGENT_EMAIL,
  REST_CHANGE_AGENT_PASS,
  REST_CHANGE_AGENT_PHONE,
} from "../../../redux/types";

const AgentSecurityContent = (params) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [emailSubmitinStatus, setEmailSubmitinStatus] = useState(false);
  const [phoneSubmitinStatus, setPhoneSubmitinStatus] = useState(false);
  const [passwordSubmitinStatus, setPasswordSubmitinStatus] = useState(false);
  const { agentInf } = params;

  console.log("AgentSecurityContent, params, ", params);

  const dispatch = useDispatch();

  useEffect(() => {
    if (emailSubmitinStatus && params.changeEmail !== undefined) {
      if (params.changeEmail.status) {
        dispatch({
          type: REST_CHANGE_AGENT_EMAIL,
          payload: true,
        });
        setEmailModal(false);
      }
    }
  }, [params.changeEmail]);

  
  useEffect(() => {
    if (phoneSubmitinStatus && params.changePhone !== undefined) {
      if (params.changePhone.status) {
        dispatch({
          type: REST_CHANGE_AGENT_PHONE,
          payload: true,
        });
        setPhoneModal(false);
      }
    }

  }, [params.changePhone]);

  useEffect(() => {
    if (passwordSubmitinStatus && params.restPassword !== undefined) {
      if (params.restPassword.status) {
        dispatch({
          type: REST_CHANGE_AGENT_PASS,
          payload: true,
        });
        setChangePasswordModal(false);
      }
    }
  }, [params.restPassword]);

  const changePhoneNo = (values) => {
    console.log("changePhoneNo, ", values);
    params.getChangeAgentPhone(values);
  };

  const changeEmailAction = (values) => {
    console.log("changeEmailAction, ", values);
    params.getChangeAgentEmail(values);
  };

  const changePasswordAction = (values) => {
    console.log("changePasswordAction, ", values);
    params.getChangeAgentPassword(values);
  };
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
                      <td colSpan="4">
                        {esGetDateFormat(agentInf && agentInf.since)}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Agent ID</th>
                      <td colSpan="4">{agentInf && agentInf.id}</td>
                    </tr>

                    <tr>
                      <th scope="row">Email</th>
                      <td colSpan="3">{agentInf && agentInf.email}</td>
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
                        {agentInf && agentInf.phoneCode}{" "}
                        {agentInf && agentInf.phoneNo}
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
        <ChangePassword
          submitAction={(values) => {
            changePasswordAction(values);
            setPasswordSubmitinStatus(true);
          }}
        />
      </ContentModal>

      <ContentModal
        show={emailModal}
        actionClose={(isColse) => {
          setEmailModal(isColse);
        }}
      >
        <ChangeEmailOrPhone
          type={0}
          email={agentInf && agentInf.email}
          submitAction={(values) => {
            changeEmailAction(values);
            setEmailSubmitinStatus(true);
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
          phone={agentInf && agentInf.phoneNo}
          code={agentInf && agentInf.phoneCode}
          options={params.phoneCodeOptions}
          submitAction={(values) => {
            changePhoneNo(values);
            setPhoneSubmitinStatus(true);
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
    phoneCodeOptions: state.country.countryPhoneOptions,
    restPassword: state.agent.restPassword,
    changeEmail: state.agent.changeEmail,
    changePhone: state.agent.changePhone,
  };
};

export default connect(mapStateToProps, {
  getChangeAgentPassword,
  getChangeAgentEmail,
  getChangeAgentPhone,
})(AgentSecurityContent);
