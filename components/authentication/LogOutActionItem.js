import { signOut } from "next-auth/react";
import React from "react";

const LogOutActionItem = (params)=> {

  return (
    <React.Fragment>
      <div className="log-menu-item signout-item" onClick={signOut}>
        <a>
          <span className="icon-area">
            <i
              className={
                params.iconClassName ? params.iconClassName : "fas fa-sign-out-alt"
              }
            ></i>
          </span>
          <span className="text">
            <span className="title">Sign/Log Out</span>
            <span className="content">{params.content}</span>
          </span>
        </a>
      </div>
    </React.Fragment>
  );
}

export default LogOutActionItem;
