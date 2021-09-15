import React from "react";
import { Table } from "react-bootstrap";

const RequestWithDarwList = (params) => {
  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Withdraw Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12-09-2021</td>
            <td>5000</td>
            <td>By Cheque</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>2</td>
            <td>10-08-2021</td>
            <td>15000</td>
            <td>By Online Banking</td>
            <td>Prossesing</td>
          </tr>
          <tr>
            <td>2</td>
            <td>08-08-2021</td>
            <td>8500</td>
            <td>By Mobile Banking</td>
            <td>Complete</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default RequestWithDarwList;
