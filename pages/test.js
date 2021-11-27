/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import SearchmodifierAccordion from "../components/Accordion/SearchmodifierAccordion";
import StickySearchContent from "../components/air-search/StcikyMenu/StickySearchContent";
import CstSelectPhoneValidateField from "../components/Fields/CstSelectPhoneValidateField";
import CstSplitInputField from "../components/Fields/CstSplitInputField";
import CountDwonTimer from "../components/Timer/CountDwonTimer";
import { getCountryOptions } from "../redux/actions/countriyAction";
import EmptyCont from "../utils/helper/emptyCont";
import { PropTypes } from "prop-types";
import CstUploadFileFieldValidet from "../components/Fields/CstUploadFileFieldValidet";
import CstTavNavMenu from "../components/CstTabs/CstProfileTabComp/CstTavNavMenu";
import CstProfilePageTab from "../components/CstTabs/CstProfilePageTab";
import CstSingleDatePicker from "../components/Fields/CstSingleDatePicker";

const TestPage = (props) => {
  useEffect(() => {
    props.getCountryOptions();
  }, []);

  return (
    <React.Fragment>
      <Row style={{ padding: "25px 0px" }}></Row>
      <Row style={{ padding: "25px 0px" }}>
        <Col md={3}>
          <CstSingleDatePicker />
        </Col>
      </Row>

      <EmptyCont height="1200px" />
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
