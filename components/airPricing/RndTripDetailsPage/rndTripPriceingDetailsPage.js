import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirLines, getAirports } from "../../../redux/actions/airSearchAction";

import { Card, Col, Row, Spinner } from "react-bootstrap";
import AirPricringItinerayTitle from "../airPricringItinerayTitle";
import PricingLayover from "../pricingLayover";
import PriceItineraryCard from "../PriceItineraryCard";
import {
  helperGetCurrency,
  helperGetTotalFlyTimeBetweenTwoDate,
} from "../../../redux/actions/helperAction";
import PricingBaggageCard from "../pricingBaggageCard";

import FareSummaryUsingPriceList from "../pricingSplitCommponent/FareSummaryUsingPriceList";
import {
  helperGetAmount,
  helperGetTotalFlyTime,
  helperIsEmpty,
} from "../../../utils/helper/helperAction";
import { localDataStore } from "../../../utils/helper/localDataStore";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";
import HelperRedirect from "../../../utils/helper/helperRedirect";

let prevDate = null;

class RndTripPriceingDetailsPage extends Component {
  state = {
    travelerInf: {},
    loadStatus: true,
    displayMsg: false,
    retPricingDetails: null,
    depPricingDetails: null,
    farePriceSummery: {eachPrices:[], totalPrice:0, taxes:0, equBasePrice:0, currencyType:""},
    redirecStatus: false,
  };
  
  componentDidMount() {
    console.log("RND Trip Pricing Details Page: Props ", this.props);
    this.initStateUsingProps();
  }

  destructSegments = (segment) => {
    if (segment) {
      let firstOrigin = "",
        stops = [],
        fstDepTime = "",
        lastDestination = "",
        lastArrivalTime = "",
        carriers = [];
      segment.map((seg, sIdx) => {
        if (sIdx === 0) {
          firstOrigin = seg.origin;
          fstDepTime = seg.departureTime;
        } else {
          if (!stops.includes(seg.origin)) {
            stops.push(seg.origin);
          }
        }
        lastDestination = seg.destination;
        lastArrivalTime = seg.arrivalTime;
        if(!carriers.includes(seg.carrier)){
          carriers.push(seg.carrier);
        }
      });
      return {
        firstOrigin,
        lastDestination,
        stops,
        fstDepTime,
        totalFlyTime: helperGetTotalFlyTime(fstDepTime, lastArrivalTime),
        lastArrivalTime,
        carriers
      };
    }
  };

  prePopulateAirPricDetailsEachOne = (airPrOption) => {

    console.log(" RND PDP airPriceOpt, ", airPrOption);
    if (airPrOption) {
      let { airPriceOpt, segment } = airPrOption;
      //Price Info Or Extract Solution Start

      let airSolution = this.destructAirSolution(airPriceOpt);

      //Price Info Or Extract Solution End

      //Segment Info Start
      let segOptions = this.destructSegments(segment);
      //Segment Info End
      return {solutionInf: airSolution, segmentInf: segOptions, segments:segment};
    }    
    
  };

  destructAirSolution = (airPriceOpt) => {

    if (airPriceOpt) {

    let baggageLists = [];
    let changePenaltyList = [];
    let cancelPenaltyList = [];
    let lBrand = null;
    let cabClass = null;
    let fareSummary = {};
    
    let {
      totalPrice,
      approximateBasePrice,
      approximateTaxes,
      equivalentBasePrice,
      taxes,
      airPricingInfo,
      approximateTotalPrice,
      basePrice,
    } = airPriceOpt;

    fareSummary = {
      priceSummeries: [],
      approximateBasePrice,
      approximateTaxes,
      approximateTotalPrice,
      basePrice,
      equivalentBasePrice,
      taxes,
      totalPrice
    };
    let priceInfs = [];

    airPricingInfo &&
      airPricingInfo.map((airPriceInf, apIdx) => {
        console.log("Price Details Page, airPriceInf ", airPriceInf);
        if (airPriceInf) {
          let {
            fareInfo,
            bookingInfo,
            totalPrice,
            approximateTotalPrice,
            passengerType,
            cancelPenalty,
            changePenalty,
            baggageAllowances,
            taxes,
            approximateTaxes,
            basePrice,
            equivalentBasePrice,
            approximateBasePrice,

          } = airPriceInf;

          baggageLists.push({
            key: passengerType[0].code,
            baggageAllowances,
          });
          changePenaltyList.push({
            key: passengerType[0].code,
            penalty: changePenalty,
          });
          cancelPenaltyList.push({
            key: passengerType[0].code,
            penalty: cancelPenalty,
          });

          priceInfs.push({
            key: passengerType[0].code,
            totalPrice:totalPrice || approximateTotalPrice,
            taxes:taxes || approximateTaxes,
            eqBasePrice: equivalentBasePrice || approximateBasePrice || basePrice,
            passQty: passengerType.length,
          });

          if (bookingInfo[0]) {
            cabClass = bookingInfo[0].cabinClass;
          }

          if (fareInfo) {
            let { brand } = fareInfo;

            lBrand = !helperIsEmpty(lBrand) ? brand : lBrand;
          }
        }
      });

      fareSummary.priceSummeries = priceInfs;

      return {fareSummary, lBrand, baggageLists, changePenaltyList, cancelPenaltyList, cabinClass:cabClass};
    }
  };

