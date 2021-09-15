import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const AirPenaltyOrRuleDetails = (params) => {
  const [penaltyFess, setPenaltyFess] = useState(new Array());

  console.log("AirPenaltyOrRuleDetails", params);
  useEffect(() => {
    // let allFess = new Array();

    // if (params.penaltyList) {
    //   if (params.penaltyList[0]) {
    //     params.penaltyList[0].value.map((penaltyItem, pIdx) => {
    //       allFess.push({ key: penaltyItem.penaltyApplies, value: new Array() });
    //     });
    //   }

    //   params.penaltyList.map((penalty, pIdx) => {
    //     if (penalty.value !== undefined) {
    //       penalty.value.map((item, itemIdx) => {
    //         allFess.map((fessItem, fIdx) => {
    //           if (fessItem.key === item.penaltyApplies) {
    //             fessItem.value.push({ type: penalty.key, plty: item });
    //           }
    //         });
    //       });
    //     }
    //   });

    //   console.log("All Fess: ", allFess);

    //   setPenaltyFess(allFess);
    // }
  }, []);

  const getPenaltyTitle = (item) => {
    if (item !== undefined) {
      if (item.key === "Before Departure") {
        return `0 hours to 24 hours *`;
      } else if (item.key === "Anytime") {
        return `0 housr to 360 days*`;
      } else {
        return item.key;
      }
    }
    return "Not Found";
  };

  const getPenaltyItems = (item) => {
    if (item !== undefined) {
      return item.value.map((penalty, iDx) => {
        return (
          <React.Fragment>
            <span className="penalty-item">{`${penalty.type} : ${getAmount(
              penalty.plty.amount
            )}`}</span>
          </React.Fragment>
        );
      });
    }

    return `Not Found `;
  };

  const getAmount = (amount) => {
    if (amount !== undefined) {
      let currency,
        amnt = "";

      if (amount !== null) {
        if (amount.length > 0) {
          currency = amount.substring(0, 3);
          amnt = amount.substring(3);

          return `${currency} ${amnt}`;
        }
      }
      return `0.0`;
    }
    return `0.0`;
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          {params.penaltyList&&params.penaltyList[0] && (
            <React.Fragment>
            <Row className="penalty-row">
                <Col md={6}><span className=" align-middle">Time Frame</span></Col>
                <Col md={6} className="panelty-cnt">
                  Airline Fee
                </Col>
              </Row>
              {penaltyFess &&
                penaltyFess.map((penalty, pIdx) => {
                  return (
                    <React.Fragment>
                      <Row className="penalty-row">
                        <Col md={6}><span className="penalty-title">{getPenaltyTitle(penalty)}</span></Col>
                        <Col md={6} className="panelty-cnt">
                          {getPenaltyItems(penalty)}
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AirPenaltyOrRuleDetails;
