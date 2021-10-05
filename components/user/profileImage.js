import React from "react";
import Image from "next/image";
import CstImageView from "../cstView/CstImageView";

const profileImage = (props) => {
  return (
    <React.Fragment>
      <div className="profile-img">
        <CstImageView
          src={props.imgUrl}
          altTag={props.imgAlt}
          width={props.imgWidth}
          height={props.imgHeight}
        />
      </div>
    </React.Fragment>
  );
};

export default profileImage;
