import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  GET_FILTER_DEP_STOPS,
  GET_FILTER_RET_STOPS,
} from "../../../../redux/types";
import { helperGetPrice } from "../../../../utils/helper/helperAction";

const FlightCatelogFilter = (params) => {
  console.log("Filter Options params, ", params);

  const departureTimeAction = (departure) => {
    // console.log("Stops Type Action, ", departure);
    params.getSelcetdDeparture(departure);
  };

  const arrivalTimeAction = (arrival) => {
    params.getSelcetdArrival(arrival);
  };

  const getTimeIcon = (timeRang, activeItem) => {
    if (timeRang) {
      // console.log("Time Range, ", timeRang);

      if ("before6AM" === timeRang.value) {
        return (
          <div
            className={`filter-icon-area border rounded ${
              activeItem ? "active" : ""
            }`}
          >
            <span className="icon">
              <i className="fas fa-cloud-moon"></i>
            </span>
            <span className="price">
              {timeRang.price ? helperGetPrice(timeRang.price) : ""}
            </span>
            <span className="text">Before 6 AM</span>
          </div>
        );
      } else if ("6AM-12PM" === timeRang.value) {
        return (
          <div
            className={`filter-icon-area border rounded ${
              activeItem ? "active" : ""
            }`}
          >
            <span className="icon">
              <i className="fas fa-cloud-sun"></i>
            </span>
            <span className="price">
              {timeRang.price ? helperGetPrice(timeRang.price) : ""}
            </span>
            <span className="text">6Am - 12PM</span>
          </div>
        );
      } else if ("12PM-6PM" === timeRang.value) {
        return (
          <div
            className={`filter-icon-area border rounded ${
              activeItem ? "active" : ""
            }`}
          >
            <span className="icon">
              <i className="fas fa-sun"></i>
            </span>
            <span className="price">
              {timeRang.price ? helperGetPrice(timeRang.price) : ""}
            </span>
            <span className="text">12PM - 6PM</span>
          </div>
        );
      } else if ("After6PM" === timeRang.value) {
        return (
          <div
            className={`filter-icon-area border rounded ${
              activeItem ? "active" : ""
            }`}
          >
            <span className="icon">
              <i className="fas fa-moon"></i>
            </span>
            <span className="price">
              {timeRang.price ? helperGetPrice(timeRang.price) : ""}
            </span>
            <span className="text">After 6 PM</span>
          </div>
        );
      }
    }
  };

  const getIconContainerDepture = (item, idx, active) => {
    if (item) {
      if (item.value) {
        return (
          <Col
            key={`${params.name}dept-${idx}`}
            md={3}
            className="icon-content"
            onClick={() => {
              departureTimeAction(item);
            }}
          >
            {getTimeIcon(item, active)}
          </Col>
        );
      }
    }
    return "";
  };

  const getIconContainerArrival = (item, idx, active) => {
    if (item) {
      if (item.value) {
        return (
          <Col
            key={`${params.name}-arrv-${idx}`}
            md={3}
            className="icon-content"
            onClick={() => {
              arrivalTimeAction(item);
            }}
          >
            {getTimeIcon(item, active)}
          </Col>
        );
      }
    }
    return "";
  };

  const getStopIcons = (stop) => {
    console.log(
      "Get Stops Icons preSelectAirStops Name, ",
      params.name,
      " Air Stops",
      params.preSelectAirStops
    );

    if (params.preSelectAirStops) {
      if (params.preSelectAirStops.includes(stop)) {
        return `check-bg fas fa-check-square`;
      }
    }
    return `far fa-square`;
  };

  return (
    <div className="shadow-sm p-2 mb-3 bg-body catelog-filter">
      <div className="catelog-title">{`${params.title}`}</div>
      <div className="stops-area">
        <div className="title">
          {params.title
            ? `Stops From ${params.departure ? params.departure : ""}`
            : "Stops From "}
        </div>

        <ul>
          <li
            onClick={() => {
              params.getStopAction(0);
            }}
          >
            <i className={getStopIcons(0)}></i> Non Stop
          </li>
          {params.options &&
            params.options.flightStopsTypes &&
            params.options.flightStopsTypes.map((stop, idx) => {
              return (
                <li
                  onClick={() => {
                    params.getStopAction(stop);
                  }}
                  key={`${params.name}-stop-${idx}`}
                >
                  <i className={getStopIcons(stop)}></i>{" "}
                  {stop ? `${stop} Stop` : ""}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="catlog-departure-area">
        <div className="title">{`Departure From ${
          params.departure ? params.departure : ""
        }`}</div>

        <Row>
          {params.options &&
            params.options.departureDateTimeList &&
            params.options.departureDateTimeList.map((depTime, idx) => {
              let activeItem = false;
              if (params.preSelectItems) {
                if (params.preSelectItems.departureTimes) {
                  if (
                    params.preSelectItems.departureTimes.includes(depTime.value)
                  ) {
                    activeItem = true;
                  }
                }
              }
              return getIconContainerDepture(depTime, idx, activeItem);
            })}
        </Row>
      </div>

      <div className="catelog-arrival-area">
        <div className="title">{`Arrival From ${
          params.arrival ? params.arrival : ""
        }`}</div>
        <Row>
          {params.options &&
            params.options.arrivalDateTimeList &&
            params.options.arrivalDateTimeList.map((arvTime, idx) => {
              let activeItem = false;
              if (params.preSelectItems) {
                if (params.preSelectItems.arrivalTimes) {
                  if (
                    params.preSelectItems.arrivalTimes.includes(arvTime.value)
                  ) {
                    activeItem = true;
                  }
                }
              }
              return getIconContainerArrival(arvTime, idx, activeItem);
            })}
        </Row>
      </div>
    </div>
  );
};

export default FlightCatelogFilter;
