import React from "react";
import { Card } from "react-bootstrap";

const WalletCard = ({amount}) =>{
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2>{amount ? amount : 0.00}</h2>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default WalletCard;
