import React, { Component } from "react";
import { Row, Card, Col } from "react-bootstrap";
import BlogPostShortCard from "./blogPostShortCard";

class BlogHomePageCard extends Component {
  state = {
    prevBtnStatus: true,
    nBtnStatus: false,
    conPos: 0,
    incriment: 250,
    contentWidth: (300+15) * 5,
  };

  moveLeftAction = () => {
    let {
      incriment,
      conPos,
      contentWidth,
      prevBtnStatus,
      nBtnStatus,
    } = this.state;
    let cstElm = document.querySelector("#blgCc");

    if (cstElm && prevBtnStatus) {
      let pWidth = cstElm && cstElm.offsetWidth;

      //   console.log("Paren Width: ", pWidth);
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

  moveRightAction = () => {
    let {
      conPos,
      incriment,
      contentWidth,
      nBtnStatus,
      prevBtnStatus,
    } = this.state;
    let cstElm = document.querySelector("#blgCc");

    console.log(
      " blgCc BTN Status Prev, ",
      prevBtnStatus,
      " Next: ",
      nBtnStatus
    );
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
  render() {
    let { prevBtnStatus, nBtnStatus, conPos } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <h2 className="bsi-title">Travel Blog</h2>
                <div className="blog-carousel-btn-area">
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
                <div className="blg-c-paren" id="blgCc">
                  <div
                    className="blog-carousel"
                    style={{ marginLeft: `-${conPos}px` }}
                  >
                    <div className="blog-short-item-parent">
                      <BlogPostShortCard
                        title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                        imgUrl={`/assets/images/blg-img_1.jpg`}
                        imgAlt={`Lorem Ipsum has been the industry's`}
                        imgHeight={200}
                        imgWidth={250}
                      />
                    </div>
                    <div className="blog-short-item-parent">
                      <BlogPostShortCard
                        title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                        imgUrl={`/assets/images/blg-img_2.jpg`}
                        imgAlt={`Lorem Ipsum has been the industry's`}
                        imgHeight={200}
                        imgWidth={250}
                      />
                    </div>
                    <div className="blog-short-item-parent">
                      <BlogPostShortCard
                        title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                        imgUrl={`/assets/images/blg-img_3.jpg`}
                        imgAlt={`Lorem Ipsum has been the industry's`}
                        imgHeight={200}
                        imgWidth={250}
                      />
                    </div>
                    <div className="blog-short-item-parent">
                      <BlogPostShortCard
                        title="Lorem Ipsum has been the industry's "
                        imgUrl={`/assets/images/blg-img_4.jpg`}
                        imgAlt={`Lorem Ipsum has been the industry's`}
                        imgHeight={200}
                        imgWidth={250}
                      />
                    </div>
                    <div className="blog-short-item-parent">
                      <BlogPostShortCard
                        title="Lorem Ipsum has been the industry's standard dummy text ever since "
                        imgUrl={`/assets/images/blg-img_5.jpeg`}
                        imgAlt={`Lorem Ipsum has been the industry's`}
                        imgHeight={200}
                        imgWidth={250}
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default BlogHomePageCard;
