import React from "react";
import { Modal } from "react-bootstrap";

/**
 * 
 * @param {@boolean show, @String loadingText } props 
 * @returns 
 */
const LoaderSpiner = ({loadingText, show, name="loader", ...props}) => {
  return (
    <React.Fragment>

      <Modal
        size="sm"
        show={show}
        // onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered={true}
        dialogClassName={`req-loader`}
        contentClassName="loading-modal"
        backdropClassName="loding-back-drop"
      >
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>            
          </div>
          <div className="loading-text">{loadingText}</div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default LoaderSpiner;
