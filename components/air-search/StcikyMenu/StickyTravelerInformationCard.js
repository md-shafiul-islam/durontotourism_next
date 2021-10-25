import React, { useState } from "react";
import { Card } from "react-bootstrap";
import TravellerAndClassCard from "../traveller/TravellerAndClassCard";

const StickyTravelerInformationCard = (props) => {
  const [travelerInfo, setTravelerInfo] = useState({
    name: "Traveler",
    count: 0,
  });
  const [displayTrav, setDisplayTrav] = useState(false);
  const [travelers, setTravelers] = useState({
    adtCount: 0,
    cnnCount: 0,
    infCount: 0,
  });
  const [cabinClass, setCabinClass] = useState({
    name: "Economy",
    value: "Economy",
  });

  const travellerToggle = () => {
    console.log("Display Toggle Traveler ", displayTrav);
    const status = displayTrav;
    setDisplayTrav(!status);
  };

  const getTravelerCount = () => {
    let totalCount =
      travelers.adtCount + travelers.cnnCount + travelers.infCount;

    if (
      (travelers.adtCount > 0 && travelers.cnnCount > 0) ||
      (travelers.adtCount > 0 && travelers.infCount > 0) ||
      (travelers.infCount > 0 && travelers.cnnCount > 0)
    ) {
      return `s ${totalCount}`;
    }

    if(travelers.adtCount > 0){
        return totalCount > 1 ? ` Adutls ${totalCount} `:` Adutl ${totalCount}` ;
    }else if(travelers.cnnCount > 0){
        return totalCount > 0 ? ` Childs ${totalCount}`:` Child ${totalCount}`;
    }else if(travelers.infCount){
        return totalCount > 0 ? ` Infants ${totalCount}` : ` Infant ${totalCount}`;
    }else{
        return ` ${totalCount}`;
    }
  };
  return (
    <div className="sticky-trv-container">
      <div className="sticky-trv-info" onClick={travellerToggle}>
        <span className="sticky-tarvelers">{`${
          travelerInfo.name
        }${getTravelerCount()}`}</span>
        <span className="sticky-tarvelers">{`${cabinClass.name}`}</span>
      </div>
      <div className={`sticky-trv-content ${displayTrav ? " active" : ""}`}>
        <Card.Body className={`sticky-trv-card shadow`}>
          <TravellerAndClassCard
            setCnnTraveler={(item) => {
              //{ name: `${count}`, value: count }
              console.log("CNN Traveler Details, ", item);
              setTravelers({
                ...travelers,
                cnnCount: item.value,
              });
            }}
            setAdtTraveler={(item) => {
              //{ name: `${count}`, value: count }
              console.log("ADT Traveler Details, ", item);
              setTravelers({
                ...travelers,
                adtCount: item.value,
              });
            }}
            setInfTraveler={(item) => {
              //{ name: `${count}`, value: count }
              console.log("INF Traveler Details, ", item);
              setTravelers({
                ...travelers,
                infCount: item.value,
              });
            }}
            setCabinClass={setCabinClass}
          />
        </Card.Body>
      </div>
    </div>
  );
};

export default StickyTravelerInformationCard;
