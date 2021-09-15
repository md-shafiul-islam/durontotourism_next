import Link from "next/link";
import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";

const LoginDropdown = ({ name }) => {
  const [display, setDisplay] = useState(false);

  const clickHandeler = () => {
    console.log("display Action !! ");
    setDisplay(!display);
  };

  return (
    <React.Fragment>
      <div className="top-menu-profile-area">
        <Nav.Item onClick={clickHandeler} > My Profile</Nav.Item>
        <div className={`loing-menu-area ${display ? " active" : ""}`}>
          <span className="msg-text">you are viewing personal profile: </span>
          <div className="log-menu-item">
            <Link href="/my-profile">
              <a>
                <span className="icon-area">
                  <i className="fas fa-user"></i>
                </span>
                <span className="text">
                  <span className="title">My Profile</span>
                  <span className="content">
                    Manage your profile, traveller details, login details and
                    password
                  </span>
                </span>
              </a>
            </Link>
          </div>

          <div className="log-menu-item">
            <Link href="/booking-summary">
              <a>
                <span className="icon-area">
                  <i className="fas fa-suitcase"></i>
                </span>
                <span className="text">
                  <span className="title">My Booking</span>
                  <span className="content">
                    Manage your profile, traveller details, login details and
                    password
                  </span>
                </span>
              </a>
            </Link>
          </div>

          <div className="log-menu-item">
            <Link href="/my-wallet">
              <a>
                <span className="icon-area">
                  <i className="fas fa-wallet"></i>
                </span>
                <span className="text">
                  <span className="title">My Wallet</span>
                  <span className="content">
                    Manage your profile, traveller details, login details and
                    password
                  </span>
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginDropdown;
