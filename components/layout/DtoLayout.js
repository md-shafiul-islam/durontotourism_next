import React from "react";
import { Container } from "react-bootstrap";
import DtoTopMenu from "./menu/DtoTopMenu";
import Meta from "../Meta";
import MainTopNavBar from "./menu/MainTopNavBar";

const DtoLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Meta />
      <MainTopNavBar />
      <Container fluid className="hero-bg">{children}</Container>
    </React.Fragment>
  );
};

export default DtoLayout;
