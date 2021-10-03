import React from "react";
import { Col, Row } from "react-bootstrap";
import CstImageView from "../../cstView/CstImageView";

const ProfileHeader = ({
  title,
  imageUrl = undefined,
  tagLine,
  imgAlt,
  editAction = undefined,
  isEdit = true,
}) => {
  return (
    <React.Fragment>
      <div className="pfl-header">
        <span className="strip-left bg-secondary"></span>
        <Row>
          <Col md={12} className="general-heading-area">
            <div className="heading-area">
              <div className="title">{title}</div>
              <p className="pfl-basi-tag">{tagLine}</p>
            </div>
            <div className="header-right-content">
              {imageUrl !== undefined ? (
                <div className="image-area">
                  <CstImageView
                    src={imageUrl}
                    altTag={imgAlt}
                    width={500}
                    height={500}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="edt-btn-area">
                {isEdit ? (
                  <button
                    className="edt-btn"
                    onClick={() => {
                      editAction && editAction(true);
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ProfileHeader;
