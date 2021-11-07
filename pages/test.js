import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchmodifierAccordion from "../components/Accordion/SearchmodifierAccordion";
import StickySearchContent from "../components/air-search/StcikyMenu/StickySearchContent";
import CstSplitInputField from "../components/Fields/CstSplitInputField";
import CountDwonTimer from "../components/Timer/CountDwonTimer";
import EmptyCont from "../utils/helper/emptyCont";

const TestPage = (props) => {
  return (
    <React.Fragment>
      <Row style={{ padding: "25px 0px" }}></Row>
      <Row>
        <Col
          md={12}
          style={{ background: "#fff", height: "150px", padding: "20px" }}
        >
          <CountDwonTimer />
        </Col>
      </Row>
      <Row>
        <EmptyCont height="1200px" />
      </Row>
    </React.Fragment>
  );
};

export default TestPage;
