import axios from "axios";
import React, { useState, useEffect } from "react";
import { GET_BACK_END_DOMAIN_NAME, REQUEST_HEADER } from "../../../redux/types";
import CstImageView from "../../cstView/CstImageView";

const AgnetOwnerHeader = (params) => {
  const [image, setImage] = useState(undefined);
  const [imageLoadError, setImageLoadError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (params.imageUrl) {
      getRestrictedImage();
    }
  }, [params.imageUrl]);

  const getRestrictedImage = async () => {
    const urlAction = `${GET_BACK_END_DOMAIN_NAME}${params.imageUrl}`;
    console.log("Current image Url, ", urlAction);
    try {
      const response = await axios.get(
        urlAction,
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
    <div className="header-right-content">
      {params.imageUrl !== undefined ? (
        <div className="image-area">
          <CstImageView
            thumb={image}
            altTag={params.imgAlt}
            width={500}
            height={500}
            defaultSrc="/assets/images/logo/dto.svg"
          />
        </div>
      ) : (
        ""
      )}
      <div className="edt-btn-area">
        {params.isEdit ? (
          <button
            className="edt-btn"
            onClick={() => {
              params.editAction && params.editAction(true);
            }}
          >
            Edit
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AgnetOwnerHeader;
