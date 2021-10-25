import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchmodifierAccordion from "../components/Accordion/SearchmodifierAccordion";
import StickySearchContent from "../components/air-search/StcikyMenu/StickySearchContent";
import EmptyCont from "../utils/helper/emptyCont";

const TestPage = (props) => {
  return (
    <React.Fragment>
      <Row style={{padding:"25px 0px"}}>
        
      </Row>
      <Row>
        <SearchmodifierAccordion />
      </Row>
      <Row>
          <EmptyCont height="1200px" />
      </Row>
    </React.Fragment>
  );
};

export default TestPage;
