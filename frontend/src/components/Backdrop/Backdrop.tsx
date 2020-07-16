import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.scss";

interface BackdropInterface {
  clickHandler?: () => void;
}

const Backdrop = ({ clickHandler }: BackdropInterface) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={clickHandler}></div>,
    document.getElementById("backdrop-hook") as HTMLElement
  );
};

export default Backdrop;
