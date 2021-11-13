/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import CstValidateField from "../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../components/Fields/CstValidatePhoneNoField";
import SubmitActionButtion from "../components/Fields/SubmitActionButtion";
import * as Yup from "yup";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import { getAddSignUpAction } from "../redux/actions/signUpAction";
import { REST_USER_SIGNUP } from "../redux/types";
import { getSession, signIn } from "next-auth/react";
import { helperIsEmpty } from "../utils/helper/helperAction";
import { getCountryOptions } from "../redux/actions/countriyAction";

const GetSignupPage = (params) => {
  console.log("SignUp Page Params, ", params);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    if (helperIsEmpty(params.countryOptions)) {
      params.getCountryOptions();
    } else {
      if (params.countryOptions.length === 0) {
        params.getCountryOptions();
      }
    }
  }, []);

  const validationScema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required("Please, Enter First Name "),
      lastName: Yup.string().required("Please, Enter Last Name "),
      email: Yup.string()
        .email("Please Enter valide Email")
        .required("Email is Required"),
      phoneNo: Yup.string()
        .min(10, "Please Enter Phone No.")
        .required("Phone No is required"),
      code: Yup.string()
        .min(1, "Please Enter code ")
        .required("Code is required"),
      password: Yup.string()
        .min(8, "Password Minimum 8 or more letter, number or any character")
        .required("Password is required"),
    });
  };

  console.log("User Sign up Params, ", params);
  if (params.userSignUp.status) {
    console.log("Run Dispatch Fnc Comp, ", params.userSignUp.status);
    dispatch({
      type: REST_USER_SIGNUP,
      payload: true,
    });
    signIn("credentials", {
      username: loginData.userName,
      password: loginData.pwd,
      callbackUrl: `${window.origin}/verify/twostepverification`,
      userStatus: "customer",
    });
    // router.push("/verify/twostepverification");
  }

  const initLogin = (login) => {
    setLoginData(login);
  };
  const siginUpAction = () => {
    router.push("/verify/twostepverification");
  };

  return (
    <div className="user-signup-container">
      <div className="user-signup">
        <div className="title">Signup</div>
        <Row>
          <Col md={12}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNo: "",
                code: "",
                password: "",
              }}
              validationSchema={validationScema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);
                initLogin({ userName: values.email, pwd: values.password });
                // siginUpAction();
                params.getAddSignUpAction(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="firstName"
                        placeholder="First Name"
                        {...props}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="lastName"
                        placeholder="Last Name"
                        {...props}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="email"
                        placeholder="Email"
                        {...props}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidatePhoneNoField
                        {...props}
                        fileldName="phoneNo"
                        codeName="code"
                        filedPlaceholder="Phone"
                        codePlaceholder="Code"
                        options={params.countryOptions}
                        clazzName="country-w-phone"
                        
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="password"
                        placeholder="Password"
                        type="password"
                        {...props}
                      />
                    </Col>
                    <Col md={12} className="d-grid">
                      <SubmitActionButtion
                        label="Submit"
                        variant="success"
                        isSubmitting={props.isSubmitting}
                      />
                    </Col>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userSignUp: state.signup.addSignUp,
    countryOptions: state.country.countryOptions,
  };
};

GetSignupPage.prototype = {
  getAddSignUpAction: PropTypes.func.isRequired,
  userSignUp: PropTypes.object.isRequired,
  countryOptions: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  let session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      refLink: context.req.headers.referer ? context.req.headers.referer : "/",
    },
  };
}

export default connect(mapStateToProps, {
  getAddSignUpAction,
  getCountryOptions,
})(GetSignupPage);
