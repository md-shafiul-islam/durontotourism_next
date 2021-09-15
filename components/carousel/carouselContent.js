import React from "react";
import { Col, Row } from "react-bootstrap";

/**
 *
 * @param {type, title, imgUrl} props
 * @returns
 */
const CarouselContent = (props) => {

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="dtcarousel-container">
          
          <div className="dtcarousel-content">
            <div className="image-container">
              <img
                src={props.imgUrl}
                alt={props.imgAlt}
                width={props.imgWidth}
                height={props.imgHeight}
              />
            </div>

            <div className="offer-content">
              <div className="offer-type">{props.type}</div>
              <div className="offer-title">{props.title}</div>
              <p className="tag-line">{props.tagLine}</p>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CarouselContent;
