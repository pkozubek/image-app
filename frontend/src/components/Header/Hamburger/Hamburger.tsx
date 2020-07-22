import React from "react";

import { IHamburgerProps } from "../../../interfaces/components/IHamburger";

import "./Hamburger.scss";

export default ({ onClick }: IHamburgerProps): JSX.Element => {
  return (
    <button onClick={onClick} className="hamburger-icon">
      <span className="hamburger-icon__bar" />
      <span className="hamburger-icon__bar" />
      <span className="hamburger-icon__bar" />
    </button>
  );
};
