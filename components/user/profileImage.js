/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CstImageView from "../cstView/CstImageView";
import axios from "axios";
import { GET_BACK_END_DOMAIN_NAME, REQUEST_HEADER } from "../../redux/types";

const ProfileImage = (props) => {
  const [image, setImage] = useState(undefined);
  const [imageLoadError, setImageLoadError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    console.log("Current Image URL, ", props.src);
    if (props.imgUrl !== undefined && props.imgUrl !== null) {
      getRestrictedImage();
    }
  }, [props.imgUrl]);

  const getRestrictedImage = async () => {
    try {
      const response = await axios.get(
        `${GET_BACK_END_DOMAIN_NAME}${props.imgUrl}`,
        {
          headers: REQUEST_HEADER,
          responseType: "arraybuffer",
        }
      );

      let blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.log("Image Load Error, ", error);
      setImageLoadError({ status: true, message: error.message });
    }
  };

  return (
    <React.Fragment>
      <div className="profile-img">
        <CstImageView
          defaultSrc="/assets/images/placeholder.jpg"
          altTag={props.imgAlt}
          width={props.imgWidth}
          height={props.imgHeight}
          thumb={image}
        />
      </div>
    </React.Fragment>
  );
};

export default ProfileImage;
