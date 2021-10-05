import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import ComRange from "./comRange";
import { ref } from "yup";

const passRang = [
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
];

const passChRang = [
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
];

const passClassRange = [
  { name: "Business", value: "Business" },
  { name: "Economy", value: "Economy" },
  { name: "Premium Economy", value: "PremiumEconomy" },
];

const TravellersAndClass = (props) => {
  const [child, setChild] = useState(undefined);
  const [infants, setInfants] = useState(undefined);
  const [adults, setAdults] = useState(undefined);
  const [cabinClass, setCabinClass] = useState(undefined);
  const [totalTraveler, setTotalTraveler] = useState(0);
  const refDate = useRef(null);

  const [display, setDisplay] = useState(true);

  const getIntData = (item) => {
    let val =
      item !== undefined ? (item.value !== undefined ? item.value : 0) : 0;

    return val;
  };

  const setTotalTravelerData = (child, infants, adults) => {
    let total = 0;

    let chData = getIntData(child);
    let infantsData = getIntData(infants);
    let adultData = getIntData(adults);

    total = adultData + infantsData + chData;

    setTotalTraveler(total);
  };

  const setChildData = (item) => {
    setChild(item);

    setTotalTravelerData(item, infants, adults);
  };

  const setInfantsData = (item) => {
    setInfants(item);
    setTotalTravelerData(child, item, adults);
  };

  const setAdultsData = (item) => {
    setAdults(item);
    setTotalTravelerData(child, infants, item);
  };

  const setClassData = (item) => {
    setCabinClass(item);
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event) {
      if (refDate.current && !refDate.current.contains(event.target)) {
        if (display === true) {
          setDisplay(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refDate]);

  useEffect(() => {
    setDisplay(!display);
    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDataToApply = (e) => {
    props.getAllRangeData(adults, child, infants, cabinClass);
    setDisplay(!display);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Row className="mp-0">
          <Col md={12} className="traveler mp-0" ref={refDate}>
            <div
              className="com-title"
              onClick={(e) => {
                setDisplay(!display);
              }}
            >
              Travellers & CLASS{"  "}&nbsp;
              <i
                className="fas fa-angle-down icon-trans"
                style={{
                  transform: `${display ? "rotateZ(-180deg)" : ""}`,
                }}
              ></i>
            </div>
            <div className="tb-pad-0">
              <Col md={12} className="traveler-card-body">
                <p>
                  <span className="search-bstyle">{totalTraveler}</span>{" "}
                  <span className="search-nstyle"> Travellers</span>
                </p>
                <p className="travellerClass">
                  {cabinClass ? cabinClass.name : ""}
                </p>
              </Col>
            </div>

            {display && (
              <Card className="traveler-card">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md={9}>
                          <ComRange
                            items={passRang}
                            populateItem={adults}
                            keyFix="adt"
                            ulClass="rang-list"
                            itemClass="item"
                            headerClass=""
                            headerText="ADULTS (12y +)"
                            getData={(item) => setAdultsData(item)}
                          />
                        </Col>
                        <Col md={3}></Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <ComRange
                            items={passChRang}
                            populateItem={child}
                            keyFix="chi"
                            ulClass="rang-list"
                            itemClass="item"
                            headerText="CHILDREN (2y - 12y )"
                            getData={(item) => setChildData(item)}
                          />
                        </Col>
                        <Col md={6}>
                          <ComRange
                            items={passChRang}
                            populateItem={infants}
                            keyFix="inf"
                            ulClass="rang-list"
                            itemClass="item"
                            headerText="INFANTS (below 2y)"
                            getData={(item) => setInfantsData(item)}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <ComRange
                            items={passClassRange}
                            populateItem={cabinClass}
                            keyFix="cabin"
                            ulClass="rang-list"
                            itemClass="item"
                            headerText="CHOOSE TRAVEL CLASS"
                            getData={(item) => setClassData(item)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        onClick={(e) => setDataToApply(e)}
                      >
                        Apply <i className="fas fa-check"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </React.Fragment>
    </React.Fragment>
  );
};

export default TravellersAndClass;
