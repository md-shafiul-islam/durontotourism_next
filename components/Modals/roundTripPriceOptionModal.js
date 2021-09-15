import React from "react";
import { Modal } from "react-bootstrap";
import PricingModalDetailsCard from "../airPricing/pricingSplitCommponent/pricingModalDetailsCard";

const RoundTripPriceOptionModal = (props) => {

  return (
    <React.Fragment>
      <Modal
        className="selected-air-price-model"
        show={props.display}
        onHide={() => props.modalAction(false)}
        dialogClassName="price-dialog"
        aria-labelledby="arial-label"
      >
        <Modal.Header closeButton>
          <Modal.Title id="selected-air-price-title">
            Selected Flight Price Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <PricingModalDetailsCard />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RoundTripPriceOptionModal;
