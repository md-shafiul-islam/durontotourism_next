/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
  getUserMailChaneAction,
  getUserPhoneChaneAction,
} from "../../redux/actions/userAction";
import { esHelperOnlyDate } from "../../utils/ui/esFuncs";
import SingleMailForm from "../CstForm/SingleMailForm";
import SinglePhoneForm from "../CstForm/SinglePhoneForm";
import ContentModal from "../Modals/ContentModal";
import ChangePasswordModal from "../Modals/Profile/changePasswordModal";
import { REST_MAIL_CHANGE, REST_PHONE_CHANGE } from "../../redux/types";

const ProfileLoginDetails = (props) => {
  const dispatch = useDispatch();

  const [passwordStatus, setPasswordStatus] = useState(false);
  const [mailChangeModalStatus, setMailChangeModalStatus] = useState(false);
  const [phoneChangeModalStatus, setPhoneChangeModalStatus] = useState(false);
  const [phoneChangeMessage, setPhoneChangeMessage] = useState("");
  const [mailChangeMessage, setMailChangeMessage] = useState("");

  const { customer } = props;

  //mailChangeModalStatus phoneChangeModalStatus
  const changeMailAction = (values) => {
    props.getUserMailChaneAction(values);
  };
  const changePhoneNoAction = (values) => {
    props.getUserPhoneChaneAction(values);
  };

  const refreshCustomerInfo = (type) => {
    console.log("Rferesh Customer Via, ", type);
  };

  useEffect(() => {
    if (props.phoneChangeStatus && phoneChangeModalStatus) {
      if (props.phoneChangeStatus.status) {
        setPhoneChangeModalStatus(false);
        dispatch({
          payload: true,
          type: REST_PHONE_CHANGE,
        });

        refreshCustomerInfo("Phone");
      } else {
        if (props.phoneChangeStatus.status) {
          setPhoneChangeMessage(props.phoneChangeStatus.message);
        }
      }
    }
  }, [props.phoneChangeStatus]);

  useEffect(() => {
    if (props.mailChangeStatus && mailChangeModalStatus) {
      if (props.mailChangeStatus.status) {
        setMailChangeModalStatus(false);
        dispatch({
          payload: true,
          type: REST_MAIL_CHANGE,
        });
        refreshCustomerInfo("Mail");
      } else {
        if (props.mailChangeStatus.status) {
          setMailChangeModalStatus(props.mailChangeStatus.message);
        }
      }
    }
  }, [props.mailChangeStatus]);

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
                    {esHelperOnlyDate(customer && customer.since)}
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
                        setPhoneChangeModalStatus(true);
                      }}
                    >
                      Change
                    </span>
                  </td>
                  <td>
                    {props.getVerifideIcon(customer && customer.phoneVerified)}
                  </td>
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
                        setMailChangeModalStatus(true);
                      }}
                    >
                      Change
                    </span>
                  </td>
                  <td>
                    {props.getVerifideIcon(customer && customer.emailVerified)}
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
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <ContentModal
        show={phoneChangeModalStatus}
        actionClose={(isClose) => {
          setPhoneChangeModalStatus(isClose);
        }}
        actionCloseStatus={false}
      >
        <SinglePhoneForm submitAction={changePhoneNoAction} message={phoneChangeMessage} />
      </ContentModal>

      <ContentModal
        show={mailChangeModalStatus}
        actionClose={(isClose) => {
          setMailChangeModalStatus(isClose);
        }}
        actionCloseStatus={false}
      >
        <SingleMailForm submitAction={changeMailAction} message={mailChangeMessage} />
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
