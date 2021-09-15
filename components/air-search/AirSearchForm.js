import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useRouter } from "next/router";

import OneWaySearchForm from "./OneWaySearchForm";
import RoundTripSearchForm from "./RoundTripSearchForm";
import MultiCitySearchForm from "./MultiCitySearchForm";
import { addDays } from "date-fns";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getOneWayAirSearchRequest,
  getAirSearchRequest,
  setSearchQuery,
  getAirSearchRequestType,
} from "../../redux/actions/airSearchAction.js";

import HelperRedirect from "../../utils/helper/helperRedirect";
import { helperGetDateFormate } from "../../utils/helper/helperAction";
import { localDataStore } from "../../utils/helper/localDataStore";
import { wrapper } from "../../redux/nextStore";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

//Prev Option sample { name: "Aalborg", code: "AAL" }

class AirSearchForm extends Component {
  state = {
    redirectStatus: false,
    selectedItemFrom: {},
    selectedItemTo: {},
    oneWayInitValue: {
      passDetails: [{ from: "", to: "", depTime: "" }],
      traveler: { ADT: 0, CNN: 0, INF: 0, cabClass: 0 },
      tripCat: null,
    },
    roundInitValue: {
      passDetails: [{ from: "", to: "", depTime: "", returnTime: "" }],
      traveler: { ADT: 0, CNN: 0, INF: 0, cabClass: 0 },
      tripCat: null,
    },

    multyInitValue: {
      passDetails: [
        { from: "", to: "", depTime: new Date() },
        { from: "", to: "", depTime: addDays(new Date(), 1) },
      ],
      traveler: { ADT: 0, CNN: 0, INF: 0, cabClass: 0 },
      tripCat: null,
    },

    tripType: "roundTrip",
    lastDate: undefined,
    oneWayDate: undefined,

    preSetRoundTripForm: null,
    preSetRoundTripTo: null,
    preSetRoundTripDepTime: new Date(),
    pStatus: true,
  };

