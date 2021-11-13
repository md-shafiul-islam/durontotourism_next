import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import LogOutActionItem from "../authentication/LogOutActionItem";
import LoginMenuItem from "./LoginMenuItem";

const LoginDropdown = ({ name }) => {
  const [display, setDisplay] = useState(false);

  const clickHandeler = () => {
    console.log("display Action !! ");
    setDisplay(!display);
  };

  return (
    <React.Fragment>
      <div className="top-menu-profile-area">
        <Nav.Item onClick={clickHandeler} className="text_rcnt">
          {" "}
          <span className="text_r">{name}</span>{" "}
        </Nav.Item>
        <div className={`loing-menu-area ${display ? " active" : ""}`}>
          <span className="msg-text">you are viewing personal profile: </span>
          <LoginMenuItem
            action="/user"
            iconClassName="fas fa-user"
            title="My Profile"
            content="Manage your profile, traveller details, login details and
                    password"
          />
          <LoginMenuItem
            action="/booking-summary"
            iconClassName="fas fa-suitcase"
            title="My Booking"
            content="Manage your profile, traveller details, login details and
                    password"
          />
          <LoginMenuItem
            action="/my-wallet"
            iconClassName="fas fa-wallet"
            title="My Wallet"
            content="Manage your profile, traveller details, login details and
                    password"
          />

          <LogOutActionItem />
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginDropdown;
