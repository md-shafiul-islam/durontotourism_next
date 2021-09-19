import React from "react";
import { Col, Row, Table } from "react-bootstrap";

const ViewBnakAccountDetails = (props) => {
  console.log("Bank Account Details View, ", props);

  let { bankAccount } = props;
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Account Name</th>
                <td>{bankAccount.accountName}</td>
              </tr>
              <tr>
                <th>Account Number</th>
                <td>{bankAccount.accountNumber}</td>
              </tr>

              <tr>
                <th>Bank Name</th>
                <td>{bankAccount.bankName}</td>
              </tr>

              <tr>
                <th>Branch Name</th>
                <td>{bankAccount.branchName}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ViewBnakAccountDetails;
