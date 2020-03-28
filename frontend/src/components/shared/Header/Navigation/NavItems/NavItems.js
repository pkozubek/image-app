import React, { useContext } from "react";
import NavItem from "./NavItem/NavItem";
import { AuthContext } from "../../../../../context/auth-context";
import "./NavItem.scss";

const NavItemContainer = () => {
  return (
    <ul className="menu-items">
      <NavItem link={"/users"}>Users</NavItem>
      <NavItem link={"/images"}>Images</NavItem>
      <NavItem link={"/add_image"} add>
        Add Image
      </NavItem>
    </ul>
  );
};

export default NavItemContainer;
