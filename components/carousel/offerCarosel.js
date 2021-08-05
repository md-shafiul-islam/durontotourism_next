import React from "react";
import { Col} from "react-bootstrap";
import CarouselContent from "./carouselContent";

const OfferCarosel = (props) => {

  return (
    <React.Fragment>
      <Col md={12}  className="cst-carousel-paren" id="cstCCP">
        
        <div className="cst-carousel" style={{marginLeft:`-${props.contPosition}px`}} id="cstCCPContent">
          
          <div className="cst-carousel-item">
            <CarouselContent
              imgUrl="/assets/images/crc_image_1.jpg"
              title="Biggest Offer in Cox's Bazar Holiday"
              type="Tour Packages"
              imgHeight={125}
              imgWidth={125}
              tagLine={`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
            />
          </div>

          <div className="cst-carousel-item">
            <CarouselContent
              imgUrl="/assets/images/crc_image_2.jpg"
              title="Biggest Offer in Cox's Bazar Holiday"
              type="Tour Packages"
              imgHeight={125}
              imgWidth={125}
              tagLine={`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
            />
          </div>

          <div className="cst-carousel-item">
            <CarouselContent
              imgUrl="/assets/images/crc_image_3.jpg"
              title="Biggest Offer in Cox's Bazar Holiday"
              type="Tour Packages"
              imgHeight={125}
              imgWidth={125}
              tagLine={`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
            />
          </div>

          <div className="cst-carousel-item">
            <CarouselContent
              imgUrl="/assets/images/crc_image_4.jpg"
              title="Biggest Offer in Cox's Bazar Holiday"
              type="Tour Packages"
              imgHeight={125}
              imgWidth={125}
              tagLine={`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
            />
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default OfferCarosel;
