import React, { useState } from "react";
import { Row } from "react-bootstrap";
import CstSplitFieldItems from "./CstSplitFieldItems";

const CstSplitInputField = (props) => {
  const [verifyCode, setVerifyCode] = useState();
  return (
    <React.Fragment>
      <Row>
        <CstSplitFieldItems
          count={props.digits}
          colSize={props.colSize}
          name={props.name}
          getCode={props.changeHandeler}
        />
      </Row>
    </React.Fragment>
  );
};

export default CstSplitInputField;
