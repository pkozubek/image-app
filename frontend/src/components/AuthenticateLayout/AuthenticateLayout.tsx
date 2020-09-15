import React from "react";

import Logo from "../Logo/Logo";
import Card from "../Card/Card";

import "./AuthenticateLayout.scss";

interface authenticateLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export default ({ children, title }: authenticateLayoutProps): JSX.Element => {
  return (
    <Card center className="Authenticate">
      <Logo dark />
      <form className="Authenticate__form">
        <h1 className="Authenticate__form__title">{title}</h1>
        {children}
      </form>
    </Card>
  );
};
