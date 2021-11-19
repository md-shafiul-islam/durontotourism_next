import React from "react";
import { Card, Col, Row, Tab } from "react-bootstrap";
import ProfileBookingInformation from "../profile/ProfileBookingInformation";
import ProfileBasicInfo from "../user/profileBasicInfo";
import ProfileLoginDetails from "../user/profileLoginDetails";
import ProfileSaveTraveller from "../user/profileSaveTraveller";
import CstTavNavMenu from "./CstProfileTabComp/CstTavNavMenu";
import ProfileBody from "./CstProfileTabComp/ProfileBody";

const CstProfilePageTab = (props) => {
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
                  />
                </ProfileBody>
              </Tab.Pane>
              <Tab.Pane eventKey="personalInformation">
                <ProfileBody contId="personalInformation">
                  <ProfileBookingInformation title="Personal Infomation" />
                </ProfileBody>
              </Tab.Pane>

              <Tab.Pane eventKey="loginDetails">
                <ProfileBody contId="loginDetails">
                  <ProfileLoginDetails />
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
