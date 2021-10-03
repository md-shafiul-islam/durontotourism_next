import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ContentModal from "../../Modals/ContentModal";
import ProfileHeader from "./ProfileHeader";
import UpdateAgentCompanyInfo from "./UpdateAgentCompanyInfo";

const AgentCompanyInfo = (params) => {
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);

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
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Company Name</th>
                  <td colSpan="3">traveller</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td colSpan="3">shafiul2014bd@gmail.com</td>
                </tr>
                <tr>
                  <th scope="row">House No/Village</th>
                  <td colSpan="3">Naogaon 512</td>
                </tr>
                <tr>
                  <th scope="row">Road Name/No</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">Postal Code</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">Police Station</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">District/City</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">Country</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">Trade License No</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">TIN Certificate No</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">DIN Certificate No</th>
                  <td colSpan="3">+880 1725686029</td>
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

export default AgentCompanyInfo;
