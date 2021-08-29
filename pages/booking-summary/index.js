import React, { Component } from "react";
import { Breadcrumb, Col, Nav, Row } from "react-bootstrap";
import CancelledBookingList from "../../components/user/cancelledBookingList";
import CompletedBookingList from "../../components/user/completedBookingList";
import PendingBookingList from "../../components/user/pendingBookingList";

class BookingSummeryPage extends Component {
  componentDidMount() {
    this.scrollSpyActive();
  }

  scrollSpyActive = () => {
    let items = document.querySelectorAll(".bsp_item");

    window.onscroll = () => {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

      items &&
        items.forEach((item, idx) => {
          // console.log(
          //   " IDX ",
          //   idx,
          //   "Window Scrol Position, ",
          //   item.offsetTop,
          //   " <= ",
          //   scrollPosition
          // );
          if (item.offsetTop <= scrollPosition ) {
            // console.log(
            //   " IDX ",
            //   idx,
            //   "Window Scrol Position, ",
            //   item.offsetTop,
            //   " <= ",
            //   scrollPosition
            // );
            const element = item;

            let ctActive = document.querySelector(`.bsp-link-item.active`);

            if (ctActive) {
              ctActive.classList.remove("active");
            }
            let ctitem = document.querySelector(
              `.bsp-link-item[data-rb-event-key="${element.id}"]`
            );

            if (ctitem) {
              ctitem.classList.add("active");
            }

            //this.changeActiveStatus(element.id);
          }
        });
    };
  };

  scrollMoveAction = (key) => {
    // console.log("Scroll Action Fire, ", key);
    let elemnt = null,
      bodyReact = null,
      currentReact = null;

    if (key) {
      elemnt = document.querySelector(`#${key}`);
      // console.log("Scroll Action elemnt, ", elemnt);

      if (elemnt) {
        currentReact = elemnt.getBoundingClientRect();

        if (currentReact) {
          bodyReact = document.body.getBoundingClientRect();

          if (bodyReact) {
            let offSet = currentReact.top - bodyReact.top;
            // console.log("Current Offset, ", offSet);
            offSet = offSet > 100 ? offSet - 85 : offSet;
            window.scroll(0, offSet);

            this.changeActiveStatus(key);
          }
        }
      }
    }
  };

  changeActiveStatus = (key) => {
    if (key) {
      let items = document.querySelectorAll(".bsp-text-area");
      items &&
        items.forEach((item, idx) => {
          // console.log(
          //   "item.parentElement.dataset.rbEventKey, IDX, ",
          //   idx,
          //   " ",
          //   item.parentElement.dataset.rbEventKey
          // );

          if (item.parentElement.dataset.rbEventKey === key) {
            item.parentElement.classList.add("active");
          } else {
            item.parentElement.classList.remove("active");
          }
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">My Account</Breadcrumb.Item>
              <Breadcrumb.Item active>My Trip</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row className="bsp-fix-cont">
          <div className="book-sum-options ">
            <Nav variant="pills" className="bsp-menu shadow">
              <Nav.Item>
                <Nav.Link
                  eventKey="bsp-upcoming"
                  onClick={() => {
                    this.scrollMoveAction("bsp-upcoming");
                  }}
                  className="bsp-link-item"
                >
                  <div className="bsp-text-area">
                    <span>
                      <i className="fas fa-file-import"></i>
                    </span>
                    <span>Upcoming</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="bsp-cancelled"
                  onClick={() => {
                    this.scrollMoveAction("bsp-cancelled");
                  }}
                  className="bsp-link-item"
                >
                  <div className="bsp-text-area">
                    <span>
                      <i className="far fa-calendar-times"></i>
                    </span>
                    <span>Cancelled</span>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="bsp-completed"
                  onClick={() => {
                    this.scrollMoveAction("bsp-completed");
                  }}
                  className="bsp-link-item"
                >
                  <div className="bsp-text-area">
                    <span>
                      <i className="fas fa-suitcase-rolling"></i>
                    </span>
                    <span>Completed</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Row>

        <div className="profile-container">
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12} id="bsp-upcoming" className="bsp_item">
                  <PendingBookingList />
                </Col>
              </Row>

              <Row>
                <Col md={12} id="bsp-cancelled" className="bsp_item">
                  <CancelledBookingList />
                </Col>
              </Row>

              <Row>
                <Col md={12} id="bsp-completed" className="bsp_item">
                  <CompletedBookingList />
                </Col>
              </Row>
            </Col>
          </Row>
          <div style={{ height: `100px` }}></div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookingSummeryPage;
