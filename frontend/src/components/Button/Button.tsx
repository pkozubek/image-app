import React from "react";

import { IButtonProps } from "../../interfaces/components/IButton";

import "./Button.scss";

const Button = ({
  children,
  onClick,
  className,
  isDisabled,
  formElement,
  primary,
  secondary,
  transparent,
  modalElement,
  confirmation,
  decline,
}: IButtonProps) => {
  const returnClassNames = () => {
    const classNames = ["button"];

    if (className) classNames.push(className);
    if (formElement) classNames.push(`button--form`);
    if (modalElement) classNames.push(`button--modal`);
    if (primary) classNames.push(`button--primary`);
    if (secondary) classNames.push(`button--secondary`);
    if (transparent) classNames.push(`button--transparent`);
    if (confirmation) classNames.push("button--confirmation");
    if (decline) classNames.push("button--decline");
    if (isDisabled) classNames.push("button--disabled");

    return classNames;
  };

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={returnClassNames().join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
