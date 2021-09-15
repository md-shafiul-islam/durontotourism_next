import { Radio } from "@material-ui/core";
import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";
import { helperGetPrice } from "../../../redux/actions/helperAction";

const PricingFareTypeTitile = (params) => {
  const [select, setSelect] = useState(false);

  const toggleOption = (cId)=>{}

  return (
    <React.Fragment>
      <Row>
       
        <Col md={7} className="pricing-faretype-title">
          <span className="price-sl-btn" onClick={()=>{params.setSelectedItem(params.cElmId)}}>{ params.selectedAirElm === params.cElmId  ? <i className="far fa-dot-circle"></i> : <i className="far fa-circle"></i>}</span>
        
          <span>{params.brandName}</span>
          {console.log(" Brand Name: ", params.brandName)}
          {console.log(" params.priceInfs: ", params.priceInfs)}
        </Col>
        <Col md={5} className="pricing-faretype-price">{helperGetPrice(params.priceInfs&&params.priceInfs.totalPrice)}</Col>
        <Col md={12} className="price-fare-tag"><span>Fare Offer by airline</span></Col>
      </Row>
      
    </React.Fragment>
  );
};

export default PricingFareTypeTitile;
