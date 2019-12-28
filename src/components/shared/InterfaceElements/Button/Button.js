import React from "react";

import "./Button.scss";

const returnClassNames = (disabled, className, textColor, type) => {
  const classNames = ["button"];

  if (type) classNames.push(`button--${type}`);
  if (disabled) classNames.push("button--disabled");
  if (className) classNames.push(className);
  if (textColor) classNames.push(`button--${textColor}`);

  return classNames;
};

const Button = ({
  children,
  action,
  type,
  className,
  textColor,
  isDisabled
}) => {
  console.log(type);
  const classNames = returnClassNames(isDisabled, className, textColor, type);
  console.log(classNames);
  return (
    <button
      disabled={isDisabled}
      onClick={action}
      className={classNames.join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
