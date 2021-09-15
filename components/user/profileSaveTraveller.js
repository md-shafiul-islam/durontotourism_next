import React, {useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import AddTravelerModal from "../Modals/Profile/addTravelerModal";


const ProfileSaveTraveller = () => {

  const [addTravelerStatus, setAddTravelerStatus] = useState(false);

  
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-secondary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">Save Traveller(s)</div>
                  <p className="pfl-basi-tag">You have {/*`${count}`*/} Traveller(s)</p>
                </div>

                <div className="add-traveller-area">
                  <button className="add-btn" onClick={()=>{
                    setAddTravelerStatus(true);
                  }}>Add Traveler</button>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <AddTravelerModal hideAction={()=>{
        setAddTravelerStatus(false);
      }} show={addTravelerStatus} />
    </React.Fragment>
  );
};

export default ProfileSaveTraveller;
