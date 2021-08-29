import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DtoTopMenu from "./menu/DtoTopMenu";
import Meta from "../Meta";
import MainTopNavBar from "./menu/MainTopNavBar";
import { useRouter } from "next/dist/client/router";

const DtoLayout = ({ children }) => {
  const route = useRouter();

  const [bgClass, setBgClass] = useState("hero-bg"); //
  const [isTopMenuExist, setIsTopMenuExist] = useState(false);

  useEffect(() => {
    if (route.asPath) {
      if (route.asPath === "/payment") {
        setBgClass("payment-bg");
        setIsTopMenuExist(false);
        console.log("If Menu Exist, ", isTopMenuExist);
      } else {
        setIsTopMenuExist(true);
        console.log("Else Menu Exist, ", isTopMenuExist);
      }
    }
  }, [route.asPath]);

  return (
    <React.Fragment>
      <Meta />
      {isTopMenuExist ? <MainTopNavBar /> : console.log("Top Menu Not Visible !!")}
      <Container fluid className={bgClass}>
        {children}
      </Container>
    </React.Fragment>
  );
};

export default DtoLayout;
