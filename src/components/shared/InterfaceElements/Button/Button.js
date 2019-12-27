import React from "react";

import "./Button.scss";

const Button = ({ children, action, type, className, textColor }) => {
  return (
    <button
      className={`button button--${type}  ${textColor &&
        `button--${textColor}`} ${className}`}
      onClick={action}
    >
      {children}
    </button>
  );
};

export default Button;
