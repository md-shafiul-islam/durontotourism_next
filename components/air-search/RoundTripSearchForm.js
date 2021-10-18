import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import DatePickerRange from "./datePickerRange";
import TravellersAndClass from "./travellersAndClass";
// import AutoSearchSuggestionList from "./AutoSearchSuggestionList";
import AutoSuggestionInptTextField from "../autosuggestion/autoSuggestionInptTextField";
import { useRouter } from "next/router";
import { helperGetDateFormate, helperIsEmpty } from "../../utils/helper/helperAction";
import { localDataStore } from "../../utils/helper/localDataStore";
import { getAirSearchRequestType, setSearchQuery } from "../../redux/actions/airSearchAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const RoundTripSearchForm = (params) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();

  const submitRoundTripAction = (queryData) => {
    console.log("submitRoundTripAction, ", queryData);

    if (queryData !== undefined && queryData !== null) {
      let searchModifire = {
        permittedCarriers: [],
      };

      let tPassengers = [];

      let airPricingModifiers = {
        currencyType: "USD",
      };

      let { traveler, passDetails } = queryData;
      let airLegDep = [],
        airLegRet;
      let cabinClass = "Economy";

      if (passDetails !== undefined && passDetails !== null) {
        let { depTime, from, to, returnTime } = passDetails[0];
        console.log("Air Legs Details: ", from, " - ", to);
        let departureDate = helperGetDateFormate(depTime);
        let reDate = helperGetDateFormate(returnTime);

        airLegDep = [
          {
            orgCode: from && from.iataCode,
            destCode: to && to.iataCode,
            depTime: departureDate,
          },
        ];

        airLegRet = [
          {
            orgCode: to && to.iataCode,
            destCode: from && from.iataCode,
            depTime: reDate,
          },
        ];
      }

      if (traveler !== undefined && traveler !== null) {
        if (traveler.cabClass !== undefined && traveler.cabClass !== null) {
          if (traveler.cabClass.length > 4) {
            cabinClass = traveler.cabClass;
          }
        }

        if (traveler.ADT !== undefined) {
          for (let a = 0; a < traveler.ADT.value; a++) {
            tPassengers.push({ code: "ADT" });
          }
        }
        if (traveler.CNN !== undefined) {
          for (let c = 0; c < traveler.CNN.value; c++) {
            tPassengers.push({ code: "CNN" });
          }
        } 
        
        if (traveler.INF !== undefined) {
          for (let i = 0; i < traveler.INF.value; i++) {
            tPassengers.push({ code: "INF" });
          }
        }
        
        if(tPassengers.length === 0){
          tPassengers.push({ code: "ADT" });
        }
      }

      let searchQueryCstDep = {
        itemCount: 5,

        airLegReqs: airLegDep,
        airSearchModifiersReq: null,
        passengers: tPassengers,
        airPricingModifiersReq: null, //{ currencyType: "USD",},
        cabinClass: cabinClass,
      };

      let searchQueryCstRet = {
        itemCount: 5,

        airLegReqs: airLegRet,
        airSearchModifiersReq: null,
        passengers: tPassengers,
        airPricingModifiersReq: null, //{ currencyType: "USD",},
        cabinClass: cabinClass,
      };

      let queryBoth = {
        depQuery: searchQueryCstDep,
        retQuery: searchQueryCstRet,
      };
      let queryType = { searchQuery: queryBoth, type: 2 };

      params.setSearchQuery(queryType);
      localDataStore.setSearchQuery(queryType);
      let queryDep = JSON.stringify(searchQueryCstDep, null, 2);
      let queryRet = JSON.stringify(searchQueryCstRet, null, 2);
      console.log("searchQueryCst, Round Trip, ", queryBoth);

      params.getAirSearchRequestType(queryDep, "departureFlights");
      params.getAirSearchRequestType(queryRet, "returnFlights");
      
      console.log("Before Redirect ...");
      router.push("/flights/search");

    }
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={params.roundInitValue}
        onSubmit={(values, actions) => {
          submitRoundTripAction(values);
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
                                    className="no-margin-padding each-content"
                                  >
                                    <AutoSuggestionInptTextField
                                      change={(airPort) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          airPort
                                        );
                                      }}
                                      name={`passDetails[${indx}].from`}
                                      label="From"
                                      id={`passDetails-${indx}-from`}

                                      // preSetItem={params.preSetRoundTripForm} not set yet
                                    />
                                    {/* <AutoSearchSuggestionList
                                      title="From"
                                      suggestions={params.sugList}
                                      name={`passDetails[${indx}].from`}
                                      id={`passDetails[${indx}].from`}
                                      getSelectedData={(value) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          value
                                        );
                                      }}
                                      preSetItem={params.preSetRoundTripForm}
                                    /> */}
                                  </Col>
                                  <Col md={6} className="no-margin-padding">
                                    <AutoSuggestionInptTextField
                                      change={(airPort) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].to`,
                                          airPort
                                        );
                                      }}
                                      name={`passDetails[${indx}].to`}
                                      label="To"
                                      id={`passDetails-${indx}-to`}

                                      // preSetItem={params.preSetRoundTripForm} not set yet
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                md={3}
                                className="no-margin-padding each-content"
                              >
                                <DatePickerRange
                                  preSetDepDate={
                                    props.values.passDetails[indx].depTime
                                  }
                                  getStartDate={(sdate) => {
                                    setStartDate(sdate);
                                    props.setFieldValue(
                                      `passDetails[${indx}].depTime`,
                                      sdate
                                    );
                                  }}
                                  getEndDate={(enDate) => {
                                    setEndDate(enDate);
                                    props.setFieldValue(
                                      `passDetails[${indx}].returnTime`,
                                      enDate
                                    );
                                  }}
                                />
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
                <Col md={{ span: 4, offset: 4 }}>
                  <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                      <Button
                        type="submit"
                        className="btn btn-primary home-action-btn"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </React.Fragment>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

RoundTripSearchForm.prototypes = {
  getAirSearchRequestType: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state)=>{
  return {}
}
export default connect(mapStateToProps, {setSearchQuery, getAirSearchRequestType})(RoundTripSearchForm);
