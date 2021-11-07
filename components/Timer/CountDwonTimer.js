import React from "react";
import Countdown from "react-countdown";

const customCounterView = ({ hours, minutes, seconds, completed }) => {
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  if (completed) {
    return <span>Verify or skip</span>;
  } else {
    return (
      <span className="text">
        {minutes}:{seconds}
      </span>
    );
  }
};

const CountDwonTimer = ({ remainigTime = 0, countDwonStatus, ...props }) => {
  return (
    <React.Fragment>
      <Countdown
        date={Date.now() + remainigTime * 1000}
        renderer={customCounterView}
        zeroPadTime={2}
        onComplete={countDwonStatus}
      />
    </React.Fragment>
  );
};

export default CountDwonTimer;
