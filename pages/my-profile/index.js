import React, { Component } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import EmptyCont from "../commponents/helper/emptyCont";
import ProfileBasicInfo from "../commponents/user/profileBasicInfo";
import ProfileLoginDetails from "../commponents/user/profileLoginDetails";
import ProfileSaveTraveller from "../commponents/user/profileSaveTraveller";
import ProfileSideBar from "../commponents/user/profileSideBar";
import ProfileStatus from "../commponents/user/profileStatus";

class ProfilePage extends Component {

  componentDidMount(){
    this.scrollSpyActive();
  }

  scrollSpyActive = () => {

    let items = document.querySelectorAll(".prf_item");

    window.onscroll = () => {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

      items &&
        items.forEach((item, idx) => {
        
          if (item.offsetTop <= scrollPosition ) {
            
            console.log("CT item, ", item.id);

            let ctActive = document.querySelector(`.list-group-item.active`);

            if (ctActive) {
              ctActive.classList.remove("active");
            }
            let ctitem = document.querySelector(`.list-group-item[data-id="${item.id}"]`);

            console.log("Curent Selected Item Profile ", ctitem);
            if (ctitem) {
              ctitem.classList.add("active");
            }

            //this.changeActiveStatus(element.id);
          }
        });
    };
  };

  render() {
    return (
      <React.Fragment>
        <div className="profile-container">
          <Row className="gx-5">
            <Col md={12}>
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">My Account</Breadcrumb.Item>
                <Breadcrumb.Item active>My Profile</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="gx-5">
            <Col md={3}>
              <ProfileSideBar />
            </Col>
            <Col md={9}>
              <div
                data-bs-spy="scroll"
                data-bs-target="#profile"
                data-bs-offset="0"
                className="scrollspy-example"
                tabIndex="0"
              >
                <Row>
                  <Col md={12}>
                    <ProfileStatus />
                  </Col>
                </Row>

                <Row>
                  <Col md={12} id="profile" className="prf_item">
                    <ProfileBasicInfo />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} id="loginDetails" className="prf_item">
                    <ProfileLoginDetails />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} id="saveTravellers" className="prf_item">
                    <ProfileSaveTraveller />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <EmptyCont height="400px" />
        </div>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
