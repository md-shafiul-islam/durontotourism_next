import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PricingFareTypeCard from "./pricingFareTypeCard";
import PricingFlyDetails from "./pricingFlyDetails";

class PricingDetailsOptionCard extends Component {
  state = {
    redirecStatus: false,
    selItElm: -1,
    selectedPriceOption: {},
    layovers: [],
    flightNums: [],
    origin: "",
    destination: "",
    deptureDate: "",
    carriers:[],
  };

  componentDidMount(){
    
    console.log("PricingDetailsOptionCard componentDidMount With C Props!!", this.props);
    
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    console.log("PricingDetailsOptionCard UNSAFE_componentWillReceiveProps !! C Props", this.props, "N Props", nextProps)

  }

  setSelectedItemIdx = (iDx, airSolution) => {
    if (iDx > -1) {
      this.setState({ selItElm: iDx, selectedPriceOption: airSolution });

      this.props.setFlightOption(airSolution);
    }
  };

  render() {
    let {carriers, flightNums, destination, deptureDate, origin, layovers} = this.props.infos;
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col md={3}>
              <PricingFlyDetails
                airSegment={this.props.airSegment&&this.props.airSegment}
                airPorts={this.props.airPorts}
                carriers={carriers}
                flightNumbers={flightNums}
                destination={destination}
                origin={origin}
                departureTime={deptureDate}
                layovers={layovers}
              />
            </Col>

            {/*** Pricing Details Mapp */}
            <Col md={9}>
              <div className="pricing-items">
                {this.props.airSolutions &&
                  this.props.airSolutions.map((solution, dIdx) => {
                    return (
                      <Col md={5} key={`pcgc-dep-${dIdx}`} className="hrz-item">
                        <PricingFareTypeCard
                          airSolution={solution}
                          elemId={this.state.selItElm}
                          cElmId={dIdx}
                          setImeIdx={(iDx) => {
                            this.setSelectedItemIdx(iDx, solution);
                          }}
                          runVia={this.props.title}
                        />
                      </Col>
                    );
                  })}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default PricingDetailsOptionCard;
