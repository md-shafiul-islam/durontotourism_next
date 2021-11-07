import React from "react";

const DigitalClock = ({ hours, minutes, seconds }) => {
  return (
    <React.Fragment>
      <div className="clock-wrapper">
        <div className="clock-display">
          <div className="time">
            {minutes}:{seconds}
          </div>
        </div>
        <span></span>
        <span></span>
      </div>
    </React.Fragment>
  );
};

export default DigitalClock;
