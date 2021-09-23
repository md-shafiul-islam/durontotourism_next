import React, { Component } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { PropTypes } from "prop-types";
import Select from "react-select";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { getNmsOptions, helperPreSetTravelr } from "../../utils/helper/esFnc";
import { initRoundTripBookingData } from "../../utils/booking/initBooking";
import { v4 } from "uuid";
import { connect } from "react-redux";
import { getRoundTripBookingAction } from "../../redux/actions/bookingAction";
import TravellerFields from "./TravellerFields";
import CstSelectValidateField from "../Fields/CstSelectValidateField";
import CstValidateField from "../Fields/CstValidateField";
import {
  getAllFieldValidation,
  initializeTravlerBookingForm,
} from "./travelerValidationFunc";
import TravellerGrpouFields from "./TravellerGrpouFields";
import LoaderSpiner from "../../utils/helper/loaderSpiner";

class BookingTravellerDetailsCard extends Component {
  state = {
    travelers: [],
    adtCount: 0,
    cnnCount: 0,
    infCount: 0,
    validationSchema: {},
    initStatus: false,
    changeStatus: true,
    initFormStatus: false,
    initValues: {},
  };

  componentDidMount() {
    // console.log("BookingTravellerDetailsCard, this.props, ", this.props);

    let pasCounts = this.initPrePerdForm();
    this.initValidationSchema(pasCounts);
    this.setState({
      initValues: initializeTravlerBookingForm(pasCounts),
      initFormStatus: true,
    });
  }

  buttonClicAction = () => {
    const values = {
      adults: [
        {
          firstName: "Md. Shafiul",
          lastName: "Islam",
          gender: "Male",
          type: "ADT",
          key: "af691dda-3afb-42a9-a708-d2592998054b",
        },
        {
          firstName: "Arfin",
          lastName: "Islam",
          gender: "Female",
          type: "ADT",
          key: "a815b73f-9048-4039-b371-b2c68a29f502",
        },
      ],
      childs: [
        {
          firstName: "Musfiky",
          lastName: "Islam",
          gender: "Female",
          type: "CNN",
          passAge: "7",
          key: "15c615f0-b4d7-40ee-a456-dea08ece50ab",
        },
      ],
      infants: [
        {
          firstName: "Ayat",
          lastName: "Islam",
          gender: "Female",
          type: "INF",
          day: 9,
          month: 8,
          year: 2019,
          key: "4d1b75fa-8795-4007-b962-4c5af01b2661",
        },
      ],
      country_code: "+880",
      phone_no: "1725686029",
      email: "shafiul2014bd@gmail.com",
    };
    let bookingRequestQuery = initRoundTripBookingData(values);
    this.props.getRoundTripBookingAction(bookingRequestQuery);
  };

  initValidationSchema = (pasCounts) => {
    let { adtCount, cnnCount, infCount } = pasCounts;
    //isInternational
    let travelerSchema = Yup.object({
      adults: getAllFieldValidation(adtCount),
      childs: getAllFieldValidation(cnnCount),

      infants: getAllFieldValidation(infCount),
      country_code: Yup.string().required("Country Code is Required"),
      phone_no: Yup.string().required("Mobile No. is Required"),
      email: Yup.string().email().required("Email is Required"),
    });

    this.setState({
      validationSchema: travelerSchema,
      initStatus: true,
      infCount,
      cnnCount,
      adtCount,
    });
  };

  fieldResrAction = () => {
    console.log("rest This group fields ");
  };

  initPrePerdForm = () => {
    let adtCount = 0,
      cnnCount = 0,
      infCount = 0;

    let { travelers } = this.props;

    if (travelers) {
      travelers.map((item, idx) => {
        if (item.key === "ADT") {
          adtCount = item.passengerQty;
        }

        if (item.key === "CNN") {
          cnnCount = item.passengerQty;
        }

        if (item.key === "INF") {
          infCount = item.passengerQty;
        }
      });
    }

    return { adtCount, cnnCount, infCount };
  };

