import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";

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

export async function getStaticProps({ params: {slug} }) {
  // ↓add 
  console.log(`BookingPage slug: ${slug}`)
}

export default BookingPage;
