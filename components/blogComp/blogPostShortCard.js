import React from "react";
import Image from 'next/image'

/**
 *
 * @param {@ String imgUrl , @ String imgAlt, @ Number imgHeight, @ Number imgWidth, @ String} props
 * @returns Card
 */
const BlogPostShortCard = (props) => {
  return (
    <React.Fragment>
      <div className="blog-short-item">
        <div className="bsi-image-area">
          <Image
            src={props.imgUrl}
            alt={props.imgAlt}
            height={props.imgHeight}
            width={props.imgWidth}
            className="bsi-img"
          />
        </div>
        <div className="bsi-title">{props.title}</div>
      </div>
    </React.Fragment>
  );
};

export default BlogPostShortCard;
