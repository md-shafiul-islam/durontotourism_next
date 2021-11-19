import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { esGetDateByAdding } from "../../utils/helper/esDateFunc";
import { esHelperOnlyDate } from "../../utils/ui/esFuncs";
import AddPhoneNoModal from "../Modals/Profile/addPhoneNoModal";
import ChangePasswordModal from "../Modals/Profile/changePasswordModal";

const ProfileLoginDetails = (props) => {
  const [phoneStatus, setPhoneStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  console.log("ProfileLoginDetails Customer ", props);
  const { customer } = props;

  const getVerifideIcon = (status) => {
    if (status) {
      return <i className="fas fa-check-square text-success"></i>;
    }

    return <i className="fas fa-check-square text-success"></i>;
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-primary"></span>
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
                  <th scope="row">Since</th>
                  <td colSpan="3">
                    {esHelperOnlyDate(customer && customer.date)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">User ID</th>
                  <td colSpan="3">{customer && customer.id}</td>
                </tr>
                <tr>
                  <th scope="row">Mobile Number</th>
                  <td colSpan="2">{customer && customer.phoneNo}</td>
                  <td>
                    {" "}
                    {getVerifideIcon(customer && customer.phoneVerified)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email ID</th>
                  <td colSpan="2" className="email-text">
                    {customer && customer.email}
                  </td>

                  <td>
                    <span className="sts-icon">
                      {getVerifideIcon(customer && customer.mailVerified)}
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
                        <button onClick={() => setPasswordStatus(true)}>
                          Change Password?
                        </button>
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

const mapStateToProps = (state) => {
  return {
    customer:
      state.customer &&
      state.customer.customerInf &&
      state.customer.customerInf.customer,
  };
};

export default connect(mapStateToProps, null)(ProfileLoginDetails);
