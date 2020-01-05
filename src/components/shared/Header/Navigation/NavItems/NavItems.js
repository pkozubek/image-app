import React from "react";
import NavItem from "./NavItem/NavItem";
import "./NavItem.scss";

const NavItemContainer = () => {
  return (
    <ul className="menu-items">
      <NavItem link={"/users"}>Users</NavItem>
      <NavItem link={"/images"}>Images</NavItem>
      <NavItem link={"/add_image"}>Add Image</NavItem>
      <NavItem link={"/authenticate"}>Authenticate</NavItem>
    </ul>
  );
};

export default NavItemContainer;
