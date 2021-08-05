import React, { Component } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";

class TopNavBar extends Component {
  render() {
    return (
    
      <Container className="top-nav-container">
        <Col md={{span:8, offset:2}} className="common-card zidx-50">
          <Card>
            <Card.Body>
              <Nav activeKey="/flights">
                <Nav.Item>
                  <Nav.Link href="/flights" eventKey="flights" className="m-item">
                    <i className=" menu-icon fas fa-plane-departure"></i><span className="menu-text">Flights</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/hotels" eventKey="hotels" className="m-item">
                  <i className="menu-icon fas fa-hotel"></i> <span className="menu-text">Hotels</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/travels" eventKey="travels" className="m-item">
                  <i className="menu-icon fas fa-route"></i><span className="menu-text">Travels</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    
    );
  }
}

export default TopNavBar;
