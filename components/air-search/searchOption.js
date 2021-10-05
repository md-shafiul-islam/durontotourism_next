import React, { useState, useEffect, useRef } from "react";
import { Card, Col } from "react-bootstrap";

const SearchOption = (props) => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [display, setDisplay] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
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
  }, [ref]);

  useEffect(() => {
    setSelectedItem(props.populateItem);
    setDisplay(!display);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedItem(props.populateItem);
  }, [props.populateItem]);

  const toggleDisplay = () => {
    setDisplay(!display);
    console.log("Display: ", display);
  };

  return (
    <React.Fragment>
      <Card className={props.cardClass}>
        <Card.Body ref={ref} className="no-margin-padding">
          <Card.Title className="com-title" onClick={toggleDisplay}>
            {props.title}
          </Card.Title>
          <Card.Text onClick={toggleDisplay} className="text-content">
            {selectedItem && (
              <React.Fragment>
                <Col>
                  <div className="pdl-5">
                    <span className="seacrh-content">{selectedItem.name}</span>
                    <br />
                    <span className="seacrh-content-code">
                      &nbsp;{selectedItem.iataCode}
                    </span>
                  </div>
                </Col>
              </React.Fragment>
            )}
          </Card.Text>
          <div className="search-text-area">{display && props.children}</div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default SearchOption;
