import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import UpdateAgentCompanyInfo from "../profile/UpdateAgentCompanyInfo";
import UpdateAgentOwnerInfo from "../profile/UpdateAgentOwnerInfo";
import { esIsPhoneFieldError } from "../../../utils/helper/helperAction";

const AddSubAgent = (params) => {
  const validateSchema = () => {
    return Yup.object().shape({
      agentId: Yup.string().required("Required. Enter Agent Id "),
      name: Yup.string().required(
        "Required. Enter Empployee Or Sub agent name  "
      ),
      email: Yup.string()
        .email("Please Enter valid email address")
        .required("Required. Enter Email Id "),
      phone: Yup.string().required("Required. Enter Phone No"),
      code: Yup.string().required(
        "Required. Select one Call code Or phone Code "
      ),
      pwd: Yup.string().required("Required. Enter Empployee subagent password"),
    });
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  agentId: "",
                  name: "",
                  email: "",
                  phone: "",
                  code: "",
                  pwd: "",
                }}
                validationSchema={validateSchema()}
                onSubmit={(values, action)=>{
                  console.log("Agent Add action fire!! ")
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Agent ID"
                            name="agentId"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Name"
                            name="name"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Email"
                            name="email"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidatePhoneNoField
                            {...props}
                            fileldName="phone"
                            codeName="code"
                            filedPlaceholder="Phone"
                            codePlaceholder="Code"
                            clazzName={
                              esIsPhoneFieldError(
                                props.errors,
                                props.touched,
                                `phone`,
                                `code`
                              ).cls
                            }
                            errorMsg={
                              esIsPhoneFieldError(
                                props.errors,
                                props.touched,
                                `phone`,
                                `code`
                              ).msg
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            {...props}
                            placeholder="Password"
                            name="pwd"
                            type="password"
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={{ span: 4, offset: 4 }} className="d-grid">
                          <Button type="submit" variant="success">
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <UpdateAgentCompanyInfo />
      <UpdateAgentOwnerInfo />
    </React.Fragment>
  );
};

export default AddSubAgent;
