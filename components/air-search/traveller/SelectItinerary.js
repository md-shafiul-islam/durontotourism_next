import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CstAsyncSerachField from "../../Fields/CstAsyncSerachField";

const SelectItinerary = (props) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  let {destinationFieldName, originFieldName} = props;
  useEffect(() => {
    if (props.preSetItinerary) {
      setOrigin(props.origin);
      setDestination(props.destination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log("switchItinerary Run :) ");
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

export default SelectItinerary;
