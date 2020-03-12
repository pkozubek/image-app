import React, { useContext } from "react";
import NavItem from "./NavItem/NavItem";
import { AuthContext } from "../../../../../context/auth-context";
import "./NavItem.scss";

const NavItemContainer = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className="menu-items">
      <NavItem link={"/users"}>Users</NavItem>
      <NavItem link={"/images"}>Images</NavItem>
      {auth.isLoggedIn ? (
        <NavItem link={"/add_image"}>Add Image</NavItem>
      ) : null}
      {!auth.isLoggedIn ? (
        <NavItem link={"/authenticate"}>Authenticate</NavItem>
      ) : (
        <NavItem link={"/logout"}>Logout</NavItem>
      )}
    </ul>
  );
};

export default NavItemContainer;
