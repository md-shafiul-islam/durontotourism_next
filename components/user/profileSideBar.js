import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProfileImage from "./profileImage";

const ProfileSideBar = (props) => {
  const { data, status } = useSession();

  const moveScrolPosition = (elm, e) => {
    let currentElm = document.querySelector(elm);
    let bodyReact = document.body.getBoundingClientRect();
    let ctReact = currentElm && currentElm.getBoundingClientRect();
    let getAllItems = document.querySelectorAll(".list-group-item");

    if (currentElm) {
      let offSet = ctReact.top - bodyReact.top;

      // console.log("Befor Current OffSet, ", offSet);

      if (offSet > 50) {
        offSet = offSet - 50;
      }

      if (getAllItems) {
        getAllItems.forEach((item, idx) => {
          let id = item && item.getAttribute("ctElm");

          console.log("Current Idx Item ", id, ", ", item);
          if (item !== undefined && item !== null) {
            if (id === elm) {
              if (item.classList !== undefined && item.classList !== null) {
                console.log("Befor Run item.classList, ", item.classList);
                item && item.classList && item.classList.add("active");
              }
            } else {
              if (item.classList !== undefined && item.classList !== null) {
                console.log("Else Befor Run item.classList, ", item.classList);

                if (item.classList.contains("active")) {
                  item.classList.remove("active");
                }
              }
            }
          }
        });
      }
      window&&window.scroll(0, offSet);
    }
  };

  return (
    <React.Fragment>
      <Card className="shadow s-cont sticky-top sticky-sidbar">
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
              <h5>{data && data.user && data.user.fullName}</h5>
              <span>personal profile</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul className="list-group side-menu">
                <li
                  ctElm="#profile"
                  data-id="profile"
                  className="list-group-item active"
                  onClick={(e) => {
                    moveScrolPosition("#profile", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>General</span>
                </li>
                <li
                  ctElm="#personalInformation"
                  data-id="personalInformation"
                  className="list-group-item"
                  onClick={(e) => {
                    moveScrolPosition("#personalInformation", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-users"></i>
                  </span>{" "}
                  <span>Pesonal Info</span>
                </li>

                <li
                  ctElm="#loginDetails"
                  data-id="loginDetails"
                  className="list-group-item"
                  onClick={(e) => {
                    moveScrolPosition("#loginDetails", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span>Security & Login</span>
                </li>

                <li
                  ctElm="#saveTravellers"
                  data-id="saveTravellers"
                  className="list-group-item"
                  onClick={(e) => {
                    moveScrolPosition("#saveTravellers", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span>Guest Traveler</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ProfileSideBar;
