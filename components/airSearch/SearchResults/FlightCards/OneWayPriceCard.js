import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const OneWayPriceCard = (params) => {

  console.log("OneWayPriceCard, ", OneWayPriceCard);

  const setBookOption = (priceOption, idx, srIdx) => {
    
    let {
      airItinerary,
      responseMessage,
      transactionId,
      traceId,
      airPriceResult,
    } = params.priceInf;

    let{airPricingSolution} = airPriceResult[srIdx];


    let airSolution = airPricingSolution[idx];

    let selectedData = {
      airItinerary: airItinerary,
      responseMessage: responseMessage,
      transactionId: transactionId,
      traceId: traceId,
      airSolution: airSolution,
    };

   
    params.getSelectedFlight(selectedData);
  };

  const getPriceFormat = (approximateTotalPrice) => {
    if (approximateTotalPrice) {
      let currency,
        amount = "";

      currency = approximateTotalPrice.substring(0, 3);
      amount = approximateTotalPrice.substring(3);

      return `${currency} ${amount}`;
    }
    return " ";
  };

  const getPriceDetailsText = (
    pTexts,
    approximateTotalPrice,
    lbrand,
    eachPrice,
    slIdx,
    srIdx
  ) => {
    let marketingConsumer,
      upsell = "";

    if (pTexts !== undefined) {
      pTexts&&pTexts.map((text, Idx) => {
        if (text.type === "MarketingConsumer") {
          marketingConsumer = text.value;
        }

        if (text.type === "Upsell") {
          upsell = text.value;
        }
      });

      marketingConsumer =
        marketingConsumer !== undefined
          ? marketingConsumer !== null
            ? marketingConsumer.split("•")
            : marketingConsumer
          : marketingConsumer;
      upsell =
        upsell !== undefined
          ? upsell !== null
            ? upsell.split("•")
            : upsell
          : upsell;

      //marketingConsumer.shift();
      //upsell.shift();

      return (
        <React.Fragment>
          <Row>
            <Col md={8}>
              <ul className="price-info-ul">
                {lbrand.name !== null ? (
                  marketingConsumer &&
                  marketingConsumer.map((item, idx) => {
                    if (item !== undefined) {
                      
                      if (item === null || item.length === 0) {
                        
                        return <li>Not Available Fly Details Information</li>;
                      }
                    } else {
                      return <li>Not Available Fly Details Information</li>;
                    }
                    return (
                      <li>
                        {idx === 0 ? "" : <i className="far fa-check-square"></i>}{" "}
                        {item}
                      </li>
                    );
                  })
                ) : (
                  <li>Not Available Fly Details Information</li>
                )}
              </ul>
              <ul className="price-upsell-ul">
                {upsell &&
                  upsell.map((uItem, uIdx) => {
                   
                    if (uItem !== null && uItem.length > 0) {
                      return (
                        <li>
                          <i className="far fa-check-square"></i> {uItem}
                        </li>
                      );
                    }
                  })}
              </ul>
            </Col>
            <Col md={4}>
              <Row className="one-way-price-tag-line">
                <Col md={6}>
                  <p className="one-way-price">
                    {getPriceFormat(approximateTotalPrice)}
                  </p>
                </Col>
                <Col md={6}>
                  <Button
                    onClick={() => {
                      setBookOption(eachPrice, slIdx, srIdx);
                    }}
                  >
                    Book Now
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
    return "From Text Function!!";
  };

 
  return (
    <React.Fragment>
      <Row>
        {params.priceInf &&
          params.priceInf.airPriceResult &&
          params.priceInf.airPriceResult.map((airPrice, apsIdx) => {
            return (
              <React.Fragment>
                {airPrice.airPricingSolution &&
                  airPrice.airPricingSolution.map((priceSolutaion, slIdx) => {
                    let airPriceOne = priceSolutaion.airPricingInfo[0];
                    let {
                      baggageAllowances,
                      approximateTotalPrice,
                      cancelPenalty,
                      changePenalty,
                      fareInfo,
                    } = airPriceOne;
                    let singleFareInf =
                      fareInfo.length > 0 ? fareInfo[0] : undefined;
                    let brand =
                      singleFareInf !== undefined
                        ? singleFareInf.brand
                        : undefined;
                    return (
                      <React.Fragment>
                        <Col md={12} className="price-details-option">
                          {brand !== undefined ? (
                            <React.Fragment>
                              <div className="fly-price-inf">
                                {getPriceDetailsText(
                                  brand&&brand.text,
                                  approximateTotalPrice,
                                  brand,
                                  airPriceOne,
                                  slIdx,
                                  apsIdx
                                )}

                                <ul className="penalty-ul">
                                  
                                  <li>
                                    <i className="far fa-check-square"></i>{" "}
                                    Cancellation fee{" "}
                                    {cancelPenalty[0] !== undefined ? (
                                      cancelPenalty[0] !== null ? (
                                        cancelPenalty[0].amount !== null ? (
                                          <React.Fragment>
                                            {" "}
                                            starting{" "}
                                            <b>
                                              {getPriceFormat(
                                                cancelPenalty[0].amount
                                              )}
                                            </b>
                                          </React.Fragment>
                                        ) : (
                                          " Not Available"
                                        )
                                      ) : (
                                        " Not Available"
                                      )
                                    ) : (
                                      " Not Available"
                                    )}{" "}
                                  </li>
                                  <li>
                                    <i className="far fa-check-square"></i> Date
                                    change fee{" "}
                                    {changePenalty[0] !== undefined ? (
                                      changePenalty[0] !== null ? (
                                        changePenalty[0].amount !== null ? (
                                          <React.Fragment>
                                            {" "}
                                            starting{" "}
                                            <b>
                                              {getPriceFormat(
                                                changePenalty[0].amount
                                              )}
                                            </b>
                                          </React.Fragment>
                                        ) : (
                                          " Not Available"
                                        )
                                      ) : (
                                        " Not Available"
                                      )
                                    ) : (
                                      " Not Available"
                                    )}{" "}
                                  </li>
                                </ul>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </Col>
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

export default OneWayPriceCard;
