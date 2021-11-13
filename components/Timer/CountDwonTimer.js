/* eslint-disable react/no-unknown-property */
import React, { Component } from "react";
import moment from "moment";

/**
 * timeTillDate="05 26 2019, 6:00 am"
    timeFormat="MM DD YYYY, h:mm a"
 */
class CountDwonTimer extends Component {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    totalSec: 0,
    msgStatus: false,
  };

  mapNumber = (number, in_min, in_max, out_min, out_max) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log("Timer Interval ");
      const { timeTillDate, timeFormat, radiusSize, isComplete } = this.props;
      if (!isComplete) {
        const then = moment(timeTillDate, timeFormat);
        const now = moment();
        const countdown = moment(then - now);
        const days = countdown.format("D");
        const hours = countdown.format("HH");
        const minutes = countdown.format("mm");
        const seconds = countdown.format("ss");
        const totalSec = this.getTotalSec({ minutes, seconds });

        this.setState({ days, hours, minutes, seconds, totalSec: totalSec });

        if (0 === totalSec) {
          this.setState({ msgStatus: true });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getTotalSec = ({ minutes, seconds }) => {
    let totalSec = 0;

    if (!isNaN(Number(minutes)) && !isNaN(Number(seconds))) {
      let mS = Number(minutes) * 60;
      let s = Number(seconds);
      totalSec = mS + s;
    }
    console.log("GET Curent Total Size, ", totalSec);
    return Number(totalSec);
  };

  stopInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.props.onComplete(true);
  };

  render() {
    const { radiusSize, message } = this.props;
    const { days, hours, minutes, seconds, totalSec } = this.state;

    const timerSecondsRadius = this.mapNumber(totalSec, radiusSize, 0, 0, 360);
    const test = this.mapNumber(0.01, 120, 0, 0, 360);

    if (this.state.msgStatus) {
      this.stopInterval();
    }

    if (!seconds) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="countdown-wrapper">
          {seconds && (
            <div className="countdown-item">
              <SVGCircle
                radius={timerSecondsRadius}
                clrs={{ start: "#00bc9b", end: "#5eaefd" }}
              />
              <span className="text">
                {!this.state.msgStatus ? `${minutes}:${seconds}` : message}
              </span>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const SVGCircle = ({ radius, clrs }) => (
  <svg className="countdown-svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color={clrs.start} />
        <stop offset="100%" stop-color={clrs.end} />
      </linearGradient>
    </defs>
    <path
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="4"
      d={describeArc(20, 20, 18, 0, radius)}
    />
  </svg>
);

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
};

export default CountDwonTimer;
