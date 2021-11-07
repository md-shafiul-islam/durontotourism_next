/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { helperIsEmpty } from "../../../utils/helper/helperAction";
import CstAsyncSerachField from "../../Fields/CstAsyncSerachField";
import { getAirPortByIATACode } from "../../../redux/actions/searchEsAction";

const SelectItinerary = (props) => {
  console.log("SelectItinerary props, :) ", props);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  let { destinationFieldName, originFieldName } = props;

  const initialProps = () => {
    const { airPorts, airPortsList, origin, destination } = props;
    console.log(
      "SelectItinerary initialProps AirPorts, ",
      airPorts,
      " AirPortList,",
      airPortsList,
      " Origin, ",
      origin,
      " Destination ",
      destination
    );
    if (airPorts.length > 0) {
      if (origin !== null) {
        setOrigin(airPorts && airPorts[origin]);
      }
      if (destination !== null) {
        setDestination(airPorts && airPorts[destination]);
      }
    } else {
      if (!helperIsEmpty(airPortsList)) {
        if (airPortsList.length === 0) {
          props.getAirPortByIATACode(origin);
          props.getAirPortByIATACode(destination);
        }
      } else {
        props.getAirPortByIATACode(origin);
        props.getAirPortByIATACode(destination);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    console.log(
      "Change AirpriceList, UseEffect, Origin, ",
      props.origin,
      " props.origin ",
      props.destination,
      props.airPortsList
    );
    if (props.origin !== null) {
      setOrigin(props.airPortsList && props.airPortsList[props.origin]);
    }
    if (props.destination !== null) {
      setDestination(
        props.airPortsList && props.airPortsList[props.destination]
      );
    }
  }, [props.airPortsList]);

  useEffect(() => {
    initialProps();
  }, [props.origin || props.destination || props.airPorts]);

  const changeHandler = (item, fieldName, type) => {
    if (item) {
      props.setFieldValue(fieldName, { name: item.name, code: item.iataCode });
    }

    if (type === 1) {
      setOrigin(item);
    }
    if (type === 2) {
      setDestination(item);
    }
  };

  const switchItinerary = () => {
    const lOrigin = origin;
    const lDestination = destination;
    setOrigin(lDestination);
    setDestination(lOrigin);
    props.setFieldValue(originFieldName, {
      name: lDestination.name,
      code: lDestination.iataCode,
    });
    props.setFieldValue(destinationFieldName, {
      name: lOrigin.name,
      code: lOrigin.iataCode,
    });
  };

  return (
    <React.Fragment>
      {console.log(
        "Current Search Origin, ",
        origin,
        " Destination, ",
        destination
      )}
      <Row className="air-itinerary-Wrapper">
        <div className="switch-area" onClick={switchItinerary}>
          <i className="bi bi-arrow-left-right"></i>
        </div>
        <Col md={6} className="each-content ">
          <CstAsyncSerachField
            label="From"
            value={origin}
            placeholder="Enter air port name, code or location"
            fieldName={originFieldName}
            onChangeHandler={(item) => {
              changeHandler(item, originFieldName, 1);
            }}
          />
        </Col>

        <Col md={6}>
          <CstAsyncSerachField
            placeholder="Enter air port name, code or location"
            value={destination}
            label="To"
            fieldName={destinationFieldName}
            onChangeHandler={(item) => {
              changeHandler(item, destinationFieldName, 2);
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

SelectItinerary.prototypes = {
  getAirPortByIATACode: PropTypes.func.isRequired,
  airPorts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    airPorts: state.airSearch.airPortsList,
    airPortsList: state.searchQuery.airports,
  };
};

export default connect(mapStateToProps, { getAirPortByIATACode })(
  SelectItinerary
);
