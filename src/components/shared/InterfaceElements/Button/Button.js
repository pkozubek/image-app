import React from "react";

import "./Button.scss";

const Button = ({ children, action, type, className }) => {
  return (
    <button className={`button button--${type} ${className}`} onClick={action}>
      {children}
    </button>
  );
};

export default Button;
