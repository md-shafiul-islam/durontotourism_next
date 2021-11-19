import { useSession } from "next-auth/react";
import React from "react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import ProfileImage from "../../user/profileImage";

const CstTavNavMenu = (props) => {

   const {data, status} = useSession();
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Row>
            <Col md={12} className="sidbar-image-area">
              <ProfileImage />
              <div className="prfile-img-editarea">
                <i className="fas fa-pencil-alt"></i>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="prof-name-tag">
              <h5>{data&&data.user && data.user.fullName}</h5>
              <span>personal profile</span>
            </Col>
          </Row>
          <Row>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="personalInformation">Pesonal Info</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="loginDetails">Security & Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="saveTravellers">Guest Traveler</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CstTavNavMenu;
