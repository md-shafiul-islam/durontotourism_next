import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ContentModal from "../../Modals/ContentModal";
import BasicActionLink from "../BasicActionLink";
import ProfileHeader from "../profile/ProfileHeader";
import ChangeEmailOrPhone from "./ChangeEmailOrPhone";
import ChangePassword from "./ChangePassword";

const AgentSecurityContent = (params) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

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
                      <td colSpan="4">12/05/2020</td>
                    </tr>
                    <tr>
                      <th scope="row">Agent ID</th>
                      <td colSpan="4">AG-498494984</td>
                    </tr>

                    <tr>
                      <th scope="row">Email</th>
                      <td colSpan="3">shafiul2014bd@gmail.com</td>
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
                      <td colSpan="3">+880 1725686029</td>
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

export default AgentSecurityContent;
