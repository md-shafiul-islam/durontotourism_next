import { Field } from "formik";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { esIsFieldError } from "../../../utils/helper/helperAction";

const ShippingAddressFields = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Shipping Address.</Card.Title>

        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">Village/House No.:</label>
            <Field
              name="village"
              placeholder="Village"
              id="village"
              className={`form-control ${
                esIsFieldError(props.errors, props.touched, "village").cls
              }`}
            />

            <div className="invalid-feedback">
              {esIsFieldError(props.errors, props.touched, "village").msg}
            </div>
          </Col>
          <Col md={6}>
            <label className="form-label">Road No./Road Name:</label>
            <Field
              name="roadNo"
              placeholder="Road No./Road Name"
              id="roadNo"
              className={`form-control ${
                esIsFieldError(props.errors, props.touched, "roadNo").cls
              }`}
            />

            <div className="invalid-feedback">
              {esIsFieldError(props.errors, props.touched, "roadNo").msg}
            </div>
          </Col>
        </Row>

        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">Polish Station:</label>
            <Field
              name="policeStation"
              placeholder="Police Station"
              id="policeStation"
              className={`form-control ${
                esIsFieldError(props.errors, props.touched, "policeStation").cls
              }`}
            />

            <div className="invalid-feedback">
              {esIsFieldError(props.errors, props.touched, "policeStation").msg}
            </div>
          </Col>

          <Col md={6}>
            <label className="form-label">Zip code:</label>
            <Field
              name="zipCode"
              placeholder="Zip Code"
              id="zipCode"
              className={`form-control ${
                esIsFieldError(props.errors, props.touched, "zipCode").cls
              }`}
            />

            <div className="invalid-feedback">
              {esIsFieldError(props.errors, props.touched, "zipCode").msg}
            </div>
          </Col>
        </Row>
        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">District:</label>
            <Field
              name="district"
              placeholder="District"
              id="district"
              className={`form-control ${
                esIsFieldError(props.errors, props.touched, "district").cls
              }`}
            />

            <div className="invalid-feedback">
              {esIsFieldError(props.errors, props.touched, "district").msg}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ShippingAddressFields;
