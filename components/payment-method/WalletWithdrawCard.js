import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSession } from "next-auth/react";

const WalletWithdrawCard = ({
  withdraw = { errorStatus: false, status: false, data: undefined },
  ...props
}) => {
  const { data, errorStatus, status } = withdraw;

  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      props.getWalletWithdraws();
    }
  }, [session.status]);

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Amount</th>
            <th>Refference Note</th>
            <th>Type</th>
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
                  <td>{item.genId}</td>
                  <td>{item.amount}</td>
                  <td>{item.refferenceNote}</td>
                  <td>{item.withdrawType}</td>
                  <td>{item.approveNote}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default WalletWithdrawCard;
