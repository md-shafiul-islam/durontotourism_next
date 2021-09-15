import { Field, Form, Formik } from "formik";
import Select from "react-select";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getNmsOptions } from "../../utils/helper/esFnc";

const CardPayment = (params) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: "",
          cardNo: "",
          expMonth: 0,
          expYear: 0,
          cardCvv: "",
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="cardNo">
                  Card No.
                </label>
                <Field
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardNo}
                  name="cardNo"
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="cardNo">
                  Name On Card
                </label>
                <Field
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardNo}
                  name="cardNo"
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={6}>
                <label className="form-label" htmlFor="expCard">
                  Expiry Month & Year.{" "}
                </label>
                <Row>
                  <Col md={6}>
                    <Select
                      placeholder="Month"
                      name={`expMonth`}
                      onChange={(item) => {
                        props.setFieldValue(`expMonth`, item ? item.value : "");
                      }}
                      onBlur={props.handleBlur}
                      id={`expMonth`}
                      options={getNmsOptions(12, 1, 0)}
                    />
                  </Col>
                  <Col md={6}>
                    <Select
                      placeholder="Year"
                      name={`expYear`}
                      onChange={(item) => {
                        props.setFieldValue(`expYear`, item ? item.value : "");
                      }}
                      onBlur={props.handleBlur}
                      id={`expYear`}
                      options={getNmsOptions(10, 0, 2)}
                    />
                  </Col>
                </Row>
              </Col>

              <Col md={6}>
                <label className="form-label" htmlFor="cardCvv">
                  Card CVV
                </label>
                <Field
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardCvv}
                  name="cardCvv"
                  id="cardCvv"
                  className="form-control"
                />
              </Col>
            </Row>

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <Row className="card-pay-row">
              <Col md={8}>
                <p className="pay-text"><i className="fas fa-dollar-sign"></i> &nbsp;25498 &nbsp;<small className="sm-text">Due Now</small></p>
              </Col>
              <Col md={4}>
                <Button type="submit" className="payment-btn">
                  Pay Now
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CardPayment;
