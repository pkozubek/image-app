import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.scss";

interface INavItemProps {
  link: string;
  exact?: boolean;
  children: JSX.Element | string;
  add?: boolean;
}

const NavItem = ({ link, children: name, add, exact }: INavItemProps) => {
  let classes = "menu-item";
  if (add) classes += " menu_item--add";

  return (
    <NavLink
      exact={exact}
      to={link}
      className="menu-item__link"
      activeClassName="menu-item__active-link"
    >
      <li className={classes}>{name}</li>
    </NavLink>
  );
};

export default NavItem;
