import React from "react";
import NavItem from "../NavItem/NavItem";

const DesktopNav = () => {
  return (
    <nav className="desktop-navigation">
      <ul>
        <NavItem link="/users" exact>
          Users
        </NavItem>
        <NavItem link="/images" exact>
          Images
        </NavItem>
      </ul>
    </nav>
  );
};

export default DesktopNav;
