import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import TravellersAndClass from "./travellersAndClass";
import AutoSearchSuggestionList from "./AutoSearchSuggestionList";
import SingleDatePicker from "./SingleDatePicker";
import { addDays } from "date-fns";
import AutoSuggestionInptTextField from "../autosuggestion/autoSuggestionInptTextField";
import SelectItinerary from "./traveller/SelectItinerary";

const MultiCitySearchForm = (params) => {
  const [pDate, setPDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());
  const [newItem, setNewItem] = useState({
    from: "",
    to: "",
    depTime: new Date(),
  });

  const getNextItem = (passDetails) => {
    let lastIdx = passDetails.length > 0 ? passDetails.length - 1 : 0;
    let lastItem = passDetails[lastIdx];
    let item = {
      from: "",
      to: "",
      depTime: new Date(),
    };

    let nDate = new Date(lastItem.depTime);
    nDate = addDays(nDate, 1);

    item.from = lastItem.to;
    item.depTime = nDate;

    if (item === undefined || item === null) {
      return item;
    }
    setNewItem(item);
    return item;
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={params.multyInitValue}
        onSubmit={(values, actions) => {
          params.getSearchValueAndSubmit(values);
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
                              <Col md={6} className="each-content">
                                <SelectItinerary
                                  {...props}
                                  idx={indx}
                                  origin={null}
                                  destination={null}
                                  destinationFieldName={`passDetails[${indx}].to`}
                                  originFieldName={`passDetails[${indx}].from`}
                                />
                              </Col>
                              <Col
                                md={2}
                                className="no-margin-padding each-content"
                              >
                                <SingleDatePicker
                                  preSetDate={item.depTime}
                                  getDate={(item) => {
                                    props.setFieldValue(
                                      `passDetails[${indx}].depTime`,
                                      item
                                    );

                                    setLastDate(item);
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
                                      props.setFieldValue(
                                        `traveler.ADT`,
                                        adults
                                      );
                                      props.setFieldValue(
                                        `traveler.CNN`,
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
                                    <Col md={8} className="ptop">
                                      <a
                                        className=" btn btn-block btn-outline-primary btn-xs"
                                        href="javascript:void(0);"
                                        onClick={() => {
                                          push(
                                            getNextItem(
                                              props.values.passDetails
                                            )
                                          );
                                        }}
                                      >
                                        ADD ANOTHER CITY
                                      </a>
                                    </Col>
                                    {indx > 1 ? (
                                      <Col md={4} className="ptop">
                                        <span
                                          onClick={() => remove(indx)}
                                          className=" btn btn-block btn-outline-danger btn-xs"
                                        >
                                          <i className="fas fa-backspace"></i>
                                        </span>
                                      </Col>
                                    ) : (
                                      ""
                                    )}
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

            <Row>
              <Col md={{ span: 2, offset: 5 }}>
                <Button type="submit" className="btn btn-block btn-primary">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default MultiCitySearchForm;
