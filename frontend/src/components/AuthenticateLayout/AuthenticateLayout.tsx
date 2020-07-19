import React from "react";

import Logo from "../Logo/Logo";
import Card from "../Card/Card";

import "./AuthenticateLayout.scss";

interface authenticateLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default ({ children }: authenticateLayoutProps): JSX.Element => {
  return (
    <Card className="Authenticate">
      <Logo dark />
      <form className="Authenticate__form">{children}</form>
    </Card>
  );
};
