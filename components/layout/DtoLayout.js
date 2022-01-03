/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Meta from "../Meta";
import MainTopNavBar from "./menu/MainTopNavBar";
import { useRouter } from "next/dist/client/router";
import { Container } from "react-bootstrap";
import {
  setJWTToken,
  setCurrentUserUsingToken,
} from "../../redux/actions/jwtTokenAction";
import { localDataStore } from "../../utils/helper/localDataStore";
import { useSession } from "next-auth/react";
import { setAxiosHeaderToken } from "../../redux/esRequestAction";

const DtoLayout = (params) => {
  const route = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setJWTToken(data.accessToken);
      setAxiosHeaderToken(data);
    }
  }, [status]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.asPath]);

  return (
    <React.Fragment>
      <Meta />
      {isTopMenuExist ? (
        <MainTopNavBar />
      ) : (
        console.log("Top Menu Not Visible !!")
      )}
      <Container fluid className={bgClass}>
        <div className="main-parent-container">{params.children}</div>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
};

DtoLayout.prototype = {
  login: PropTypes.object.isRequired,
  setJWTToken: PropTypes.func.isRequired,
  setCurrentUserUsingToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    login: state.login.loginResp,
    loginUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, { setCurrentUserUsingToken })(
  DtoLayout
);
