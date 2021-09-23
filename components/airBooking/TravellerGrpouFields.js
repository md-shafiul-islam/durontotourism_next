import React from "react";
import { Col, Row } from "react-bootstrap";
import CstSelectValidateField from "../Fields/CstSelectValidateField";
import TravellerFields from "./TravellerFields";

const TravellerGrpouFields = (params) => {
  let {
    accKey,
    travelerType,
    passenger,
    isError,
    errors,
    touched,
    fieldResrAction,
    setFieldTouched,
    setFieldValue,
    handleChange,
    idx,
    completeStatus,
  } = params;
  return (
    <React.Fragment>
      {/*  if traveler info not added type 1 [eg. Adult 1] Or Traveler name */}
      <Row className="bktraveler-header">
        <Col md={5} className="traveler-title align-middle">
          {`${
            completeStatus
              ? passenger.firstName +
                " " +
                passenger.lastName +
                ", " +
                passenger.gender
              : idx === 0
              ? ` Passenger ${idx + 1} : ${
                  travelerType === "adults" ? `Primary Contact` : ""
                }`
              : `Passenger: ${idx + 1}`
          }`}
        </Col>
        <Col md={4}>
          <CstSelectValidateField placeholder="Travelers" />
        </Col>
        <Col md={3} className="bkt-collaps-action">
          <div className="btn-area">
            <button
              className="bkt-toggle-btn accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${accKey}-${idx}`} //collapseAdt
              aria-expanded="true"
              aria-controls={`${accKey}-${idx}`}
            ></button>
          </div>

          {completeStatus ? (
            <div className="bkt-status complete">complete</div>
          ) : (
            <div className="bkt-status incomplete">incomplete</div>
          )}
        </Col>
      </Row>

      <Row
        className="accordion-collapse collapse show"
        id={`${accKey}-${idx}`}
        aria-labelledby={`${accKey}-${idx}`}
      >
        <Col md={12}>
          <Row className="traveler-note-area">
            <Col md={11}>
              <span className="note-text">
                IMPORTANT: Enter your name as it is mentioned on your passport
                or any government approved ID.
              </span>
            </Col>
            <Col md={1}>
              <span>
                <i
                  className="fas fa-eraser"
                  onClick={() => {
                    fieldResrAction();
                  }}
                ></i>
              </span>
              <span>Clear Fields</span>
            </Col>
          </Row>
          <div className="row traveler-in-area">
            <TravellerFields
              isError={isError}
              errors={errors}
              touched={touched}
              idx={idx}
              fieldSetName={travelerType}
              isInternational={passenger && passenger.isInternational}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TravellerGrpouFields;
