import { Field } from "formik";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const ShippingAddressFields = (params) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Shipping Address.</Card.Title>
        <Row className="withdraw-row">
          <Col md={12}>
            <label className="form-label">Address:</label>
            <Field
              name="address"
              placeholder="Address"
              id="address"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">Village:</label>
            <Field
              name="village"
              placeholder="Village"
              id="village"
              className="form-control"
            />
          </Col>
          <Col md={6}>
            <label className="form-label">City:</label>
            <Field
              name="city"
              placeholder="City"
              id="city"
              className="form-control"
            />
          </Col>
        </Row>

        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">Zip code:</label>
            <Field
              name="zipCode"
              placeholder="Zip Code"
              id="zipCode"
              className="form-control"
            />
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  );
};

export default ShippingAddressFields;
