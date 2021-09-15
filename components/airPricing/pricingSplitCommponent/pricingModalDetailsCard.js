import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import PricingDetailsOptionCard from "./pricingDetailsOptionCard";
import { connect } from "react-redux";
import { setPrcingRoundTripSelectedItems } from "../../../redux/actions/priceAction";
import { localDataStore } from "../../../utils/helper/localDataStore";
import HelperRedirect from "../../../utils/helper/helperRedirect";

class PricingModalDetailsCard extends Component {
  state = {
    retPricing: { status: false, orgResponse: null },
    depPricing: { status: false, orgResponse: null },
    depInitOption:{},
    retInitOption:{},
    airPringSelected: new Map(),
    redirectStatus:false,
  };

  setFlightOptions = (airSolution, key, segments)=>{

    console.log("Air Price Price Model Details: key, airSolution, ", key, " , ", airSolution);

    //Set Seleced air To Redux Or Local Store
    this.state.airPringSelected.set(key, {airPriceOpt:airSolution,  segment:segments});
    // console.log("After Air Price Selected Options: ", this.state.airPringSelected);
    let airPriceOptions = Object.fromEntries(this.state.airPringSelected);
    this.props.setPrcingRoundTripSelectedItems(airPriceOptions);
    localDataStore.setPriceRoundTripFlightsBook(airPriceOptions);
  }

  pricingDetailsAction = () =>{
    //Redirect Pricing Page

    this.setState({redirectStatus:true});
  }
  UNSAFE_componentWillReceiveProps(next_props) {
    // console.log("PMDC UNSAFE_componentWillReceiveProps !!");

    if (next_props !== undefined && next_props !== null) {
      this.initPropsToState();
    }
  }

  componentDidMount(){
      // console.log("PMDC componentDidMount !!");
    this.initPropsToState();
  }

  initPropsToState = () => {
      if(this.props.depPricing){
          if(this.props.depPricing.status){

              let {status, orgResponse} = this.props.depPricing;
              let depPricingOpt =  this.initPricingInf(orgResponse);
              // console.log("depPricingOpt, ", depPricingOpt);

              this.setState({depPricing: { status: status, orgResponse: orgResponse }, depInitOption:depPricingOpt});
          }
      }

      if(this.props.retPricing){
        if(this.props.retPricing.status){
            let {status, orgResponse} = this.props.retPricing;
            let retPricingOpt = this.initPricingInf(orgResponse);

            console.log("retPricingOpt, ", retPricingOpt);
            this.setState({retPricing: { status: status, orgResponse: orgResponse }, retInitOption:retPricingOpt});
            
        }
    }
  };

  initPricingInf = (pricingOption)=>{
    let layovers = [], flightNums = [], fOrigin="", lDestination="", deptureDate="", carriers=[];
    console.log("Air Price Option Init Or Extract ", pricingOption);
    if(pricingOption){
    
      let {airSegment} = pricingOption.airItinerary;

      airSegment&&airSegment.map((segment, sIdx)=>{

        let {origin, destination, departureTime, carrier, flightNumber} = segment;

        lDestination = destination;
        if(sIdx === 0){
          fOrigin = origin;
          deptureDate = departureTime;
        }else{
          layovers.push(origin);
        }

        flightNums.push({num:flightNumber, cNum:`${carrier}-${flightNumber}`});
        if(!carriers.includes(carrier)){
          carriers.push(carrier);
        }
      });

      return {
        layovers, flightNums, origin: fOrigin, destination:lDestination, deptureDate, carriers,
      };
    }
  }
  render() {
      let {retPricing, depPricing, redirectStatus} = this.state;
      // console.log("Air Pricing Modal Details Card, DepPrice, ", depPricing, " Ret Price, ", retPricing);

      if(redirectStatus){
        return <HelperRedirect to="/pricing" />;
      }

    return (
      <React.Fragment>
        <PricingDetailsOptionCard
          airSegment={depPricing&&depPricing.status&&depPricing.orgResponse.airItinerary.airSegment}
          airSolutions={depPricing&&depPricing.status&&depPricing.orgResponse.airPriceResult[0]&&depPricing.orgResponse.airPriceResult[0].airPricingSolution}
          title={"Depture"}
          setFlightOption={(airOption) => {
            this.setFlightOptions(airOption, "detureItem", depPricing.orgResponse.airItinerary.airSegment);
          }}
          infos={this.state.depInitOption}
        />

        <PricingDetailsOptionCard
          airSegment={retPricing&&retPricing.status&&retPricing.orgResponse.airItinerary.airSegment}
          airSolutions={retPricing&&retPricing.status&&retPricing.orgResponse.airPriceResult[0]&&retPricing.orgResponse.airPriceResult[0].airPricingSolution}
          title={"Return"}
          setFlightOption={(airOption) => {
            
            this.setFlightOptions(airOption, "returnItem", retPricing.orgResponse.airItinerary.airSegment);
          }}
          infos={this.state.retInitOption}
        />

        <Row>
          <Col md={{ span: 2, offset: 10 }}>
            <Button
              onClick={() => {
                this.pricingDetailsAction();
              }}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

PricingModalDetailsCard.prototypes = {
    searchQuery: PropTypes.object.isRequired,
    retPricing: PropTypes.object.isRequired,
    depPricing: PropTypes.object.isRequired,
    setPriceRoundTrip: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    searchQuery: state.searchQuery.sQuery.searchQuery,
    airPorts: state.airSearch.airPortsList,
    retPricing:state.airPrice.rndModalRetPrices,
    depPricing:state.airPrice.rndModalDepPrices
  });
export default connect(mapStateToProps, {setPrcingRoundTripSelectedItems})(PricingModalDetailsCard);
