import { FieldArray, Form, Formik } from "formik";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import AutoCompleteSearch from "./autoCompleteSearch";
import DatePickerRange from "./datePickerRange";
import SearchOption from "./searchOption";
import TravellersAndClass from "./travellersAndClass";

class OneWayTripSearch extends Component {
  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={this.state.initForm}
          onSubmit={(values, actions) => {
            this.submitForm(values);
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
                                <Col md={6} className="no-margin-padding">
                                  <Row className="no-margin-padding">
                                    <Col md={6} className="no-margin-padding">
                                      <SearchOption
                                        title="From"
                                        populateItem={
                                          this.state.selectedItemFrom
                                        }
                                        cardClass="card-hover"
                                      >
                                        <AutoCompleteSearch
                                          pHolder="From"
                                          options={this.state.airPorts}
                                          getSelectedItem={(value) => {
                                            props.setFieldValue(
                                              `passDetails[${indx}].from`,
                                              value.name
                                            );
                                            this.setState({
                                              selectedItemFrom: value,
                                            });
                                          }}
                                          fName="from"
                                          fId="from"
                                        />
                                      </SearchOption>
                                    </Col>
                                    <Col md={6} className="no-margin-padding">
                                      <SearchOption
                                        title="To"
                                        populateItem={this.state.selectedItemTo}
                                        cardClass="card-hover"
                                      >
                                        <AutoCompleteSearch
                                          pHolder="To"
                                          options={this.state.airPorts}
                                          getSelectedItem={(value) => {
                                            props.setFieldValue(
                                              `passDetails[${indx}].to`,
                                              value.name
                                            );

                                            this.setState({
                                              selectedItemTo: value,
                                            });
                                          }}
                                          fName="to"
                                          fId="to"
                                        />
                                      </SearchOption>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md={3} className="no-margin-padding">
                                  <DatePickerRange
                                    getStartDate={(sdate) => {
                                      this.setStartDate(sdate);
                                      props.setFieldValue(
                                        `passDetails[${indx}].depTime`,
                                        sdate
                                      );
                                    }}
                                    getEndDate={(enDate) => {
                                      this.setEndDate(enDate);
                                      props.setFieldValue(
                                        `passDetails[${indx}].returnTime`,
                                        enDate
                                      );
                                    }}
                                  />
                                </Col>

                                <Col md={3} className="no-margin-padding">
                                  {indx === 0 ? (
                                    <TravellersAndClass
                                      getAllRangeData={(
                                        adults,
                                        child,
                                        infants,
                                        cabinClass
                                      ) => {
                                        this.setAllRangeData(
                                          adults,
                                          child,
                                          infants,
                                          cabinClass
                                        );

                                        props.setFieldValue(
                                          `traveler.ADT`,
                                          adults
                                        );
                                        props.setFieldValue(
                                          `traveler.CHD`,
                                          child
                                        );
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
                                  ) : (
                                    <Row>
                                      <Col md={8}>
                                        <a
                                          href="javascript:void(0);"
                                          onClick={() =>
                                            push({
                                              from: "",
                                              to: "",
                                              depTime: "",
                                            })
                                          }
                                        >
                                          ADD ANOTHER CITY
                                        </a>
                                      </Col>
                                      <Col md={4}>
                                        <span onClick={() => remove(indx)}>
                                          Remove
                                        </span>
                                      </Col>
                                    </Row>
                                  )}
                                </Col>
                              </Row>
                            ))}
                        </React.Fragment>
                      )}
                    </FieldArray>
                  </Col>
                </Row>
              </React.Fragment>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default OneWayTripSearch;
