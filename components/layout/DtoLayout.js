import React from "react";
import { Container } from "react-bootstrap";
import DtoTopMenu from "./menu/DtoTopMenu";
import Meta from "../Meta";

const DtoLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Meta />
      <DtoTopMenu />
      <Container fluid>{children}</Container>
    </React.Fragment>
  );
};

export default DtoLayout;
