/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect}from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginDropdown from "../../login-signup/LoginDropdown";

const HomePageMenu = (params) => {

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    //Check DB is login or Not
  }, [])

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
              {isLogin ? <LoginDropdown name="My profile" /> : "LogIn"}
            </Nav.Item>
            <Nav.Item> &nbsp; BD | ENG | BDT</Nav.Item>            
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default HomePageMenu;