  objFieldError = (fieldName, errors, touched) => {
    if (!helperIsEmpty(touched) && !helperIsEmpty(errors)) {
      if (!helperIsEmpty(touched)) {
        if (touched[fieldName] !== undefined) {
          if (typeof errors[fieldName] === "string") {
            return { msg: errors[fieldName], cls: "is-invalid", status: true };
          }

          return { msg: "", cls: "is-valid", status: false };
        }
      }
    }

    return { msg: "", cls: "", status: false };
  };

  getTravelerCount = (type) => {
    let count = 0;

    if (type) {
      let { travelers } = this.props;

      if (travelers) {
        travelers.map((item, idx) => {
          if (item.key === type) {
            count = item.passengerQty;
          }
        });
      }
    }

    return count;
  };

  isError = (eType, idx, errors, touched, fName) => {
    if (!helperIsEmpty(touched)) {
      if (!helperIsEmpty(touched[eType])) {
        if (!helperIsEmpty(touched[eType][idx])) {
          if (
            eType !== undefined &&
            idx !== undefined &&
            (idx !== null) & !helperIsEmpty(errors) &&
            fName !== undefined
          ) {
            let msg = undefined;

            if (eType === "adults") {
              msg =
                errors.adults &&
                errors.adults[idx] &&
                errors.adults[idx][fName];
            }

            if (eType === "childs") {
              msg =
                errors.childs &&
                errors.childs[idx] &&
                errors.childs[idx][fName];
            }

            if ("infants" === eType) {
              msg =
                errors.infants &&
                errors.infants[idx] &&
                errors.infants[idx][fName];
            }

            if (msg) {
              return { cls: "is-invalid", msg: msg, status: true };
            } else {
              return { cls: "is-valid", msg: "", status: false };
            }
          }

          if (helperIsEmpty(errors)) {
            return { cls: "is-valid", msg: "", status: false };
          }

          return { cls: "is-invalid", msg: "", status: true };
        }
      }
    }

    return { cls: "", msg: "", status: false };
  };

  countHaveError = (eType, errors) => {
    if (eType) {
      if (!helperIsEmpty(errors)) {
        if (typeof errors[eType] === "string") {
          return { msg: errors && errors[eType], status: true };
        }
      }
    }
    return { msg: "", status: false };
  };

  getTravelerInfoStatus = (errors, touched, key, idx) => {
    if (!helperIsEmpty(touched)) {
      if (key !== undefined && key !== null && !helperIsEmpty(touched[key])) {
        if (!helperIsEmpty(touched[key][idx])) {
          if (!helperIsEmpty(errors)) {
            if (!helperIsEmpty(errors[key])) {
              if (typeof errors[key] === "object") {
                if (!helperIsEmpty(errors[key][idx])) {
                  return false;
                }
              }
              // console.log("Get Error, Key ", key, "OBJ", errors[key]);

              return true;
            }
          }
          return true;
        }
      }
    }
    return false;
  };

  submitAction = (values) => {
    console.log("Booking Action Travelers, ", values);
    console.log("Booking Action, String, ", JSON.stringify(values, null, 2));

    // console.log("Get Age, ", getAge(30,7,2019));

    let bookingRequestQuery = initRoundTripBookingData(values);
    this.props.getRoundTripBookingAction(bookingRequestQuery);

    // this.props.getTravelersAction(passengers);
  };

