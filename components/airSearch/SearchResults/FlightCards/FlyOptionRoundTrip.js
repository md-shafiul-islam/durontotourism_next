import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { setSelectedPrcingDetailsRoundTrip } from "../../../../redux/actions/priceAction";
import BookingCardRoundTripOptions from "./BookingCardRoundTripOptions";
import StickyCard from "./StickyCard";
import HelperRedirect from "../../../../utils/helper/helperRedirect";

class FlyOptionRoundTrip extends Component {
  state = {
    priceRedirect: false,
  };

  setSelectedAirPriceOptions = (airPricOptions) => {
    const airOptions = Object.fromEntries(airPricOptions);

    this.props.setSelectedPrcingDetailsRoundTrip(airOptions);

    console.log("Modal pricing Action !!!, ", JSON.stringify(airOptions));
    this.setState({ priceRedirect: true });
  };

  render() {
    if (this.state.priceRedirect) {
      return <HelperRedirect to="/air/pricing" />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            {this.props.availAbleFlights &&
              this.props.availAbleFlights.map((flyItem, fIdx) => {
                if (flyItem.airLeg.group === this.props.airLegs[0].group) {
                  return (
                    <React.Fragment>
                      <BookingCardRoundTripOptions
                        preSelecteItem={this.props.preSelectFly.deptureFly}
                        flyItem={flyItem}
                        elmId={fIdx}
                        getSelectedItem={(flyOption, opIdx, elmId) => {
                          this.props.getDepSelectedFly(flyOption, opIdx, elmId);
                        }}
                      />
                    </React.Fragment>
                  );
                }
              })}
          </Col>
          <Col md={6}>
            {this.props.availAbleFlights &&
              this.props.availAbleFlights.map((flyItem, fIdx) => {
                if (
                  flyItem.airLeg !== undefined &&
                  this.props.airLegs[1] !== undefined
                ) {
                  if (
                    flyItem.airLeg.group !== undefined &&
                    this.props.airLegs[1].group !== undefined &&
                    flyItem.airLeg.group === this.props.airLegs[1].group
                  ) {
                    return (
                      <React.Fragment>
                        <BookingCardRoundTripOptions
                          preSelecteItem={this.props.preSelectFly.returnFly}
                          flyItem={flyItem}
                          elmId={fIdx}
                          getSelectedItem={(flyOption, opIdx, elmId) => {
                            this.props.getRetSelectedFly(
                              flyOption,
                              opIdx,
                              elmId
                            );
                          }}
                        />
                      </React.Fragment>
                    );
                  }
                }
              })}
          </Col>
          <Col md={12}>
            <StickyCard
              flyOption={this.props.selectedOption}
              traveler={this.props.searchQuery.traveler}
              getSelectedPricingOptions={(slcOptions) => {
                this.setSelectedAirPriceOptions(slcOptions);
              }}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

FlyOptionRoundTrip.prototypes = {
  searchQuery: PropTypes.object.isRequired,
  setSelectedPrcingDetailsRoundTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  searchQuery: state.searchQuery.sQuery.searchQuery,
  airPorts: state.airSearch.airPortsList,
  rndPricingDetail: state.airPriceDetails.rndDetailsPrice,
});

export default connect(mapStateToProps, { setSelectedPrcingDetailsRoundTrip })(
  FlyOptionRoundTrip
);
