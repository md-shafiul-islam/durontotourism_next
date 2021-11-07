import React from "react";
import Link from "next/link";

const EsActionLink = ({iconClassName, action, text}) => {
  return (
    <Link href={action}>
      <a>
        <span className="icon-area">
          <i className={iconClassName ? iconClassName : ""}></i>
        </span>
        <span className="text">{text}</span>
      </a>
    </Link>
  );
};

export default EsActionLink;
