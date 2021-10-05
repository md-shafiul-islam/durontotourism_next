import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { initScrollPositionCount } from "../../../utils/ui/menuAction";
import LoginDropdown from "../../login-signup/LoginDropdown";

const MainTopNavBar = (params) => {
  const [display, setDisplay] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [sticky, setSticky] = useState({
    stickyNavStatus: false,
    topSectionStatus: true,
  });
  const route = useRouter();

  console.log("Use Next Route, ", route);

  useEffect(() => {
    if (route.asPath === "/" || route.asPath === "/payment" || route.asPath === "/booking-summary") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }

    console.log("Window Obj, ", window);
    let stickyStatus = initScrollPositionCount(sticky, setSticky);

    console.log("Sticky Status, ", stickyStatus);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className={`top-main-nav-bar ${
          sticky && sticky.stickyNavStatus ? "active-top-nav" : ""
        }`}
        sticky={true ? "top" : ""}
      >
        <Container fluid className="main-container">
          <Navbar.Brand className="top-brand-area">
            <Link href="/">
              <a>
                <Image
                  src="/assets/images/logo/logo-inlin.v2.png"
                  width={981}
                  height={229}
                  alt="Duronto Tourism"
                />
              </a>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto route">
              <Nav.Item>
                <Link href="flights">
                  <a>
                    <i className="menu-icon fas fa-plane-departure"></i>
                    <span className="menu-text">Flights</span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link href="hotels">
                  <a>
                    <span className="menu-icon icon-hotel">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                      <span className="path6"></span>
                      <span className="path7"></span>
                      <span className="path8"></span>
                      <span className="path9"></span>
                    </span>{" "}
                    <span className="menu-text">Hotels</span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link href="hajj">
                  <a>
                    <span className="menu-icon icon-hajj"></span>
                    <span className="menu-text">Hajj</span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link href="holiday">
                  <a>
                    <span className="menu-icon icon-traveler">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </span>{" "}
                    <span className="menu-text">Holiday</span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link href="ship">
                  <a>
                    <span className="menu-icon icon-boat"></span>
                    <span className="menu-text">Ship</span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link href="visa">
                  <a>
                    <span className="menu-icon icon-visa"></span>{" "}
                    <span className="menu-text">Visa</span>
                  </a>
                </Link>
              </Nav.Item>
            </Nav>
            <Nav className="es-info-area">
              {isLogin ? <LoginDropdown name="My profile" /> : <Nav.Item>Log In</Nav.Item>}

              <Nav.Item>
                <span className="menu-text">Currency</span>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default MainTopNavBar;
