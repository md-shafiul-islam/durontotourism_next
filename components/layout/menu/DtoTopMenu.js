import React, { Component } from "react";
import Link from "next/link";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class DtoTopMenu extends React.Component {
  state = {
    current: "mail",
  };

  render() {
    const { current } = this.state;
    return (
      <React.Fragment>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="dark"
          variant="dark"
          sticky="top"
        >
          <Link href="/" passHref>
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/about" passHref>
                <Nav.Link>About Us</Nav.Link>
              </Link>
              <Link href="/price" passHref>
                <Nav.Link>Pricing</Nav.Link>
              </Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default DtoTopMenu;
