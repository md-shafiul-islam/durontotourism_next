import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CstSplitFieldItem from "./CstSplitFieldItem";

const CstSplitFieldItems = ({ count, colSize, name, getCode }) => {
  const [inputItems, setInputItems] = useState([]);

  useEffect(() => {
    const items = document.querySelectorAll(`.${name}-split-item`);
    // console.log("Current Input Items, ", items);
    setInputItems(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changehandeller = () => {
    let code = "";
    inputItems.forEach((item, idx) => {
      console.log("Curent Item Value, ", item.value);
      if (item) {
        code = code + item.value;
      }
    });
    getCode(code);
  };

  const autoTab = (e) => {
    // console.log("Curent Item Elements ", inputItems);
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let tabindex = e.target.getAttribute("data-index") || 0;
    tabindex = Number(tabindex);
    let elem = null;
    if (e.keyCode === BACKSPACE_KEY) {
      elem = tabindex > 0 && inputItems[tabindex - 1];
    } else if (e.keyCode !== DELETE_KEY) {
      elem = tabindex < inputItems.length - 1 && inputItems[tabindex + 1];
    }

    // console.log("Current Items, Selected Element ", elem);

    if (elem) {
      elem.focus();
    }
  };

  return Array.from({ length: count }, (element, index) => {
    return (
      <Col key={`i-${index}`} md={colSize} className="p2">
        <CstSplitFieldItem
          index={index}
          autoTab={autoTab}
          clazzName={`${name}-split-item `}
          changehandeller={changehandeller}
          name={`${name}-${index}`}
        />
      </Col>
    );
  });
};

export default CstSplitFieldItems;
