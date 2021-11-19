import React from "react";
import { Table } from "react-bootstrap";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { esHelperOnlyDate } from "../../utils/ui/esFuncs";

const TravelersViewCard = (props) => {
  console.log("Traveles List, ", props);
  const getTravelerList = () => {
    const { travelers } = props;

    if (!helperIsEmpty(travelers)) {
      console.log("Travelers Befor Map , ", travelers);
      return travelers.map((item, idx) => {
        return (
          <tr key={`cst-travele-${idx}`}>
            <td>{idx + 1}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.gender}</td>
            <td>{`${item.phoneCode} ${item.phoneNo}`}</td>

            <td>{item.respPassport && item.respPassport.number}</td>
            <td>{esHelperOnlyDate(item.date)}</td>
          </tr>
        );
      });
    }
    return null;
  };
  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Passport No</th>
            <th>Since</th>
          </tr>
        </thead>
        <tbody>{getTravelerList()}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default TravelersViewCard;
