import React from "react";

import "./Cards.scss";

interface ICardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className }: ICardProps) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