  searchOneWayTrip = (queryData) => {
    // console.log("One Way Search Query: ", queryData);
    const airLegs = [];
    const permittedCarriers = ["QR", "TK", "AI", "H1", "UK"];
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
        permittedCarriers: permittedCarriers,
      },
      passengers: passengers,
      airPricingModifiersReq: {
        //currencyType: currencyType,
      },
      cabinClass: cabinClass,
    };

    let queryType = { searchQuery: intQuery, type: 1 };

    this.props.setSearchQuery(queryType);

    this.props.getOneWayAirSearchRequest(intQuery);

    this.setState({ redirectStatus: true });

    console.log("Query Befor Send: ", JSON.stringify(intQuery, null, 2));
  };

  setOneWayTripInf = (values, type, travelerInf) => {
    if (type === 5 && travelerInf !== null) {
      console.log(
        "Treveler Info Change: ",
        values,
        "Traveler Info: ",
        travelerInf
      );
    } else {
      console.log("After Change One Way Form Field Value:, ", values);
    }
  };

  submitRoundTripAction = (queryData) => {
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

        if (this.state.pStatus) {
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
        } else {
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

      this.props.setSearchQuery(queryType);
      localDataStore.setSearchQuery(queryType);

      let queryDep = JSON.stringify(searchQueryCstDep, null, 2);
      let queryRet = JSON.stringify(searchQueryCstRet, null, 2);
      console.log("searchQueryCst, Round Trip, ", queryBoth);

      this.props.getAirSearchRequestType(queryDep, "departureFlights");
      this.props.getAirSearchRequestType(queryRet, "returnFlights");
      this.setState({ redirectStatus: true });
    }
  };

  multiCityQueryAction = (queryData) => {
    let passengerCriteria = [];
    let flights = [];
    let query = null;

    if (queryData !== undefined) {
      const { traveler, passDetails } = queryData;

      if (traveler.ADT !== undefined) {
        passengerCriteria.push({ value: "ADT", number: traveler.ADT.value });
      }
      if (traveler.CNN !== undefined) {
        passengerCriteria.push({ value: "CNN", number: traveler.CNN.value });
      }
      if (traveler.INF !== undefined) {
        passengerCriteria.push({ value: "INF", number: traveler.INF.value });
      }

      if (passDetails !== undefined) {
        passDetails.map((flight, idx) => {
          let option = {
            "@type": "SearchCriteriaFlight",
            departureDate: this.getDateSearchFomat(flight.depTime),
            From: {
              value: flight.from.code,
            },
            To: {
              value: flight.to.code,
            },
          };
          flights.push(option);
        });
      }

      query = {
        CatalogOfferingsRequestAir: {
          offersPerPage: 5,
          PassengerCriteria: passengerCriteria,
          SearchCriteriaFlight: flights,

          SearchModifiersAir: {},
        },
      };
    }

    if (query !== undefined) {
      let queryType = { searchQuery: query, type: 3 };

      this.props.setSearchQuery(queryType);

      //console.log("QUery Data From Multicity Query AirSearchForm 204, ", queryType);
    }

    this.props.getAirSearchRequest(query);
    this.setState({ redirectStatus: true });
  };
  getDateSearchFomat = (paramDate) => {
    console.log("Date ", paramDate);

    if (paramDate === undefined || paramDate === null) {
      console.log("Date Not Set !!");
      return "0000-00-00";
    } else {
      let day,
        mnt,
        year = "";

      day =
        paramDate.getDate() <= 9
          ? `0${paramDate.getDate()}`
          : `${paramDate.getDate()}`;
      mnt =
        paramDate.getMonth() < 9
          ? `0${paramDate.getMonth() + 1}`
          : `${paramDate.getMonth() + 1}`;
      year = paramDate.getFullYear();

      return `${year}-${mnt}-${day}`;
    }
  };

  changeTripType = (e) => {
    e.preventDefault();

    if (e.target !== undefined && e.target !== null) {
      this.setState({ tripType: e.target.value });
    }
  };

  setDataToRoundTrip = (values) => {
    if (values !== undefined) {
      if (values.passDetails !== undefined) {
        this.setState({ preSetRoundTripForm: values.passDetails[0].from });

        this.setState({ preSetRoundTripTo: values.passDetails[0].to });
        this.setState({
          preSetRoundTripDepTime: values.passDetails[0].depTime,
        });

        this.setState({
          roundInitValue: {
            passDetails: [
              {
                from: values.passDetails[0].from,
                to: values.passDetails[0].to,
                depTime: values.passDetails[0].depTime,
                returnTime: addDays(
                  values.passDetails[0].depTime !== undefined
                    ? values.passDetails[0].depTime
                    : new Date(),
                  5
                ),
              },
            ],
            traveler: { ADT: 0, CNN: 0, INF: 0, cabClass: 0 },
            tripCat: null,
          },
        });

        this.setState({ tripType: "roundTrip" });
      }
    }
  };

  render() {
    if (this.state.redirectStatus) {
      return <HelperRedirect to="/flights/search" />;
    }

    let {
      oneWayInitValue,
      roundInitValue,
      multyInitValue,
      lastDate,
      tripType,
      preSetRoundTripDepTime,
      preSetRoundTripForm,
      preSetRoundTripTo,
    } = this.state;
    let setLastDate = lastDate !== undefined ? lastDate : new Date();
    return (
      <React.Fragment>
        <Row className="mp-0">
          <Col md={6}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="tripCat"
                onChange={this.changeTripType}
                value={this.state.tripType}
              >
                <div
                  className={`radio-bg ${tripType === "one" ? "r-active" : ""}`}
                >
                  <FormControlLabel
                    value="one"
                    control={<Radio color="primary" />}
                    label="Oneway"
                    labelPlacement="end"
                  />
                </div>
                <div
                  className={`radio-bg ${
                    tripType === "roundTrip" ? "r-active" : ""
                  }`}
                >
                  <FormControlLabel
                    value="roundTrip"
                    control={<Radio color="primary" />}
                    label="Round Trip"
                    labelPlacement="end"
                  />
                </div>
                <div
                  className={`radio-bg ${
                    tripType === "multiCity" ? "r-active" : ""
                  }`}
                >
                  <FormControlLabel
                    value="multiCity"
                    control={<Radio color="primary" />}
                    label="Multi City"
                    labelPlacement="end"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        {this.state.tripType === "one" ? (
          <OneWaySearchForm
            oneInitValue={oneWayInitValue}
            sugList={this.props.airPortsArr}
            selectedItemFrom={this.state.selectedItemFrom}
            selectedItemTo={this.state.selectedItemTo}
            getOneWayTripData={this.setOneWayTripInf}
            setAllRangeData={this.setAllRangeData}
            setDataToRoundTrip={this.setDataToRoundTrip}
            getSearchValueAndSubmit={this.searchOneWayTrip}
          />
        ) : (
          ""
        )}

        {this.state.tripType === "roundTrip" ? (
          <RoundTripSearchForm
            sugList={this.props.airPortsArr}
            roundInitValue={roundInitValue}
            selectedItemTo={this.state.selectedItemTo}
            oneWayDate={preSetRoundTripDepTime}
            setAllRangeData={this.setAllRangeData}
            preSetRoundTripForm={preSetRoundTripForm}
            preSetRoundTripTo={preSetRoundTripTo}
            getDataAndSubmit={this.submitRoundTripAction}
          />
        ) : (
          ""
        )}

        {this.state.tripType === "multiCity" ? (
          <MultiCitySearchForm
            multyInitValue={multyInitValue}
            sugList={this.props.airPortsArr}
            setLastDate={setLastDate}
            setAllRangeData={this.setAllRangeData}
            getSearchValueAndSubmit={this.multiCityQueryAction}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

AirSearchForm.prototypes = {
  getOneWayAirSearchRequest: PropTypes.func.isRequired,
  getAirSearchRequest: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  airPorts: PropTypes.object.isRequired,
  airPortsArr: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airPorts: state.airSearch.airPortsList,
  airPortsArr: state.airSearch.airPortsArr,
});

export default connect(mapStateToProps, {
  getOneWayAirSearchRequest,
  getAirSearchRequest,
  setSearchQuery,
  getAirSearchRequestType,
})(AirSearchForm);

export const getServerSideProps = wrapper.getServerSideProps(async (params) => {
  console.log("Get Serverside Props With Redux ", params);
});
