import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    helperGetTimeFormatMin,
    helperGetTimeFormatHr,
    helperGetFullDateFormat,
  } from "../../redux/actions/helperAction";
import IconView from "../airSearch/iconView";
import { helperIsEmpty } from "../../utils/helper/helperAction";

const BookingFlightDetails = (props) =>{
    
    console.log("BookingFlightDetail props, ", props);
 
    const getAirLinceNames = (carriers)=>{
      console.log("Get Air Linces ", carriers);
        if(carriers){
            return (
                <React.Fragment>
                    {carriers&&carriers.map((carrier, idx)=>{
                        return <span key={`carrbyc-${idx}`}>{carrier&&props.airLinces&&props.airLinces[carrier]&&props.airLinces[carrier].name}</span>
                    })}
                </React.Fragment>
            )
        }

        return `Not Set yet !`;
    }
  return (
    <React.Fragment>
      <Row className="fly-time-inf txt-al-c one-way">
        <Col md={3}>
            <div className="air-inf">
                <div className="icon-area">
                <IconView selectedAirs={props.segment.carriers}  airlinseList={props.airLinces}/>
                    
                </div>
                <div className="air-name">
                    {getAirLinceNames(props.segment.carriers)}
                </div>
            </div>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={12} className="fly-hour">
              {`${helperGetTimeFormatHr(
                props.segment.fstDepTime
              )}:${helperGetTimeFormatMin(props.segment.fstDepTime)}`}
            </Col>
            <Col md={12}>
              {helperGetFullDateFormat(props.segment.fstDepTime)}
            </Col>
          </Row>
        </Col>
        <Col md={3} className="travel-time-each">
          <span className="tt-each">
            {props.segment.totalFlyTime}
          </span>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={12} className="fly-hour">
              {`${helperGetTimeFormatHr(
                props.segment.lastArrivalTime
              )}:${helperGetTimeFormatMin(props.segment.lastArrivalTime)}`}
            </Col>
            <Col md={12}>
              {helperGetFullDateFormat(props.segment.lastArrivalTime)}
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default BookingFlightDetails;