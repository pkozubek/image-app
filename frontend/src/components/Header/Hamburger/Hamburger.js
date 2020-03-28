import React from "react";

import "./Hamburger.scss";

const Hamburger = ({ clickHandler }) => {
  return (
    <button onClick={clickHandler} className="hamburger-icon">
      <span className="hamburger-icon__bar" />
      <span className="hamburger-icon__bar" />
      <span className="hamburger-icon__bar" />
    </button>
  );
};

export default Hamburger;
