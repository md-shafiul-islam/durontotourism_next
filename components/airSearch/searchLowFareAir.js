import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form as botFrom,
  Button,
} from "react-bootstrap";
import { Formik, Form, FieldArray, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";

class SearchLowFareAir extends Component {
  constructor(props) {
    super(props);

    this.toggoleAdvanceOption = this.toggoleAdvanceOption.bind(this);
  }

  state = {
    options: [
      {
        value: 1,
        label: `<div>
            <h3>Title</h3>
            <p>Discription</p>
          </div>`,
      },
    ],
    isAdvance: false,
    CatalogOfferingsRequestAir: {
      offersPerPage: 5,
      PassengerCriteria: [
        {
          value: "ADT",
          number: 1,
        },
      ],
      SearchCriteriaFlight: [
        {
          "@type": "SearchCriteriaFlight",
          departureDate: "2020-12-25",
          from: "",
          to: "",
        },
        {
          "@type": "SearchCriteriaFlight",
          departureDate: "2020-12-25",
          from: "",
          to: "",
        },
      ],

      SearchModifiersAir: {},
    },
  };

  data = {
    CatalogOfferingsRequestAir: {
      offersPerPage: 5,
      PassengerCriteria: [
        {
          value: "ADT",
          number: 1,
        },
      ],
      SearchCriteriaFlight: [
        {
          "@type": "SearchCriteriaFlight",
          departureDate: "2018-09-22",
          From: {
            value: "DEN",
          },
          To: {
            value: "LAX",
          },
        },
      ],
      SearchModifiersAir: {
        "@type": "SearchModifiersAir",
        CarrierPreference: {
          "@type": "CarrierPreference",
          type: "Prohibited",
          carriers: ["WN"],
        },
      },
      PseudoCityInfo: {
        value: "PCC",
      },
    },
  };

  toggoleAdvanceOption = () => {
    const { isAdvance } = this.state;
    console.log("Current Status: ", isAdvance);
    this.setState({ isAdvance: !isAdvance });
    console.log("After Status", this.state.isAdvance);
  };

  getAvanceOption = () => {
    return (
      <React.Fragment>
        <p>Advance Search here!!</p>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <Formik
                        initialValues={this.state.CatalogOfferingsRequestAir}
                        enableReinitialize={true}
                        onSubmit={(values, actions) => {
                          console.log(
                            "Before Send Data",
                            JSON.stringify(values, null, 2)
                          );
                          this.searchAction(values);
                        }}
                      >
                        {(props) => (
                          <Form>
                            
                            <Row>
                              <Col md={12}>
                                <React.Fragment>
                                  <React.Fragment>
                                    <Row>
                                      <Col md={12}>
                                        <div className="col-md-3">
                                          <div className="form-group">
                                            <label htmlFor="price">Page</label>
                                            <Field
                                              type="text"
                                              name={`offersPerPage`}
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col md={12}>
                                        <FieldArray name="PassengerCriteria">
                                          {({ push, remove }) => (
                                            <React.Fragment>
                                              {props.values.PassengerCriteria &&
                                                props.values.PassengerCriteria.map(
                                                  (passenger, idx) => (
                                                    <Row
                                                      key={`passenger-${idx}`}
                                                    >
                                                      <Col md={4}>
                                                        <div className="form-group">
                                                          <label htmlFor="passengerValue">
                                                            Passenger
                                                          </label>
                                                          <Field
                                                            type="text"
                                                            name={`PassengerCriteria[${idx}.value]`}
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </Col>

                                                      <Col md={4}>
                                                        <div className="form-group">
                                                          <label htmlFor="passengerValue">
                                                            Number
                                                          </label>
                                                          <Field
                                                            type="text"
                                                            name={`PassengerCriteria[${idx}.number]`}
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </Col>

                                                      <div className="col-md-1 pading-15">
                                                        {idx === 0 ? (
                                                          <span></span>
                                                        ) : (
                                                          <a
                                                            href="javascript:void(0);"
                                                            onClick={() =>
                                                              remove(idx)
                                                            }
                                                          >
                                                            Remove
                                                          </a>
                                                        )}
                                                      </div>
                                                    </Row>
                                                  )
                                                )}

                                              <Row className="pading-15">
                                                <Col md={3}>
                                                  <a
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      push({
                                                        value: "",
                                                        number: 0,
                                                      })
                                                    }
                                                  >
                                                    Add
                                                  </a>
                                                </Col>
                                              </Row>
                                            </React.Fragment>
                                          )}
                                        </FieldArray>
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col md={12}>
                                        <FieldArray name="SearchCriteriaFlight">
                                          {({ push, remove }) => (
                                            <React.Fragment>
                                              {props.values
                                                .SearchCriteriaFlight &&
                                                props.values.SearchCriteriaFlight.map(
                                                  (flight, inx) => {
                                                    return (
                                                      <React.Fragment key={`alfs-${inx}`}>
                                                        <Row
                                                          key={`SearchCriteriaFlight-${inx}`}
                                                        >
                                                          <Col md={3}>
                                                            <div className="form-group">
                                                              <TextField
                                                                id="date"
                                                                label="Departure Date"
                                                                type="date"
                                                                InputLabelProps={{
                                                                  shrink: true,
                                                                }}
                                                              />
                                                            </div>
                                                          </Col>

                                                          <Col md={4}>
                                                            <div className="form-group">
                                                              <Select
                                                                isSearchable={
                                                                  true
                                                                }
                                                                isClearable={
                                                                  false
                                                                }
                                                                name={`SearchCriteriaFlight[${inx}].from`}
                                                                id={`SearchCriteriaFlight[${inx}].from`}
                                                                value={
                                                                  this.value
                                                                }
                                                                options={
                                                                  this.state
                                                                    .options
                                                                }
                                                                onChange={(
                                                                  opt,
                                                                  e
                                                                ) => {
                                                                  props.handleChange.bind(
                                                                    this
                                                                  );
                                                                  props.setFieldValue(
                                                                    `SearchCriteriaFlight[${inx}].from`,
                                                                    opt.value
                                                                  );
                                                                }}
                                                              />
                                                            </div>
                                                          </Col>

                                                          <Col md={4}>
                                                            <div className="form-group">
                                                              <Select
                                                                isSearchable={
                                                                  true
                                                                }
                                                                isClearable={
                                                                  false
                                                                }
                                                                name={`SearchCriteriaFlight[${inx}].to`}
                                                                id={`SearchCriteriaFlight[${inx}].to`}
                                                                value={
                                                                  this.value
                                                                }
                                                                options={
                                                                  this.state
                                                                    .airPortCodes
                                                                }
                                                                onChange={(
                                                                  opt,
                                                                  e
                                                                ) => {
                                                                  props.handleChange.bind(
                                                                    this
                                                                  );
                                                                  props.setFieldValue(
                                                                    `SearchCriteriaFlight[${inx}].to`,
                                                                    opt.value
                                                                  );
                                                                }}
                                                              />
                                                            </div>
                                                          </Col>

                                                          <div className="col-md-1">
                                                            {inx === 0 ? (
                                                              <span></span>
                                                            ) : (
                                                              <a
                                                                href="javascript:void(0);"
                                                                onClick={() =>
                                                                  remove(inx)
                                                                }
                                                              >
                                                                Remove
                                                              </a>
                                                            )}
                                                          </div>
                                                        </Row>
                                                      </React.Fragment>
                                                    );
                                                  }
                                                )}

                                              <Row>
                                                <Col md={4}>
                                                  <a
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      push({
                                                        value: "",
                                                        number: 0,
                                                      })
                                                    }
                                                  >
                                                    Add
                                                  </a>
                                                </Col>
                                              </Row>
                                            </React.Fragment>
                                          )}
                                        </FieldArray>
                                      </Col>
                                    </Row>
                                  </React.Fragment>
                                </React.Fragment>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={12}>
                                <Button onClick={this.toggoleAdvanceOption}>
                                  Advance Search
                                </Button>
                                <Row>
                                  {this.state.isAdvance && (
                                    <React.Fragment>
                                      <Col md={3}>
                                        <Col className="form-group">
                                          <label>Currency Type:</label>
                                          <Select
                                            isSearchable={true}
                                            isClearable={false}
                                            name={`SearchModifiersAir.currency`}
                                            id={`SearchCriteriaFlight.currency`}
                                            value={this.value}
                                            options={this.state.airPortCodes}
                                            onChange={(opt, e) => {
                                              props.handleChange.bind(this);
                                              props.setFieldValue(
                                                `SearchModifiersAir.currency`,
                                                opt.value
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Col>

                                      <Col md={2}>
                                        <Col className="form-group">
                                          <label>Carrier Type:</label>
                                          <Select
                                            isSearchable={true}
                                            isClearable={false}
                                            name={`SearchModifiersAir.carrierType`}
                                            id={`SearchCriteriaFlight.carrierType`}
                                            value={this.value}
                                            options={this.state.airPortCodes}
                                            onChange={(opt, e) => {
                                              props.handleChange.bind(this);
                                              props.setFieldValue(
                                                `SearchModifiersAir.carrierType`,
                                                opt.value
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Col>

                                      <Col md={6}>
                                        <Col className="form-group">
                                          <label>Carriers:</label>
                                          <Select
                                            isSearchable={true}
                                            isClearable={false}
                                            isMulti={true}
                                            name={`SearchModifiersAir.carriers`}
                                            id={`SearchCriteriaFlight.carriers`}
                                            value={this.value}
                                            options={this.state.airPortCodes}
                                            onChange={(opt, e) => {
                                              props.handleChange.bind(this);
                                              props.setFieldValue(
                                                `SearchModifiersAir.carriers`,
                                                opt.value
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Col>
                                    </React.Fragment>
                                  )}
                                </Row>

                                <Row>
                                  <Col md={4}>
                                    <Button type="submit">Search</Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default SearchLowFareAir;
