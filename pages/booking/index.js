import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getRoundTripBookingAction } from "../../redux/actions/bookingAction";

import { esGetRoundTripBookingQuery, preSetBookingOption } from "../../utils/helper/esFnc";
import { helperGetActionDateTime } from "../../utils/helper/helperAction";
import LoadingComp from "../../utils/helper/LoadingComp";
import { PropTypes } from "prop-types";
import { localDataStore } from "../../utils/helper/localDataStore";

import FareSummaryUsingPriceList from "../../components/airPricing/pricingSplitCommponent/FareSummaryUsingPriceList";
import BookingFlightSummary from "../../components/airBooking/bookingFlightSummary";
import BookingTravellerDetailsCard from "../../components/airBooking/bookingTravellerDetailsCard";

class BookingPage extends Component {
  state = {
    deptuerPriceDetails: {},
    returnPriceDetails: {},
    loadStatus: false,
    farePriceSummery: {},
  };

  componentDidMount() {
    console.log("Booking Page ...");

    this.prePerdPriceToBooking();
  }

  prePerdPriceToBooking = () => {
    let rndPriceOptions = localDataStore.getPreSetRndPriceDetails();

    let priceOptions = localDataStore.getPriceRoundTripFlightsBook();
    let rndFareSummery = localDataStore.getRoundTripFareSummery();

    

    // console.log("rndPriceOptions Local Store: ", rndPriceOptions);
    if (rndPriceOptions) {
      //   this.setState({ roundPriceOptions: rndPriceOptions, loadStatus: true });

      let {
        deptuerPriceDetails,
        returnPriceDetails,
        farePriceSummery,
      } = rndPriceOptions;

      console.log("Fare Summery: ", farePriceSummery);
      console.log("Fare Summery LocalStore: ", rndFareSummery);

      this.setState({
        deptuerPriceDetails,
        returnPriceDetails,
        farePriceSummery:rndFareSummery,
        loadStatus: true,
      });
    }
  };

  bookingAction = (passengers) => {
    console.log("Booking Page Passengers, ", passengers);

    const selectedTndTrip = localDataStore.getPriceRoundTripFlightsBook();

    console.log("Booking Page selectedTndTrip, ", selectedTndTrip);
    
    const bookSolution = [];

    let deptureOpt = preSetBookingOption(selectedTndTrip.detureItem);

    let retOpt = preSetBookingOption(selectedTndTrip.returnItem);

    if(deptureOpt){
      bookSolution.push(deptureOpt);
    }
    console.log("Booking Page Depture Option, ", deptureOpt);
    if(retOpt){
      bookSolution.push(retOpt);

    }
    
    let airSolutions = esGetRoundTripBookingQuery(bookSolution);
    

    const bookingQuery = {
      traceId: localDataStore.getroundTripTraceID(),
      actionDateTime: helperGetActionDateTime(),//"2021-02-26T23:30:00.000+06:00", // TODO:set Current Date L
      bookingTravelerReq: passengers,
      bookAirSolution: [airSolutions],
    };

    console.log("Booking Query Object", bookingQuery);

    // console.log("Booking Query JSON String, ", JSON.stringify(bookingQuery));

    this.props.getRoundTripBookingAction(JSON.stringify(bookingQuery));

  };
  render() {
    let {
      deptuerPriceDetails,
      returnPriceDetails,
      farePriceSummery,
      loadStatus,
    } = this.state;

    if (!loadStatus) {
      return <LoadingComp />;
    }

    console.log(
      "rndPriceOptions Local Store: farePriceSummery, ",
      farePriceSummery
    );

    return (
      <React.Fragment>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={12}>
                <BookingFlightSummary
                  deptuerPriceDetails={deptuerPriceDetails}
                  returnPriceDetails={returnPriceDetails}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <BookingTravellerDetailsCard
                  travelers={farePriceSummery && farePriceSummery.eachPrices}
                  getTravelersAction={this.bookingAction}
                />
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <FareSummaryUsingPriceList airPriceList={farePriceSummery} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

BookingPage.prototypes = {
  getRoundTripBookingAction: PropTypes.func.isRequired,
};

export default connect(null, {getRoundTripBookingAction})(BookingPage);
