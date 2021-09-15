import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import DatePickerRange from "./datePickerRange";
import TravellersAndClass from "./travellersAndClass";
import AutoSearchSuggestionList from "./AutoSearchSuggestionList";
import AutoSuggestionInptTextField from "../autosuggestion/autoSuggestionInptTextField";

const RoundTripSearchForm = (params) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={params.roundInitValue}
        onSubmit={(values, actions) => {
          params.getDataAndSubmit(values);
        }}
      >
        {(props) => (
          <Form>
            <React.Fragment>
              <Row className="mp-0">
                <Col md={12}>
                  <FieldArray name="passDetails">
                    {({ push, remove }) => (
                      <React.Fragment>
                        {props.values.passDetails &&
                          props.values.passDetails.map((item, indx) => (
                            <Row className="air-search" key={`trip-${indx}`}>
                              <Col
                                md={6}
                                className="no-margin-padding each-content"
                              >
                                <Row className="no-margin-padding in-area">
                                  <Col
                                    md={6}
                                    className="no-margin-padding each-content"
                                  >
                                    <AutoSuggestionInptTextField
                                      change={(airPort) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          airPort
                                        );
                                      }}
                                      name={`passDetails[${indx}].from`}
                                      label="From"
                                      id={`passDetails-${indx}-from`}

                                      // preSetItem={params.preSetRoundTripForm} not set yet
                                    />
                                    {/* <AutoSearchSuggestionList
                                      title="From"
                                      suggestions={params.sugList}
                                      name={`passDetails[${indx}].from`}
                                      id={`passDetails[${indx}].from`}
                                      getSelectedData={(value) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          value
                                        );
                                      }}
                                      preSetItem={params.preSetRoundTripForm}
                                    /> */}
                                  </Col>
                                  <Col md={6} className="no-margin-padding">
                                    <AutoSuggestionInptTextField
                                      change={(airPort) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].to`,
                                          airPort
                                        );
                                      }}
                                      name={`passDetails[${indx}].to`}
                                      label="To"
                                      id={`passDetails-${indx}-to`}

                                      // preSetItem={params.preSetRoundTripForm} not set yet
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                md={3}
                                className="no-margin-padding each-content"
                              >
                                <DatePickerRange
                                  preSetDepDate={
                                    props.values.passDetails[indx].depTime
                                  }
                                  getStartDate={(sdate) => {
                                    setStartDate(sdate);
                                    props.setFieldValue(
                                      `passDetails[${indx}].depTime`,
                                      sdate
                                    );
                                  }}
                                  getEndDate={(enDate) => {
                                    setEndDate(enDate);
                                    props.setFieldValue(
                                      `passDetails[${indx}].returnTime`,
                                      enDate
                                    );
                                  }}
                                />
                              </Col>

                              <Col md={3} className="no-margin-padding">
                                <TravellersAndClass
                                  getAllRangeData={(
                                    adults,
                                    child,
                                    infants,
                                    cabinClass
                                  ) => {
                                    props.setFieldValue(`traveler.ADT`, adults);
                                    props.setFieldValue(`traveler.CNN`, child);
                                    props.setFieldValue(
                                      `traveler.INF`,
                                      infants
                                    );
                                    props.setFieldValue(
                                      `traveler.cabClass`,
                                      cabinClass
                                    );
                                  }}
                                />
                              </Col>
                            </Row>
                          ))}
                      </React.Fragment>
                    )}
                  </FieldArray>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                      <Button
                        type="submit"
                        className="btn btn-primary home-action-btn"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </React.Fragment>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default RoundTripSearchForm;
