import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import SelectedAirDetails from "./SelectedAirDetails";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getSearchResult } from "../../../redux/actions/airSearchAction";
import FlyOptionRoundTrip from "./FlightCards/FlyOptionRoundTrip";
import MultiCityOptionsCards from "./FlightCards/MultiCityOptionsCards";
import OneWaySearchResult from "../oneWaySearch/oneWaySearchResult";
import RoundTripFlightResult from "./GenericCard/roundTripFlightResult";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";
import PopulerFilter from "./AirFiltersCards/populerFilter";
import FlightCatelogFilter from "./AirFiltersCards/flightCatelogFilter";
import AirLinesFilter from "./AirFiltersCards/airLinesFilter";
import Sidebar from "../../layout/sidebare/sidebar";
import SearchmodifierAccordion from "../../Accordion/SearchmodifierAccordion";

class AirSearchResult extends Component {
  state = {
    searchQuery: {},
    searchType: 0,
    pStatus: true,
    bookingOption: [{}],
    selectedRndFly: {
      deptureFly: { opId: 0, elmId: 0 },
      returnFly: { opId: 0, elmId: 0 },
    },
    rndSelectedoption: { departureOption: null, returnOption: null },
    preSetOption: [
      { fly: 0, book: 0, opId: 0, elmKey: "dep-0", bookInf: null },
    ],
    airSegments: [],
    airPricePointList: [],
    response: {},
    fareInfos: [],
    flightDetailsLists: [],
    brands: [],
    routes: [],
    multyCityOption: {},
    oneWayOption: {},
    roundTripOption: {},
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.airSearchResponse.airSearchResponse !== undefined &&
      nextProps.searchQuery.sQuery.searchQuery !== undefined
    ) {
      let { status } = nextProps.airSearchResponse.airSearchResponse;

      if (status) {
        console.log("If Status: ", nextProps);
        this.setState({
          response: nextProps.airSearchResponse.airSearchResponse.response,
          searchType: nextProps.searchQuery.sQuery.type,
          searchQuery: nextProps.searchQuery.sQuery.searchQuery,
        });
        // const {} = nextProps.airSearchResponse.airSearchResponse;
        if (this.state.searchType === 2) {
          this.initPreSelectItem();
        }
      }
    }
  };

  componentDidMount() {
    if (this.state.searchType === 2) {
      this.initPreSelectItem();
    }
  }

  initPreSelectItem = () => {
    if (this.state.responseData === undefined) {
      return;
    }

    if (this.state.responseData.response === undefined) {
      return;
    }

    let { availableAirOptions, lowFareSearchRsp } =
      this.state.responseData.response;

    if (availableAirOptions === undefined) {
      return;
    }

    let { routeList } = lowFareSearchRsp;

    let route = routeList && routeList.route[0];
    let { leg } = route;

    if (availableAirOptions === undefined && leg) {
      console.log("initPreSelectItem !! IF ", this.state);
    } else {
      let dPselecte = {};
      let retPreSelect = {};
      let dItem = {};
      let rtItem = {};

      let dStatus = true;
      let rtnStatus = true;

      availableAirOptions.map((item, idx) => {
        if (item.airLeg.group === leg[0].group && dStatus) {
          dPselecte = { opId: 0, elmId: idx };
          dItem = item.flyOptions[0];
          dStatus = false;
        }
      });

      availableAirOptions.map((item, idx) => {
        if (item.airLeg.group === leg[1].group && rtnStatus) {
          retPreSelect = { opId: 0, elmId: idx };
          rtItem = item.flyOptions[0];

          rtnStatus = false;
        }
      });
      this.setState({
        pStatus: false,
        selectedRndFly: {
          deptureFly: dPselecte,
          returnFly: retPreSelect,
        },
        rndSelectedoption: {
          departureOption: dItem,
          returnOption: rtItem,
        },
      });
    }
  };

  setBookingAction = (item, ids) => {
    if (item !== undefined) {
      let { bookingOption, preSetOption } = this.state;
      bookingOption.push({ item });
      this.setState({ bookingOption: bookingOption });

      preSetOption.push({
        fly: ids.fly,
        book: ids.book,
        opId: ids.opId,
        elmKey: ids.elmKey,
        bookInf: item,
      });

      this.setState({ preSetOption: preSetOption });
    }
  };

  bookInfoRemoveAction = (item, flyIndex, bookIdx, optionIndex, elKey) => {
    let preSetOption = this.state.preSetOption;
    let removeIdx = null;

    if (preSetOption !== undefined) {
      preSetOption.map((option, idx) => {
        if (
          option.book === bookIdx &&
          item !== null &&
          option.elmKey === elKey &&
          option.fly === flyIndex &&
          option.opId === optionIndex
        ) {
          removeIdx = idx;
          preSetOption.splice(removeIdx, 1);
          return;
        }
      });

      this.setState({ preSetOption: preSetOption });
    }
  };

  setRndDepFlyOption = (item, idx, eId) => {
    this.setState({
      selectedRndFly: {
        returnFly: this.state.selectedRndFly.returnFly,
        deptureFly: { opId: idx, elmId: eId },
      },
      rndSelectedoption: {
        departureOption: item,
        returnOption: this.state.rndSelectedoption.returnOption,
      },
    });
  };

  setRndReturnFlyOption = (item, idx, eId) => {
    this.setState({
      selectedRndFly: {
        deptureFly: this.state.selectedRndFly.deptureFly,
        returnFly: { opId: idx, elmId: eId },
      },
      rndSelectedoption: {
        departureOption: this.state.rndSelectedoption.departureOption,
        returnOption: item,
      },
    });
  };

  render() {
    let { searchType, response } = this.state;
    console.log("Search Result searchType, ", searchType);

    return (
      <React.Fragment>
        <Row>          
          <Col md={3}>
            <Row>
              <Sidebar />
            </Row>
          </Col>
          <Col md={9}>
            {this.state.searchType === 1 ? (
              <OneWaySearchResult result={response} status={true} />
            ) : (
              ""
            )}
            {this.state.searchType === 2 ? (
              <RoundTripFlightResult type={this.state.searchType} />
            ) : (
              ""
            )}
            {this.state.searchType === 3
              ? multyFlightAirInf &&
                multyFlightAirInf.map((item, mIdx) => {
                  return (
                    <React.Fragment key={`mltCity-card-${mIdx}`}>
                      <MultiCityOptionsCards
                        flighAirPricetList={item}
                        elmId={mIdx}
                      />
                    </React.Fragment>
                  );
                })
              : ""}
          </Col>
        </Row>

        <Row className="bootom-space">
          <Col md={12}></Col>
        </Row>
      </React.Fragment>
    );
  }
}

AirSearchResult.prototypes = {
  getSearchResult: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  airSearchResponse: PropTypes.object.isRequired,
  searchQuery: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    airSearchResponse: state.airSearch.airSearchResponse,
    searchQuery: state.searchQuery.sQuery,
    airLinesList: state.airSearch.airLinesList,
    airPortsArr: state.airSearch.airPortsArr,
    airLinesList: state.airSearch.airLinesList,
  };
};

export default connect(mapStateToProps, { getSearchResult })(AirSearchResult);
