import React, { useState } from "react";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import RechargeItem from "./RechargeItem";
import ContentModal from "../../Modals/ContentModal";
import ViewBnakAccountDetails from "./ViewBnakAccountDetails";

const banksItems = [
  {publicId:"84984988155", name: "Prime Bank", logoUrl:`/banks_logos/1.png`},
  {publicId:"441888814848", name: "Bank Asia", logoUrl:`/banks_logos/2.jpg`},
  {publicId:"498484848484", name: "Dutch Bangla Bank", logoUrl:`/banks_logos/3.png`},
  {publicId:"7491984745495", name: "Eastern Bank Ltd", logoUrl:`/banks_logos/4.png`},
  {publicId:"941848418448", name: "Standard Chartered", logoUrl:`/banks_logos/5.png`},
  {publicId:"4911618442529", name: "BRAC Bank Limited", logoUrl:`/banks_logos/6.png`},
  {publicId:"19849111894884", name: "United Commercial Bank Ltd", logoUrl:`/banks_logos/7.svg`},
  {publicId:"1984918448259", name: "AB Bank", logoUrl:`/banks_logos/8.svg`},
  {publicId:"9481648484933", name: "One Bank Limited", logoUrl:`/banks_logos/5.png`},
  {publicId:"4816184254184", name: "The City Bank", logoUrl:`/banks_logos/3.png`}
]

const RechargeItems = (params) => {
  const [bankAccount, setBankAccount] = useState(undefined);
  const [displayModal, setDisplayModal] = useState(false);

  console.log("Recharge Items, ", params);
  const { keyName, bankAccounts } = params;

  const viewBankDetailsWindow = () => {
    console.log("Bank Popup Action :) ");
    setDisplayModal(true);
  };

  return (
    <React.Fragment>
      <Row className="bank-image-area">
        {bankAccounts &&
          bankAccounts.map((bankAccount, idx) => {
            return (
              <React.Fragment key={`bank-inf-${keyName}-${idx}`}>
                <RechargeItem
                  location={`/banks_logos/${idx + 1}.png`}
                  altTag="Bank Logo"
                  height={500}
                  width={500}
                  detailAction={(accountInf) => {
                    viewBankDetailsWindow();
                    setBankAccount(bankAccount)
                  }}
                />
              </React.Fragment>
            );
          })}
        
      </Row>
      <Row>
        <ContentModal
          show={displayModal}
          actionClose={(isClose) => {
            setDisplayModal(isClose);
          }}          
        >
          <ViewBnakAccountDetails bankAccount={bankAccount} />
        </ContentModal>
      </Row>
    </React.Fragment>
  );
};

export default RechargeItems;
