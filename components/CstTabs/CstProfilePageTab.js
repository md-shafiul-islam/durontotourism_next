import React from "react";
import { Card, Col, Row, Tab } from "react-bootstrap";
import ProfileBookingInformation from "../profile/ProfileBookingInformation";
import ProfileBasicInfo from "../user/profileBasicInfo";
import ProfileLoginDetails from "../user/profileLoginDetails";
import ProfileSaveTraveller from "../user/profileSaveTraveller";
import CstTavNavMenu from "./CstProfileTabComp/CstTavNavMenu";
import ProfileBody from "./CstProfileTabComp/ProfileBody";

const CstProfilePageTab = (props) => {

  const getVerifideIcon = (status) => {
    if (status) {
      return (
        <React.Fragment>
          <span className="sts-icon">
            <i className="fas fa-check-square text-success"></i>
          </span>
          <span>Verified</span>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <span className="sts-icon">
          <i className="far fa-window-close text-danger"></i>
        </span>
        <span>Not Verified</span>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
        <Row>
          <Col sm={3}>
            <CstTavNavMenu />
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <ProfileBody contId="personalInformation">
                  <ProfileBasicInfo
                    title="Genarel Info"
                    tagLine="Basic info, for faster booking experience"
                    getVerifideIcon={getVerifideIcon}
                  />
                </ProfileBody>
              </Tab.Pane>
              <Tab.Pane eventKey="personalInformation">
                <ProfileBody contId="personalInformation">
                  <ProfileBookingInformation title="Personal Infomation" getVerifideIcon={getVerifideIcon} />
                </ProfileBody>
              </Tab.Pane>

              <Tab.Pane eventKey="loginDetails">
                <ProfileBody contId="loginDetails">
                  <ProfileLoginDetails getVerifideIcon={getVerifideIcon} />
                </ProfileBody>
              </Tab.Pane>

              <Tab.Pane eventKey="saveTravellers">
                <ProfileBody contId="saveTravellers">
                  <ProfileSaveTraveller />
                </ProfileBody>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default CstProfilePageTab;
