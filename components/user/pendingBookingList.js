import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import BookingSummeryPlaceholder from './bookingSummeryPlaceholder'

class PendingBookingList extends Component {
    render() {
        return (
            <React.Fragment>
                <Card className="bsp-mh">
                    <Card.Body>
                        <BookingSummeryPlaceholder />
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }
}

export default PendingBookingList;
