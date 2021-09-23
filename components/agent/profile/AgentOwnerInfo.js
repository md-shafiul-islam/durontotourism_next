import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ProfileHeader from "./ProfileHeader";

const AgentOwnerInfo = (params) => {
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <ProfileHeader title="Owner Information" imageUrl="/assets/images/blg-img_5.jpeg" />
          <div className="pfl-table-paren mt-5">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
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
                  <th scope="row">National ID No</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
                <tr>
                  <th scope="row">Passport No</th>
                  <td colSpan="3">+880 1725686029</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
        <Card.Footer>
          <Col md={{ span: 4, offset: 8 }}>
            <Button className="d-grid">Add Another Owner</Button>
          </Col>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default AgentOwnerInfo;
