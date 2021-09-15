import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { el } from "date-fns/locale";
import AirDetailsAccordian from "../AirDetailsAccordian";
import SelectedTab from "../SelectedTab";
import { getDate } from "date-fns";

const ShortInfCard = (params) => {
  const getPriceFormat = (price) => {
    if (price === null && price === undefined) {
      return "0.0";
    } else {
      let stPrice = price.substring(3);
      let type = price.substring(0, 3);

      return `${type}: ${stPrice}`;
    }
  };

  const getDateFormat = (pDate) => {
    if (pDate !== undefined) {
      pDate = new Date(pDate);
      if (
        isNaN(pDate.getDate()) ||
        isNaN(pDate.getMonth()) ||
        isNaN(pDate.getFullYear())
      ) {
        return "";
      } else {
        let day =
          pDate.getDate() < 10 ? `0${pDate.getDate()}` : pDate.getDate();
        let mnt =
          pDate.getMonth() < 9
            ? `0${pDate.getMonth() + 1}`
            : pDate.getMonth() + 1;

        return `${day}/${mnt}/${pDate.getFullYear()}`;
      }
    }
    return "";
  };

  return (
    <Col
      md={12}
      key={`short-${params.elementKey}`}
      className={`card-details ${
        params.preSetOption.elmKey === params.elementKey ? "active" : ""
      }`}
    >
      <Row>
        <Col md={12} className="mp-0">
          <Card className="air-option-item">
            <Card.Body>
              {console.log("Params SC ", params)}
              {params.availableFlight.fareInfos &&
                params.availableFlight.fareInfos.map((fareItem, fIdx) => {
                  return (
                    <React.Fragment key={`str-fly-${fIdx}`}>
                      {fIdx >= 1 ? (
                        <Row>
                          <Col md={12}>
                            <hr />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      <Row>
                        {/** Image As BG */}
                        <Col md={3}>
                          {params.availableFlight &&
                            params.availableFlight.airPricingInfo &&
                            params.availableFlight.airPricingInfo
                              .platingCarrier}
                        </Col>

                        <Col md={3}>
                          <span className="fly-location">
                            {fareItem.origin}
                          </span>
                          <span className="fly-location">
                            {fareItem.destination}
                          </span>
                        </Col>
                        <Col md={3}>
                          {getDateFormat(fareItem.departureDate)}
                        </Col>
                        <Col md={3}>{fareItem.amount}</Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="air-accordian">
        <AirDetailsAccordian>
          <SelectedTab
            availavleFlight={params.availableFlight}
            legs={params.legs}
            brands={params.brands}
            elmKey={params.elementKey}
            getSelectedOption={(item, ids) => {
              params.getSelectedFlyOption(item, ids);
            }}
            preSetOption={params.preSetOption}
            removeFlyOptionAction={params.removeFlyOptionAction}
          />
        </AirDetailsAccordian>
      </Row>
      {/* /.info-box */}
    </Col>
  );
};

export default ShortInfCard;
