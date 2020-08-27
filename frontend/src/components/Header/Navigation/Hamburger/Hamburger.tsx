import React from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Button from "../../../Button/Button";

import "./Hamburger.scss";

interface IHamubrgerProps {
  isMenuActive: boolean;
  onClick: () => void;
}

export default ({ isMenuActive, onClick }: IHamubrgerProps): JSX.Element => {
  return (
    <Button transparent className="hamburger" onClick={onClick}>
      {isMenuActive ? (
        <GiCancel className="hamburger__icon" />
      ) : (
        <GiHamburgerMenu className="hamburger__icon" />
      )}
    </Button>
  );
};
