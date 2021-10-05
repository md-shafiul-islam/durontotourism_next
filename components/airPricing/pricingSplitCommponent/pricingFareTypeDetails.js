import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const PricingFareTypeDetails = (params) => {
  console.log("params.texts: ", params.texts);
  return (
    <Row>
      {params.texts&& params.texts.map((text, idx)=>{
        console.log("Text View : ", text);
        return (<Col md={12} key={`pftdt-${idx}`}>{text}</Col>)
      })}
      
    </Row>
  );
};

export default PricingFareTypeDetails;
