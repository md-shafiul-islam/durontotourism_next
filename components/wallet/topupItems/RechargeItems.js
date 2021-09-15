import React from "react";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import RechargeItem from "./RechargeItem";
import ContentModal from "../../Modals/ContentModal";

const RechargeItems = (params) => {
  const viewBankDetailsWindow = (props) => {};

  return (
    <React.Fragment>
      <Row className="bank-image-area">
        <RechargeItem
          location="/banks_logos/3.png"
          altTag="Bank Logo"
          height={500}
          width={500}
          detailAction={(accountInf) => {
            viewBankDetailsWindow(accountInf);
          }}
        />

        <Col md={2}>
          <div className="bank-log shadow ">
            <Image
              src="/banks_logos/2.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <Col md={2}>
          <div className="bank-log shadow ">
            <Image
              src="/banks_logos/3.png"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <Col md={2}>
          <div className="bank-log shadow ">
            <Image
              src="/banks_logos/4.png"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <Col md={2}>
          <div className="bank-log shadow ">
            <Image
              src="/banks_logos/5.png"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <Col md={2}>
          <div className="bank-log shadow ">
            <Image
              src="/banks_logos/6.png"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <Col md={2}>
          <div className="bank-log shadow ">
            <Image
              src="/banks_logos/7.svg"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <Col md={2}>
          <div className="bank-log shadow">
            <Image
              src="/banks_logos/8.svg"
              alt="Picture of the author"
              width={500}
              height={500}
              //   layout="fill"
              objectFit="fill"
            />
          </div>
        </Col>

        <ContentModal>Content Window Here...</ContentModal>
      </Row>
    </React.Fragment>
  );
};

export default RechargeItems;
