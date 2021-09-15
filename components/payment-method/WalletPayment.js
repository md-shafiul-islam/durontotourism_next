import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import WalletCard from "./WalletCard";

export default function WalletPayment() {
  const [isAmount, setIsAmount] = useState(true);

  useEffect(() => {
    //TODO: Ceheck into DB
    //Update Is Amount
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="payment-wallet-content">
          <div className="paymet-title">
            <h3>Use your wallet for this booking</h3>
          </div>
          <div className="wallet-info-area">
            <p>WALLET</p>
            {isAmount ? (
              <WalletCard amount={5000} />
            ) : (
              <p>You do not have enough wallet balance to apply.</p>
            )}
          </div>
        </Col>
        <Col md={6}>
          <div className="card-pay-row">
            <p className="pay-text">
              <i className="fas fa-dollar-sign"></i> &nbsp;25498 &nbsp;
              <small className="sm-text">Due Now</small>
            </p>
          </div>
        </Col>
        <Col md={6}>
          <Button className="payment-btn">Pay Now</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
