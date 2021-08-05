import { el } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { helperIsEmpty } from "../../../utils/helper/helperAction";

import PricingFareTypeTitile from "./pricingFareTypeTitile";

const PricingFareTypeCard = (params) => {
  // console.log("PricingFareTypeCard, params ", params);

  const [brand, setBrand] = useState({});
  const [detailsText, setDetailsText] = useState(new Array());
  const [cstDetails, setCstDetails] = useState({
    name: "",
    cancelPenalty: {},
    changePenalty: {},
  });

  const [priceInfs, setPriceInfos] = useState({
    totalPrice: 0,
    eqBasePrice: 0,
    taxes: 0,
    apxTotalPrice: 0,
  });

  useEffect(() => {
    // console.log("PricingFareTypeCard, useEffect ", params.airSolution);

    if (params.airSolution) {
      let lcBrand = null;
      let prices = {
        totalPrice: 0,
        eqBasePrice: 0,
        taxes: 0,
        apxTotalPrice: 0,
      };
      let cstLDetails = {
        name: "",
        cancelPenalty: {},
        changePenalty: {},
        baggageAllowances: {},
      };
      params.airSolution.airPricingInfo &&
        params.airSolution.airPricingInfo.map((priceItem, prcIdx) => {
          console.log(
            "PFTC airSolution.airPricingInfo priceItem, IDX: ",
            prcIdx,
            "Price Inf, ",
            priceItem
          );
          let {
            approximateBasePrice,
            approximateTaxes,
            approximateTotalPrice,
            equivalentBasePrice,
            totalPrice,
            taxes,
            baggageAllowances,
            changePenalty,
            cancelPenalty,
            bookingInfo,
            fareInfo,
            passengerType,
          } = priceItem;

          if (!helperIsEmpty(passengerType)) {
            if (!helperIsEmpty(passengerType[0])) {
              if (passengerType[0].code === "ADT") {
                prices = {
                  totalPrice: totalPrice,
                  eqBasePrice: equivalentBasePrice,
                  taxes: taxes,
                  apxTotalPrice: approximateTotalPrice,
                };

                priceItem.bookingInfo &&
                  priceItem.bookingInfo.map((book, idx) => {
                    cstLDetails.name = book.cabinClass;
                    cstLDetails.cancelPenalty = cancelPenalty;
                    cstLDetails.changePenalty = changePenalty;
                    cstLDetails.baggageAllowances = baggageAllowances;
                  });
              }
            }
          }

          if (fareInfo) {
            fareInfo.map((fareItem, fIdx) => {
              console.log(
                "PriceItem FareInfo, fIdx: ",
                fIdx,
                " Price Inf, ",
                fareItem
              );
              let { brand } = fareItem;

              if (!helperIsEmpty(brand)) {
                let { name, text, title } = brand;

                if (!helperIsEmpty(text)) {
                  lcBrand = brand;
                }
              }
            });
          }
        });

      setBrand(lcBrand);
      initBrandTextTitle(lcBrand);
      setPriceInfos(prices);
      setCstDetails(cstLDetails);
    }
  }, [params.airSolution]);

  const getAirSolutionDetailsList = () => {};
  const initBrandTextTitle = (lcBrand) => {
    if (lcBrand !== undefined && lcBrand !== null) {
      let { text, title } = lcBrand;
      let slTitle = "";
      let sltext = "";

      console.log("init Brand Title, Text, ", title, " : ", text);

      if (
        text !== undefined &&
        text !== null &&
        title !== undefined &&
        title !== null
      ) {
        title.map((tItem, tIdx) => {
          // console.log("Brand Title: ", tItem);
          if (tItem.type === "External") {
            slTitle = tItem.value;
          }
        });

        text.map((textItem, txtIdx) => {
          // console.log("Brand Text: ", textItem);

          if (textItem.type === "MarketingConsumer") {
            sltext = textItem.value;
          }
        });
      }

      if (sltext !== "" && sltext.includes("•")) {
        sltext = sltext.split("•");
        // console.log("IF BLOCK Brand, After Split: ", sltext);
        if (sltext[0].includes("↵↵")) {
          sltext.shift();
          // console.log("Brand Text shift !!");
        }
        // console.log("IF BLOCK Brand, After Shift: ", sltext);

        setDetailsText(sltext);
      } else {
        // console.log("Else BLOCK Brand, ", sltext);

        setDetailsText(sltext);
      }
    }
  };

  const getBrandName = (pBrand) => {
    if (pBrand) {
      return pBrand.name;
    } else {
      return cstDetails && cstDetails.name;
    }
  };

  console.log(
    "Price Fare Type Card: Run Via ",
    params.runVia,
    " Params, ",
    params
  );
  console.log("CST Details: ", cstDetails);
  return (
    <Card className="pricing-card">
      <Card.Title className="price-details-inf-title">
        <PricingFareTypeTitile
          brandName={getBrandName(brand)}
          totalPrice={params.airSolution.totalPrice}
          priceInfs={priceInfs}
          selectedAirElm={params.elemId}
          cElmId={params.cElmId}
          setSelectedItem={(iDx) => {
            params.setImeIdx(iDx, params.airSolution);
          }}
        />
      </Card.Title>

      <Card.Body className="price-details-inf-card">
        <ul className="price-details-inf">
          {console.log("Befor Set Brand Text: ", detailsText)}
          {!helperIsEmpty(detailsText)
            ? detailsText.map((item, tIdx) => {
                return (
                  <li className="rnd-price-fare-inf" key={`icon-${tIdx}`}>
                    {detailsText.length - 1 === tIdx ? (
                      <i className="fas fa-asterisk icon-color"></i>
                    ) : (
                      <i className="far fa-check-circle icon-color"></i>
                    )}
                    &nbsp;{item}
                  </li>
                );
              })
            : getAirSolutionDetailsList()}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default PricingFareTypeCard;
