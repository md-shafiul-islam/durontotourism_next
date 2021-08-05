import React from "react";
import { Modal } from "react-bootstrap";

/**
 * 
 * @param {@boolean show, @String loadingText } props 
 * @returns 
 */
const LoaderSpiner = (props) => {
  return (
    <React.Fragment>
      <Modal
        size="sm"
        show={props.show}
        // onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered={true}
        dialogClassName="req-loader"
      >
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>            
          </div>
          <div className="loading-text">{props.loadingText}</div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default LoaderSpiner;
