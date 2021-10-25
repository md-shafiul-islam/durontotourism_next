import { id } from "date-fns/locale";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class TravellerAndClassCard extends Component {
  state = {
    flyClass: "Economy",
    adultCount: 0,
    childCount: 0,
    infantCount: 0,
  };

  flyClassAction = (e) => {
    if (e) {
      if (e.target) {
        let classType = e.target.value;
        this.setState({ flyClass: classType });
        this.props.setCabinClass({ name: `${classType}`, value: classType });
      }
    }
  };

  travellerPlus = (type) => {
    console.log("Traveler Pluse ", type);
    const { adultCount, childCount, infantCount } = this.state;
    let count = 0;
    if (type === "ADT") {
      count = 0;
      count = adultCount + 1;
      count = 20 >= count ? count : 20;
      this.setState({ adultCount: count });
      this.props.setAdtTraveler({ name: `${count}`, value: count });
    }

    if (type === "CNN") {
      count = 0;
      count = childCount + 1;
      count = 20 >= count ? count : 20;
      this.setState({ childCount: count });
      this.props.setCnnTraveler({ name: `${count}`, value: count });
    }

    if (type === "INF") {
      count = 0;
      count = infantCount + 1;
      count = 20 >= count ? count : 20;
      this.setState({ infantCount: count });
      this.props.setInfTraveler({ name: `${count}`, value: count });
    }
  };

  travellerMinus = (type) => {
    console.log("Traveler Minus ", type);

    const { adultCount, childCount, infantCount } = this.state;
    let count = 0;
    if (type === "ADT") {
      count = 0;
      count = adultCount - 1;
      count = count >= 0 ? count : 0;
      this.setState({ adultCount: count });
      this.props.setAdtTraveler({ name: `${count}`, value: count });
    }

    if (type === "CNN") {
      count = 0;
      count = childCount - 1;
      count = count >= 0 ? count : 0;
      this.setState({ childCount: count });
      this.props.setCnnTraveler({ name: `${count}`, value: count });
    }

    if (type === "INF") {
      count = 0;
      count = infantCount - 1;
      count = count >= 0 ? count : 0;
      this.setState({ infantCount: count });
      this.props.setInfTraveler({ name: `${count}`, value: count });
    }
  };

  changeAction = (e) => {
    console.log("Change Action, ", e);
    if (e) {
      if (e.target) {
        let count = Number(e.target.value);
        if (count >= 0 && 20 >= count) {
          console.log("Current Target Type Or Name, ", e.target.name);
          if (e.target.name == "cnn") {
            this.setState({ childCount: count });
            this.props.setCnnTraveler({ name: `${count}`, value: count });
          }

          if (e.target.name == "adt") {
            this.setState({ adultCount: count });
            this.props.setAdtTraveler({ name: `${count}`, value: count });
          }

          if (e.target.name == "inf") {
            this.setState({ infantCount: count });
            this.props.setInfTraveler({ name: `${count}`, value: count });
          }
        }
      }
    }
  };

  render() {
    let { adultCount, childCount, infantCount, flyClass } = this.state;
    return (
      <React.Fragment>
        <Row className="mntvlr-container">
          <Col md={6}>
            <Row>
              <Col md={12}>
                <span className="traveller-input-area">
                  <label htmlFor="adt" className="form-label">
                    Adults
                  </label>
                  <span className="tvr-icon">
                    <i
                      className="far fa-minus-square"
                      onClick={() => {
                        this.travellerMinus("ADT");
                      }}
                    ></i>
                  </span>{" "}
                  <input
                    type="number"
                    className="tvr-input form-control"
                    name="adt"
                    onChange={this.changeAction}
                    value={adultCount}
                  />
                  <span className="tvr-icon">
                    <i
                      className="far fa-plus-square"
                      onClick={() => {
                        this.travellerPlus("ADT");
                      }}
                    ></i>
                  </span>
                </span>
              </Col>

              <Col md={12}>
                <span className="traveller-input-area">
                  <label htmlFor="cnn" className="form-label">
                    Child
                  </label>
                  <span className="tvr-icon">
                    <i
                      className="far fa-minus-square"
                      onClick={() => {
                        this.travellerMinus("CNN");
                      }}
                    ></i>
                  </span>{" "}
                  <input
                    type="number"
                    className="tvr-input form-control"
                    name="cnn"
                    id="cnn"
                    onChange={this.changeAction}
                    value={childCount}
                  />
                  <span className="tvr-icon">
                    <i
                      className="far fa-plus-square"
                      onClick={() => {
                        this.travellerPlus("CNN");
                      }}
                    ></i>
                  </span>
                </span>
              </Col>
              <Col md={12}>
                <span className="traveller-input-area">
                  <label htmlFor="inf" className="form-label">
                    Infants
                  </label>
                  <span className="tvr-icon">
                    <i
                      className="far fa-minus-square"
                      onClick={() => {
                        this.travellerMinus("INF");
                      }}
                    ></i>
                  </span>{" "}
                  <input
                    type="number"
                    className="tvr-input form-control"
                    name="inf"
                    id="inf"
                    onChange={this.changeAction}
                    value={infantCount}
                  />
                  <span className="tvr-icon">
                    <i
                      className="far fa-plus-square"
                      onClick={() => {
                        this.travellerPlus("INF");
                      }}
                    ></i>
                  </span>
                </span>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={12} className="fly-class-area m-0 p-0">
                <span className="fly-trv-item">
                  <input
                    type="radio"
                    value="Economy"
                    className="form-check-input fly-class-item"
                    id="flyClassEc"
                    name="flyClass"
                    checked={flyClass === "Economy" ? true : false}
                    onChange={this.flyClassAction}
                  />
                  <label
                    htmlFor="flyClassEc"
                    className="form-check-label fly-class-item"
                  >
                    Economy
                  </label>
                </span>
                <span className="fly-trv-item">
                  <input
                    type="radio"
                    value="Premium Economy"
                    className="form-check-input fly-class-item"
                    id="flyClassPec"
                    name="flyClass"
                    onChange={this.flyClassAction}
                    checked={flyClass === "Premium Economy" ? true : false}
                  />
                  <label
                    htmlFor="flyClassPec"
                    className="form-check-label fly-class-item"
                  >
                    Premium Economy
                  </label>
                </span>
                <span className="fly-trv-item">
                  <input
                    type="radio"
                    value="Business"
                    className="form-check-input fly-class-item"
                    id="flyClassBs"
                    name="flyClass"
                    onChange={this.flyClassAction}
                    checked={flyClass === "Business" ? true : false}
                  />
                  <label
                    htmlFor="flyClassBs"
                    className="form-check-label fly-class-item"
                  >
                    Business
                  </label>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default TravellerAndClassCard;
