/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const HomePageMenu = (params) => {
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
            <Nav.Item> Login </Nav.Item>
            <Nav.Item> &nbsp; BD | ENG | BDT</Nav.Item>
            {/**<Nav.Item>
                <NavDropdown title="BD | EN | BDT" id="collasible-nav-dropdown">
                <div className="currency-type-lang">
                  
                </div>
              </NavDropdown>
            </Nav.Item>
            */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default HomePageMenu;
