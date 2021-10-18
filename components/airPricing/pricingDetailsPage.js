import React from "react";
import { Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import OneWayPriceing from "./oneWayPriceing";
import RndTripPriceingDetailsPage from "./RndTripDetailsPage/rndTripPriceingDetailsPage";
import { useRouter } from "next/router";

const PricingDetailsPage = (props) => {

  const router = useRouter();

  return (
    <React.Fragment>
      <Row>
        {props.search.type === 1 && (
          <Col md={12}>
            <OneWayPriceing router={router} />
          </Col>
        )}

        {props.search.type === 2 && (
          <Col md={12}>
            <RndTripPriceingDetailsPage router={router} />
          </Col>
        )}

        {props.search.type === 3 && <Col md={12}></Col>}
      </Row>
    </React.Fragment>
  );
};

PricingDetailsPage.prototypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  // console.log("Current State Air Price Details: ",  state);
  return {
    search: state.searchQuery.sQuery,
  };
};

export default connect(mapStateToProps, null)(PricingDetailsPage);
