import React from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <h1 className="header__site-name">Image-app</h1>
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
