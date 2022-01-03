/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Table } from "react-bootstrap";
import { esGetDateFormat } from "../../utils/helper/esDateFunc";
const WalletDetailsCard = ({
  details = { errorStatus: false, status: false, data: undefined },
  ...props
}) => {
  const { data, errorStatus, status } = details;

  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      props.getAllWalletFlow();
    }
  }, [session.status]);

  console.log("WalletDetailsCard, params ", data);

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>SL.</th>
            <th>Date</th>
            <th>Transaction Type</th>
            <th>Transaction ID.</th>
            <th>Transaction Date.</th>
            <th>Debit.</th>
            <th>Credit.</th>
            <th>Balance.</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {!errorStatus &&
            status &&
            data &&
            data.map((item, idx) => {
              return (
                <tr key={`recharge-item-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{esGetDateFormat(item.date)}</td>
                  <td>Transaction Type</td>
                  <td>Transaction ID.</td>
                  <td>{esGetDateFormat(item.date)}</td>
                  <td>{item.recive ? item.amount : ""}</td>
                  <td>{item.pay ? item.amount : ""}</td>
                  <td>{item.totalBalance}</td>
                  <td>{item.note}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default WalletDetailsCard;
