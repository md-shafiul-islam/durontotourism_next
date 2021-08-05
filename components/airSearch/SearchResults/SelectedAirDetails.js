import React from "react";
import FlyDetailsCard from "./FlightCards/FlyDetailsCard";
import FareSummaryCard from "./FlightCards/FareSummaryCard";
import ChargeCardDetails from "./FlightCards/ChargeCardDetails";
import SelectedTab from "./SelectedTab";
import SelectedAirModal from "../../Modals/SelectedAirModal";

const SelectedAirDetails = (props) => {
  return (
    <React.Fragment>
      <SelectedAirModal />
    </React.Fragment>
  );
};

export default SelectedAirDetails;
