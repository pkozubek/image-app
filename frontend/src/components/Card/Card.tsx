import React from "react";

import "./Cards.scss";

interface ICardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: () => void;
  center?: boolean;
}

const Card = ({ children, className, center }: ICardProps) => {
  return (
    <div className={`card ${center && " card--center"} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
