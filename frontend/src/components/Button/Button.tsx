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
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
}: IButtonProps) => {
  const returnClassNames = () => {
    const classNames = ["button"];

    if (isDisabled) classNames.push("button--disabled");
    if (className) classNames.push(className);
    if (formElement) classNames.push(`button--form`);
    if (modalElement) classNames.push(`button--modal`);
    if (primary) classNames.push(`button--primary`);
    if (secondary) classNames.push(`button--secondary`);
    if (transparent) classNames.push(`button--transparent`);

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
