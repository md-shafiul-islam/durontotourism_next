/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginDropdown from "../../login-signup/LoginDropdown";
import { useSession } from "next-auth/react";
import ContentModal from "../../Modals/ContentModal";
import SignOrLoginContent from "../../authentication/SignOrLoginContent";

const HomePageMenu = (params) => {
  const { status, data } = useSession();
  const [loginModaDisplay, setLoginModaDisplay] = useState(false);
  console.log("User Login Session, ", useSession());
  useEffect(() => {
    //Check DB is login or Not
  }, []);

  const loginDisplayAction = () => {
    console.log("Login Sign In Action ", loginModaDisplay);
    setLoginModaDisplay(true);
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
            <Nav.Item>
              {status === "authenticated" ? (
                <LoginDropdown
                  name={`Hi, ${data && data.user && data.user.fullName}`}
                />
              ) : (
                <span className="signin-item" onClick={loginDisplayAction}>LogIn</span>
              )}
            </Nav.Item>
            <Nav.Item> &nbsp; BD | ENG | BDT</Nav.Item>
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
        <SignOrLoginContent />
      </ContentModal>
    </React.Fragment>
  );
};

export default HomePageMenu;
