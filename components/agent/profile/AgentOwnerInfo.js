import React, { useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ContentModal from "../../Modals/ContentModal";
import ProfileHeader from "./ProfileHeader";
import UpdateAgentOwnerInfo from "./UpdateAgentOwnerInfo";
import AgnetOwnerHeader from "./AgnetOwnerHeader";
import AddAgentOwnerInfo from "./AddAgentOwnerInfo";

const AgentOwnerInfo = (params) => {
  const [displayContentModal, setDisplayContentModal] = useState(false);
  const [addOwnerModal, setAddOwnerModal] = useState(false);

  const { agentOwners } = params;
  const [selectedOwner, setSelectedOwner] = useState(undefined);

  const getValue = (value) => {
    if (value) {
      return value;
    }
    return "Not set yet";
  };
  return (
    <React.Fragment>
      <Col md={12} className="general-heading-area">
        <span className="strip-left bg-primary"></span>
        <div className="heading-area">
          <div className="title">Owner Information</div>
          <p className="pfl-basi-tag">{params.tagLine}</p>
        </div>
      </Col>
      <Col md={12}>
        <Row>
          <Col md={12}>
            {agentOwners &&
              agentOwners.map((item, idx) => {
                return (
                  <ListGroup
                    key={`agent-owner-${idx}`}
                    className="agent-inf-container"
                  >
                    {console.log("Owner Images ", item.ownerImage)}
                    <ListGroup.Item>
                      <Col md={{ span: 3, offset: 9 }}>
                        <AgnetOwnerHeader
                          isEdit={true}
                          imageUrl={
                            item.ownerImage
                              ? item.ownerImage
                              : "/assets/images/blg-img_5.jpeg"
                          }
                          editAction={(status) => {
                            setDisplayContentModal(status);
                            setSelectedOwner(item);
                          }}
                        />
                      </Col>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      <Row>
                        <Col md={4}>Name</Col>
                        <Col md={8}>{getValue(item.name)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <Row>
                        <Col md={4}>Phone</Col>
                        <Col md={8}>
                          {getValue(item.code)} {getValue(item.phone)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      <Row>
                        <Col md={4}>Email</Col>
                        <Col md={8}>{getValue(item.email)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <Row>
                        <Col md={4}>House No/Village</Col>
                        <Col md={8}>{getValue(item.houseNoOrVillage)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      <Row>
                        <Col md={4}>Road Name/No</Col>
                        <Col md={8}>{getValue(item.roadNameOrNo)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <Row>
                        <Col md={4}>Postal Code</Col>
                        <Col md={8}>{getValue(item.postalCode)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      <Row>
                        <Col md={4}>Police Station</Col>
                        <Col md={8}>{getValue(item.policeStation)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <Row>
                        <Col md={4}>District/City</Col>
                        <Col md={8}>{getValue(item.district)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      <Row>
                        <Col md={4}>Country</Col>
                        <Col md={8}>{getValue(item.country)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <Row>
                        <Col md={4}>National ID No</Col>
                        <Col md={8}>{getValue(item.nationalIdNo)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      <Row>
                        <Col md={4}>Passport No</Col>
                        <Col md={8}>{getValue(item.passportNo)}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                );
              })}
          </Col>
        </Row>
      </Col>
      <Col md={{ span: 3, offset: 9 }} className="d-grid mt-2">
        <Button
          onClick={() => {
            setAddOwnerModal(true);
          }}
        >
          Add Another Owner
        </Button>
      </Col>

      <ContentModal
        title="Update Agent Owner Information"
        show={displayContentModal}
        actionClose={(isClose) => {
          setDisplayContentModal(isClose);
        }}
        contentClass="content-modal"
        dialogClassName="modal-content-dilog"
        name="owner-inf"
      >
        <UpdateAgentOwnerInfo
          owner={selectedOwner}
          actionClose={(isClose) => {
            setDisplayContentModal(isClose);
          }}
        />
      </ContentModal>
      <ContentModal
        title="Add Agent Owner Information"
        show={addOwnerModal}
        actionClose={(isClose) => {
          setAddOwnerModal(isClose);
        }}
        contentClass="content-modal"
        dialogClassName="modal-content-dilog"
        name="owner-inf-add"
      >
        <AddAgentOwnerInfo
          actionClose={(isClose) => {
            setAddOwnerModal(isClose);
          }}
        />
      </ContentModal>
    </React.Fragment>
  );
};

AgentOwnerInfo.prototypes = {
  agentOwners: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agentOwners: state.agent.loginAgent && state.agent.loginAgent.agentOwners,
  };
};

export default connect(mapStateToProps, null)(AgentOwnerInfo);
