import React from "react";

import "./Cards.scss";

interface CardPropsInterface {
  children: JSX.Element | string;
  className: string;
}

const Card = ({ children, className }: CardPropsInterface) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
