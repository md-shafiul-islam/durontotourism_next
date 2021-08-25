import React, { Component } from "react";
import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import AirSearchForm from "../air-search/AirSearchForm";

class MenuTab extends Component {
  render() {
    return (
      <React.Fragment>
        <Tab.Container id="home-tab" defaultActiveKey="flightSearch">
          <Col sm={12} className="tab-menu-bar">
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link
                  eventKey="flightSearch"
                  title="Flights"
                  className="nav-icon-area"
                >
                  <i className="menu-icon fas fa-plane-departure"></i>
                  <span className="menu-text">Flights</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="hotelSearch" className="nav-icon-area">
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
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="hajj" className="nav-icon-area">
                  <span className="menu-icon icon-hajj"></span>
                  <span className="menu-text">Hajj</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="holydaySearch" className="nav-icon-area">
                  <span className="menu-icon icon-traveler">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </span>{" "}
                  <span className="menu-text">Holiday</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="ship" className="nav-icon-area">
                  <span className="menu-icon icon-boat"></span>
                  <span className="menu-text">Ship</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="visa" className="nav-icon-area">
                  <span className="menu-icon icon-visa"></span>{" "}
                  <span className="menu-text">Visa</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className="main-tab-content">
            <Tab.Content>
              <Tab.Pane eventKey="flightSearch">
                <Row>
                  <Col md={12} className="main-search-container">
                    <AirSearchForm />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="hotelSearch">
                <Row>
                  <Col md={12} className="main-search-container">
                    <AirSearchForm />
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      </React.Fragment>
    );
  }
}

export default MenuTab;
