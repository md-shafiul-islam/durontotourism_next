/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ContentModal from "../Modals/ContentModal";
import ProfileBookingInfForm from "./ProfileBookingInfForm";
import SinglePhoneForm from "../CstForm/SinglePhoneForm";
import TravelerInformationForm from "./TravelerInformationForm";
import { PropTypes } from "prop-types";
import { useDispatch, connect } from "react-redux";
import {
  CUSTOMER_UPDATE_INFO_SEND,
  REST_CUSTOMER_TRAVEL_UPDATE,
} from "../../redux/types";
import LoaderSpiner from "../../utils/helper/loaderSpiner";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { getCustomerInformationAction } from "../../redux/actions/customerAction";
import { getPesonalInformationUpdate } from "../../redux/actions/userAction";

const ProfileBookingInformation = ({ customer, ...props }) => {
  console.log("ProfileBookingInformation, props, ", customer);
  const dispatch = useDispatch();

  const [displayModal, setDisplayModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

  useEffect(() => {
    if (helperIsEmpty(customer)) {
      props.getCustomerInformationAction();
    } else {
      if (!customer.fullName) {
        props.getCustomerInformationAction();
      }
    }
  }, []);

  useEffect(() => {
    if (displayModal) {
      setDisplayModal(false);
      dispatch({
        type: REST_CUSTOMER_TRAVEL_UPDATE,
        payload: true,
      });
      dispatch({
        type: CUSTOMER_UPDATE_INFO_SEND,
        payload: false,
      });
    }
  }, [props.updateStatus]);

  const personalInfoUpdate = (formData) => {
    formData.status = 1;
    const personalInf = formData;
    props.getPesonalInformationUpdate(personalInf);
  };

  const getDateFormat = (date) => {
    if (date) {
      date = new Date(date);

      return date.toDateString();
    }

    return "Not Set Yet";
  };

  const getCountry = (country) => {
    if (country) {
      return (
        <React.Fragment>
          <span className="country-row">
            <span className="flag">
              <span
                className={`flag-icon flag-icon-${
                  country.isoCode && country.isoCode.toLowerCase()
                } `}
              ></span>
            </span>
            <span>{country && country.isoCode},</span>
            <span>{country && country.name}</span>
          </span>
        </React.Fragment>
      );
    }

    return "";
  };

  return (
    <React.Fragment>
      <LoaderSpiner show={props.updateSendStatus} loadingText="Updating" />
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-primary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">{props.title}</div>
                  <p className="pfl-basi-tag">Personal Infomation Deatails</p>
                </div>

                <div className="add-traveller-area">
                  <Button
                    onClick={() => {
                      setDisplayModal(true);
                    }}
                    className="add-btn"
                  >
                    Edit/Update
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          <div className="pfl-table-paren mt-5 pesonalinfo">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">First & Middle name</th>
                  <td colSpan="3">{customer && customer.firstName}</td>
                </tr>
                <tr>
                  <th scope="row">Last Name</th>
                  <td colSpan="3">{customer && customer.lastName}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td colSpan="3">{customer && customer.gender}</td>
                </tr>

                <tr>
                  <th scope="row">Nationality</th>
                  <td colSpan="3">
                    {getCountry(customer && customer.nationality)}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Date of birth</th>
                  <td colSpan="3">
                    {getDateFormat(customer && customer.dateOfBirth)}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Passport No</th>
                  <td colSpan="3">{customer && customer.passportNo}</td>
                </tr>

                <tr>
                  <th scope="row">Passport Issuing Country</th>
                  <td colSpan="3">
                    {getCountry(customer && customer.passportIssuingCountry)}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Passport Expiry</th>
                  <td colSpan="3">
                    {getDateFormat(customer && customer.passportExpiry)}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Phone Number</th>
                  <td colSpan="2">{customer && customer.phoneNo}</td>
                  <td>
                    {props.getVerifideIcon(customer && customer.phoneVerified)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email ID</th>
                  <td colSpan="2" className="email-text">
                    {customer && customer.email}
                  </td>

                  <td>
                    {props.getVerifideIcon(customer && customer.emailVerified)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
        <ContentModal
          show={displayModal}
          actionClose={(isClose) => {
            setDisplayModal(isClose);
          }}
          name="profil-booking-inf"
          title="Personal Information"
        >
          {/* <ProfileBookingInfForm
            isExtendedField={false}
            isInternational={false}
          /> */}
          <TravelerInformationForm formSubmitAction={personalInfoUpdate} />
        </ContentModal>

        <ContentModal
          show={phoneModal}
          actionClose={(isClose) => {
            setPhoneModal(isClose);
          }}
          name="phone-add-change"
          title="Phone No"
        >
          <SinglePhoneForm />
        </ContentModal>
      </Card>
    </React.Fragment>
  );
};

ProfileBookingInfForm.prototypes = {
  getCustomerInformationAction: PropTypes.func.isRequired,
  getPesonalInformationUpdate: PropTypes.func.isRequired,
  updateStatus: PropTypes.object.isRequired,
  updateSendStatus: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    updateStatus: state && state.user && state.user.customerPersonalInfoUpdate,
    updateSendStatus:
      state && state.user && state.user.customerUpdateSendStatus,
    customer:
      state.customer &&
      state.customer.customerInf &&
      state.customer.customerInf.customer,
  };
};

export default connect(mapStateToProps, {
  getCustomerInformationAction,
  getPesonalInformationUpdate,
})(ProfileBookingInformation);
