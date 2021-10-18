import React,{useState} from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  helperGetTimeFormatMin,
  helperGetTravelTime,
  helperGetTimeFormatHr,
  helperGetPrice,
  helperGetFullDateFormat,
} from "../../redux/actions/helperAction";
import IconView from "../airSearch/iconView";

const PriceItineraryCard = (prams) => {

  console.log("PriceItineraryCard, ", prams);

  const airlinseList = useSelector((state) => {
    return state.airSearch.airLinesList;
  }, shallowEqual);

  const [displayMsg, setDisplayMsg] = useState({});
  const diplayInfoShow = () => {
    console.log("Mouse Hover: ");
    setDisplayMsg(true);
  };

  const displayInfoNone = () => {
    setTimeout(() => {
      setDisplayMsg(false);
    }, 1000);
  };

  const diplayInfoOnActionShow = () => {
    setTimeout(() => {
      setDisplayMsg(true);
    }, 998);
  };

  const displayInfoNoneOnAction = () => {
    setDisplayMsg(false);
  };

  const getToolTopInf = (brand) => {
    if (brand) {
      if (brand.text) {
        let selectedText = "";

        brand.text.map((item, idx) => {
          if (item.type === "MarketingConsumer") {
            selectedText = item.value;
          }
        });

        selectedText = selectedText&&selectedText.split("•");

        selectedText.shift();

        return (
          <React.Fragment>
            {selectedText.map((slText, textIdx) => {
              if (1 >= textIdx) {
                return <li>{slText}</li>;
              }
            })}
          </React.Fragment>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={3} className="pricing-details-page">
          <div className="icon-area">
            <IconView airlinseList={airlinseList} selectedAirs={prams.segment.carrier ? [prams.segment.carrier] : [prams.segment.codeshareInfo.operatingCarrier]} />
          </div>
          <div className="air-provider">
            {airlinseList ? airlinseList[prams.segment.carrier] ? airlinseList[prams.segment.carrier].name : prams.segment&&prams.segment.codeshareInfo&&prams.segment.codeshareInfo.value : prams.segment&&prams.segment.codeshareInfo&&prams.segment.codeshareInfo.value}
          </div>
        </Col>
        <Col md={6}>
          <Row className="fly-time-inf txt-al-c one-way">
            <Col md={4}>
              <Row>
                <Col md={12} className="fly-hour">
                  {`${helperGetTimeFormatHr(
                    prams.segment.departureTime
                  )}:${helperGetTimeFormatMin(prams.segment.departureTime)}`}
                </Col>
                <Col md={12}>
                  {helperGetFullDateFormat(prams.segment.departureTime)}
                </Col>
              </Row>
            </Col>
            <Col md={4} className="travel-time-each">
              <span className="tt-each">
                {helperGetTravelTime(prams.segment.flightTime)}
              </span>
            </Col>
            <Col md={4}>
              <Row>
                <Col md={12} className="fly-hour">
                  {`${helperGetTimeFormatHr(
                    prams.segment.arrivalTime
                  )}:${helperGetTimeFormatMin(prams.segment.arrivalTime)}`}
                </Col>
                <Col md={12}>
                  {helperGetFullDateFormat(prams.segment.arrivalTime)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col md={3}>
          <span>Fare Type</span>
          <br />
          <span>{prams.lBrand&&prams.lBrand.name}</span>{" "}
          <span
            className="price-inf-btn"
            onMouseEnter={() => {
              diplayInfoShow();
            }}
            onMouseLeave={() => {
              displayInfoNone();
            }}
          >
            <i className="far fa-question-circle"></i>
          </span>
          {displayMsg === true ? (
            <React.Fragment>
              <span className="arrow-down"></span>
              <ul
                className="popup-inf"
                onMouseEnter={() => {
                  diplayInfoOnActionShow();
                }}
                onMouseLeave={() => {
                  displayInfoNoneOnAction();
                }}
              >
                {getToolTopInf(prams.lBrand)}
                <li>
                  Cancellation fee{" "}
                  {prams.cancelFess && prams.cancelFess.amount !== null ? (
                    <React.Fragment>
                      {" "}
                      starting {helperGetPrice(prams.cancelFess.amount)}
                    </React.Fragment>
                  ) : (
                    " Not Available"
                  )}
                </li>
                <li>
                  Date change fee{" "}
                  {prams.changeFess && prams.changeFess.amount !== null ? (
                    <React.Fragment>
                      {" "}
                      starting {helperGetPrice(prams.changeFess.amount)}
                    </React.Fragment>
                  ) : (
                    " Not Available"
                  )}
                </li>
              </ul>
            </React.Fragment>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PriceItineraryCard;