  initStateUsingProps = () => {
    // let travelerQty = this.initQuery();
    let priceDrtails = localDataStore.getPriceRoundTripFlightsBook();
    
    if(helperIsEmpty(priceDrtails)){
      return;
    }

    if (
      !helperIsEmpty(priceDrtails.detureItem) &&
      !helperIsEmpty(priceDrtails.returnItem)
    ) {
      let deptuerPriceDetails = this.prePopulateAirPricDetailsEachOne(priceDrtails.detureItem);
      let returnPriceDetails = this.prePopulateAirPricDetailsEachOne(priceDrtails.returnItem);

      if (
        !helperIsEmpty(returnPriceDetails) &&
        !helperIsEmpty(deptuerPriceDetails)
      ) {
        let itineraryPrices = [];
        itineraryPrices.push({
          key: "Depture: ",
          details: deptuerPriceDetails,
        });
        itineraryPrices.push({ key: "Return: ", details: returnPriceDetails });

        console.log("Air Itinerary Before Fare Summery, ", itineraryPrices);
        // console.log("Air Traveler, ", travelerQty);

        //TODO: Summery Option Add...
        const farePriceSummery = {eachPrices:[], totalPrice:0, taxes:0, equBasePrice:0, currencyType:""};

        let sumTotalPrice = 0, sumTaxes = 0, sumBasePrice = 0, currencyType = 0;
        let  eAdtTotalPrice = 0, eAdtTotalTaxes = 0, eAdtEquBasePrice = 0, adtPassengerQty = 0, adtStatus=false;
        let  eCnnTotalPrice = 0, eCnnTotalTaxes = 0, eCnnEquBasePrice = 0, cnnPassengerQty = 0, cnnStatus=false;
        let  eInfTotalPrice = 0, eInfTotalTaxes = 0, eInfEquBasePrice = 0, infPassengerQty = 0, infStatus=false;

        itineraryPrices&&itineraryPrices.map((itineraryPrice, ipIdx)=>{

          console.log("itineraryPrice, ", itineraryPrice);

          if(!helperIsEmpty(itineraryPrice)){

            if(!helperIsEmpty(itineraryPrice.details.solutionInf.fareSummary)){
              
              let {priceSummeries, equivalentBasePrice, totalPrice, approximateTotalPrice, taxes, approximateTaxes, approximateBasePrice, basePrice} = itineraryPrice.details.solutionInf.fareSummary;
              
              let bPrice =  equivalentBasePrice || approximateBasePrice || basePrice;
              let tPrice = approximateTotalPrice || totalPrice;
              let tAmnt = taxes || approximateTaxes;
              console.log("itineraryPrice Price Details, priceSummeries, ", priceSummeries, " equivalentBasePrice, ", equivalentBasePrice, " totalPrice, ", totalPrice);
              currencyType = helperGetCurrency(totalPrice);
              sumTotalPrice = (Number(sumTotalPrice)+Number(helperGetAmount(tPrice)));
              sumTaxes = (Number(sumTaxes)+Number(helperGetAmount(tAmnt)));
              sumBasePrice = (Number(sumBasePrice) + Number(helperGetAmount(bPrice)));

              if(priceSummeries){
               
                priceSummeries.map((eachPrice, epIdx)=>{
                  if(eachPrice){

                    console.log("priceSummeries, MAP !!, ", epIdx, "Each Price Details, ", eachPrice)


                    let {key, totalPrice, taxes, eqBasePrice, passQty} = eachPrice;
                    if(key === "ADT"){
                      console.log("priceSummeries, ADT !! Total Price: ", eAdtTotalPrice, " Amount Via Api, ", totalPrice, " Amount -> ", helperGetAmount(totalPrice))

                      eAdtTotalPrice = (Number(eAdtTotalPrice)+Number(helperGetAmount(totalPrice)));
                      eAdtTotalTaxes = (Number(eAdtTotalTaxes) + Number(helperGetAmount(taxes)));
                      eAdtEquBasePrice = (Number(eAdtEquBasePrice) + Number(helperGetAmount(eqBasePrice)));
                      adtPassengerQty = passQty;
                      adtStatus = true;
                      console.log("After Sum ADT Price, ", eAdtTotalPrice);
                    }

                    if(key === "INF"){
                      eInfTotalPrice = (Number(eInfTotalPrice) + Number(helperGetAmount(totalPrice)));
                      eInfTotalTaxes = (Number(eInfTotalTaxes) + Number(helperGetAmount(taxes)));
                      eInfEquBasePrice = (Number(eInfEquBasePrice) + Number(helperGetAmount(eqBasePrice)));
                      infPassengerQty = passQty;
                      infStatus = true;
                    }

                    if(key === "CNN"){
                      eCnnTotalPrice = (Number(eCnnTotalPrice)+Number(helperGetAmount(totalPrice)));
                      eCnnTotalTaxes = (Number(eCnnTotalTaxes) + Number(helperGetAmount(taxes)));
                      eCnnEquBasePrice = (Number(eCnnEquBasePrice) + Number(helperGetAmount(eqBasePrice)));
                      cnnPassengerQty = passQty;
                      cnnStatus = true;
                    }
                  }
                })
              }
            }
          }
                    
        })

        let eachPrices = [];
        if(adtStatus){
              eachPrices.push({key:"ADT", totalPrice:eAdtTotalPrice, taxes:eAdtTotalTaxes, eqBasePrice: eAdtEquBasePrice, passengerQty:adtPassengerQty});
        } 

        if(cnnStatus){
          eachPrices.push({key:"CNN", totalPrice:eCnnTotalPrice, taxes:eCnnTotalTaxes, eqBasePrice: eCnnEquBasePrice, passengerQty:cnnPassengerQty});
        }

        if(infStatus){
          eachPrices.push({key:"INF", totalPrice:eInfTotalPrice, taxes:eInfTotalTaxes, eqBasePrice: eInfEquBasePrice, passengerQty:infPassengerQty});
        }

        farePriceSummery.eachPrices = eachPrices;
        farePriceSummery.totalPrice = sumTotalPrice;
        farePriceSummery.taxes = sumTaxes;
        farePriceSummery.equBasePrice = sumBasePrice;
        farePriceSummery.currencyType = currencyType;

        
        localDataStore.setPreSetRndPriceDetails({farePriceSummery, deptuerPriceDetails, returnPriceDetails})
        this.setState({
          retPricingDetails: returnPriceDetails,
          depPricingDetails: deptuerPriceDetails,
          // travelerInf: travelerQty,
          farePriceSummery: farePriceSummery,
          loadStatus: false,
        });
      }
    }
  };