  render() {
    let { validationSchema, initStatus, initFormStatus } = this.state;

    // console.log("Validation Schema, ", JSON.stringify(validationSchema, null, 2));
    console.log("init Fileds Sets, ", this.state.initValues);

    if (!initFormStatus) {
      return <LoaderSpiner loadingText="Geting booking Data ..." />;
    }

    return (
      <React.Fragment>
        <Formik
          initialValues={this.state.initValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.submitAction(values);
          }}
        >
          {(props) => (
            <Form>
              <Card>
                <Card.Body>
                  <div className="book-travelers-list">
                    <div className="book-travelers-item">
                      <div className="bktravelers-title">
                        <Row>
                          <Col md={6} className="title-text">
                            Adult
                          </Col>
                          <Col
                            md={6}
                            className={`pass-count ${
                              props.values.adults.length !==
                              this.getTravelerCount("ADT")
                                ? "error"
                                : "succeed"
                            }`}
                          >{`${
                            props.values.adults.length
                          } / ${this.getTravelerCount("ADT")} Selected`}</Col>
                        </Row>
                      </div>
                      <div
                        className="invalid-feedback"
                        style={{
                          display: `${
                            this.countHaveError("adults", props.errors).status
                              ? "block"
                              : "none"
                          }`,
                        }}
                      >
                        {this.countHaveError("adults", props.errors).msg}
                      </div>
                      <FieldArray name="adults">
                        {({ push, remove }) => (
                          <React.Fragment>
                            {props.values &&
                              props.values.adults &&
                              props.values.adults.map((adult, idx) => {
                                let comStatus = this.getTravelerInfoStatus(
                                  props.errors,
                                  props.touched,
                                  "adults",
                                  idx
                                );
                                return (
                                  <Card key={`adt-${idx}`}>
                                    <Card.Body className="book-traveler-crd">
                                      <TravellerGrpouFields
                                        accKey="collapseAdt"
                                        travelerType="adults"
                                        passenger={adult}
                                        isError={this.isError}
                                        errors={props.errors}
                                        touched={props.touched}
                                        fieldResrAction={this.fieldResrAction}
                                        setFieldTouched={props.setFieldTouched}
                                        setFieldValue={props.setFieldValue}
                                        handleChange={props.handleChange}
                                        idx={idx}
                                        completeStatus={comStatus}
                                      />
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            <div className="passenger-add-btn-area">
                              <Button
                                onClick={() => {
                                  // console.log(" State, ", this.state.adtCount, " C V l, ", props.values.adults.length);
                                  if (
                                    this.state.adtCount >
                                    props.values.adults.length
                                  ) {
                                    push({
                                      firstName: "",
                                      lastName: "",
                                      gender: "",
                                      type: "ADT",
                                      key: v4(),
                                      isInternational: true,
                                      nationality: "",
                                      dobDate: "",
                                      dobMonth: "",
                                      dobYear: "",
                                      passportNo: "",
                                      passportIssuCountry: "",
                                      pasExpDate: "",
                                      pasExpMonth: "",
                                      pasExpYear: "",
                                      passportAttach: "",
                                      visaAttach: "",
                                    });
                                  }
                                }}
                              >
                                + Add Adult
                              </Button>
                            </div>
                          </React.Fragment>
                        )}
                      </FieldArray>
                    </div>

                    <div className="book-travelers-item">
                      <div className="bktravelers-title">
                        <Row>
                          <Col md={6} className="title-text">
                            Child
                          </Col>
                          <Col
                            md={6}
                            className={`pass-count ${
                              props.values.childs.length !==
                              this.getTravelerCount("CNN")
                                ? "error"
                                : "succeed"
                            }`}
                          >{`${
                            props.values.childs.length
                          } / ${this.getTravelerCount("CNN")} Selected`}</Col>
                        </Row>
                      </div>
                      <div
                        className="invalid-feedback"
                        style={{
                          display: `${
                            this.countHaveError("childs", props.errors).status
                              ? "block"
                              : "none"
                          }`,
                        }}
                      >
                        {this.countHaveError("childs", props.errors).msg}
                      </div>
                      <FieldArray name="childs">
                        {({ push, remove }) => (
                          <React.Fragment>
                            {props.values &&
                              props.values.childs &&
                              props.values.childs.map((child, idx) => {
                                let comStatus = this.getTravelerInfoStatus(
                                  props.errors,
                                  props.touched,
                                  "childs",
                                  idx
                                );
                                return (
                                  <Card key={`cld-${idx}`}>
                                    <Card.Body className="book-traveler-crd">
                                      {/*  if traveler info not added type 1 [Adult 1] Or Traveler aname */}

                                      <TravellerGrpouFields
                                        accKey="collapseCnn"
                                        travelerType="childs"
                                        passenger={child}
                                        isError={this.isError}
                                        errors={props.errors}
                                        touched={props.touched}
                                        fieldResrAction={this.fieldResrAction}
                                        setFieldTouched={props.setFieldTouched}
                                        setFieldValue={props.setFieldValue}
                                        handleChange={props.handleChange}
                                        idx={idx}
                                        completeStatus={comStatus}
                                      />
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            <div className="passenger-add-btn-area">
                              <Button
                                onClick={() => {
                                  // console.log(" State, ", this.state.adtCount, " C V l, ", props.values.adults.length);
                                  if (
                                    this.state.cnnCount >
                                    props.values.childs.length
                                  ) {
                                    push({
                                      firstName: "",
                                      lastName: "",
                                      gender: "",
                                      type: "CNN",
                                      passAge: "",
                                      key: v4(),
                                      isInternational: true,
                                      nationality: "",
                                      dobDate: "",
                                      dobMonth: "",
                                      dobYear: "",
                                      passportNo: "",
                                      passportIssuCountry: "",
                                      pasExpDate: "",
                                      pasExpMonth: "",
                                      pasExpYear: "",
                                      passportAttach: "",
                                      visaAttach: "",
                                    });
                                  }
                                }}
                              >
                                + Add Child
                              </Button>
                            </div>
                          </React.Fragment>
                        )}
                      </FieldArray>
                    </div>

                    <div className="book-travelers-item">
                      <div className="bktravelers-title">
                        <Row>
                          <Col md={6} className="title-text">
                            Infant
                          </Col>
                          <Col
                            md={6}
                            className={`pass-count ${
                              props.values.infants.length !==
                              this.getTravelerCount("INF")
                                ? "error"
                                : "succeed"
                            }`}
                          >{`${
                            props.values.infants.length
                          } / ${this.getTravelerCount("INF")} Selected`}</Col>
                        </Row>
                      </div>
                      <div
                        className="invalid-feedback"
                        style={{
                          display: `${
                            this.countHaveError("infants", props.errors).status
                              ? "block"
                              : "none"
                          }`,
                        }}
                      >
                        {this.countHaveError("infants", props.errors).msg}
                      </div>
                      <FieldArray name="infants">
                        {({ push, remove }) => (
                          <React.Fragment>
                            {props.values &&
                              props.values.infants &&
                              props.values.infants.map((infant, idx) => {
                                let comStatus = this.getTravelerInfoStatus(
                                  props.errors,
                                  props.touched,
                                  "infants",
                                  idx
                                );
                                return (
                                  <Card key={`inf-${idx}`}>
                                    <Card.Body className="book-traveler-crd">
                                      {/*  if traveler info not added type 1 [Adult 1] Or Traveler aname */}
                                      <TravellerGrpouFields
                                        accKey="collapseInf"
                                        travelerType="infants"
                                        passenger={infant}
                                        isError={this.isError}
                                        errors={props.errors}
                                        touched={props.touched}
                                        fieldResrAction={this.fieldResrAction}
                                        setFieldTouched={props.setFieldTouched}
                                        setFieldValue={props.setFieldValue}
                                        handleChange={props.handleChange}
                                        idx={idx}
                                        completeStatus={comStatus}
                                      />
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            <div className="passenger-add-btn-area">
                              <Button
                                onClick={() => {
                                  // console.log(" State, ", this.state.adtCount, " C V l, ", props.values.adults.length);
                                  if (
                                    this.state.infCount >=
                                    props.values.infants.length
                                  ) {
                                    push({
                                      firstName: "",
                                      lastName: "",
                                      gender: "",
                                      type: "INF",
                                      day: 1,
                                      month: 1,
                                      year: new Date().getFullYear() - 2,
                                      key: v4(),
                                      firstName: "",
                                      lastName: "",
                                      gender: "",
                                      type: "CNN",
                                      passAge: "",
                                      key: v4(),
                                      isInternational: true,
                                      nationality: "",
                                      passportNo: "",
                                      passportIssuCountry: "",
                                      pasExpDate: "",
                                      pasExpMonth: "",
                                      pasExpYear: "",
                                      passportAttach: "",
                                      visaAttach: "",
                                    });
                                  }
                                }}
                              >
                                + Add Infant / Baby
                              </Button>
                            </div>
                          </React.Fragment>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Row>
                <Col md={12}>
                  <div className="traveler-contact-title">
                    Contact Information
                  </div>
                </Col>
              </Row>
              <Card>
                <Card.Body>
                  <p>Your ticket and flights information will be sent here</p>
                  <div className="row traveler-in-area">
                    <Col md={4}>
                      <label htmlFor="country_code">Country Code</label>
                      <Select
                        // defaultValue={colourOptions[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        // isRtl={isRtl}
                        isSearchable={true}
                        onChange={(item) => {
                          props.setFieldValue(
                            `country_code`,
                            item ? item.value : ""
                          );
                        }}
                        onBlur={() => {
                          props.setFieldTouched(`country_code`, true);
                        }}
                        id="country_code"
                        name="country_code"
                        options={[
                          { value: "+880", label: "BD" },
                          { value: 2, label: "USE" },
                          { value: 3, label: "UE" },
                        ]}
                      />
                      {/* {console.log("Error Select Options, ", this.objFieldError("country_code", props.errors, props.touched))} */}
                      <div
                        className="invalid-feedback"
                        style={{
                          display: `${
                            this.objFieldError(
                              "country_code",
                              props.errors,
                              props.touched
                            ).status
                              ? "block"
                              : "none"
                          }`,
                        }}
                      >
                        {
                          this.objFieldError(
                            "country_code",
                            props.errors,
                            props.touched
                          ).msg
                        }
                      </div>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="phoneNo">Phone No.</label>
                      <Field
                        className={`form-control ${
                          this.objFieldError(
                            "phone_no",
                            props.errors,
                            props.touched
                          ).cls
                        }`}
                        type="text"
                        name="phone_no"
                        id="phoneNo"
                        placeholder="9842897555"
                      />
                      <div className="invalid-feedback">
                        {
                          this.objFieldError(
                            "phone_no",
                            props.errors,
                            props.touched
                          ).msg
                        }
                      </div>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="email">Email.</label>
                      <Field
                        className={`form-control ${
                          this.objFieldError(
                            "email",
                            props.errors,
                            props.touched
                          ).cls
                        }`}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@gmail.com"
                      />
                      <div className="invalid-feedback">
                        {
                          this.objFieldError(
                            "email",
                            props.errors,
                            props.touched
                          ).msg
                        }
                      </div>
                    </Col>
                  </div>
                  <Row>
                    <Col md={4}>
                      <CstValidateField
                        label="Post Code"
                        name="postCode"
                        placeholder="Post Code"
                      />
                    </Col>
                  </Row>

                  {/* <div>
                    <pre>{JSON.stringify(props, null, 2)}</pre>
                  </div> */}
                </Card.Body>
              </Card>

              <Row>
                <Col md={12}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col md={12}>
                          <span>
                            By clicking on the Continue button below to proceed
                            with the booking, I confirm that I have read and I
                            accept the
                          </span>
                        </Col>
                        <Col md={{ span: 3 }} className="mt-2">
                          <Button
                            block={true}
                            type="submit"
                            className="btdc-btn rounded-pill"
                          >
                            Continue
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <pre>{JSON.stringify(props.values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
        <Col>
          <Button onClick={this.buttonClicAction}>Test Func !!</Button>
        </Col>
      </React.Fragment>
    );
  }
}

BookingTravellerDetailsCard.prototypes = {
  getRoundTripBookingAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  bookingReqponse: state.airBooking.rndBookingResponse,
});

export default connect(mapStateToProps, { getRoundTripBookingAction })(
  BookingTravellerDetailsCard
);
