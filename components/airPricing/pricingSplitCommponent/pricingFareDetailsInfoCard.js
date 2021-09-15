import {Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PricingDetailsOptionCard from "./pricingDetailsOptionCard";


const PricingFareDetailsInfoCard = (params) => {
  
  // console.log("PricingFareDetailsInfoCard params, ", params);

  const [retAirSegmentDe, setRetAirSegmentDe] = useState({});
  const [depAirSegmentDe, setDepAirSegmentDe] = useState({});

  const [selectedPriceOptions, setSelectedPriceOptions] = useState(new Map());

  const setAirPriceOptions =(key, airOpt)=>{
    
    if(airOpt !== undefined){
      selectedPriceOptions.set(key, airOpt);
    }
  }

  const setFlightOptions = (airOption, key, segment)=>{
    
    let airPringSelected = {airPriceOpt:airOption, segment:segment};

    setAirPriceOptions(key, airPringSelected);
  };

  const pricingDetailsAction = ()=>{
    
    if(selectedPriceOptions.size === 2){
      params.selectedPriceAction(selectedPriceOptions);
    }
  }

  useEffect(() => {
    if (
      params.depAirSegment !== undefined &&
      params.retAirSegment !== undefined
    ) {
      let depLenght = params.depAirSegment&&params.depAirSegment.length;
      let retLenght = params.retAirSegment&&params.retAirSegment.length;

      let detureSegmentsDetails = {
        airLine: [],
        flightNo: [],
        origin: "",
        destination: "",
        deptureDate: "",
        layover: [],
      };
      let returnSegmentsDetails = {
        airLine: [],
        flightNo: [],
        origin: "",
        destination: "",
        deptureDate: "",
        layover: [],
      };

      let depAirlines = new Array();
      let depflightNos = new Array();
      let depLayovers = new Array();

      let retAirlines = new Array();
      let retflightNos = new Array();
      let retLayovers = new Array();

      let dLastIdx = 0;
      let rLastIdx = 0;

      if (depLenght > 1) {
        params.depAirSegment.map((depSegItem, dIdx) => {
          if (dIdx === 0) {
            detureSegmentsDetails.origin = depSegItem.origin;
            detureSegmentsDetails.deptureDate = depSegItem.departureTime;
            depAirlines.push(depSegItem.carrier);
            depflightNos.push({
              name: depSegItem.carrier,
              num: depSegItem.flightNumber,
            });
            dLastIdx = dIdx;
          } else {
            if (dIdx === depLenght - 1) {
              detureSegmentsDetails.destination = depSegItem.destination;
              depLayovers.push(depSegItem.origin);

              depflightNos.push({
                name: depSegItem.carrier,
                num: depSegItem.flightNumber,
              });

              if (depSegItem.carrier === depAirlines[dLastIdx]) {
              } else {
                depAirlines.push(depSegItem.carrier);
              }
            } else {
              depLayovers.push(depSegItem.origin);
            }
          }
        });

        detureSegmentsDetails.flightNo = depflightNos;
        detureSegmentsDetails.airLine = depAirlines;
        detureSegmentsDetails.layover = depLayovers;
      } else {
        params.depAirSegment&&params.depAirSegment.map((depSegItem, dIdx) => {
          if (depLenght === dIdx) {
            detureSegmentsDetails.deptureDate = depSegItem.departureTime;

            detureSegmentsDetails.origin = depSegItem.origin;
            detureSegmentsDetails.destination = depSegItem.destination;
            detureSegmentsDetails.flightNo = new Array({
              name: depSegItem.carrier,
              num: depSegItem.flightNumber,
            });
            detureSegmentsDetails.airLine = new Array(depSegItem.carrier);
            detureSegmentsDetails.layover = new Array();
          }
        });
      }

      setDepAirSegmentDe(detureSegmentsDetails);

      if (retLenght > 1) {
        params.retAirSegment&&params.retAirSegment.map((retSegItem, rIdx) => {
          if (rIdx === 0) {
            returnSegmentsDetails.origin = retSegItem.origin;
            returnSegmentsDetails.deptureDate = retSegItem.departureTime;
            retAirlines.push(retSegItem.carrier);
            retflightNos.push({
              name: retSegItem.carrier,
              num: retSegItem.flightNumber,
            });
            rLastIdx = rIdx;
          } else {
            if (rIdx === retLenght - 1) {
              returnSegmentsDetails.destination = retSegItem.destination;
              retLayovers.push(retSegItem.origin);

              retflightNos.push({
                name: retSegItem.carrier,
                num: retSegItem.flightNumber,
              });

              if (retSegItem.carrier === retAirlines[rLastIdx]) {
              } else {
                retAirlines.push(retSegItem.carrier);
              }
            } else {
              retLayovers.push(retSegItem.origin);
            }
          }
        });

        returnSegmentsDetails.flightNo = retflightNos;
        returnSegmentsDetails.airLine = retAirlines;
        returnSegmentsDetails.layover = retLayovers;
      } else {
        params.retAirSegment&&params.retAirSegment.map((retSegItem, rIdx) => {
          if (retLenght === rIdx) {
            returnSegmentsDetails.deptureDate = retSegItem.departureTime;

            returnSegmentsDetails.origin = retSegItem.origin;
            returnSegmentsDetails.destination = retSegItem.destination;
            returnSegmentsDetails.flightNo = new Array({
              name: retSegItem.carrier,
              num: retSegItem.flightNumber,
            });
            returnSegmentsDetails.airLine = new Array(retSegItem.carrier);
            returnSegmentsDetails.layover = new Array();
          }
        });
      }

      setRetAirSegmentDe(returnSegmentsDetails);
    }
  }, []);
  
  return (
    <React.Fragment>
      <PricingDetailsOptionCard 
        airSegment={depAirSegmentDe}
        airPorts={params.airPorts}
        airLines={params.airLines}
        airSolutions={params.deptureOption&&params.deptureOption[0]&&params.deptureOption[0].airPricingSolution}
        title={"Depture"}
        setFlightOption={(airOption)=>{
          setFlightOptions(airOption, "detureItem", params.depAirSegment);
        }}
      />
      
      <PricingDetailsOptionCard 
        airSegment={retAirSegmentDe}
        airPorts={params.airPorts}
        airLines={params.airLines}
        airSolutions={params.returnOption&&params.returnOption[0]&&params.returnOption[0].airPricingSolution}
        title={"Return"}
        setFlightOption={(airOption)=>{
          setFlightOptions(airOption, "returnItem", params.retAirSegment);
        }}
      />
      
      <Row>
        <Col md={{ span: 2, offset: 10 }}>
          {/* <Button onClick={()=>{pricingDetailsAction()}}>Continue</Button> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PricingFareDetailsInfoCard;
