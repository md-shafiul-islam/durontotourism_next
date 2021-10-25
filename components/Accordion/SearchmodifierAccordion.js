/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AirSearchForm from "../air-search/AirSearchForm";

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
      variant={!status ? "success" : "danger"}
      className="close-smd-accordin"
    >
      {!status ? children : <span>X</span>}
    </Button>
  );
};

const SearchmodifierAccordion = (params) => {
  console.log("SearchmodifierAccordion Run !! ");
  return (
    <React.Fragment>
      <Accordion defaultActiveKey="0" className="search-modify-accordion">
        <Card>
          <Card.Header>
            <CustomToggle eventKey="searchModifire" className="action-btn">Modify Search</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="searchModifire">
            <Card.Body>
              <AirSearchForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </React.Fragment>
  );
};

export default SearchmodifierAccordion;
