import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstSplitInputField from "../../Fields/CstSplitInputField";
import CountDwonTimer from "../../Timer/CountDwonTimer";
import VerifiedStatus from "./VerifiedStatus";

const VerifyOptionCard = (props) => {
  const [reSendStatus, setReSendStatus] = useState(false);
  const [verifingStatus, setVerifingStatus] = useState(false);
  const [verifyActionStatus, setVerifyActionStatus] = useState(false);

  useEffect(() => {
    setVerifingStatus(props.verifyStatus);
    if (props.verifyStatus) {
      setVerifyActionStatus(true);
    }
  }, [props.verifyStatus]);

  const reSendViaStatus = () => {
    console.log("Run Re Send Via Status, ");
    // props.getReSendAction();
    setVerifyActionStatus(false);
    setVerifingStatus(true);
  };

  const verifyAction = () => {
    props.verifyAction();
    setVerifyActionStatus(true);
  };

  const togolVerifingOption = () => {
    const lV = verifingStatus;
    setVerifingStatus(!lV);
  };

  const resendAction = () => {
    if (reSendStatus) {
      console.log("Resend Verify request Sending ...");
      props.getReSendAction();
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
                  <CountDwonTimer
                    countDwonStatus={setReSendStatus}
                    remainigTime={props.remTime}
                  />
                </Col>
              </Row>
              <Row className="input-area-row">
                <Col md={{ offset: 2, span: 3 }} className="resend-container">
                  <span className="resend-text" onClick={resendAction}>
                    Resend
                  </span>
                </Col>
                <Col md={{ span: 3, offset: 4 }} className="d-grid gap-2">
                  <Button onClick={verifyAction}>Submit</Button>
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
      {/* {console.log("Veryfied Action Status, ", verifyActionStatus)}
      {console.log("Veryfing Status, ", verifingStatus)} */}
      <Card.Title className="bg-primary text-white verify-item-title">
        {props.title}
      </Card.Title>
      <Row>
        <Col md={9} className="verify-action-container">
          <div className="verify-action-content">
            <span>{props.methodeId}</span>
          </div>
        </Col>
        <Col md={3} className="action-btn-area">
          <Button className="verify-action-btn" variant="info" onClick={togolVerifingOption}>
            Verify
          </Button>
        </Col>
      </Row>
      {getVerifyStatusContent()}
      {getContent()}
    </Card>
  );
};

export default VerifyOptionCard;
