import React from "react";

import "./DesktopNav.scss";

const DesktopNav = ({ children }) => {
  return <nav className="desktop-navigation">{children}</nav>;
};

export default DesktopNav;
