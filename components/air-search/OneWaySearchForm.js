import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";

import TravellersAndClass from "./travellersAndClass";
import SingleDatePicker from "./SingleDatePicker";
import AutoSearchSuggestionList from "./AutoSearchSuggestionList";
import AutoSuggestionInptTextField from "../autosuggestion/autoSuggestionInptTextField";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  getOneWayAirSearchRequest,
  setSearchQuery,
} from "../../redux/actions/airSearchAction";
import { helperGetDateFormate } from "../../utils/helper/helperAction";
import LoaderSpiner from "../../utils/helper/loaderSpiner";

const OneWaySearchForm = (params) => {
  const [lastDate, setLastDate] = useState(new Date());
  const [oneWayDate, setOneWayDate] = useState(new Date());
  const [searchingStatus, setSearchingStatus] = useState(false);
  const [resMsg, setResMsg] = useState(false);
  const router = useRouter();

  const {
    searchRespStatus,
    searchResErrorStatus,
    airSearchResponse,
    redirectStatus,
  } = params;

  if (searchingStatus) {
    if (searchRespStatus) {
      if (airSearchResponse) {
        if (airSearchResponse.status) {
          router.push("/flights/search");
        } else {
          setResMsg(airSearchResponse.message);
          setSearchingStatus(false);
        }
      } else {
        setResMsg("Flight not found, Please Try another date");
        setSearchingStatus(false);
      }
    }

    if (searchResErrorStatus) {
      setResMsg("Netwaork error, Please Try again later");
      setSearchingStatus(false);
    }
  }

  const searchOneWayTrip = (queryData) => {
    console.log("One Way Search Query: ", queryData);
    const airLegs = [];
    // const permittedCarriers = ["QR", "TK", "AI", "H1", "UK"];
    const passengers = [];
    //const currencyType = "USD";
    let cabinClass = "Economy";

    if (queryData !== undefined) {
      queryData.passDetails &&
        queryData.passDetails.forEach((item, idx) => {
          let origin = item.from && item.from.code;
          let destination = item.to && item.to.code;

          let date = helperGetDateFormate(item.depTime);
          airLegs.push({
            orgCode: origin,
            destCode: destination,
            depTime: date,
          });
        });

      if (queryData.traveler !== undefined) {
        if (
          queryData.traveler.ADT !== undefined &&
          queryData.traveler.ADT !== null
        ) {
          for (let a = 0; a < queryData.traveler.ADT.value; a++) {
            passengers.push({ code: "ADT" });
          }
        }

        if (
          queryData.traveler.CNN !== undefined &&
          queryData.traveler.CNN !== null
        ) {
          for (let c = 0; c < queryData.traveler.CNN.value; c++) {
            passengers.push({ code: "CNN" });
          }
        }

        if (
          queryData.traveler.INF !== undefined &&
          queryData.traveler.INF !== null
        ) {
          for (let i = 0; i < queryData.traveler.INF.value; i++) {
            passengers.push({ code: "INF" });
          }
        }

        cabinClass = queryData.traveler.cabClass.value;
      }
    }

    let intQuery = {
      itemCount: 5,
      airLegReqs: airLegs,
      airSearchModifiersReq: {
        permittedCarriers: null,
      },
      passengers: passengers,
      airPricingModifiersReq: {
        //currencyType: currencyType,
      },
      cabinClass: cabinClass,
    };

    let queryType = { searchQuery: intQuery, type: 1 };

    params.setSearchQuery(queryType);

    params.getOneWayAirSearchRequest(intQuery);

    setSearchingStatus(true);

    console.log(
      "One Way Search Form Query Befor Send: ",
      JSON.stringify(intQuery, null, 2)
    );
  };

  return (
    <React.Fragment>
      <LoaderSpiner show={searchingStatus} />
      <Formik
        initialValues={params.oneInitValue}
        onSubmit={(values, actions) => {
          searchOneWayTrip(values);
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
                              <Col
                                md={6}
                                className="no-margin-padding each-content"
                              >
                                <Row className="no-margin-padding in-area">
                                  <Col
                                    md={6}
                                    className="no-margin-padding each-content "
                                  >
                                    {/* <AutoSearchSuggestionList
                                      title="From"
                                      suggestions={params.sugList}
                                      name={`passDetails[${indx}].from`}
                                      id={`passDetails[${indx}].from`}
                                      getSelectedData={(value) => {
                                        console.log("SLV ", value);
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          value !== undefined ? {name:value.name, code:value.iataCode} : null
                                        );
                                        params.getOneWayTripData(props.values, 1, null);
                                      }}
                                    /> */}
                                    <AutoSuggestionInptTextField
                                      change={(airPort) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          airPort !== undefined
                                            ? {
                                                name: airPort.name,
                                                code: airPort.iataCode,
                                              }
                                            : { name: "", code: "" }
                                        );
                                        params.getOneWayTripData(
                                          props.values,
                                          1,
                                          null
                                        );
                                      }}
                                      name={`passDetails[${indx}].from`}
                                      label="From"
                                      id={`passDetails-${indx}-from`}
                                    />
                                  </Col>
                                  <Col md={6} className="no-margin-padding">
                                    {/* <AutoSearchSuggestionList
                                      title="To"
                                      suggestions={params.sugList}
                                      name={`passDetails[${indx}].to`}
                                      id={`passDetails[${indx}].to`}
                                      getSelectedData={(value) => {
                                        console.log("Pre Selected Or S: ", value);
                                        props.setFieldValue(
                                          `passDetails[${indx}].to`,
                                          value !== undefined ? {name:value.name, code:value.iataCode} : null
                                        );
                                        params.getOneWayTripData(props.values, 2, null);

                                      }}
                                    /> */}

                                    <AutoSuggestionInptTextField
                                      change={(airPort) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].to`,
                                          airPort !== undefined
                                            ? {
                                                name: airPort.name,
                                                code: airPort.iataCode,
                                              }
                                            : { name: "", code: "" }
                                        );
                                        params.getOneWayTripData(
                                          props.values,
                                          1,
                                          null
                                        );
                                      }}
                                      name={`passDetails[${indx}].to`}
                                      label="To"
                                      id={`passDetails-${indx}-to`}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                md={3}
                                className="no-margin-padding each-content"
                              >
                                <Row className="mp-0">
                                  <Col
                                    md={6}
                                    className="no-margin-padding each-content dtp-ara"
                                  >
                                    <SingleDatePicker
                                      preSetDate={params.setLastDate}
                                      getDate={(item) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].depTime`,
                                          item
                                        );

                                        setLastDate(item);

                                        params.getOneWayTripData(
                                          props.values,
                                          3,
                                          null
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    md={6}
                                    className=""
                                    onClick={() => {
                                      params.setDataToRoundTrip(props.values);
                                    }}
                                  >
                                    <div className="cHeight">
                                      <p>&nbsp;</p>

                                      <p className="text-disable">
                                        Tap to add a return date for bigger
                                        discounts
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col md={3} className="no-margin-padding">
                                <TravellersAndClass
                                  getAllRangeData={(
                                    adults,
                                    child,
                                    infants,
                                    cabinClass
                                  ) => {
                                    props.setFieldValue(`traveler.ADT`, adults);
                                    props.setFieldValue(`traveler.CNN`, child);
                                    props.setFieldValue(
                                      `traveler.INF`,
                                      infants
                                    );

                                    props.setFieldValue(
                                      `traveler.cabClass`,
                                      cabinClass
                                    );
                                    params.getOneWayTripData(props.values, 5, {
                                      adults,
                                      child,
                                      infants,
                                      cabinClass,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                          ))}
                      </React.Fragment>
                    )}
                  </FieldArray>
                </Col>
              </Row>

              <Row>
                <Col md={{ span: 2, offset: 5 }}>
                  <Button type="submit" className="btn btn-block btn-primary">
                    Search
                  </Button>
                </Col>
              </Row>
            </React.Fragment>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

OneWaySearchForm.prototypes = {
  getOneWayAirSearchRequest: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  airSearchResponse: PropTypes.object.isRequired,
  searchRespStatus: PropTypes.object.isRequired,
  searchResErrorStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchRespStatus: state.airSearch.searcResStatus,
    searchResErrorStatus: state.airSearch.searchResErrorStatus,
    airSearchResponse: state.airSearch.airSearchResponse,
  };
};

export default connect(mapStateToProps, {
  setSearchQuery,
  getOneWayAirSearchRequest,
})(OneWaySearchForm);
