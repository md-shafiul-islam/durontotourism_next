import React, {useState} from "react";
import StickySerchLocationSelect from "./StickySerchLocationSelect";

const StickySelectTravelLocations = (params) => {
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const switchLocsAction = () => {
    const lOrigin = origin;
    const lDestination = destination;

    setOrigin(lDestination);
    setDestination(lOrigin);
  };

  return (
    <React.Fragment>
      <div className="sticky-location-container">
        <div className="sticky-search-box mitembg">
          <StickySerchLocationSelect
            label="From"
            value={origin}
            onChangeHandler={(value) => {
              setOrigin(value);
            }}
          />
        </div>
        <div className={`sticky-switch-content`}>
          <i className="bi bi-arrow-left-right" onClick={switchLocsAction}></i>
        </div>
        <div className="sticky-search-box mitembg">
          <StickySerchLocationSelect
            label="To"
            value={destination}
            onChangeHandler={(value) => {
              setDestination(value);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default StickySelectTravelLocations;
