import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import AirSearchForm from "../components/air-search/AirSearchForm";
import AutoSuggestionInptTextField from "../components/autosuggestion/autoSuggestionInptTextField";
import BlogHomePageCard from "../components/blogComp/blogHomePageCard";
import { PropTypes } from "prop-types";
import OffersCard from "../components/carousel/offersCard";
import {
  getAirLines,
  getAirports,
  airPortsArray,
} from "../redux/actions/airSearchAction";
import { localDataStore } from "../utils/helper/localDataStore";
import MenuTab from "../components/tabs/MenuTab";
import HomePageMenu from "../components/layout/menu/HomePageMenu";
import ViewSession from "../components/authentication/ViewSession";

class Home extends React.Component {

  
  componentDidMount() {
    this.props.getAirLines();
    this.props.getAirports();
    this.props.airPortsArray();
    localDataStore.activeLocalStore(window);
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12} >
            <React.Fragment>
              <Container fluid className="main-container">
                <Row>
                  <Col md={12}>
                    <HomePageMenu />
                  </Col>
                </Row>
                <Row>
                  <MenuTab />
                </Row>

                <Row>
                  <Col md={12}>
                    <div className="empty-cont"></div>
                  </Col>
                </Row>
                {/**
                <Row className="mt-50">
                  <Col md={12} className="mp-0">
                    <OffersCard />
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className="mtb20-p0"> 
                    <BlogHomePageCard />
                  </Col>
                </Row>
                   */}
              </Container>
            </React.Fragment>
          </Col>
          <ViewSession />
        </Row>
      </React.Fragment>
    );
  }
}

Home.prototypes = {
  getAirLines: PropTypes.func.isRequired,
  getAirports: PropTypes.func.isRequired,
  airPortsArray: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airLines: state.airSearch.airLinesList,
  airPorts: state.airSearch.airPortsList,
  airPortsArr: state.airSearch.airPortsArr,
});

export default connect(mapStateToProps, {
  getAirLines,
  getAirports,
  airPortsArray,
})(Home);
