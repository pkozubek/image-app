import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.scss";

const NavItem = ({ link, children: name }) => {
  return (
    <NavLink
      to={link}
      className="menu-item__link"
      activeClassName="menu-item__active-link"
    >
      <li className="menu-item">{name}</li>
    </NavLink>
  );
};

export default NavItem;
