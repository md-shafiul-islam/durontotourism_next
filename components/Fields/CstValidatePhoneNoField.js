import { Field } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { esIsFieldError } from "../../utils/helper/helperAction";
import CstSelectValidateField from "./CstSelectValidateField";

const CstValidatePhoneNoField = ({
  codeName,
  fileldName,
  options,
  errors,
  touched,
  handleChange,
  handleBlur,
  setTouched,
  setFieldValue,
  codePlaceholder,
  filedPlaceholder
}) => {
  return (
    <React.Fragment>
      <Row className="cstf-phone">
        <Col md={3} className="cstf-select-opt">
          <CstSelectValidateField
            arrowStatus={false}
            isSmall={true}
            blurHandler={() => {
              setTouched(fileldName, true);
            }}
            clazzName={esIsFieldError(errors, touched, fileldName).cls}
            name={codeName}
            placeholder={codePlaceholder}
            options={options}
            onChange={(item) => {
              setFieldValue(codeName, item && item.value);
            }}
          />
        </Col>
        <Col md={9} className="cstf-text">
          <Field
            placeholder={filedPlaceholder}
            name={fileldName}
            onChange={handleChange}
            onBlur={handleBlur}
            id={fileldName}
            className={`form-control ${
              esIsFieldError(errors, touched, fileldName).cls
            }`}
          />
          <div className="invalid-feedback">
            {esIsFieldError(errors, touched, fileldName).msg}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstValidatePhoneNoField;
