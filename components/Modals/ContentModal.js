import React from "react";
import { Button, Col, Modal, ModalFooter, Row } from "react-bootstrap";

const ContentModal = (params) => {
  console.log("Content Modal Params, ", params);

  return (
    <React.Fragment>
      <Modal
        //size={params.size ? params.size : "lg"}
        show={params.show}
        onHide={() => {
          params.actionClose(false);
        }}
        aria-labelledby={`content-modal-${params.name ? params.name : "cnt"}`}
        className={params.contentClass ? params.contentClass : ""}
        dialogClassName={
          params.dialogClassName ? ` ${params.dialogClassName} ` : " modal-90w "
        } //"modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title id={params.name}>{params.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{params.children}</Modal.Body>
        <Modal.Footer>
          <Col md={{ offset: 10, span: 2 }} className="d-grid">
            <Button
              onClick={() => {
                params.actionClose(false);
              }}
            >
              Close
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ContentModal;
