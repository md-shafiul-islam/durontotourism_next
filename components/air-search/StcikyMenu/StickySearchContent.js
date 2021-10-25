import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import StickyMenuSelect from "./StickyMenuSelect";
import StickySearchDateContent from "./StickySearchDateContent";
import StickySelectTravelLocations from "./StickySelectTravelLocations";
import StickyTravelerInformationCard from "./StickyTravelerInformationCard";

const StickySearchContent = (params) => {

  return (
    <React.Fragment>
      <div className="sticky-menu-container">
        <Row>
          <Col md={6}>
            <Row>
              <Col md={3}>
                <StickyMenuSelect />
              </Col>
              <Col md={9}>
                <StickySelectTravelLocations />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={7}>
                <StickySearchDateContent
                  getStartDate={(startDate) => {
                    console.log("Start Date, ", startDate);
                  }}
                  getEndDate={(endDate) => {
                    console.log("End Date, ", endDate);
                  }}
                />
              </Col>
              <Col md={3}>
                <div className="sticky-trv-content-area mitembg">
                  <StickyTravelerInformationCard />
                </div>
              </Col>
              <Col md={2}>
                <Button>Search</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default StickySearchContent;
