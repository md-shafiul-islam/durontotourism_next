import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import BasiInfoInputModal from "../Modals/Profile/basiInfoInputModal";

const ProfileBasicInfo = (props) => {
  const customer = useSelector((state) => {
    return (
      state.customer &&
      state.customer.customerInf &&
      state.customer.customerInf.customer
    );
  }, shallowEqual);

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-primary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">{props.title}</div>
                  <p className="pfl-basi-tag">{props.tagLine}</p>
                </div>
                <div className="edt-btn-area">
                  {/* <button className="edt-btn" onClick={editProfileAction}>Edit</button> */}
                </div>
              </Col>
            </Row>
          </div>
          <div className="pfl-gen-table-paren mt-5">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td colSpan="3">
                    {customer && customer.firstName}&nbsp;
                    {customer && customer.lastName}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td colSpan="3">{customer && customer.phoneNo}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td colSpan="3">{customer && customer.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ProfileBasicInfo;
