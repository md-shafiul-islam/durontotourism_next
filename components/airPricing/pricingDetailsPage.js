import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import OneWayPriceing from "./oneWayPriceing";
import RndTripPriceingDetailsPage from "./RndTripDetailsPage/rndTripPriceingDetailsPage";


class PricingDetailsPage extends Component {

  componentDidMount(){
    console.log("PricingDetailsPage Run !!", this.props);
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          {false && (
            <Col md={12}>
              <OneWayPriceing />
            </Col>
          )}

          {true && (
            <Col md={12}>
              <RndTripPriceingDetailsPage />
            </Col>
          )}

          {false && (
            <Col md={12}>
              
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default PricingDetailsPage;
