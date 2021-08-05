import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import LoadingComp from "../../utils/helper/LoadingComp";
import { Card, Col, Row } from "react-bootstrap";

import PriceItineraryCard from "./PriceItineraryCard";
import PricingBaggageCard from "./pricingBaggageCard";
import AirPricringItinerayTitle from "./airPricringItinerayTitle";
import FareSummary from "./fareSummary";
import { helperGetTotalFlyTimeBetweenTwoDate } from "../../redux/actions/helperAction";
import PricingLayover from "./pricingLayover";

let prevDate = null;

class OneWayPriceing extends Component {
  state = {
    travelerInf: {},
    stopsLocs: new Array(),
    travelerQuantity: new Array(),
    stops: 0,
    cabClass: "",
    totalFlyTime: 0,
    seletedAir: {},
    loadStatus: true,
    displayMsg: false,

    pricingResponse: {
      prosessPrice: {},
      orgResponse: {},
    },

    baggageList: [],
    changePenaltyList: [],
    cancelPenalty: [],
    selectedBrand: {},
    airPriceSummary:{},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.initStateUsingProps();
  }
  componentDidMount() {
    this.initStateUsingProps();
  }

  initStateUsingProps = () => {
    
    if (this.props.priceSegment.selectedAir !== undefined) {
      if (this.props.priceSegment.selectedAir !== null) {
        let {
          responseMessage,
          traceId,
          transactionId,
          responseTime,
          airItinerary,
          airSolution,
        } = this.props.priceSegment.selectedAir;

        let baggageLists = new Array();
        let changePenaltyList = new Array();
        let cancelPenaltyList = new Array();
        let lBrand = null;
        let cabinClass = null;
        let airPriceSummary = null;

        if (airSolution !== undefined) {
          let slAirPriceInf = airSolution.airPricingInfo[0].fareInfo[0];

          let {
            airPricingInfo,
            approximateBasePrice,
            approximateTaxes,
            approximateTotalPrice,
            basePrice,
            equivalentBasePrice,
            taxes,
            totalPrice,
          } = airSolution;

          airPriceSummary = {priceSummeries:this.getAirPricSummary(airPricingInfo), approximateBasePrice, approximateTaxes, approximateTotalPrice, basePrice, equivalentBasePrice, taxes, totalPrice};

          lBrand = lBrand === null ? slAirPriceInf.brand : lBrand;

          airSolution.airPricingInfo.map((airPriceInf, idx) => {
            let { code } = airPriceInf.passengerType[0];

            console.log("airPriceInf, ", airPriceInf);
            cancelPenaltyList.push({
              key: code,
              value: airPriceInf.cancelPenalty,
            });
            changePenaltyList.push({
              key: code,
              value: airPriceInf.changePenalty,
            });
            baggageLists.push({
              key: code,
              value: airPriceInf.baggageAllowances,
            });

            if (cabinClass === null) {
              cabinClass = airPriceInf.bookingInfo[0].cabinClass;
            }
          });
        }

        let stops = 0;
        let stopLoc = new Array();
        let totalTime = 0;

        if (airItinerary !== undefined) {
          airItinerary.airSegment.map((segment, segIdx) => {
            if (segIdx > 0) {
              stops++;
              stopLoc.push(segment.origin);
            }
            totalTime = totalTime + segment.flightTime;
          });
        }

        this.setState({
          baggageList: baggageLists,
          changePenaltyList: changePenaltyList,
          cancelPenalty: cancelPenaltyList,
          selectedBrand: lBrand,
          stops: stops,
          stopsLocs: stopLoc,
          totalFlyTime: totalTime,
          cabClass: cabinClass,
          seletedAir: this.props.priceSegment.selectedAir,          
          airPriceSummary:airPriceSummary,
        });

        this.setState({ loadStatus: false });
      }
    }
  };

  getAirPricSummary = (airPriceInfs) => {
    if(airPriceInfs !== undefined && airPriceInfs !== null){


      let priceSummeries = airPriceInfs.map((airPrice, iDx)=>{

        let {approximateBasePrice, approximateTotalPrice, basePrice, equivalentBasePrice, totalPrice, passengerType} = airPrice;

        let passenger = {qty:passengerType&&passengerType.length, code:passengerType[0].code};

        return {eqBasePrice:equivalentBasePrice, appxBasePrice:approximateBasePrice, appxTotalPrice:approximateTotalPrice, bPrice:basePrice, toPrice:totalPrice, passenger}
      });

      return priceSummeries;
    }
  };

  initQuery = () => {
    let queryData =
      this.props.searchQuery &&
      this.props.searchQuery.sQuery &&
      this.props.searchQuery.sQuery.searchQuery;

    if (queryData !== undefined) {
      let { passDetails, traveler } = queryData;

      let travelerQty = new Array();
      if (traveler !== undefined) {
        if (traveler.ADT !== undefined) {
          travelerQty.push({ key: "ADT", value: traveler.ADT.value });
        }

        if (traveler.CNN !== undefined) {
          travelerQty.push({ key: "CNN", value: traveler.CNN.value });
        }

        if (traveler.INF !== undefined) {
          travelerQty.push({ key: "INF", value: traveler.INF.value });
        }
      }

      return travelerQty;
    }
  };

  render() {
    if (this.state.loadStatus) {
      return <LoadingComp />;
    }

    console.log("This One Way Pricing, ", this.props);
    let { destination, origin, platingCarrier } = this.state.seletedAir;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Title>
                <AirPricringItinerayTitle
                  changePenalty={this.state.changePenaltyList}
                  cancelPenalty={this.state.cancelPenalty}
                  stops={this.state.stops}
                  stoplocs={this.state.stopsLocs}
                  totalFlyTime={this.state.totalFlyTime}
                  cabinClass={this.state.cabClass}
                  destination={destination}
                  origin={origin}
                  platingCarrier={platingCarrier}
                />
              </Card.Title>
              <Card.Body>
                {this.state.seletedAir.airItinerary &&
                  this.state.seletedAir.airItinerary.airSegment.map(
                    (segment, sIdx) => {
                      let deff = null;
                      if (sIdx > 0) {
                        deff = helperGetTotalFlyTimeBetweenTwoDate(
                          prevDate,
                          segment.departureTime
                        );
                      }

                      prevDate = segment.arrivalTime;
                      return (
                        <React.Fragment key={`air-sl-itns-${sIdx}`}>
                          {sIdx > 0 ? (
                            <React.Fragment>
                              <PricingLayover
                                timeDiff={deff}
                                layoverOrigin={segment.origin}
                              />
                              <Row className="mgbt20"></Row>
                            </React.Fragment>
                          ) : (
                            ""
                          )}

                          <PriceItineraryCard
                            segment={segment}
                            lBrand={this.state.selectedBrand}
                          />

                          <Row className="baggage-area">
                            <PricingBaggageCard
                              baggageAllowance={this.state.baggageList}
                            />
                          </Row>
                        </React.Fragment>
                      );
                    }
                  )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            
            <FareSummary
              airPriceSummary = {this.state.airPriceSummary}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

OneWayPriceing.prototypes = {
  //setPriceDetails: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  priceSegment: PropTypes.object.isRequired,
  searchQuery: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  priceSegment: state.airPrice,
  searchQuery: state.searchQuery,
});

export default connect(mapStateToProps)(OneWayPriceing);
