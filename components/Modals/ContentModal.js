import React from "react";
import { Button, Modal } from "react-bootstrap";

const ContentModal = (params) => {

  console.log("Content Modal Params, ", params);

  return (
    <React.Fragment>
      <Modal
        show={params.show}
        onHide={() => {
          params.actionClose(false);
        }}
        size={params.size ? params.size : "lg"}
        aria-labelledby={`content-modal-${params.name}`}
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {params.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{params.children}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              params.actionClose(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ContentModal;
