import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.scss";

const Backdrop = ({ clickHandler }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={clickHandler}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
