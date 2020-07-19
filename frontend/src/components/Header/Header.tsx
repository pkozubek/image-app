import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import Hamburger from "./Hamburger/Hamburger";
import UserLogged from "./UserLogged/UserLogged";
import Logo from "../Logo/Logo";

import "./Header.scss";

const Header = () => {
  const [mobileMenuVisible, mobileMenuClickHandler] = useState(false);

  return (
    <>
      <UserLogged />
      <header className="header">
        <Logo clickable />
        <Navigation
          isMobileMenuVisible={mobileMenuVisible}
          hideMenu={mobileMenuClickHandler}
        />
        <Hamburger
          clickHandler={() => mobileMenuClickHandler(!mobileMenuVisible)}
        />
      </header>
    </>
  );
};

export default Header;
