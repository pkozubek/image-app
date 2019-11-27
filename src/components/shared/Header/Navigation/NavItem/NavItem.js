import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ link, children: name }) => {
  return (
    <NavLink to={link}>
      <li>{name}</li>
    </NavLink>
  );
};

export default NavItem;
