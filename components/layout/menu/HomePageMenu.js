/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginDropdown from "../../login-signup/LoginDropdown";
import { useSession } from "next-auth/react";
import ContentModal from "../../Modals/ContentModal";
import SignOrLoginContent from "../../authentication/SignOrLoginContent";
import { setAxiosHeaderToken } from "../../../redux/esRequestAction";

const HomePageMenu = (params) => {
  const { status, data } = useSession();
  console.log("User Session Status, ", status, " Data, ", data);
  setAxiosHeaderToken(data);
  const [loginModaDisplay, setLoginModaDisplay] = useState(false);
  // console.log("User Login Session, ", useSession());
  useEffect(() => {
    //Check DB is login or Not
  }, []);

  const loginDisplayAction = () => {
    console.log("Login Sign In Action ", loginModaDisplay);
    setLoginModaDisplay(true);
  };

  const getCountryFlag = () => {
    return (
      <React.Fragment>
        <span className="country-row">
          <span className="flag">
            <span
              className={`flag-icon flag-icon-${
                data &&
                data.user &&
                data.user.country &&
                data.user.country.toLowerCase()
              } `}
            ></span>
          </span>
          <span> {data && data.user && data.user.country} </span>
        </span>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" className="home-top-menu">
        <Navbar.Brand className="brand-area">
          <Link href="/">
            <a>
              <Image
                src="/assets/images/logo/dto.svg"
                width={450}
                height={450}
                alt="Duronto Tourism"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">&nbsp;</Nav>
          <Nav className="top-nav-right">
            <Nav.Item className="text_rcnt">
              {status === "authenticated" ? (
                <LoginDropdown
                  name={`Hi, ${data && data.user && data.user.fullName}`}
                />
              ) : (
                <span
                  className="signin-item text_r"
                  onClick={loginDisplayAction}
                >
                  LogIn
                </span>
              )}
            </Nav.Item>
            <Nav.Item className="text_rcnt">
              <span className="text_r">{getCountryFlag()} | ENG | BDT</span>{" "}
              &nbsp;{" "}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ContentModal
        title="User Login Or Sign In"
        name="loginor-signin"
        show={loginModaDisplay}
        actionClose={(isClose) => {
          setLoginModaDisplay(isClose);
        }}
      >
        <SignOrLoginContent
          closeAction={(isClose) => {
            setLoginModaDisplay(isClose);
          }}
        />
      </ContentModal>
    </React.Fragment>
  );
};

export default HomePageMenu;
