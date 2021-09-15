import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { GET_PASSENGER } from "../../../redux/types";
import { helperGetMltyplyTwoNumber } from "../../../utils/helper/helperAction";

/**
 * airPriceList Data Structure
 * [
  {
    "key": "ADT",
    "basePrice": 22549,
    "tax": 2605,
    "totalPrice": 25154,
    "passengerQty": 2,
    "currency": "BDT"
  },
  {
    "key": "CNN",
    "basePrice": 22549,
    "tax": 2605,
    "totalPrice": 25154,
    "passengerQty": 2,
    "currency": "BDT"
  },
  {
    "key": "INF",
    "basePrice": 4618,
    "tax": 748,
    "totalPrice": 5366,
    "passengerQty": 2,
    "currency": "BDT"
  }
]
 */
/**
 * @Array airPriceList All Air Price witth key &  Passenger Qty,
 * @param {airPriceList} params
 */
const FareSummaryUsingPriceList = (params = [
  {
    key: "",
    basePrice:0,
    tax: 0,
    totalPrice: 0,
    passengerQty: 2,
    currency: "BDT"
  }]) => {

  console.log("FareSummaryUsingPriceList, ", params);

  const [priceStstus, setPriceStstus] = useState(false);
  const [taxStatus, setTaxStatus] = useState(false);


  /* ES Functions Start */

  const getPassengerByCode = (pCode) => {
    let passengers = GET_PASSENGER;
    let selectedPassenger = "";

    if (passengers !== undefined) {
      passengers.map((paseenger, iDx) => {
        if (paseenger.key === pCode) {
          selectedPassenger = paseenger.value;
        }
      });
    }

    return selectedPassenger;
  };

  const toggolePriceOptions = () => {
    setPriceStstus(!priceStstus);
  };

  const toggleTaxOptons = () => {
    setTaxStatus(!taxStatus);
  };

  // ES Functions End

  let { currencyType, eachPrices, equBasePrice, taxes, totalPrice } = params && params.airPriceList;
  return (
    <React.Fragment>
      <Card className="fare-sum-card">
        <Row>
          <Col md={12} className="fare-sum-price">
            <ul className="list-area">
              <li className="first-item">
                <p
                  className="far-title"
                  onClick={() => {
                    toggolePriceOptions();
                  }}
                >
                  {priceStstus === false ? (
                    <i className="far fa-plus-square"></i>
                  ) : (
                    <i className="far fa-minus-square"></i>
                  )}{" "}
                  Base Price{" "}
                  <span className="fare-amount">
                    {priceStstus === false
                      ? `${currencyType}: ${equBasePrice}`
                      : ""}
                  </span>
                </p>
                <ul
                  className="price-list"
                  style={{
                    display: `${priceStstus === true ? "block" : "none"}`,
                  }}
                >
                  {eachPrices &&
                    eachPrices.map((priceItem, pIdx) => {
                      return (
                        <li key={`fprice-${pIdx}`}>
                          <span className="fare-amount-label">
                            {priceItem.passengerQty > 1
                              ? `${getPassengerByCode(priceItem.key)}'(s) (${priceItem.passengerQty
                              } X ${priceItem.eqBasePrice}): `
                              : `${getPassengerByCode(priceItem.key)} (${priceItem.passengerQty
                              } X ${priceItem.eqBasePrice}): `}
                          </span>
                          <span className="fare-amount">
                            {`${currencyType}: ${helperGetMltyplyTwoNumber(priceItem.passengerQty, priceItem.eqBasePrice)}`}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li className="first-item">
                <p
                  className="far-title"
                  onClick={() => {
                    toggleTaxOptons();
                  }}
                >
                  {taxStatus === false ? (
                    <i className="far fa-plus-square"></i>
                  ) : (
                    <i className="far fa-minus-square"></i>
                  )}{" "}
                  Fee & Taxes{" "}
                  <span className="fare-amount">
                    {taxStatus === false
                      ? `${currencyType}: ${taxes}`
                      : ""}
                  </span>
                </p>

                <ul
                  className="fess-tax-list"
                  style={{
                    display: `${taxStatus === true ? "block" : "none"}`,
                  }}
                >
                  <li>
                    <span>Total Fess & Surcharges: </span>
                    <span className="fare-amount">
                      {`${currencyType}: ${taxes}`}
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <p className="first-item">Other</p>
              </li>
            </ul>
            <p className="fare-total-amount">
              Total Amount:{" "}
              <span className="fare-amount">
                {`${currencyType} ${totalPrice}`}
              </span>
            </p>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default FareSummaryUsingPriceList;
