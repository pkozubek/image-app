import React from "react";

import DesktopNav from "./DesktopNav/DesktopNav";
import MobileNav from "./MobileNav/MobileNav";
import Backdrop from "../../InterfaceElements/Backdrop/Backdrop";
import NavItems from "./NavItems/NavItems";

const Navigation = ({ isMobileMenuVisible, hideMenu }) => {
  return (
    <>
      <DesktopNav>
        <NavItems />
      </DesktopNav>
      <MobileNav isVisible={isMobileMenuVisible}>
        <NavItems />
      </MobileNav>
      {isMobileMenuVisible ? (
        <Backdrop clickHandler={() => hideMenu(!isMobileMenuVisible)} />
      ) : null}
    </>
  );
};

export default Navigation;
