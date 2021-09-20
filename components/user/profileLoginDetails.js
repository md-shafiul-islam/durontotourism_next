import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import AddPhoneNoModal from "../Modals/Profile/addPhoneNoModal";
import ChangePasswordModal from "../Modals/Profile/changePasswordModal";

const ProfileLoginDetails = () => {
  const [phoneStatus, setPhoneStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-secondary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">Login Details</div>
                  <p className="pfl-basi-tag">
                    Manage your email address mobile number and password
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="pfl-table-paren mt-5">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Mobile Number</th>
                  <td colSpan="3">
                    <button
                      className="prf-add-btn"
                      onClick={() => {
                        setPhoneStatus(true);
                      }}
                    >
                      +Add your mobile number
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email ID</th>
                  <td colSpan="2" className="email-text">
                    md.shafiul2014bd@gmail.com
                  </td>

                  <td>
                    <span className="sts-icon">
                      <i className="fas fa-check-square text-success"></i>
                    </span>
                    <span>Verified</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Password</th>
                  <td colSpan="3">
                    <div className="psw-area">
                      <span className="pswd">•••••••</span>
                      <span className="pswd-change">
                        <button onClick={()=>setPasswordStatus(true)}>Change Password?</button>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <AddPhoneNoModal
        show={phoneStatus}
        hideAction={() => {
          setPhoneStatus(false);
        }}
      />

      <ChangePasswordModal
        show={passwordStatus}
        hideAction={() => {
          setPasswordStatus(false);
        }}
      />
    </React.Fragment>
  );
};

export default ProfileLoginDetails;
