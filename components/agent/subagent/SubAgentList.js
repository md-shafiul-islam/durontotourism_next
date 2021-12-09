/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Table, Button } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getSubAgentAction } from "../../../redux/actions/agentAction";
import { esGetDateFormat } from "../../../utils/helper/esDateFunc";
import { helperIsEmpty } from "../../../utils/helper/helperAction";

const SubAgentList = (params) => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    if (!helperIsEmpty(params.subAgents)) {
      if (params.subAgents.length === 0) {
        params.getSubAgentAction();
      }
    } else {
      params.getSubAgentAction();
    }
  }, [params.subAgents]);

  const actionUpdate = (id, acStatus) => {
    console.log("Sub agent Current Action, ", id, " Status, ", acStatus);
  };
  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            {/* <th>Agent ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {params.subAgents &&
            params.subAgents.map((item, idx) => {
              return (
                <React.Fragment key={`subagent-${idx}`}>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{esGetDateFormat(item.date)}</td>

                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.code} {item.phone}
                    </td>
                    <td>{item.active ? "Active" : "Deactive"}</td>
                    <td>
                      <Button
                        onClick={() => {
                          actionUpdate(item.id, !item.active);
                        }}
                      >
                        {!item.active ? "Active" : "Deactive"}
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

SubAgentList.prototype = {
  getSubAgentAction: PropTypes.func.isRequired,
  subAgents: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    subAgents: state.agent.subAgents,
  };
};

export default connect(mapStateToProps, { getSubAgentAction })(SubAgentList);
