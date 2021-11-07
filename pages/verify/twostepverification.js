import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import { setAxiosHeaderToken } from "../../redux/esRequestAction";
import { getSession, useSession } from "next-auth/react";
import * as Yup from "yup";
import EsActionLink from "../../components/EsAction/EsActionLink";
import VerifyOptionCard from "../../components/authentication/verify/VerifyOptionCard";
import {
  getMailVerifyAction,
  getSmsVerifyAction,
  getMailVerifyResendAction,
  getSmsVerifyResendAction,
} from "../../redux/actions/verifyAction";
import axios from "axios";
import { GET_BACK_END_URL, REQUEST_HEADER_GET } from "../../redux/types";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import {
  getHideMailString,
  getHideStringUsingEndPoint,
} from "../../utils/ui/manipulateString";

const TwoStepVerification = (params) => {
  console.log("TwoStepVerification params, ", params);
  const { status, data } = useSession();

  console.log("Session Loding Status, ", status, " Data, ", data);
  status === "authenticated" ? setAxiosHeaderToken(data) : "";

  useEffect(() => {}, [status]);

  const createVerify = (code) => {
    console.log("Create Verify Data, ", data);
    if (data.user) {
      let { user } = data;
      console.log("Data User ", user);
      return { id: user.id, dc: code };
    }
    return { id: "", dc: code };
  };
  const validationScema = () => {
    return Yup.object().shape({
      otpCode: Yup.string().required("Please, Enter OTP"),
    });
  };

  const mailVerifyAction = (props) => {
    console.log("Mail ", props);
    params.getMailVerifyAction(createVerify(props));
  };
  const phoneVerifyAction = (props) => {
    console.log("Phone ", props);
    params.getSmsVerifyAction(createVerify(props));
  };

  const reSendMailVerification = () => {
    //Create Request Data
    console.log("Resend Action ...");

    params.getSmsVerifyResendAction();
  };

  const reSendSmsVerification = () => {
    //Create Request Data
    console.log("Resend Action ...");
    params.getMailVerifyResendAction();
  };

  const getPhoneStatus = () => {
    if (!helperIsEmpty(params.customer)) {
      return params.customer.phoneVrified;
    }
    return false;
  };

  const getMailStatus = () => {
    if (!helperIsEmpty(params.customer)) {
      return params.customer.mailVrified;
    }
    return false;
  };

  const getVerifiedObj = (status, type) => {
    if (status) {
      return { message: "", status: true };
    }
    if (type === "mail") {
      return params.mailVerify;
    } else {
      return params.smsVerify;
    }
  };

  const getPhoneNo = () => {
    if (!helperIsEmpty(params.customer)) {
      return `${params.customer.phoneCode}${params.customer.phone}`;
    }
  };

  const getEmail = () => {
    if (!helperIsEmpty(params.customer)) {
      return `${params.customer.email}`;
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="phone-verify-container  ">
          <Card className="phone-verify-content shadow">
            <Card.Title>Two Step Verification</Card.Title>
            <Card.Body>
              <Formik
                initialValues={{ phoneOtpCode: "", mailOtp: "" }}
                validationSchema={validationScema}
                onSubmit={(values, action) => {
                  console.log("OTP ", values);
                }}
              >
                {(props) => {
                  return (
                    <React.Fragment>
                      <Form>
                        {/* <VerifyOptionCard
                          label="Please enter the OTP taht was sent to registered "
                          methodeId={`Mobile Number ${getHideStringUsingEndPoint(
                            3,
                            3,
                            getPhoneNo()
                          )}`}
                          name="phoneOtpCode"
                          digits={6}
                          colSize={2}
                          changeHandeler={(code) => {
                            props.setFieldValue(`phoneOtpCode`, code);
                          }}
                          title="SMS Verification"
                          remTime={180}
                          verifyAction={() => {
                            phoneVerifyAction(props.values.phoneOtpCode);
                          }}
                          getReSendAction={reSendSmsVerification}
                          verify={getVerifiedObj(getPhoneStatus(), "phone")}
                          verifyStatus={getPhoneStatus()}
                          statusTitle="SMS Verified"
                        /> */}

                        <VerifyOptionCard
                          label="Please enter the OTP taht was sent to
                                    registered "
                          methodeId={`Email  ${getHideMailString(
                            3,
                            getEmail()
                          )}`}
                          name="mailOtp"
                          digits={6}
                          colSize={2}
                          changeHandeler={(code) => {
                            props.setFieldValue(`mailOtp`, code);
                          }}
                          title="Mail Verification"
                          verifyAction={() => {
                            mailVerifyAction(props.values.mailOtp);
                          }}
                          getReSendAction={reSendMailVerification}
                          remTime={120}
                          verify={getVerifiedObj(getMailStatus(), "mail")}
                          verifyStatus={getMailStatus()}
                          statusTitle="Mail Verified"
                        />
                      </Form>
                    </React.Fragment>
                  );
                }}
              </Formik>
              <Row>
                <Col md={2}>
                  <EsActionLink action="/" text="Skip" />
                </Col>
                <Col md={{ offset: 8, span: 2 }}>
                  <EsActionLink action="/" text="Home" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

TwoStepVerification.prototype = {
  getSmsVerifyAction: PropTypes.func.isRequired,
  getSmsVerifyResendAction: PropTypes.func.isRequired,
  getMailVerifyAction: PropTypes.func.isRequired,
  getMailVerifyResendAction: PropTypes.func.isRequired,
  mailVerifyStatus: PropTypes.object.isRequired,
  smsVerifyStatus: PropTypes.object.isRequired,
  mailResendStatus: PropTypes.object.isRequired,
  smsResendStatus: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  let session = await getSession({ req: context.req });

  if (!session) {
    console.log("Current Agent Session, ", session);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  //  console.log("User Seesion Verify, ", session);

  try {
    REQUEST_HEADER_GET.Authorization = session.accessToken;
    const resp = await axios.get(`${GET_BACK_END_URL}/customers/current`, {
      headers: REQUEST_HEADER_GET,
    });
    if (resp) {
      if (resp.data) {
        if (resp.data.customer) {
          return {
            props: {
              customer: resp.data.customer,
            },
          };
        }
      }
    }
    return {
      props: { status: "User Not Found" },
    };
  } catch (error) {
    return {
      props: { status: "User Not Found", error: error.message },
    };
  }
}

const mapStateToProps = (state) => {
  return {
    mailVerify: state.verify.mail,
    smsVerify: state.verify.sms,
    mailResend: state.verify.mailResend,
    smsResend: state.verify.smsResend,
  };
};

export default connect(mapStateToProps, {
  getSmsVerifyAction,
  getMailVerifyAction,
  getMailVerifyResendAction,
  getSmsVerifyResendAction,
})(TwoStepVerification);
