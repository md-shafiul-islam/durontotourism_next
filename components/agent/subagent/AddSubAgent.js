import React, { useState, useEffect, useRef} from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
  getAddSubAgentAction,
  getCurrentAgentAction,
} from "../../../redux/actions/agentAction";
import { helperIsEmpty } from "../../../utils/helper/helperAction";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";
import { REST_ADD_SUB_AGENT } from "../../../redux/types";
import { toast } from "react-toastify";
import { esNotifyAction, esNotifyUpdateAction } from "../../../utils/helper/esNotify";

const AddSubAgent = (params) => {
  const dispatch = useDispatch();
  const refNotify = useRef(undefined);
  const [submitingStatus, setSubmitingStatus] = useState(false);

  useEffect(() => {
    if (submitingStatus && !helperIsEmpty(params.addSubAgent)) {
      if (params.addSubAgent.status) {
        dispatch({
          type: REST_ADD_SUB_AGENT,
          payload: true,
        });
        setSubmitingStatus(false);
        esNotifyUpdateAction(refNotify, "Add Subagent", toast.TYPE.SUCCESS);
      } else {
        esNotifyAction(refNotify, "Error Add Subagent", toast.TYPE.ERROR);
      }
    }
  }, [params.addSubAgent]);

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

  const submitAction = (values) => {
    if (values) {
      params.getAddSubAgentAction(values);
      esNotifyAction(refNotify, "Add Subagent");
      setSubmitingStatus(true);
    }
  };

  const { agent } = params;
  return (
    <React.Fragment>
      <LoaderSpiner show={submitingStatus} loadingText="Creating Sub Agent" />
      <Card>
        <Card.Body>
          <Row>
            <Col md={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  agentId: agent.agentGenarelInfo && agent.agentGenarelInfo.id,
                  name: "",
                  email: "",
                  phone: "",
                  code: "",
                  pwd: "",
                }}
                validationSchema={validateSchema()}
                onSubmit={(values, action) => {
                  console.log("Agent Add action fire!! ");
                  submitAction(values);
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
                            {...props}
                            readOnly={true}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Name"
                            name="name"
                            {...props}
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
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidatePhoneNoField
                            {...props}
                            fileldName="phone"
                            codeName="code"
                            filedPlaceholder="Phone"
                            codePlaceholder="Code"
                            options={params.countryPhoneOptions}
                            clazzName="country-w-phone"
                            // defaultValue="BD"
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
      {/**
      <UpdateAgentCompanyInfo />
      <UpdateAgentOwnerInfo /> */}
    </React.Fragment>
  );
};

AddSubAgent.prototype = {
  getAddSubAgentAction: PropTypes.func.isRequired,
  agent: PropTypes.object.isRequired,
  countryPhoneOptions: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    countryPhoneOptions: state.country.countryPhoneOptions,
    agent: state.agent && state.agent.loginAgent,
    addSubAgent: state.agent && state.agent.addSubAgent,
  };
};

export default connect(mapStateToProps, {
  getAddSubAgentAction,
  getCurrentAgentAction,
})(AddSubAgent);
