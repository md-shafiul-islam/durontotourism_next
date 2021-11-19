import React, { Component } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import CstRadioButton from "../Fields/CstRadioButton";
import CstValidateField from "../Fields/CstValidateField";
import * as Yup from "yup";
import CstSelectCountry from "../Fields/CstSelectCountry";
import CstUploadFileFieldValidet from "../Fields/CstUploadFileFieldValidet";
import { esIsFieldError, helperIsEmpty } from "../../utils/helper/helperAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getPesonalInformationUpdate } from "../../redux/actions/userAction";
import {
  getCountryOptions,
  getCountryPhonCodeOptions,
} from "../../redux/actions/countriyAction";
import { getMaxFileSizeValidation } from "../../utils/helper/helperValidateSchema";
import CstValidatePhoneNoField from "../Fields/CstValidatePhoneNoField";

class TravelerInformationForm extends Component {
  state = {};

  initForm = {
    firstName: "",
    lastName: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
    passportNo: "",
    passportIssuCuntry: "",
    passportExpiry: "",
    passportAttach: "",
    email: "",
    phoneNo: "",
    isExtend: this.props.isExtendedField,
    isInternational: this.props.isInternational,
  };
  componentDidMount() {
    console.log("TravelerInformationForm props, ", this.props);
    this.initCountyOption();
    this.initPhoneFieldOptions();
  }

  initPhoneFieldOptions = () => {
    let { phoneCodeOptions, isExtendedField } = this.props;
    if (isExtendedField) {
      if (!helperIsEmpty(phoneCodeOptions)) {
        if (phoneCodeOptions.length === 0) {
          this.props.getCountryPhonCodeOptions();
        }
      } else {
        this.props.getCountryPhonCodeOptions();
      }
    }
  };

  initCountyOption = () => {
    let { countryOptions } = this.props;

    if (!helperIsEmpty(countryOptions)) {
      if (countryOptions.length === 0) {
        this.props.getCountryOptions();
      }
    } else {
      this.props.getCountryOptions();
    }
  };

  validationSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string()
        .min(3)
        .required("Required, Enter First & Middle name "),
      lastName: Yup.string().typeError("Enter Only Latter"),
      gender: Yup.string().required("You Must Select one option"),

