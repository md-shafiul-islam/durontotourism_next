/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import moment from "moment";
import CstSplitInputField from "../../Fields/CstSplitInputField";
import CountDwonTimer from "../../Timer/CountDwonTimer";
import VerifiedStatus from "./VerifiedStatus";
import { getMailVerifySendAction } from "../../../redux/actions/verifyAction";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";

const momntFomat = "MM DD YYYY, h:mm a";

const VerifyOptionCard = (props) => {
  const [verifingStatus, setVerifingStatus] = useState(false);
  const [verifyActionStatus, setVerifyActionStatus] = useState(false);
  const [verifyActionCount, setVerifyActionCount] = useState(0);
  const [mailSendingStatus, setMailSendingStatus] = useState(false);
  const [timeOutStatus, setTimeOutStatus] = useState(false);

  const { status, data } = useSession();

  const [remainingTime, setRemainingTime] = useState(undefined);
  useEffect(() => {
    const mTime = moment().add(props.remTime, "seconds");

    mTime.format(momntFomat);
    setRemainingTime(mTime);
  }, [mailSendingStatus]);

  useEffect(() => {
    setVerifingStatus(props.verifyStatus);
    if (props.verifyStatus) {
      setVerifyActionStatus(true);
    }
  }, [props.verifyStatus]);

  useEffect(() => {
    if (mailSendingStatus) {
      setMailSendingStatus(false);
    }
  }, [props.mailSend]);

  useEffect(() => {
    if (mailSendingStatus) {
      setMailSendingStatus(false);
      setTimeOutStatus(false);
    }
  }, [props.mailResend]);

  const reSendViaStatus = () => {
    console.log("Run Re Send Via Status, ");
    props.getReSendAction();
    setVerifyActionStatus(false);
    setVerifingStatus(true);
  };

  const verifyAction = () => {
    props.verifyAction();
    setVerifyActionStatus(true);
  };

  const togolVerifingOption = () => {
    if (verifyActionCount === 0) {
      if (data) {
        setMailSendingStatus(true);
        props.getMailVerifySendAction(data.accessToken, data.user);
      }
      let cnt = verifyActionCount + 1;
      setVerifyActionCount(cnt);
    }
    const lV = verifingStatus;
    setVerifingStatus(!lV);
  };

  const resendAction = () => {
    if (timeOutStatus) {
      console.log("Resend Verify request Sending ...");
      props.getReSendAction();
      setMailSendingStatus(true);
    } else {
      console.log("Cant't Resend Verify request :) ");
    }
  };

  const getVerifyStatusContent = () => {
    if (verifingStatus && verifyActionStatus) {
      return (
        <Card.Body>
          <VerifiedStatus
            verify={props.verify}
            label={props.statusTitle}
            resendAction={reSendViaStatus}
          />
        </Card.Body>
      );
    }
    return "";
  };

  const getContent = () => {
    if (verifingStatus && !verifyActionStatus) {
      return (
        <Card.Body>
          <Row className="input-area-row">
            <Col md={12}>
              <span className="field-label">
                <label>
                  {props.label}
                  <br />
                  {props.methodeId}
                </label>
              </span>
              <Row>
                <Col md={2}>
                  <span className="code-label">
                    <label>OTP</label>
                  </span>
                </Col>
                <Col md={6}>
                  <CstSplitInputField
                    name={props.name}
                    digits={props.digits}
                    colSize={props.colSize}
                    changeHandeler={props.changeHandeler}
                  />
                </Col>
                <Col md={4} className="verify-timer">
                  {!mailSendingStatus ? (
                    <CountDwonTimer
                      timeTillDate={remainingTime}
                      timeFormat={momntFomat}
                      radiusSize={props.remTime}
                      message="Time Out"
                      isComplete={timeOutStatus}
                      onComplete={(isDone) => {
                        setTimeOutStatus(isDone);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row className="input-area-row">
                <Col md={{ offset: 2, span: 3 }} className="resend-container">
                  <span className="resend-text" onClick={resendAction}>
                    Resend
                  </span>
                </Col>
                <Col md={{ span: 3, offset: 4 }} className="d-grid gap-2">
                  <Button onClick={verifyAction} disabled={timeOutStatus}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      );
    }
  };
  return (
    <Card className="verify-item">
      <LoaderSpiner show={mailSendingStatus} loadingText="Mail Sending ..." />
      {/* {console.log("Veryfied Action Status, ", verifyActionStatus)}
      {console.log("Veryfing Status, ", verifingStatus)} */}
      <Card.Title className="bg-primary text-white verify-item-title">
        {props.title}
      </Card.Title>
      {!verifingStatus ? (
        <Row>
          <Col md={9} className="verify-action-container">
            <div className="verify-action-content">
              <span>{props.methodeId}</span>
            </div>
          </Col>
          <Col md={3} className="action-btn-area">
            <Button
              className="verify-action-btn"
              variant="info"
              onClick={togolVerifingOption}
            >
              Verify
            </Button>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {getVerifyStatusContent()}
      {getContent()}
    </Card>
  );
};

VerifyOptionCard.prototype = {
  getMailVerifySendAction: PropTypes.func.isRequired,
  mailSend: PropTypes.object.isRequired,
  mailResend: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    mailSend: state.verify.verifyMailSend,
    mailResend: state.verify.mailResend,
  };
};

export default connect(mapStateToProps, { getMailVerifySendAction })(
  VerifyOptionCard
);
