import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";

import SingleDatePicker from "./SingleDatePicker";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  getOneWayAirSearchRequest,
  setSearchQuery,
} from "../../redux/actions/airSearchAction";
import { helperGetDateFormate } from "../../utils/helper/helperAction";
import LoaderSpiner from "../../utils/helper/loaderSpiner";
import CstAsyncSerachField from "../Fields/CstAsyncSerachField";
import TravellerAndClassCard from "./traveller/TravellerAndClassCard";

const OneWaySearchForm = (params) => {
  const [lastDate, setLastDate] = useState(new Date());
  const [oneWayDate, setOneWayDate] = useState(new Date());
  const [searchingStatus, setSearchingStatus] = useState(false);
  const [resMsg, setResMsg] = useState(false);
  const router = useRouter();

  console.log("Current Router, ", router);

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
          if (router.asPath !== "/flights/search") {
            router.push("/flights/search");
          } else {
            setSearchingStatus(false);
          }
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
    if (router.asPath !== "/flights/search") {
      setSearchingStatus(true);
    }

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
                                    {/* <AutoSuggestionInptTextField
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
                                    /> */}

                                    <CstAsyncSerachField
                                      label="From"
                                      placeholder="Enter air port name, code or location"
                                      fieldName={`passDetails-${indx}-from`}
                                      onChangeHandler={(item) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          item !== undefined
                                            ? {
                                                name: item.name,
                                                code: item.iataCode,
                                              }
                                            : { name: "", code: "" }
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col md={6} className="no-margin-padding">
                                    <CstAsyncSerachField
                                      placeholder="Enter air port name, code or location"
                                      label="To"
                                      fieldName={`passDetails-${indx}-to`}
                                      onChangeHandler={(item) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].to`,
                                          item !== undefined
                                            ? {
                                                name: item.name,
                                                code: item.iataCode,
                                              }
                                            : { name: "", code: "" }
                                        );
                                      }}
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
                                <TravellerAndClassCard
                                  setAdtTraveler={(item) => {
                                    props.setFieldValue(`traveler.ADT`, item);
                                  }}
                                  setCnnTraveler={(item) => {
                                    props.setFieldValue(`traveler.CNN`, item);
                                  }}
                                  setInfTraveler={(item) => {
                                    props.setFieldValue(`traveler.INF`, item);
                                  }}
                                  setCabinClass={(item) => {
                                    props.setFieldValue(
                                      `traveler.cabClass`,
                                      item
                                    );
                                  }}
                                />
                                {/* <TravellersAndClass
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
                                /> */}
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
