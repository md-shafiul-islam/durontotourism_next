/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
  addGuestTraveler,
  getUserTravelers,
} from "../../redux/actions/userAction";
import ContentModal from "../Modals/ContentModal";
import AddTravelerModal from "../Modals/Profile/addTravelerModal";
import ProfileBookingInfForm from "../profile/ProfileBookingInfForm";
import TravelerInformationForm from "../profile/TravelerInformationForm";
import { CUSTOMER_ADD_TRAVELER_INFO_SEND } from "../../redux/types";
import LoaderSpiner from "../../utils/helper/loaderSpiner";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import TravelersViewCard from "./TravelersViewCard";

const ProfileSaveTraveller = ({
  travelerAdded,
  travelerSendStatus,
  travelers,
  ...props
}) => {
  const [addTravelerStatus, setAddTravelerStatus] = useState(false);
  const dispatch = useDispatch();
  console.log("Current Travelrs, ", travelers);
  useEffect(() => {
    if (helperIsEmpty(travelers)) {
      props.getUserTravelers();
    }
  }, []);

  useEffect(() => {
    if (travelerAdded) {
      if (travelerAdded.status) {
        dispatch({
          payload: false,
          type: CUSTOMER_ADD_TRAVELER_INFO_SEND,
        });
        setAddTravelerStatus(false);
      }
    }
  }, [travelerAdded]);

  const saveTravelerAction = (travelerData) => {
    const traveler = travelerData;

    props.addGuestTraveler(traveler);
  };

  return (
    <React.Fragment>
      <LoaderSpiner
        show={props.travelerSendStatus}
        loadingText="Submiting Traveler Info"
      />
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-primary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">Guest Traveller(s)</div>
                  <p className="pfl-basi-tag">
                    You have {travelers.length} Traveller
                    {travelers.length > 1 ? `s` : ""}
                  </p>
                </div>

                <div className="add-traveller-area">
                  <button
                    className="add-btn"
                    onClick={() => {
                      setAddTravelerStatus(true);
                    }}
                  >
                    Add Traveler
                  </button>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md={12}>
              {travelers && (
                <TravelersViewCard travelers={travelers} />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <ContentModal
        title="Add Traveler "
        actionClose={() => {
          setAddTravelerStatus(false);
        }}
        show={addTravelerStatus}
      >
        <TravelerInformationForm
          isExtendedField={true}
          formSubmitAction={saveTravelerAction}
        />
      </ContentModal>
    </React.Fragment>
  );
};

ProfileSaveTraveller.prototypes = {
  addGuestTraveler: PropTypes.func.isRequired,
  getUserTravelers: PropTypes.func.isRequired,
  travelerAdded: PropTypes.object.isRequired,
  travelerSendStatus: PropTypes.object.isRequired,
  travelers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    travelerAdded: state.user.travelerAdded,
    travelerSendStatus: state.user.travelerAddSendingStatus,
    travelers: state.user.travelers,
  };
};

export default connect(mapStateToProps, { addGuestTraveler, getUserTravelers })(
  ProfileSaveTraveller
);
