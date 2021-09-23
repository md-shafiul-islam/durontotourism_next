import React from "react";
import { Table } from "react-bootstrap";

const SubAgentList = (params) => {
  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Agent ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12-09-2021</td>
            <td>Agent ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Active/Deactive</td>
            <td>Button</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default SubAgentList;
