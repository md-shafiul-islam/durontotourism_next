import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getWalletRechargeRequest } from "../../redux/actions/rechargeAction";
import { useSession } from "next-auth/react";
import { Table } from "react-bootstrap";

const RechargeRequestList = (params) => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      params.getWalletRechargeRequest();
    }
  }, [status]);

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>SL.</th>
            <th>Bank Name</th>
            <th>Account No.</th>
            <th>Transaction Type</th>
            <th>Transaction ID</th>
            <th>Refference No</th>
            <th>Amount</th>
            <th>Request Status</th>
            <th>Rejected Note</th>
          </tr>
        </thead>
        <tbody>
          {params.recharges &&
            params.recharges.map((item, idx) => {
              return (
                <tr key={`recharge-item-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{item.bankAccount && item.bankAccount.bankName}</td>
                  <td>{item.bankAccount && item.bankAccount.accountNumber}</td>

                  <td>{item.transType}</td>

                  <td>{item.transectionId}</td>
                  <td>{item.refferenceNote}</td>

                  <td>{item.amount}</td>
                  <td>
                    {item.paymentStatus && item.paymentStatus.name
                      ? item.paymentStatus.name
                      : item.approveStatus === 0
                      ? "Pending"
                      : item.approveStatus === 1
                      ? "Approved"
                      : item.approveStatus === 2
                      ? "Reject"
                      : "Pending"}
                  </td>

                  <td>{item.rejectedNote}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

RechargeRequestList.prototypes = {
  getWalletRechargeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { getWalletRechargeRequest })(
  RechargeRequestList
);
