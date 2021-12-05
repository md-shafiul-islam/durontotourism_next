import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { PropTypes } from "prop-types";
import ContentModal from "../../Modals/ContentModal";
import ProfileHeader from "./ProfileHeader";
import UpdateAgentCompanyInfo from "./UpdateAgentCompanyInfo";
import { connect } from "react-redux";
import { helperIsEmpty } from "../../../utils/helper/helperAction";

const companyInf = {
  agent: null,
  companyName: "test3",
  phone: "01789784512454",
  code: "+88",
  email: "test3@gmail.com",
  houseOrVillage: "test3",
  roadNameOrNo: "test3",
  postalCode: "6530",
  policeStation: "test3",
  districtOrCity: "Naogaon",
  tradeLiceseno: "CA 8494984",
  tradeAttach: "/uimages/agents/1638288519753rjnzNkfJCRYtMJH.jpg",
  tinCertificateNo: null,
  tinAttach: "/uimages/agents/1638288519670Hrph4TEmBSOrTK6.jpg",
  binCertificateNo: "444484848444498",
  binAttach: "/uimages/agents/1638288519601QfMbXUwWe0BuwMC.jpg",
  companyLogoAttach: "/uimages/agents/1638288519635VhJYz525ZyIuhIM.jpg",
  country: "BD",
};

const AgentCompanyInfo = (params) => {
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);

  // const { companyInf } = params;
  const getCountry = () => {
    if (!helperIsEmpty(params.countries) && !helperIsEmpty(companyInf)) {
      const country =
        params.countries &&
        params.countries.find((item) => {
          return item.value === companyInf.country;
        });

      return (
        <React.Fragment>
          <span className="country-row">
            <span className="flag">
              <span
                className={`flag-icon flag-icon-${
                  country && country.value && country.value.toLowerCase()
                } `}
              ></span>
            </span>
            <span>{country && country.value}</span>
            <span>{country && country.label}</span>
          </span>
        </React.Fragment>
      );
    }
    return "Not Set yet";
  };
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <ProfileHeader
            title="Company Information"
            imageUrl="/assets/images/logo/dto.svg"
            editAction={setDisplayUpdateModal}
          />
          <div className="pfl-table-paren mt-5">
            <table className="table table-hover company-info-view">
              <tbody>
                <tr>
                  <th scope="row">Company Name</th>
                  <td colSpan="3">{companyInf && companyInf.companyName}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td colSpan="3">
                    {companyInf && companyInf.code}{" "}
                    {companyInf && companyInf.phone}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td colSpan="3">{companyInf && companyInf.email}</td>
                </tr>
                <tr>
                  <th scope="row">House No/Village</th>
                  <td colSpan="3">{companyInf && companyInf.houseOrVillage}</td>
                </tr>
                <tr>
                  <th scope="row">Road Name/No</th>
                  <td colSpan="3">{companyInf && companyInf.roadNameOrNo}</td>
                </tr>
                <tr>
                  <th scope="row">Postal Code</th>
                  <td colSpan="3">{companyInf && companyInf.postalCode}</td>
                </tr>
                <tr>
                  <th scope="row">Police Station</th>
                  <td colSpan="3">{companyInf && companyInf.policeStation}</td>
                </tr>
                <tr>
                  <th scope="row">District/City</th>
                  <td colSpan="3">{companyInf && companyInf.districtOrCity}</td>
                </tr>
                <tr>
                  <th scope="row">Country</th>
                  <td colSpan="3">{getCountry()}</td>
                </tr>
                <tr>
                  <th scope="row">Trade License No</th>
                  <td colSpan="3">{companyInf && companyInf.tradeLiceseno}</td>
                </tr>
                <tr>
                  <th scope="row">TIN Certificate No</th>
                  <td colSpan="3">
                    {companyInf && companyInf.tinCertificateNo}
                  </td>
                </tr>
                <tr>
                  <th scope="row">BIN Certificate No</th>
                  <td colSpan="3">
                    {companyInf && companyInf.binCertificateNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <ContentModal
        title="Update Agent Company Information"
        show={displayUpdateModal}
        actionClose={(isClose) => {
          setDisplayUpdateModal(isClose);
        }}
        contentClass="content-modal"
        dialogClassName="modal-content-dilog"
        name="company-inf"
      >
        <UpdateAgentCompanyInfo />
      </ContentModal>
    </React.Fragment>
  );
};

AgentCompanyInfo.prototypes = {
  companyInf: PropTypes.object.isRequired,
  countries: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    companyInf: state.agent.loginAgent && state.agent.loginAgent.agentCompany,
    countries: state.country.countryOptions,
  };
};

export default connect(mapStateToProps, null)(AgentCompanyInfo);
