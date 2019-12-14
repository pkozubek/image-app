import React from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import NavItems from "../NavItems/NavItems";
import "./MobileNav.scss";

const MobileNav = ({ isVisible }) => {
  const mobileMenu = (
    <CSSTransition
      in={isVisible}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="mobile-menu">
        <NavItems />
      </aside>
    </CSSTransition>
  );
  return ReactDom.createPortal(
    mobileMenu,
    document.getElementById("mobile-menu-hook")
  );
};

export default MobileNav;
