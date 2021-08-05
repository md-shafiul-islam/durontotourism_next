import { param } from "jquery";
import React from "react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";

const ProfileStatus = (props) => {
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Row>
            <Col md={8}>
              <div className="profile-status-area">
                <div className="sts-text">
                  <span className="title">Complete your Profile</span>
                  <span className="label-area">
                    {props.pregress ? props.pregress : `40`}%
                  </span>
                </div>

                <div className="ps-prog">
                  <ProgressBar variant="success" now={40} />
                </div>

                <div className="ps-tag">
                  <span>
                    {props.tagline
                      ? props.tagline
                      : "Get the best out of by adding the remaining details! "}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <span className="sts-icon">
                <i className="fas fa-check-square text-success"></i>
              </span>
              <span className="status-text">Varifide Email ID </span>
            </Col>
            <Col md={4}>
              <span>Varifide Phone</span>
            </Col>
            <Col md={4}>
              <span>Complite Basic Info</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ProfileStatus;
