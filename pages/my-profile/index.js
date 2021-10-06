import React, { Component } from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import EmptyCont from "../../utils/helper/emptyCont";

import ProfileBasicInfo from "../../components/user/profileBasicInfo";
import ProfileLoginDetails from "../../components/user/profileLoginDetails";
import ProfileSaveTraveller from "../../components/user/profileSaveTraveller";
import ProfileSideBar from "../../components/user/profileSideBar";
import ProfileStatus from "../../components/user/profileStatus";
import ProfileBookingInformation from "../../components/profile/ProfileBookingInformation";

class ProfilePage extends Component {
  componentDidMount() {
    this.scrollSpyActive();
  }

  scrollSpyActive = () => {
    let items = document.querySelectorAll(".prf_item");

    window.onscroll = () => {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

      items &&
        items.forEach((item, idx) => {
          if (item.offsetTop <= scrollPosition) {
            console.log("CT item, ", item.id);

            let ctActive = document.querySelector(`.list-group-item.active`);

            if (ctActive) {
              if (
                ctActive.classList !== undefined &&
                ctActive.classList !== null
              ) {
                ctActive.classList.remove("active");
              }
            }
            let ctitem = document.querySelector(
              `.list-group-item[data-id="${item.id}"]`
            );

            console.log("Curent Selected Item Profile ", ctitem);
            if (ctitem !== undefined && ctitem !== null) {
              ctitem.classList.add("active");
            }

            //this.changeActiveStatus(element.id);
          }
        });
    };
  };

  valida;

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
                className="scrollspy-example profile-content"
                tabIndex="0"
              >
                <Row className="profile-card-area">
                  <Card>
                    <Card.Body>
                      <Col md={12}>
                        <ProfileStatus />
                      </Col>
                      <Col md={12} id="profile" className="prf_item">
                        <ProfileBasicInfo
                          title="Genarel Info"
                          tagLine="Basic info, for faster booking experience"
                        />
                      </Col>
                    </Card.Body>
                  </Card>
                </Row>

                <Row className="profile-card-area">
                  <Card>
                    <Card.Body>
                      <Col md={12} id="saveTravellers" className="prf_item">
                        <ProfileBookingInformation title="Personal Infomation" />
                      </Col>
                    </Card.Body>
                  </Card>
                </Row>

                <Row className="profile-card-area">
                  <Card>
                    <Card.Body>
                      <Col md={12} id="loginDetails" className="prf_item">
                        <ProfileLoginDetails />
                      </Col>
                    </Card.Body>
                  </Card>
                </Row>

                <Row className="profile-card-area">
                  <Card>
                    <Card.Body>
                      <Col md={12} id="saveTravellers" className="prf_item">
                        <ProfileSaveTraveller />
                      </Col>
                    </Card.Body>
                  </Card>
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


export async function getStaticProps({ params: {slug} }) {
  // ↓add 
  console.log(`BookingPage slug: ${slug}`)
}

export default ProfilePage;
