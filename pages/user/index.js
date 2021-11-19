import React, { Component } from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import EmptyCont from "../../utils/helper/emptyCont";

import ProfileBasicInfo from "../../components/user/profileBasicInfo";
import ProfileLoginDetails from "../../components/user/profileLoginDetails";
import ProfileSaveTraveller from "../../components/user/profileSaveTraveller";
import ProfileSideBar from "../../components/user/profileSideBar";
import ProfileStatus from "../../components/user/profileStatus";
import ProfileBookingInformation from "../../components/profile/ProfileBookingInformation";
import { getSession } from "next-auth/react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getCustomerAction } from "../../redux/actions/customerAction";
import { initialJwTokenToAuth } from "../../redux/actions/initialAction";
import { getPesonalInformationUpdate } from "../../redux/actions/userAction";
import CstProfilePageTab from "../../components/CstTabs/CstProfilePageTab";

class ProfilePage extends Component {
  componentDidMount() {
    initialJwTokenToAuth(this.props.accessToken);
    this.props.getCustomerAction();
  }

  updatePersonalInformationAction = (requestUpdateDate) => {
    this.props.getPesonalInformationUpdate(requestUpdateDate);
  };

  render() {
    return (
      <React.Fragment>
        <div className="profile-container">
          <Row className="gx-5 pt-5 pb-5">
            <Col md={12}>
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">My Account</Breadcrumb.Item>
                <Breadcrumb.Item active>My Profile</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="gx-5">
            <CstProfilePageTab />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context) {
  let session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: session,
  };
}

ProfilePage.prototypes = {
  getCustomerAction: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer && state.customer.customer,
  };
};

export default connect(mapStateToProps, {
  getCustomerAction,
  getPesonalInformationUpdate,
})(ProfilePage);
