import Link from "next/link";
import React from "react";

const BasicActionLink = (props) => {
  return (
    <React.Fragment>
      <Link href={props.action}>
        <a className="basic-link" onClick={props.actionClick}>
          {props.label}
        </a>
      </Link>
    </React.Fragment>
  );
};

export default BasicActionLink;