      nationality: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("You Must Select one nationality"),
      }),
      dateOfBirth: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("You Must Enter, Traveler Date Of Birth"),
      }),
      passportNo: Yup.string().when("isInternational", {
        is: true,
        then: Yup.string().required("You Must Enter, Traveler passport number"),
      }),
      passportIssuCuntry: Yup.string().when("passportNo", {
        is: true,
        then: Yup.string().required(
          "You Must Enter, Traveler passport issuing country"
        ),
      }),
      passportExpiry: Yup.string().when("passportNo", {
        is: true,
        then: Yup.string().required(
          "You Must Enter, Traveler passport expiry date"
        ),
      }),

      email: Yup.string().when("isExtend", {
        is: true,
        then: Yup.string().email("Please, Enter valid email"),
      }),
      phoneNo: Yup.string().when("isExtend", {
        is: true,
        then: Yup.string().min(3),
      }),
      phoneCode: Yup.string().when("isExtend", {
        is: true,
        then: Yup.string().min(3),
      }),
      passportAttach: Yup.mixed().when("passportNo", (value) => {
        if (value) {
          if (value.length > 0) {
            return getMaxFileSizeValidation(800, "Passport copy");
          }
        }
      }),
    });
  };

  submitUpdateAction = (updateInf) => {
    const requestUpdateDate = updateInf;
    this.props.formSubmitAction(requestUpdateDate);
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          validationSchema={this.validationSchema}
          initialValues={this.initForm}
          onSubmit={(values, action) => {
            console.log("Form Submiting ... ");
            this.submitUpdateAction(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                <Row className="card-pay-row">
                  <Col md={6}>
                    <CstValidateField
                      label="First & Middle name."
                      placeholder="First & Middle name."
                      name="firstName"
                      handleChange={props.handleChange}
                      handleBlur={props.handleBlur}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Col>
                  <Col md={6}>
                    <CstValidateField
                      label="Last Name."
                      placeholder="Last Name."
                      name="lastName"
                      handleChange={props.handleChange}
                      handleBlur={props.handleBlur}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={6}>
                    <label className="form-label" htmlFor="nationality">
                      Nationality{" "}
                    </label>
                    <CstSelectCountry
                      name="nationality"
                      onChange={(item) => {
                        props.setFieldValue(
                          "nationality",
                          item ? item.value : null
                        );
                      }}
                      blurHandler={() => {
                        props.setFieldTouched("nationality", true);
                      }}
                      options={this.props.countryOptions}
                      placeholder={"Select Country"}
                    />
                    <div className="invalid-feedback">
                      {
                        esIsFieldError(
                          props.errors,
                          props.touched,
                          "nationality"
                        ).msg
                      }
                    </div>
                  </Col>
                  <Col md={6} className="cst-radio">
                    <label className="form-label" htmlFor="gender">
                      Gender{" "}
                    </label>
                    <CstRadioButton
                      name="gender"
                      label="Gender"
                      idKey="trvl"
                      errors={props.errors}
                      touched={props.touched}
                      handleChange={props.handleChange}
                      handleBlur={props.handleBlur}
                    />
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={6}>
                    <CstValidateField
                      type="date"
                      label="Date Of Birth."
                      placeholder="Date Of Birth."
                      name="dateOfBirth"
                      handleChange={props.handleChange}
                      handleBlur={props.handleBlur}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Col>
                  <Col md={6}>
                    <CstValidateField
                      label="Passport No"
                      placeholder="Passport Number"
                      name="passportNo"
                      handleChange={props.handleChange}
                      handleBlur={props.handleBlur}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Col>
                </Row>

                <Row className="card-pay-row">
                  <Col md={6}>
                    <label className="form-label" htmlFor="passportIssuCuntry">
                      Passport Issuing Country{" "}
                    </label>
                    <CstSelectCountry
                      name="passportIssuCuntry"
                      onChange={(item) => {
                        console.log("Issu Cuntry ", item);
                        let code = item ? item.value : null;
                        props.setFieldValue(`passportIssuCuntry`, code);
                      }}
                      blurHandler={() => {
                        props.setFieldTouched("issuCuntry", true);
                      }}
                      options={this.props.countryOptions}
                      placeholder={"Select Country"}
                    />

                    <div className="invalid-feedback">
                      {
                        esIsFieldError(
                          props.errors,
                          props.touched,
                          "issuCuntry"
                        ).msg
                      }
                    </div>
                  </Col>
                  <Col md={6}>
                    <CstValidateField
                      type="date"
                      label="Passport Expiry"
                      placeholder="Passport Expiry"
                      name="passportExpiry"
                      handleChange={props.handleChange}
                      handleBlur={props.handleBlur}
                      errors={props.errors}
                      touched={props.touched}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <CstUploadFileFieldValidet
                      name="passportAttach"
                      {...props}
                      label="Please, Add Passport Scan Copy Or Image"
                    />
                  </Col>
                </Row>

                {this.props.isExtendedField ? (
                  <React.Fragment>
                    <Row className="card-pay-row">
                      <Col md={12}>
                        <CstValidateField
                          label="Email"
                          placeholder="Email"
                          name="email"
                          handleChange={props.handleChange}
                          handleBlur={props.handleBlur}
                          errors={props.errors}
                          touched={props.touched}
                        />
                      </Col>
                    </Row>
                    <Row className="card-pay-row">
                      <Col md={12}>
                        <CstValidatePhoneNoField
                          {...props}
                          fileldName="phoneNo"
                          codeName="phoneCode"
                          filedPlaceholder="Phone"
                          codePlaceholder="Code"
                          options={this.props.phoneCodeOptions}
                          clazzName="country-w-phone"
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  ""
                )}
                <Row className="input-area-row">
                  <Col md={4} className="d-grid gap-2">
                    <Button type="submit">Submit </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

TravelerInformationForm.prototypes = {
  getCountryOptions: PropTypes.func.isRequired,
  getCountryPhonCodeOptions: PropTypes.func.isRequired,
  userSignUp: PropTypes.object.isRequired,
  countryOptions: PropTypes.object.isRequired,
  phoneCodeOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    updateStatus: state.user.customerPersonalInfoUpdate,
    countryOptions: state.country.countryOptions,
    phoneCodeOptions: state.country.countryPhoneOptions,
  };
};

export default connect(mapStateToProps, {
  getPesonalInformationUpdate,
  getCountryOptions,
  getCountryPhonCodeOptions,
})(TravelerInformationForm);
