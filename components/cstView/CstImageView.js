import React from "react";
import Image from "next/image";
const CstImageView = ({
  src="/assets/images/placeholder.jpg",
  altTag = "Image Not found",
  width = 500,
  height = 500,
}) => {
  return (
    <React.Fragment>
      <Image src={`${src}`} alt={altTag} width={width} height={height} />
    </React.Fragment>
  );
};

export default CstImageView;
