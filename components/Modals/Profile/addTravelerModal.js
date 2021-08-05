import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Row, Modal, Nav } from "react-bootstrap";
import Select from "react-select";

const spyScrollActive = () => {
  // scroll content atm_main_content
  //MOdal Body amt_body modal-body
  // Menu / Option Items atm-link-item

  let atmContents = document.querySelectorAll(".atm_content");

  let scrollContent = document.querySelector(".atm_main_content");

  if (scrollContent) {
    // console.log("Content Scroll, ", scrollContent.scrollTop);
    scrollContent.onscroll = () => {
      const scrollPosition = scrollContent.scrollTop;

      atmContents &&
        atmContents.forEach((item, idx) => {
          if (item.offsetTop <= scrollPosition) {
            let ctActive = document.querySelector(`.atm-link-item.active`);

            if (ctActive) {
              ctActive.classList.remove("active");
            }
            let ctitem = document.querySelector(
              `.atm-link-item[data-rb-event-key="${item.id}"]`
            );

            if (ctitem) {
              ctitem.classList.add("active");
            }
          }
        });
    };
  }
};


const AddTravelerModal = (params) => {
  useEffect(() => {
    spyScrollActive();
  }, [params.show]);

  const scrollMoveAction = (key) => {
  // scroll content atm_main_content

    let elemnt = null,
      bodyReact = null;

    if (key) {
      elemnt = document.querySelector(`#${key}`);    

      if (elemnt) {
        // console.log("Scroll Action elemnt, ", elemnt.offsetTop);
        bodyReact = document.querySelector(".atm_main_content");

        if(bodyReact){
        // console.log("Befor Set Scroll Position, ", elemnt.offsetTop);
          bodyReact.scroll(0, elemnt.offsetTop+58);
        }
        
      }
    }
  };

  return (
    <React.Fragment>
      <Modal show={params.show} onHide={params.hideAction} size="lg">
        {/* <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}
        <Formik
          initialValues={{
            name: "",
            gender: "",
            email: "",
            phone_no: "",
            country_code: "",
            passport_no: "",
            issuing_country: "",
            exp_date: "",
            birthday: "",
          }}
        >
          {({
            setFieldTouched,
            setFieldValue,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <React.Fragment>
              <Form>
                <Modal.Body className="amt_body">
                  <div className="atm_main_content">
                    <Row>
                      <div className="atm_main_title">Add Traveler's Info</div>
                    </Row>
                    <div className="atm-options">
                      <Nav
                        variant="pills"
                        className="atm-nav shadow align-middle sticky-top"
                      >
                        <Nav.Item>
                          <Nav.Link
                            eventKey="atm_basi_inf"
                            onClick={() => {
                              scrollMoveAction("atm_basi_inf");
                            }}
                            className="atm-link-item active"
                          >
                            <div className="atm-text-area">
                              <span>Basic Info</span>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="atm_passport"
                            onClick={() => {
                              scrollMoveAction("atm_passport");
                            }}
                            className="atm-link-item"
                          >
                            <div className="atm-text-area">
                              <span>Passport</span>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>

                    <Row className="atm_container">
                      <Col md={12}>
                        <Row>
                          <Col
                            md={12}
                            className="atm_content"
                            id="atm_basi_inf"
                          >
                            <Row>
                              <Col md={12}>
                                <div className="atmin_header">
                                  <span className="atmin_title">
                                    Basic Information
                                  </span>
                                  <span>
                                    Basi Info, like your email and number that
                                    you use on Personal Profile{" "}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <label htmlFor="name">Full Name.</label>
                                <Field
                                  className="form-control"
                                  type="text"
                                  name="name"
                                  id="name"
                                />
                              </Col>
                              <Col md={6}>
                                <label htmlFor="gender">Gender.</label>
                                <Select
                                  onBlur={handleBlur}
                                  onChange={(item) => {
                                    setFieldValue(
                                      `gender`,
                                      item ? item.value : ""
                                    );
                                  }}
                                  name="gender"
                                  options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                  ]}
                                  placeholder={`Select Gender`}
                                />
                              </Col>
                            </Row>

                            <Row>
                              <Col md={6}>
                                <label htmlFor="email">Email ID.</label>
                                <Field
                                  className="form-control"
                                  type="email"
                                  name="email"
                                  id="email"
                                />
                              </Col>

                              <Col md={6}>
                                <label htmlFor="phone_no">Phone No.</label>
                                <Row className="mp-0">
                                  <Col md={4} className="mp-0">
                                    <Select
                                      options={[
                                        { label: "BD", value: "BD" },
                                        { label: "USA", value: "USA" },
                                        { label: "UAE", value: "UAE" },
                                      ]}
                                      name="country_code"
                                      onBlur={handleBlur}
                                      onChange={(item) => {
                                        setFieldValue(
                                          `country_code`,
                                          item ? item.value : ""
                                        );
                                      }}
                                      placeholder={`Code`}
                                    />
                                  </Col>
                                  <Col md={8} className="mp-0">
                                    <Field
                                      className="form-control"
                                      type="phone_no"
                                      name="phone_no"
                                      id="phone_no"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>

                          <Col
                            md={12}
                            className="atm_content"
                            id="atm_passport"
                          >
                            <Row>
                              <Col md={12}>
                                <div className="atmin_header">
                                  <span className="atmin_title">
                                    Passport Details
                                  </span>
                                  <span>
                                    Add your Passport details for a faster
                                    flight booking experience
                                  </span>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <label htmlFor="name">Passport Number.</label>
                                <Field
                                  className="form-control"
                                  type="text"
                                  name="name"
                                  id="name"
                                />
                              </Col>
                              <Col md={6}>
                                <label htmlFor="gender">Issuing Country.</label>
                                <Select
                                  onBlur={handleBlur}
                                  onChange={(item) => {
                                    setFieldValue(
                                      `gender`,
                                      item ? item.value : ""
                                    );
                                  }}
                                  name="gender"
                                  options={[
                                    { label: "USA", value: "usa" },
                                    { label: "UAE", value: "UAE" },
                                  ]}
                                  placeholder={`Select Gender`}
                                />
                              </Col>
                            </Row>

                            <Row>
                              <Col md={6}>
                                <label htmlFor="exp_date">Expiry Date</label>
                                <Field
                                  className="form-control"
                                  type="date"
                                  name="exp_date"
                                  id="exp_date"
                                />
                              </Col>

                              <Col md={6}>
                                <label htmlFor="birthday">Birthday.</label>
                                <Field
                                  className="form-control"
                                  type="date"
                                  name="birthday"
                                  id="birthday"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  <Col md={12} className="atm-action-area">
                    <Row>
                      <Col md={{ offset: 6, span: 3 }}>
                        <Button
                          variant="outline-danger"
                          onClick={params.hideAction}
                          block
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="outline-success"
                          onClick={params.hideAction}
                          type="submit"
                          block
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Modal.Body>
              </Form>
            </React.Fragment>
          )}
        </Formik>
      </Modal>
    </React.Fragment>
  );
};

export default AddTravelerModal;
