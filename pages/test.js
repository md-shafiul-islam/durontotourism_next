/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import SearchmodifierAccordion from "../components/Accordion/SearchmodifierAccordion";
import StickySearchContent from "../components/air-search/StcikyMenu/StickySearchContent";
import CstSelectPhoneValidateField from "../components/Fields/CstSelectPhoneValidateField";
import CstSplitInputField from "../components/Fields/CstSplitInputField";
import CountDwonTimer from "../components/Timer/CountDwonTimer";
import { getCountryOptions } from "../redux/actions/countriyAction";
import EmptyCont from "../utils/helper/emptyCont";
import { PropTypes } from "prop-types";

const TestPage = (props) => {
  useEffect(() => {
    props.getCountryOptions();
  }, []);

  return (
    <React.Fragment>
      <Row style={{ padding: "25px 0px" }}></Row>
      <Row>
        <Col
          md={12}
          style={{ background: "#fff", height: "150px", padding: "20px" }}
        >
          <CstSelectPhoneValidateField
            onChange={(item) => {
              console.log("Country, ", item);
            }}
            blurHandler={() => {}}
            options={props.countryOptions}
            placeholder="Country Options"
          />
        </Col>
      </Row>
      <Row>
        <EmptyCont height="1200px" />
      </Row>
    </React.Fragment>
  );
};

TestPage.prototype = {
  getCountryOptions: PropTypes.func.isRequired,
  countryOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log("Test State, ", state);

  return {
    countryOptions: state.country.countryOptions,
  };
};

export default connect(mapStateToProps, { getCountryOptions })(TestPage);
