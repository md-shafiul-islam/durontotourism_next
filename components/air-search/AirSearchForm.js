import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import OneWaySearchForm from "./OneWaySearchForm";
import RoundTripSearchForm from "./RoundTripSearchForm";
import MultiCitySearchForm from "./MultiCitySearchForm";
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
import { esGetDateByAdding } from "../../utils/helper/esDateFunc";
import LoaderSpiner from "../../utils/helper/loaderSpiner";

//Prev Option sample { name: "Aalborg", code: "AAL" }

class AirSearchForm extends Component {
  state = {
    redirectStatus: false,
    airSerchStatus: false,
    searchMsg: "",
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
        { from: "", to: "", depTime: esGetDateByAdding(new Date(), 1) },
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
                returnTime:
                  values.passDetails[0].depTime !== undefined
                    ? esGetDateByAdding(values.passDetails[0].depTime, 2)
                    : new Date(),
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
        {console.log(
          "Current Air Response Status, ",
          this.state.aieSerchStatus
        )}

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

export const getServerSideProps = wrapper.getServerSideProps(
  async (params) => {}
);
