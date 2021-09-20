import React, {useState} from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ContentModal from "../Modals/ContentModal";
import ProfileBookingInfForm from "./ProfileBookingInfForm";

const ProfileBookingInformation = (props) => {

    const [displayModal, setDisplayModal] = useState(false)

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-secondary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">{props.title}</div>
                  <p className="pfl-basi-tag">Booking Infomation Details</p>
                </div>
                <div className="aaction-area">
                    <Button onClick={()=>{
                        setDisplayModal(true)
                    }}>Update Booking Info</Button>
                </div>
              </Col>
            </Row>
          </div>

          <div className="pfl-table-paren mt-5">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Full Name</th>
                  <td colSpan="3">
                    <button
                      className="prf-add-btn"
                      onClick={() => {
                        setPhoneStatus(true);
                      }}
                    >
                      +Add your Name same As Passport
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td colSpan="3">Male</td>
                </tr>

                <tr>
                  <th scope="row">Nationality</th>
                  <td colSpan="3">Bangladesh</td>
                </tr>

                <tr>
                  <th scope="row">Date of birth</th>
                  <td colSpan="3">02/01/1994</td>
                </tr>

                <tr>
                  <th scope="row">Passport No</th>
                  <td colSpan="3">949849849848</td>
                </tr>

                <tr>
                  <th scope="row">Passport Issuing Country</th>
                  <td colSpan="3">Bangladesh</td>
                </tr>

                <tr>
                  <th scope="row">Passport Expiry</th>
                  <td colSpan="3">01/06/2022</td>
                </tr>

                <tr>
                  <th scope="row">Phone Number</th>
                  <td colSpan="3">
                    <button
                      className="prf-add-btn"
                      onClick={() => {
                        setPhoneStatus(true);
                      }}
                    >
                      +Add your mobile number
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email ID</th>
                  <td colSpan="2" className="email-text">
                    md.shafiul2014bd@gmail.com
                  </td>

                  <td>
                    <span className="sts-icon">
                      <i className="fas fa-check-square text-success"></i>
                    </span>
                    <span>Verified</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
        <ContentModal
            show={displayModal}
            actionClose={(isClose)=>{
                setDisplayModal(isClose);
            }}  
            name="profil-booking-inf"     
            title="Bookin Details" 
        >
            <ProfileBookingInfForm />
        </ContentModal>
      </Card>
    </React.Fragment>
  );
};

export default ProfileBookingInformation;
