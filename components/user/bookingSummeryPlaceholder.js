import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CstImageView from '../cstView/CstImageView';

const BookingSummeryPlaceholder = (params) =>{
    return (
        <React.Fragment>
            <Row>
                <Col md={3} >
                    <div className="bsp-icon-area">
                        <CstImageView />
                    </div>
                </Col>
                <Col md={9}>
                    <div className="bsp-title">Looks empty, {`you've`} no upcoming bookings.</div>
                    <div className="bsp-tagline">When you book a trip, you will see your itinerary here.</div>
                    <div className="bsp-action-area">
                        <button >Plan A trip</button>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default BookingSummeryPlaceholder;
