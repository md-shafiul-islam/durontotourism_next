import React from "react";

const CstSplitFieldItem = ({ index, autoTab, changehandeller, clazzName, name}) => {

  return (
    <input
      className={`form-control ${clazzName}`}
      data-index={index}
      maxLength={1}
      onKeyUp={autoTab}
      onChange={changehandeller}
      name={name}
    />
  );
};

export default CstSplitFieldItem;
