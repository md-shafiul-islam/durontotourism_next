import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { helperGetPriceReqQuery } from "../../../../redux/actions/helperAction";
import { EXT_PRICE_URL, GET_MOD_AIR_PRICE_DEP, GET_MOD_AIR_PRICE_RET, REQUEST_HEADER } from "../../../../redux/types";
import { helperGetAmount, helperIsEmpty } from "../../../../utils/helper/helperAction";
import RoundTripPriceOptionModal from "../../../Modals/roundTripPriceOptionModal";
import RoundSelectedTab from "./RoundSelectedTab";

const StickyCard = (params) => {
  const slectedAir = useSelector(
    (state) => state.airPrice.selectedRoundTripAir,
    shallowEqual
  );

  const reduxTraveler = useSelector(
    (state) => state.searchQuery.sQuery.searchQuery,
    shallowEqual
  );
  
  const dispatch = useDispatch();


  // console.log("StickyCard Traveler, ", reduxTraveler);

  // console.log("Redux slectedAir, ", slectedAir);
  let fareSummary = { totalPrice: 0, basePrice: 0, taxes: 0 };

  if (slectedAir !== null && slectedAir !== undefined) {
    let { dep, ret } = slectedAir;

    let dBPrice = 0,
      dTPrice = 0,
      dTax = 0,
      rBPrice = 0,
      rTPrice = 0,
      rTax = 0;

    if (dep !== undefined && dep) {
      if (dep.eachPrices !== undefined && dep.eachPrices !== null) {
        dBPrice = helperGetAmount(dep.eachPrices.eachEqBasePrice);
        dTPrice = helperGetAmount(dep.eachPrices.eachTotalPrice);
        dTax = helperGetAmount(dep.eachPrices.eachTotalTax);
      }
    }

    if (ret !== undefined && ret !== null) {
      if (ret.eachPrices !== undefined && ret.eachPrices !== null) {
        rTPrice = helperGetAmount(ret.eachPrices.eachTotalPrice);
        rBPrice = helperGetAmount(ret.eachPrices.eachEqBasePrice);
        rTax = helperGetAmount(ret.eachPrices.eachTotalTax);
      }
    }

    let totalTax,
      totalPrice,
      totalBasePrice = 0;

    totalBasePrice = dBPrice + rBPrice;
    totalPrice = dTPrice + rTPrice;
    totalTax = dTax + rTax;

    fareSummary.taxes = totalTax;
    fareSummary.totalPrice = totalPrice;
    fareSummary.basePrice = totalBasePrice;
  }

  // console.log("Fare Summary: ", fareSummary);
  // console.log("Redux slectedAir, ", slectedAir);

  const [displayDetails, setDisplayDetails] = useState(false);
  // const [stickyPrice, setStickyPrice] = useState({
  //   depResp: null,
  //   retResp: null,
  // });


  const [displayModal, setDisplayModal] = useState(false);

  const sendPricingRequest = () => {

    // console.log("sendPricingRequest !!");


    if (slectedAir !== undefined && slectedAir !== null) {
      console.log("sendPricingRequest !! slectedAir Not Null Or Undefined !!");
      let url = `${EXT_PRICE_URL}/api/v_1_0/airPriceRequest`;
      let { dep, ret } = slectedAir;
      let resDepReturn = null;
      let resReturn = null;
      
      if (dep !== undefined && ret !== undefined) {
        //Return Price Query Prepared Start
        let searchQuery = helperGetPriceReqQuery(
          ret,
          reduxTraveler,
          params.traceId
        );
        
        //Departure Price Query Prepared Start

        let depSearchQuery = helperGetPriceReqQuery(
          dep,
          reduxTraveler,
          params.traceId
        );
        console.log("Air Price Ret Query: ", depSearchQuery);

        setDisplayModal(true);
      }
    }
  };
  

  const toggleDisplay = () => {
    const view = displayDetails;
    setDisplayDetails(!view);
  };
 
  const getTimeFormatHr = (timeValue) => {
    if (timeValue != undefined) {
      if (timeValue === null) {
        return "0.0";
      }

      let dateTime = new Date(timeValue);
      let hr = null;

      if (dateTime) {
        hr =
          dateTime.getHours() < 9
            ? `0${dateTime.getHours() + 1}`
            : `${dateTime.getHours() + 1}`;

        if (!isNaN(hr)) {
          return hr;
        }
      }
    }
    return "00";
  };

  const getTimeFormatMin = (timeValue) => {
    if (timeValue != undefined) {
      if (timeValue === null) {
        return "0.0";
      }

      let dateTime = new Date(timeValue);
      let min = null;

      if (dateTime) {
        min =
          9 >= dateTime.getMinutes()
            ? `0${dateTime.getMinutes()}`
            : `${dateTime.getMinutes()}`;

        if (!isNaN(min)) {
          return min;
        }
      }

      return "00";
    } else {
      return "00";
    }
  };

  const getPrice = (amount) => {
    let price = "0.0";

    if (amount === undefined || amount === null) {
      return price;
    }
    return (
      <React.Fragment>
        <span className="curency-code">{amount.substring(0, 3)}:</span>
        <span className="rnde-amount"> {amount.substring(3)}</span>
      </React.Fragment>
    );
  };

  const getTotalAirPrice = (depPrice, retnPrice) => {
    if (
      depPrice === undefined ||
      depPrice === null ||
      retnPrice === undefined ||
      retnPrice === null
    ) {
      return "0.0";
    }

    let currency = "";
    let dPrice,
      rPrice,
      totalPrice = 0;

    currency = depPrice.substring(0, 3);

    dPrice = Number(depPrice.substring(3));
    rPrice = Number(retnPrice.substring(3));

    totalPrice = Number(dPrice + rPrice);

    return (
      <React.Fragment>
        <span className="curency-code">{currency}:</span>
        <span className="rnde-amount">{` ${totalPrice}`}</span>
      </React.Fragment>
    );
  };

  return (
    <div className="item-sticky">
      <Row className="sticky-part">
        <Col md={8}>
          <Row className="mp-0">
            <Col md={6} className="sl-item">
              <p className="fly-inf">
                Departure |{" "}
                {slectedAir && slectedAir.dep && slectedAir.dep.platingCarrier}{" "}
                |{" "}
                {slectedAir &&
                  slectedAir.dep &&
                  slectedAir.dep.option &&
                  slectedAir.dep.option.flightNums.map((flNo, idx) => {
                    return (
                      <span key={`nm-${idx}`}>
                        {idx > 0 ? `, ${flNo}` : flNo}
                      </span>
                    );
                  })}
              </p>
              <Row>
                <Col md={2} className="icon"></Col>
                <Col md={5} className="rnd-time">
                  <span>
                    {getTimeFormatHr(
                      slectedAir &&
                        slectedAir.dep &&
                        slectedAir.dep.option &&
                        slectedAir.dep.option.departureDateTime
                    )}
                    :
                    {getTimeFormatMin(
                      slectedAir &&
                        slectedAir.dep &&
                        slectedAir.dep.option &&
                        slectedAir.dep.option.departureDateTime
                    )}{" "}
                  </span>
                  <span>
                    <i className="fas fa-arrow-right fa-sm"></i>{" "}
                  </span>
                  <span>
                    {getTimeFormatHr(
                      slectedAir &&
                        slectedAir.dep &&
                        slectedAir.dep.option &&
                        slectedAir.dep.option.arrivalDateTime
                    )}
                    :
                    {getTimeFormatMin(
                      slectedAir &&
                        slectedAir.dep &&
                        slectedAir.dep.option &&
                        slectedAir.dep.option.arrivalDateTime
                    )}
                  </span>
                </Col>
                <Col md={5} className="price">
                  {getPrice(
                    slectedAir &&
                      slectedAir.dep &&
                      slectedAir.dep.eachPrices &&
                      slectedAir.dep.eachPrices.eachTotalPrice
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={6} className="sl-item">
              <p className="fly-inf">
                Return |{" "}
                {slectedAir && slectedAir.ret && slectedAir.ret.platingCarrier}{" "}
                |{" "}
                {slectedAir &&
                  slectedAir.ret &&
                  slectedAir.ret.option &&
                  slectedAir.ret.option.flightNums.map((rflNo, ridx) => {
                    return (
                      <span key={`fl-${ridx}`}>
                        {ridx > 0 ? `, ${rflNo}` : rflNo}
                      </span>
                    );
                  })}
              </p>
              <Row>
                <Col md={2} className="icon"></Col>
                <Col md={5} className="rnd-time">
                  <span>
                    {getTimeFormatHr(
                      slectedAir &&
                        slectedAir.ret &&
                        slectedAir.ret.option &&
                        slectedAir.ret.option.departureDateTime
                    )}
                    :
                    {getTimeFormatMin(
                      slectedAir &&
                        slectedAir.ret &&
                        slectedAir.ret.option &&
                        slectedAir.ret.option.departureDateTime
                    )}{" "}
                  </span>
                  <span>
                    <i className="fas fa-arrow-right fa-sm"></i>{" "}
                  </span>
                  <span>
                    {getTimeFormatHr(
                      slectedAir &&
                        slectedAir.ret &&
                        slectedAir.ret.option &&
                        slectedAir.ret.option.arrivalDateTime
                    )}
                    :
                    {getTimeFormatMin(
                      slectedAir &&
                        slectedAir.ret &&
                        slectedAir.ret.option &&
                        slectedAir.ret.option.arrivalDateTime
                    )}
                  </span>
                </Col>
                <Col md={5} className="price">
                  {getPrice(
                    slectedAir &&
                      slectedAir.ret &&
                      slectedAir.ret.eachPrices &&
                      slectedAir.ret.eachPrices.eachTotalPrice
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="rnd-slc-price">
          <Row className="rnd-price-area">
            <Col md={6}>
              <div className="total-amount">
                {getTotalAirPrice(
                  slectedAir &&
                    slectedAir.dep &&
                    slectedAir.dep.eachPrices &&
                    slectedAir.dep.eachPrices.eachTotalPrice,
                  slectedAir &&
                    slectedAir.ret &&
                    slectedAir.ret.eachPrices &&
                    slectedAir.ret.eachPrices.eachTotalPrice
                )}
              </div>
            </Col>
            <Col md={5}>
              <Button
                className="booking-btn"
                onClick={() => {
                  sendPricingRequest();
                }}
              >
                Book Now
              </Button>
            </Col>
            <Col
              md={1}
              className="mp-0 f-siz2em"
              onClick={(e) => {
                toggleDisplay();
              }}
            >
              <i
                className="fas fa-angle-up"
                style={{
                  transform: `${displayDetails ? "rotateZ(-180deg)" : ""}`,
                  cursor: "pointer",
                }}
              ></i>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        className={`rnd-fly-details ${
          displayDetails === true ? "fly-active" : "fly-inactive"
        }`}
      >
        <Col md={12}>
          <RoundSelectedTab
            selectedAir={slectedAir}
            fareSummary={fareSummary}
            currencyType={params.currencyType}
          />
        </Col>
      </Row>
      <RoundTripPriceOptionModal
        display={displayModal}
        modalAction={(displayStatus) => {
          setDisplayModal(displayStatus);
        }}
      />
    </div>
  );
};

export default StickyCard;
