import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import DatePickerRange from "./datePickerRange";
import { useRouter } from "next/router";
import {
  helperGetDateFormate,
  helperIsEmpty,
} from "../../utils/helper/helperAction";
import { localDataStore } from "../../utils/helper/localDataStore";
import {
  getAirSearchRequestType,
  setSearchQuery,
} from "../../redux/actions/airSearchAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import TravellerAndClassCard from "./traveller/TravellerAndClassCard";
import SelectItinerary from "./traveller/SelectItinerary";
import { getPassengerCount } from "../../utils/ui/accordionEs";

const RoundTripSearchForm = (params) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();

  const [passengerCount, setPassengerCount] = useState(undefined);
  const [flCabinClass, setFlcabinClass] = useState("");
  const [airLegs, setAirLegs] = useState([]);
  const [depDate, setDepDate] = useState(undefined);
  const [retDate, setRetDate] = useState(undefined);

  useEffect(() => {
    const sQuery = localDataStore.getSearchQuery();
    console.log("RoundTripSearchForm -> Round Trip Search Query ", sQuery);
    if (sQuery) {
      if (sQuery.type === 2) {
        if (!helperIsEmpty(sQuery.searchQuery.depQuery)) {
          const { cabinClass, passengers, airLegReqs } =
            sQuery.searchQuery.depQuery;
          console.log("Before Set Air Legs RND ", airLegReqs);
          setFlcabinClass(cabinClass);
          setAirLegs(airLegReqs);
          setPassengerCount(getPassengerCount(passengers));
          setDepDate(airLegReqs[0].depTime);
        }

        if (!helperIsEmpty(sQuery.searchQuery.retQuery)) {
          setDepDate(sQuery.searchQuery.retQuery.airLegReqs[0].depTime);
        }
      }
    }
  }, []);

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

        let departureDate = helperGetDateFormate(depTime);
        let reDate = helperGetDateFormate(returnTime);

        airLegDep = [
          {
            orgCode: from && from.code,
            destCode: to && to.code,
            depTime: departureDate,
          },
        ];

        airLegRet = [
          {
            orgCode: to && to.code,
            destCode: from && from.code,
            depTime: reDate,
          },
        ];

        cabinClass = getTravelerCabinDetails(traveler, cabinClass, tPassengers);

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
    }
  };

  return (
    <React.Fragment>
      {console.log(
        "RoundTripSearchForm Dep Date, ",
        depDate,
        " return Date, ",
        retDate
      )}
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
                              <Col md={6} className="each-content">
                                {console.log(
                                  "Air Leges In Render M ->, ",
                                  airLegs
                                )}
                                <SelectItinerary
                                  {...props}
                                  idx={indx}
                                  origin={
                                    airLegs && airLegs && airLegs.length > indx
                                      ? airLegs[indx].orgCode
                                      : null
                                  }
                                  destination={
                                    airLegs && airLegs.length > indx
                                      ? airLegs[indx].destCode
                                      : null
                                  }
                                  destinationFieldName={`passDetails[${indx}].to`}
                                  originFieldName={`passDetails[${indx}].from`}
                                />
                              </Col>
                              <Col
                                md={3}
                                className="no-margin-padding each-content"
                              >
                                <DatePickerRange
                                  preSetDepDate={
                                    airLegs && airLegs.length > indx
                                      ? airLegs[indx].depTime
                                      : props.values.passDetails[indx].depTime
                                  }
                                  preSetRetDate={
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
                                <TravellerAndClassCard
                                  preSetTraveler={{
                                    cabinClass: flCabinClass,
                                    passengers: passengerCount,
                                  }}
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
  searchQuery: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery.searchQuery,
  };
};
export default connect(mapStateToProps, {
  setSearchQuery,
  getAirSearchRequestType,
})(RoundTripSearchForm);

export const getTravelerCabinDetails = (traveler, cabinClass, tPassengers) => {
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

    if (tPassengers.length === 0) {
      tPassengers.push({ code: "ADT" });
    }
  }
  return cabinClass;
};
