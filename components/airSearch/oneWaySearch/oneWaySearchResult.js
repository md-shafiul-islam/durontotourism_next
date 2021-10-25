import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import HelperLoader from "../../../utils/helper/helperLoader";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";
import OneWayFlightCard from "../SearchResults/GenericCard/oneWayFlightCard";
import { helperIsEmpty } from "../../../utils/helper/helperAction";

class OneWaySearchResult extends Component {
  state = {
    result: {},
    flights: [],
    prePerdStatus: true,
  };

  componentDidMount() {    

    if (this.props.airSearchResponse) {
      if (this.props.airSearchResponse.response) {
        this.setState({ result: this.props.airSearchResponse.response });
      }
    }
    this.getFlights(this.props.airSearchResponse, " Component Did Mount Props ");
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.getFlights(nextProps.airSearchResponse, " Via Next Props ");
  }

  getFlights = (airSearchResp, via) => {
    console.log("One Way Search this.props.airSearchResponse, ", via, airSearchResp);

    if (helperIsEmpty(airSearchResp)) {
      return;
    }

    if(helperIsEmpty(airSearchResp.response)){
      return;
    }
    console.log("One Way Search airSearchResp.response Befor Preperd ..., ", airSearchResp.response);
    if(airSearchResp.status){
      this.setState({prePerdStatus:true});
    }
    let { airPricePoints } = airSearchResp.response;

    const localFlights = [];
    let changePenaltiesList = new Map();
    let cancelPenaltiesList = new Map();

    airPricePoints &&
      airPricePoints.forEach((airPrice, apIdx) => {
        console.log("One Way Air Price Prosseing, ", airPrice);
        let {
          approximateFees,
          approximateTaxes,
          approximateTotalPrice,
          basePrice,
          taxes,
          totalPrice,
          approximateBasePrice,
        } = airPrice;
        let priceInfos = {
          approximateFees,
          approximateTaxes,
          approximateTotalPrice,
          basePrice,
          taxes,
          totalPrice,
          approximateBasePrice,
        };

        let cancelPenalties = [];
        let changePenalties = [];
        airPrice &&
          airPrice.airPricingInfo &&
          airPrice.airPricingInfo.forEach((pricingInfo, piIdx) => {
            let {
              cancelPenalty,
              changePenalty,
              passengerType,
              platingCarrier,
            } = pricingInfo;

            cancelPenalties.push({
              key: passengerType[0].code,
              group: apIdx,
              penalty: cancelPenalty,
            });
            changePenalties.push({
              key: passengerType[0].code,
              group: apIdx,
              penalty: changePenalty,
            });

            if (passengerType[0].code === "ADT" && piIdx === 0) {
              console.log("pricingInfo Each One: ", pricingInfo);

              let eachPrices = {
                eachTotalPrice: pricingInfo && pricingInfo.totalPrice,
                eachApxBasePrice:
                  pricingInfo && pricingInfo.approximateBasePrice,
                eachBasePrice: pricingInfo && pricingInfo.basePrice,
                eachEqBasePrice: pricingInfo && pricingInfo.equivalentBasePrice,
                eachTotalTax: pricingInfo && pricingInfo.taxes,
              };
              pricingInfo &&
                pricingInfo.flightOptionsList &&
                pricingInfo.flightOptionsList.flightOption &&
                pricingInfo.flightOptionsList.flightOption.forEach(
                  (flightOpt) => {
                    let { origin, destination } = flightOpt;
                    flightOpt &&
                      flightOpt.option &&
                      flightOpt.option.forEach((option) => {
                        localFlights.push({
                          group: apIdx,
                          priceInfos,
                          origin,
                          destination,
                          option,
                          platingCarrier,
                          eachPrices,
                        });
                      });
                  }
                );
            }
          });

        cancelPenaltiesList.set(apIdx, cancelPenalties);
        changePenaltiesList.set(apIdx, changePenalties);
      });

    const flights = localFlights.map((flight, idx) => {
      console.log("Flights Prosseing, ", flight);
      let {
        destination,
        origin,
        option,
        priceInfos,
        group,
        platingCarrier,
        eachPrices,
      } = flight;
      let item = {
        group,
        destination,
        origin,
        option,
        priceInfos,
        cancelPenalties: cancelPenaltiesList.get(group),
        changePenalties: changePenaltiesList.get(group),
        platingCarrier,
        eachPrices,
      };

      return item;
    });
    
    console.log("changePenaltiesList, Before Preperd End ", changePenaltiesList);
    this.setState({ flights: flights, prePerdStatus: false });
  };
  render() {
    let {
      responseMessage,
      flightDetailsList,
      airSegments,
      fareInfos,
      routeList,
      airPricePoints,
      traceId,
      currencyType,
    } = this.state.result;

    let { prePerdStatus, flights } = this.state;

    console.log("One Response Loading Status: ", prePerdStatus);

    return (
      <React.Fragment>
        <LoaderSpiner show={prePerdStatus} loadingText="Geting Flights ..." />
        {flights.map((flight, idx) => {
          console.log("Flight OWSR: ", flight);
          let {
            destination,
            origin,
            option,
            priceInfos,
            cancelPenalties,
            changePenalties,
            platingCarrier,
            eachPrices,
          } = flight;
          return (
            <React.Fragment key={`owcr-${idx}`}>
              <OneWayFlightCard
                id={idx}
                option={option}
                origin={origin}
                destination={destination}
                approximateBasePrice={priceInfos.approximateBasePrice}
                airPriceInfos={priceInfos}
                cancelPenalty={cancelPenalties}
                changePenalty={changePenalties}
                airSegments={airSegments}
                flightsDetails={flightDetailsList}
                fareInfos={fareInfos}
                traceId={traceId}
                platingCarrier={platingCarrier}
                eachPrices={eachPrices}
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

OneWaySearchResult.prototypes = {
  errors: PropTypes.object.isRequired,
  airSearchResponse: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    airSearchResponse: state.airSearch.airSearchResponse,
  };
};

export default connect(mapStateToProps, null)(OneWaySearchResult);
