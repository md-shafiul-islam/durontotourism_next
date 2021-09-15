import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class StickyNav extends Component {
  render() {
    let { showStatus } = this.props;
    return (
      <React.Fragment>
        <Navbar
          // bg="light"
          expand="lg"
          sticky="top"
          className={`sticky-menu ${showStatus ? "show" : ""}`}
          // variant="light"
          bg="dark" variant="dark"
        >
          <Navbar.Brand href="/">DT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/flights">Flight</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default StickyNav;
