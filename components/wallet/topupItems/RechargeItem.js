import React from "react";
import Image from "next/image";
import { Col } from "react-bootstrap";

const RechargeItem = (params) => {
  return (
    <Col md={2} onClick={params.detailAction}>
      <div className="bank-log shadow ">
        <Image
          src={params.location}
          alt={params.altTag}
          width={params.width}
          height={params.height}
          //   layout="fill"
          objectFit="fill"
        />
      </div>
    </Col>
  );
};

export default RechargeItem;