  initQuery = () => {
    if (this.props.searchQury !== undefined) {
      let { passDetails, traveler } = this.props.searchQury;

      let travelerQty = [];
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

  initPriceResult = () => {
    this.initStateUsingProps();
  };

  render() {

    let {depPricingDetails, retPricingDetails, loadStatus, redirecStatus} = this.state;


    if (loadStatus) {
      return <LoaderSpiner show={loadStatus} loadingText="Geting Price information ..." />;
    }

    if (redirecStatus) {
      return <HelperRedirect to="/booking" />;
    }

    return (
      <React.Fragment>
        {console.log("this.state, ", this.state)}
        <Row>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Title>
                    <AirPricringItinerayTitle
                      title="Depture"
                      changePenalty={
                        depPricingDetails&&depPricingDetails.solutionInf&&depPricingDetails.solutionInf.changePenaltyList
                      }
                      cancelPenalty={
                        depPricingDetails&&depPricingDetails.solutionInf&&depPricingDetails.solutionInf.cancelPenaltyList

                      }
                      stops={depPricingDetails&&depPricingDetails.segmentInf&&depPricingDetails.segmentInf.stops}
                      // stoplocs={this.state.depPricingDetails.stopsLocs}
                      totalFlyTime={depPricingDetails&&depPricingDetails.segmentInf&&depPricingDetails.segmentInf.totalFlyTime}
                      cabinClass={depPricingDetails&&depPricingDetails.solutionInf&&depPricingDetails.solutionInf.cabinClass}
                      origin={depPricingDetails&&depPricingDetails.segmentInf&&depPricingDetails.segmentInf.firstOrigin}
                      destination={depPricingDetails&&depPricingDetails.segmentInf&&depPricingDetails.segmentInf.lastDestination}
                      departureTime={depPricingDetails&&depPricingDetails.segmentInf&&depPricingDetails.segmentInf.fstDepTime}
                    />
                  </Card.Title>
                  <Card.Body>
                    {depPricingDetails &&
                      depPricingDetails.segments&&depPricingDetails.segments.map(
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
                            <React.Fragment key={`pr-ic-${sIdx}`}>
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
                                lBrand={depPricingDetails&&depPricingDetails.solutionInf&&depPricingDetails.solutionInf.lBrand}
                                cabinClass={depPricingDetails&&depPricingDetails.solutionInf&&depPricingDetails.solutionInf.cabinClass}
                              />

                              <Row className="baggage-area">
                                <PricingBaggageCard
                                  baggageAllowance={
                                    depPricingDetails&&depPricingDetails.solutionInf&&depPricingDetails.solutionInf.baggageLists

                                  }
                                />
                              </Row>
                            </React.Fragment>
                          );
                        }
                      )}
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12}>
                <Card>
                  <Card.Title>
                    <AirPricringItinerayTitle
                    title="Return"
                    changePenalty={
                        retPricingDetails&&retPricingDetails.solutionInf&&retPricingDetails.solutionInf.changePenaltyList
                      }
                      cancelPenalty={
                        retPricingDetails&&retPricingDetails.solutionInf&&retPricingDetails.solutionInf.cancelPenaltyList

                      }
                      stops={retPricingDetails&&retPricingDetails.segmentInf&&retPricingDetails.segmentInf.stops}
                      // stoplocs={this.state.depPricingDetails.stopsLocs}
                      totalFlyTime={retPricingDetails&&retPricingDetails.segmentInf&&retPricingDetails.segmentInf.totalFlyTime}
                      cabinClass={retPricingDetails&&retPricingDetails.solutionInf&&retPricingDetails.solutionInf.cabinClass}
                      origin={retPricingDetails&&retPricingDetails.segmentInf&&retPricingDetails.segmentInf.firstOrigin}
                      destination={retPricingDetails&&retPricingDetails.segmentInf&&retPricingDetails.segmentInf.lastDestination}
                      departureTime={retPricingDetails&&retPricingDetails.segmentInf&&retPricingDetails.segmentInf.fstDepTime}
                    />
                  </Card.Title>
                  <Card.Body>
                    {retPricingDetails &&
                      retPricingDetails.segments&&retPricingDetails.segments.map(
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
                            <React.Fragment key={`ret-pr-ic-${sIdx}`}>
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
                                lBrand={retPricingDetails.solutionInf&&retPricingDetails.solutionInf.lBrand}
                                cabinClass={retPricingDetails.solutionInf&&retPricingDetails.solutionInf.cabinClass}
                              />

                              <Row className="baggage-area">
                                <PricingBaggageCard
                                  baggageAllowance={
                                    retPricingDetails&&retPricingDetails.solutionInf&&retPricingDetails.solutionInf.baggageLists
                                  }
                                />
                              </Row>
                            </React.Fragment>
                          );
                        }
                      )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <FareSummaryUsingPriceList
              airPriceList={this.state.farePriceSummery}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <button type="button" onClick={()=>{
              localDataStore.setRoundTripFarePriceSummery(this.state.farePriceSummery);
              this.setState({redirecStatus:true});
            }} className="btdc-btn rounded-pill btn btn-primary btn-block">Continue</button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

RndTripPriceingDetailsPage.prototypes = {
  getAirLines: PropTypes.func.isRequired,
  queryType: PropTypes.object.isRequired,
  getAirports: PropTypes.func.isRequired,
  airLines: PropTypes.object.isRequired,
  airPorts: PropTypes.object.isRequired,
  rndPricingDetail: PropTypes.object.isRequired,
  searchQury: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airLines: state.airSearch.airLinesList,
  airPorts: state.airSearch.airPortsList,
  rndPricingDetail: state.airPrice.rndSolution,
  searchQury: state.searchQuery.sQuery.searchQuery,
  queryType: state.searchQuery.sQuery.type,
});
export default connect(mapStateToProps, { getAirLines, getAirports })(
  RndTripPriceingDetailsPage
);
