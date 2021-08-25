import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import BookingFlightDetails from "./bookingFlightDetails";
import { helperGetFullDateFormat } from "../../redux/actions/helperAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { GET_AIRPORTS } from "../../redux/types";



class BookingFlightSummary extends Component {
  state = {
    collapsStatus: true,
  };

  componentDidMount() {
    console.log("BookingFlightSummary this.props, ", this.props);
  }

  collapsAction = () => {
    let { collapsStatus } = this.state;

    this.setState({ collapsStatus: !collapsStatus });
  };

  getFlyLocations = (segment) => {
    if (!helperIsEmpty(segment)) {
      return (
        <React.Fragment>
          <span>{`${this.getLocation(segment.firstOrigin)}-${this.getLocation(
            segment.lastDestination
          )}`}</span>
        </React.Fragment>
      );
    }
  };

  getLocation = (code) => {
    let { airPorts } = this.props;
    if (code) {
      if (airPorts) {
        let airPort = airPorts[code];
        return airPort&&airPort.location;
      }
    }

    return "Not Set";
  };

  getAirLince = (segmentsInf)=>{

    let airLinceList = {};
    if(segmentsInf){

      console.log("get Air Linces Segments Info, ", segmentsInf);
      let {carriers} = segmentsInf;

      console.log("Selectedd Air Linces, ", carriers, " Air Linces List ", this.props.airLines);

      carriers&&carriers.map((carrier, idx)=>{
        if(this.props){

          if(this.props.airLines){
            let airLine = {[carrier]: this.props.airLines[carrier]};
            if(airLine){
              airLinceList = {...airLinceList, ...airLine};
            }
          }
        }
      })
    }

    console.log("Selectedd Air Linces, Before return ", airLinceList);

    return airLinceList;
  }

  render() {
    let { deptuerPriceDetails, returnPriceDetails } = this.props;
    let { collapsStatus } = this.state;
    console.log("BookingFlightSummary this.props ", deptuerPriceDetails);

    return (
      <React.Fragment>
        <Card>
          <Card.Body>
            <Row>
              <Col md={12} className="booking-header">
                <div className="booking-content">
                  <div className="booking-title">
                    {this.getFlyLocations(deptuerPriceDetails.segmentInf)}
                  </div>
                  <div className="booking-fly-times">
                    Deptuer{" "}
                    {helperGetFullDateFormat(
                      deptuerPriceDetails.segmentInf &&
                        deptuerPriceDetails.segmentInf.fstDepTime
                    )}
                    {" - "}
                    Return{" "}
                    {helperGetFullDateFormat(
                      returnPriceDetails.segmentInf &&
                        returnPriceDetails.segmentInf.fstDepTime
                    )}
                  </div>
                </div>
                <div className="collaps-action" onClick={this.collapsAction}>
                  <span>
                    Flight Details{" "}
                    <i
                      className="spacee-5 fas fa-chevron-up"
                      style={{
                        transform: `${
                          collapsStatus ? "rotate(180deg)" : "rotate(0deg)"
                        }`,
                      }}
                    ></i>
                  </span>
                </div>
              </Col>
            </Row>
            <Row
              className="book-fly-list"
              style={{ display: `${collapsStatus ? "block" : "none"}` }}
            >
              <Col md={12} className="book-fly-item">
                <BookingFlightDetails
                  segment={deptuerPriceDetails.segmentInf}
                  lBrand={
                    deptuerPriceDetails.solutionInf &&
                    deptuerPriceDetails.solutionInf.lBrand
                  }
                  cabinClass={
                    deptuerPriceDetails.solutionInf &&
                    deptuerPriceDetails.solutionInf.cabinClass
                  }

                  airLinces={this.getAirLince(deptuerPriceDetails && deptuerPriceDetails.segmentInf)}
                />
              </Col>

              <Col md={12} className="book-fly-item">
                <BookingFlightDetails
                  segment={returnPriceDetails.segmentInf}
                  lBrand={
                    returnPriceDetails.solutionInf &&
                    returnPriceDetails.solutionInf.lBrand
                  }
                  cabinClass={
                    returnPriceDetails.solutionInf &&
                    returnPriceDetails.solutionInf.cabinClass
                  }

                  airLinces={this.getAirLince(returnPriceDetails && returnPriceDetails.segmentInf)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

BookingFlightSummary.prototypes = {
  airPorts: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{

  return {
    airPorts: state.airSearch.airPortsList,
    airLines: state.airSearch.airLinesList
  }
}

export default connect(mapStateToProps, null)(BookingFlightSummary);
