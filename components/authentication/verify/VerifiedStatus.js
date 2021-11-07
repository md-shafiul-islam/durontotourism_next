import React from "react";
import { Button } from "react-bootstrap";

const VerifiedStatus = ({ verify, label, ...props }) => {

  const getIcon = () => {
    if (verify) {
      if (verify.status) {
        return <i className="far fa-check-circle text-success"></i>;
      }
    }
    return <i className={`far fa-times-circle text-danger`}></i>;
  };
  return (
    <React.Fragment>
      <div className="verify-status-container">
        <div className="verify-contetnt">
          <span className={`icon`}>{getIcon()}</span>
          <span
            className={`${
              verify && verify.status ? "text-success" : "text-danger"
            } text`}
          >
            {label}{" "}{verify&&verify.status ? 'Successful' : 'Failed'}
          </span>
          <span
            className={`rsend-verify-content ${
              verify && verify.status ? " " : " active "
            }`}
          >
            <span className="resend-text">Verify request</span>
            <span onClick={props.resendAction} className="action-text">
              Resend
            </span>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifiedStatus;
