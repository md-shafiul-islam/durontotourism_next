import React, { useState, useEffect, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import InputTextAutoSuggestion from "./inputTextAutoSuggestion";

const AutoSuggestionInptTextField = (props) => {
  const airPorts = useSelector(
    (state) => state.airSearch.airPortsList,
    shallowEqual
  );

  const refItem = useRef(null);

  const [item, setItem] = useState({ code: "", airPort: {} });
  const [displaySearch, setDisplaySearch] = useState(false);

  const initItemByCode = (code) => {
    setItem({ airPort: airPorts[code], code });
    props&&props.change(airPorts[code]);
  };

  const displaySearchField = () => {
    setDisplaySearch(!displaySearch);
  };
  
  useEffect(() => {
   
    //  console.log("Use Effect Click Out side ref area!!", refItem, " Current Element, ", props.name);

    function handleClickOutside(event) {
      if (!refItem.current.contains(event.target)) {
        // console.log("Click Action run, UseEffect refItem IF Block");

        if (displaySearch === !true) {
          setDisplaySearch(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refItem]);

  return (
    <React.Fragment>
          
      <div className="ats-search-container" ref={refItem}>
        <div
          className="ats-search-content"
          onClick={() => {
            displaySearchField();
          }}
        >
          <div className="head-title">{props.label}</div>
          <div className="selected-item">
            <div className="sld-locs">
              {item && item.airPort && item.airPort.location
                ? item.airPort.location
                : "Location"}
            </div>
            <div className="sld-sub-line">
              <span className="code">
                {item && item.code ? `${item.code}, ` : "code"}
              </span>
              <span className="air-port">
                {item && item.airPort && item.airPort.name
                  ? item.airPort.name
                  : "port name"}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`auto-sugesstion-area`} 
          id={ `ats-area-${props.name}`}
          style={{ display: `${displaySearch ? "block" : "none"}` }}
        >
          <InputTextAutoSuggestion
            name={props.name}
            getSelectedCode={(code) => {
              initItemByCode(code);
              setDisplaySearch(!displaySearch);
            }}
            id={props.id}
            label={props.label}
            activeStatus={displaySearch}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AutoSuggestionInptTextField;
