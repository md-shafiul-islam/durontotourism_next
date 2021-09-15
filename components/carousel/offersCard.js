import React, { Component } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import OfferCarosel from "./offerCarosel";

class OffersCard extends Component {
  state = {
    conPos: 0,
    incriment: 250,
    contentWidth: 4 * 400,
    nBtnStatus: false,
    prevBtnStatus: true,
  };

  moveRightAction = () => {
    let {
      conPos,
      incriment,
      contentWidth,
      nBtnStatus,
      prevBtnStatus,
    } = this.state;
    let cstElm = document.querySelector("#cstCCP");

    // console.log("BTN Status Prev, ", prevBtnStatus, " Next: ", nBtnStatus);
    if (cstElm && nBtnStatus) {
      let pWidth = cstElm && cstElm.offsetWidth;

      let maxMargin = contentWidth - pWidth + 10;

      if (maxMargin > 0 && maxMargin >= conPos) {
        conPos = conPos - incriment;

        if (conPos >= 0) {
          this.setState({ conPos: conPos, prevBtnStatus: true });
        } else {
          this.setState({ conPos: 0, prevBtnStatus: true, nBtnStatus: false });
        }
      }
    }
  };

  moveLeftAction = () => {
    let {
      incriment,
      conPos,
      contentWidth,
      prevBtnStatus,
      nBtnStatus,
    } = this.state;
    let cstElm = document.querySelector("#cstCCP");

    // console.log("BTN Status Prev, ", prevBtnStatus, " Next: ", nBtnStatus);

    if (cstElm && prevBtnStatus) {
      let pWidth = cstElm && cstElm.offsetWidth;

      let maxMargin = contentWidth - pWidth + 10;

      // console.log("conPos NextBtn ", conPos);

      if (maxMargin > 0 && maxMargin >= conPos) {
        conPos = conPos + incriment;
        if (maxMargin >= conPos) {
          this.setState({ conPos: conPos, nBtnStatus: true });
        } else {
          this.setState({
            conPos: maxMargin,
            nBtnStatus: true,
            prevBtnStatus: false,
          });
        }
      }
    }
  };

  render() {
    let { prevBtnStatus, nBtnStatus } = this.state;
    return (
      <React.Fragment>
        <Card>
          <Card.Body>
            <Tab.Container id="menu-tabs" defaultActiveKey="allOffers" transition={false}>
              <Row>
                <Col sm={3}>
                  <h2>Supper Offers</h2>
                </Col>
                <Col sm={6} className="price-fare-rule-tab">
                  <Nav variant="pills" defaultActiveKey="/allOffers">
                    <Nav.Item>
                      <Nav.Link eventKey="allOffers">
                        <span className="price-arrow-down"></span>All Offers
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="bankOffers">
                        <span className="price-arrow-down"></span>Bank Offers
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="holidayOffers">
                        <span className="price-arrow-down"></span>Holiday Offers
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="allOffers">
                      <div className="cst-carousel-btn-area">
                        <span
                          className={`prevBtn ${
                            prevBtnStatus ? "btn-active" : "btn-disable"
                          }`}
                          onClick={this.moveLeftAction}
                        >
                          <i className="fas fa-less-than"></i>
                        </span>
                        <span
                          className={`nextBtn ${
                            nBtnStatus ? "btn-active" : "btn-disable"
                          }`}
                          onClick={this.moveRightAction}
                        >
                          <i className="fas fa-greater-than"></i>
                        </span>
                      </div>
                      <OfferCarosel
                        getParentWidth={(parentElm) => {
                          this.setState({ cstParentElm: parentElm });
                        }}
                        contPosition={this.state.conPos}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bankOffers">
                      <div className="cst-carousel-btn-area">
                        <span
                          className={`prevBtn ${
                            prevBtnStatus ? "btn-active" : "btn-disable"
                          }`}
                          onClick={this.moveLeftAction}
                        >
                          <i className="fas fa-less-than"></i>
                        </span>
                        <span
                          className={`nextBtn ${
                            nBtnStatus ? "btn-active" : "btn-disable"
                          }`}
                          onClick={this.moveRightAction}
                        >
                          <i className="fas fa-greater-than"></i>
                        </span>
                      </div>
                      <OfferCarosel
                        getParentWidth={(parentElm) => {
                          this.setState({ cstParentElm: parentElm });
                        }}
                        contPosition={this.state.conPos}
                      />
                    </Tab.Pane>

                    <Tab.Pane eventKey="holidayOffers">
                      <div className="cst-carousel-btn-area">
                        <span
                          className={`prevBtn ${
                            prevBtnStatus ? "btn-active" : "btn-disable"
                          }`}
                          onClick={this.moveLeftAction}
                        >
                          <i className="fas fa-less-than"></i>
                        </span>
                        <span
                          className={`nextBtn ${
                            nBtnStatus ? "btn-active" : "btn-disable"
                          }`}
                          onClick={this.moveRightAction}
                        >
                          <i className="fas fa-greater-than"></i>
                        </span>
                      </div>
                      <OfferCarosel
                        getParentWidth={(parentElm) => {
                          this.setState({ cstParentElm: parentElm });
                        }}
                        contPosition={this.state.conPos}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default OffersCard;
