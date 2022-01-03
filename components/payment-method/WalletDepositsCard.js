import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { esGetDateFormat } from "../../utils/helper/esDateFunc";
import { useSession } from "next-auth/react";

const WalletDepositsCard = ({
  deposit = { errorStatus: false, status: false, data: undefined },
  ...props
}) => {
  const { errorStatus,status, data } = deposit;

  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      props.getWalletDeposits();
    }
  }, [session.status]);

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Recharge ID</th>
            <th>Amount</th>
            <th>Refference Note</th>
            <th>Transaction Date</th>
            <th>Date</th>
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
                  <td>{item.recharge && item.recharge.genId}</td>
                  <td>{item.amount}</td>
                  <td>{item.recharge && item.recharge.refferenceNote}</td>
                  <td>
                    {esGetDateFormat(
                      item.recharge && item.recharge.transectionDate
                    )}
                  </td>
                  <td>{esGetDateFormat(item && item.date)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default WalletDepositsCard;
