import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import Hamburger from "./Hamburger/Hamburger";

import "./Header.scss";

const Header = () => {
  const [mobileMenuVisible, mobileMenuClickHandler] = useState(false);

  return (
    <header className="header">
      <Hamburger
        clickHandler={() => mobileMenuClickHandler(!mobileMenuVisible)}
      />
      <Link className="header__link" to="/">
        <h1 className="header__site-name">Image-app</h1>
      </Link>
      <Navigation
        isMobileMenuVisible={mobileMenuVisible}
        hideMenu={mobileMenuClickHandler}
      />
    </header>
  );
};

export default Header;
