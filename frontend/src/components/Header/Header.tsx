import React, { useState } from "react";

import UserLogged from "./UserLogged/UserLogged";
import Logo from "../Logo/Logo";
import DesktopNav from "./Navigation/DesktopNav/DesktopNav";
import MobileNav from "./Navigation/MobileNav/MobileNav";
import NavItems from "./Navigation/NavItems/NavItems";
import Backdrop from "../Backdrop/Backdrop";
import Hamburger from "./Navigation/Hamburger/Hamburger";

import "./Header.scss";

const Header = (): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuVisiblityHandler = () => setIsMenuVisible(!isMenuVisible);

  return (
    <header className="header">
      <UserLogged />
      <nav className="header__navigation">
        <Logo clickable />
        <DesktopNav />
        <MobileNav isVisible={isMenuVisible}>
          <NavItems onClick={menuVisiblityHandler} />
        </MobileNav>
        {isMenuVisible ? (
          <Backdrop clickHandler={menuVisiblityHandler} />
        ) : null}
        <Hamburger
          isMenuActive={isMenuVisible}
          onClick={menuVisiblityHandler}
        />
      </nav>
    </header>
  );
};

export default Header;
