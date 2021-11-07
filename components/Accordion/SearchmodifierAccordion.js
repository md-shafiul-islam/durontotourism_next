/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirPortByIATACode } from "../../redux/actions/searchEsAction";
import { helperIsEmpty } from "../../utils/helper/helperAction";

import { localDataStore } from "../../utils/helper/localDataStore";
import { getEsCabinClass, getPassengerCount } from "../../utils/ui/accordionEs";
import AirSearchForm from "../air-search/AirSearchForm";

const SearchmodifierAccordion = (params) => {
  const [airLegs, setAirLegs] = useState([]);
  const [cPassenger, setCPPassenger] = useState(undefined);
  const [fCabinClass, setFCabinClass] = useState("");
  

  useEffect(() => {
    const shQuery = localDataStore.getSearchQuery();
    console.log("User Search Query, ", shQuery);
    console.log("SearchmodifierAccordion params", params);

    const { airLegReqs, passengers, cabinClass } = shQuery.searchQuery;

    setFCabinClass(getEsCabinClass(cabinClass));
    getQueryPassengers(passengers);

    if (shQuery) {
      if (shQuery.type === 1) {
        prepareOneWayQuery(airLegReqs);
      }

      if (shQuery.type === 2) {
        prepareRoundTripQuery(airLegReqs);
      }
    }
  }, []);
  const prepareOneWayQuery = (qAirLegs) => {
    if (qAirLegs) {
      // params.getAirPortByIATACode(qAirLegs[0].orgCode);
      // params.getAirPortByIATACode(qAirLegs[0].destCode);
      setAirLegs(qAirLegs);
    }
  };

  const getQueryPassengers = (passengers) => {
    let passengerCount = getPassengerCount(passengers);

    console.log("Current Passenger Counts, ", passengerCount);

    let passStr = "Passenger (s) ";

    passStr += passengerCount.adt > 0 ? `Adult ${passengerCount.adt}, ` : "";
    passStr += passengerCount.adt > 0 ? `Child ${passengerCount.cnn}, ` : "";
    passStr += passengerCount.adt > 0 ? `Infant ${passengerCount.inf} ` : "";
    setCPPassenger(passStr);
  };

  const getAirLegs = () => {
    if (helperIsEmpty(airLegs)) return "";
    if (helperIsEmpty(airLegs[0])) return "";
    return (
      <React.Fragment>
        <span className="text-content">
          {airLegs[0].orgCode}-{airLegs[0].destCode}{" "}
        </span>
        <span className="flight-date">{airLegs[0].depTime}</span>
      </React.Fragment>
    );
  };

  const prepareRoundTripQuery = (query) => {};

  const CustomToggle = (props) => {
    const [status, setStatus] = useState(false);
    console.log("Current CustomToggle Props, ", props);
    let { children, eventKey } = props;
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
      const lStatus = status;
      setStatus(!lStatus);
    });

    return (
      <Button
        type="button"
        onClick={decoratedOnClick}
        className={`close-smd-accordin active`}
      >
        {!status ? children : <span>Close</span>}
      </Button>
    );
  };
  // console.log("SearchmodifierAccordion searchQuery, ", searchQuery);
  return (
    <React.Fragment>
      <Accordion defaultActiveKey="0" className="search-modify-accordion">
        <Card>
          <Card.Header>
            <div className="modify-accordion-header">
              <div className="header-content">
                <div className="flight-itinerary">
                  Flight Search Result {getAirLegs()}
                </div>
                <div className="flight-passenger">{cPassenger}</div>
                <div className="flight-cab-class">{fCabinClass}</div>
              </div>
              <div className="header-button">
                <CustomToggle eventKey="searchModifire" className="action-btn">
                  Modify Search
                </CustomToggle>
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="searchModifire">
            <Card.Body>
              <AirSearchForm modStatus={2} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </React.Fragment>
  );
};

SearchmodifierAccordion.prototypes = {
  queryAirPorts: PropTypes.object.isRequired,
  searchQuery: PropTypes.object.isRequired,
  airPorts: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    queryAirPorts: state.searchQuery.airports,
    airPorts:state.airSearch.airPortsList,
    searchQuery: null,
  };
};

export default connect(mapStateToProps, { getAirPortByIATACode })(
  SearchmodifierAccordion
);
