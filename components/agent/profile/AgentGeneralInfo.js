import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ProfileHeader from "./ProfileHeader";

const AgentGeneralInfo = (params) => {
  const { agentInf } = params;
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <ProfileHeader title={params.title} isEdit={false} />
          <div className="pfl-table-paren mt-5">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Since</th>
                  <td colSpan="3">{agentInf && agentInf.since}</td>
                </tr>
                <tr>
                  <th scope="row">Agent ID</th>
                  <td colSpan="3">{agentInf && agentInf.id}</td>
                </tr>
                <tr>
                  <th scope="row">Applicant Name</th>
                  <td colSpan="3">{agentInf && agentInf.applicantName}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td colSpan="3">{agentInf && agentInf.email}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td colSpan="3">{agentInf && agentInf.phoneCode} {agentInf && agentInf.phoneNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

AgentGeneralInfo.prototypes = {
  agentInf: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    agentInf: state.agent.loginAgent && state.agent.loginAgent.agentGenarelInfo,
  };
};

export default connect(mapStateToProps, null)(AgentGeneralInfo);
