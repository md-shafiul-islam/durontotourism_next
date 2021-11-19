import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const ProfileBody = (props) => {
  console.log("props ", props);
  return (
    <React.Fragment>
      <Row className="profile-card-area">
        <Card>
          <Card.Body className="prof-card">
            <Col md={12}>{props.children}</Col>
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default ProfileBody;
