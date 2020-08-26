import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import UserLogged from "./UserLogged/UserLogged";
import Logo from "../Logo/Logo";
import DesktopNav from "./Navigation/DesktopNav/DesktopNav";
import MobileNav from "./Navigation/MobileNav/MobileNav";
import NavItems from "./Navigation/NavItems/NavItems";
import Backdrop from "../Backdrop/Backdrop";

import "./Header.scss";

const Header = (): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuVisiblityHandler = () => setIsMenuVisible(!isMenuVisible);

  return (
    <header>
      <UserLogged />
      <nav className="navigation">
        <Logo clickable />
        <DesktopNav />
        <MobileNav isVisible={isMenuVisible}>
          <NavItems />
        </MobileNav>
        {isMenuVisible ? (
          <Backdrop clickHandler={menuVisiblityHandler} />
        ) : null}
        <GiHamburgerMenu
          className="navigation__hamburger"
          onClick={menuVisiblityHandler}
        />
      </nav>
    </header>
  );
};

export default Header;
