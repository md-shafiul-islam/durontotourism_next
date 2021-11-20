import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getUserMailChaneAction,
  getUserPhoneChaneAction,
} from "../../redux/actions/userAction";
import { esHelperOnlyDate } from "../../utils/ui/esFuncs";
import SingleMailForm from "../CstForm/SingleMailForm";
import SinglePhoneForm from "../CstForm/SinglePhoneForm";
import ContentModal from "../Modals/ContentModal";
import ChangePasswordModal from "../Modals/Profile/changePasswordModal";

const ProfileLoginDetails = (props) => {
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [mailChangeStatus, setMailChangeStatus] = useState(false);
  const [phoneChangeStatus, setPhoneChangeStatus] = useState(false);
  console.log("ProfileLoginDetails Customer ", props);
  const { customer } = props;

  const getVerifideIcon = (status) => {
    if (status) {
      return (
        <React.Fragment>
          <span className="sts-icon">
            <i className="fas fa-check-square text-success"></i>
          </span>
          <span>Verified</span>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <span className="sts-icon">
          <i className="far fa-window-close text-danger"></i>
        </span>
        <span>Not Verified</span>
      </React.Fragment>
    );
  };

  const changeMailAction = (values) => {
    props.getUserMailChaneAction(values);
  };
  const changePhoneNoAction = (values) => {
    props.getUserPhoneChaneAction(values);
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
                    <span
                      className="change-action"
                      onClick={() => {
                        setPhoneChangeStatus(true);
                      }}
                    >
                      Change
                    </span>
                  </td>
                  <td>{getVerifideIcon(customer && customer.phoneVerified)}</td>
                </tr>
                <tr>
                  <th scope="row">Email ID</th>
                  <td colSpan="2" className="email-text">
                    {customer && customer.email}
                  </td>
                  <td>
                    <span
                      className="change-action"
                      onClick={() => {
                        setMailChangeStatus(true);
                      }}
                    >
                      Change
                    </span>
                  </td>
                  <td>{getVerifideIcon(customer && customer.mailVerified)}</td>
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
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <ContentModal
        show={phoneChangeStatus}
        actionClose={(isClose) => {
          setPhoneChangeStatus(isClose);
        }}
        actionCloseStatus={false}
      >
        <SinglePhoneForm submitAction={changePhoneNoAction} />
      </ContentModal>

      <ContentModal
        show={mailChangeStatus}
        actionClose={(isClose) => {
          setMailChangeStatus(isClose);
        }}
        actionCloseStatus={false}
      >
        <SingleMailForm submitAction={changeMailAction} />
      </ContentModal>

      <ChangePasswordModal
        show={passwordStatus}
        hideAction={() => {
          setPasswordStatus(false);
        }}
      />
    </React.Fragment>
  );
};

ProfileLoginDetails.prototype = {
  getUserPhoneChaneAction: PropTypes.func.isRequired,
  getUserMailChaneAction: PropTypes.func.isRequired,
  phoneChangeStatus: PropTypes.object.isRequired,
  mailChangeStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    customer:
      state.customer &&
      state.customer.customerInf &&
      state.customer.customerInf.customer,
    mailChangeStatus: state.user.mailChangeStatus,
    phoneChangeStatus: state.user.phoneChangeStatus,
  };
};

export default connect(mapStateToProps, {
  getUserPhoneChaneAction,
  getUserMailChaneAction,
})(ProfileLoginDetails);
