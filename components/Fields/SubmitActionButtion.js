import React from "react";
import { Button, Spinner } from "react-bootstrap";

const SubmitActionButtion = ({ label, className, variant, isSubmitting }) => {
  console.log("isSubmitting ", isSubmitting);
  return (
    <React.Fragment>
      <Button
        type="submit"
        className={`btn-spinner ${className}`}
        variant={variant}
        disabled={isSubmitting ? true : false}
      >
        <span className="text">{label}</span>
        <span className="spinner">
          {isSubmitting ? <Spinner animation="border" variant="warning" /> : ""}
        </span>
      </Button>
    </React.Fragment>
  );
};

export default SubmitActionButtion;
