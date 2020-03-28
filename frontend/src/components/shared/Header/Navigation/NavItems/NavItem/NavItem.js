import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.scss";

const NavItem = ({ link, children: name, add }) => {
  let classes = "menu-item";
  if (add) classes += " menu_item--add";

  return (
    <NavLink
      to={link}
      className="menu-item__link"
      activeClassName="menu-item__active-link"
    >
      <li className={classes}>{name}</li>
    </NavLink>
  );
};

export default NavItem;
