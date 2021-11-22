/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import CstImageUploadForm from "../../CstForm/CstImageUploadForm";
import ContentModal from "../../Modals/ContentModal";
import ProfileImage from "../../user/profileImage";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import { getUserProfileImageAddUpdateAction } from "../../../redux/actions/userAction";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";
import { getCustomerInformationAction } from "../../../redux/actions/customerAction";
import { REST_PROFILE_IMG_UPLOAD } from "../../../redux/types";

const CstTavNavMenu = (props) => {
  const [editActionStatus, setEditActionStatus] = useState(false);
  const [submitActionStatus, setSubmitActionStatus] = useState(false);
  const { data, status } = useSession();
  const dispatch = useDispatch();

  const profileImageUploadAction = (image) => {
    console.log("Selected Profile Image before Sending, ", image);
    props.getUserProfileImageAddUpdateAction(image);
    setSubmitActionStatus(true);
  };

  useEffect(() => {
    if (editActionStatus) {
      setEditActionStatus(false);
      console.log("Customer Info refreshing ... ");
    }

    if (submitActionStatus) {
      props.getCustomerInformationAction();
      dispatch({
        payload: true,
        type: REST_PROFILE_IMG_UPLOAD,
      });
      setSubmitActionStatus(false);
    }
  }, [props.uploadStatus]);

  const { customer, uploadStatus } = props;
  return (
    <React.Fragment>
      {console.log("Customer Profile information, ", customer)}
      <LoaderSpiner
        show={props.uploadStatus}
        loadingText="Image Uploading..."
      />
      <Card>
        <Card.Body>
          <Row>
            <Col md={12} className="sidbar-image-area">
              <ProfileImage imgUrl={customer && customer.imageUrl} />
              <div
                className="prfile-img-editarea"
                onClick={() => {
                  setEditActionStatus(true);
                }}
              >
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
      <ContentModal
        show={editActionStatus}
        actionClose={(isClose) => {
          setEditActionStatus(isClose);
        }}
      >
        <CstImageUploadForm submitAction={profileImageUploadAction} />
      </ContentModal>
    </React.Fragment>
  );
};

CstTavNavMenu.prototype = {
  getUserProfileImageAddUpdateAction: PropTypes.func.isRequired,
  getCustomerInformationAction: PropTypes.func.isRequired,
  uploadStatus: PropTypes.object.isRequired,
  profileImageChange: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    uploadStatus: state.user.imgUpStartStatus,
    profileImageChange: state.user.profileImageChange,
    customer:
      state.customer &&
      state.customer.customerInf &&
      state.customer.customerInf.customer,
  };
};

export default connect(mapStateToProps, {
  getUserProfileImageAddUpdateAction,
  getCustomerInformationAction,
})(CstTavNavMenu);
