import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProfileImage from "./profileImage";

const ProfileSideBar = (props) => {
  const moveScrolPosition = (elm, e) => {
    let currentElm = document.querySelector(elm);
    let bodyReact = document.body.getBoundingClientRect();
    let ctReact = currentElm.getBoundingClientRect();
    let getAllItems = document.querySelectorAll(".list-group-item");

    if (currentElm) {
      let offSet = ctReact.top - bodyReact.top;

      // console.log("Befor Current OffSet, ", offSet);

      if (offSet > 50) {
        offSet = offSet - 50;
      }

      if (getAllItems) {
        getAllItems.forEach((item, idx) => {
          let id = item.getAttribute("ctElm");

          // console.log();

          if (id === elm) {
            item.classList.add("active");
          } else {
            if (item.classList.contains("active")) {
              item.classList.remove("active");
            }
          }
        });
      }
      window.scroll(0, offSet);
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
              <h5>Name</h5>
              <span>personal profile</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul class="list-group side-menu">
                <li
                  ctElm="#profile"
                  data-id="profile"
                  class="list-group-item active"
                  onClick={(e) => {
                    moveScrolPosition("#profile", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>Profile</span>
                </li>
                <li
                  ctElm="#loginDetails"
                  data-id="loginDetails"
                  class="list-group-item"
                  onClick={(e) => {
                    moveScrolPosition("#loginDetails", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span>Login Details</span>
                </li>
                <li
                  ctElm="#saveTravellers"
                  data-id="saveTravellers"

                  class="list-group-item"
                  onClick={(e) => {
                    moveScrolPosition("#saveTravellers", e);
                  }}
                >
                  <span className="profile-icon">
                    <i className="fas fa-users"></i>
                  </span>{" "}
                  <span>Save Travellers</span>
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
