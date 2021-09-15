import React from "react";
import { Col, Row } from "react-bootstrap";

const PricingBaggageCard = (params) => {

  console.log("PricingBaggageCard Params, ", params);
    const getUnit = (unitParam)=>{
        let unitData ="";
        if(unitParam !== undefined){
            unitData = unitParam.replace("K", " Kgs");
            
            return unitData;
        }
    }


  const getCheckInBaggage = (bagInf) => {
    console.log("Baggage CheckIn: ", bagInf);
    let unit = "";
    if(bagInf !== undefined){
        let bag = bagInf[0];

        if(bag !== undefined){
            unit = bag.textInfo[0];
            
            if(unit !== undefined){
                unit = unit.text;

                unit = unit !== undefined ? unit[0] : null;

                unit = unit !== null ? getUnit(unit) : 0;

                return unit;
            }
        }
    }
  };

  const getCabinBaggage = (baggCabin) => {
    
    console.log("Baggage CheckIn: ", baggCabin);
    let unit = "";
    if(baggCabin !== undefined){
        let bag = baggCabin[0];

        if(bag !== undefined){
            unit = bag.textInfo[0];
            
            if(unit !== undefined){
                unit = unit.text;

                unit = unit !== undefined ? unit[0] : null;

                unit = unit !== null ? getUnit(unit) : 0;

                return unit;
            }
        }
    }
  };

  let {baggageAllowance} = params.baggageAllowance;
  return (
    <React.Fragment>
      <Col md={12} className="pricing-baggage-cnt">
        <Row className="btitle">
          <Col md={2}>Baggage:</Col>
          <Col md={2}>Check in:</Col>
          <Col md={3}>Cabin:</Col>
        </Row>
        {baggageAllowance &&
          baggageAllowance.map((baggage, idx) => {
            let {baggageAllowances } = baggage;
            return (
              <Row>
                <Col md={2}>
                  {baggage.key}
                  {console.log("Each Baggage: ", baggage)}
                </Col>
                <Col md={2}>
                  {getCheckInBaggage(baggageAllowances&&baggageAllowances.baggageAllowanceInfo)}
                </Col>
                <Col md={3}>
                  {getCabinBaggage(baggageAllowances&&baggageAllowances.carryOnAllowanceInfo)}
                </Col>
              </Row>
            );
          })}
      </Col>
    </React.Fragment>
  );
};

export default PricingBaggageCard;
