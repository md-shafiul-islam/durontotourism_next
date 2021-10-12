import React from "react";
import Link from "next/link";

/**
 * 
 * @param {iconClassName, content, title} params 
 * @returns Item componect
 */
const LoginMenuItem = (params) => {
  return (
    <React.Fragment>
      <div className="log-menu-item">
        <Link href={params.action}>
          <a>
            <span className="icon-area">
              <i
                className={
                  params.iconClassName
                    ? params.iconClassName
                    : "fas fa-suitcase"
                }
              ></i>
            </span>
            <span className="text">
              <span className="title">{params.title}</span>
              <span className="content">{params.content}</span>
            </span>
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default LoginMenuItem;
