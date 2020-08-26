import React from "react";

import "./Button.scss";

interface IButtonProps {
  children: JSX.Element | string;
  className?: string;
  textColor?: string;
  isDisabled?: boolean;
  formElement?: boolean;
  primary?: boolean;
  secondary?: boolean;
  transparent?: boolean;
  modalElement?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  confirmation?: boolean;
  decline?: boolean;
}

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
