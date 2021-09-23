import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import BasicActionLink from "../BasicActionLink";
import ProfileHeader from "../profile/ProfileHeader";

const AgentSecurityContent = (params) => {
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <ProfileHeader title="Security And Login" />
          <Row>
            <Col md={12}>
              <div className="pfl-table-paren mt-5">
                <table className="table table-hover">
                  <tbody>
                    <tr>
                      <th scope="row">Since</th>
                      <td colSpan="3">12/05/2020</td>
                    </tr>
                    <tr>
                      <th scope="row">Agent ID</th>
                      <td colSpan="3">AG-498494984</td>
                    </tr>
                    
                    <tr>
                      <th scope="row">Email</th>
                      <td colSpan="3">shafiul2014bd@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone</th>
                      <td colSpan="3">+880 1725686029</td>
                    </tr>
                    <tr>
                      <th scope="row">Change Password</th>
                      <td colSpan="3"><BasicActionLink label="Change" action="" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default AgentSecurityContent;
