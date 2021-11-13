import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import SinglePhoneForm from "../../CstForm/SinglePhoneForm";

/**
 *
 * @param {@ boolean show, @ hideAction Func } params
 * @returns
 */
const AddPhoneNoModal = (params) => {
  console.log("AddPhoneNoModal params, ", params);

  return (
    <React.Fragment>
      <Modal show={params.show} onHide={params.hideAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SinglePhoneForm />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddPhoneNoModal;
