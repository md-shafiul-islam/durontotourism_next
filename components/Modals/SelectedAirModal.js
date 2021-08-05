import React, { useState, useEffect } from "react";
import SelectedTab from "../airSearch/SearchResults/SelectedTab";
import { Modal, Button } from "react-bootstrap";

const SelectedAirModal = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.display);
  }, [props.display]);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setShow(true)}>
        Selected Flight
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="selected-air-model"
        aria-labelledby="arial-label"
      >
        <Modal.Header closeButton>
          <Modal.Title id="arial-selected-air">
            Selected Flight Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectedTab />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default SelectedAirModal;
