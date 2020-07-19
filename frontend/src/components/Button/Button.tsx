import React from "react";

import "./Button.scss";

interface ButtonProps {
  children: JSX.Element | string;
  className?: string;
  textColor?: string;
  isDisabled?: boolean;
  formElement?: boolean;
  primary?: boolean;
  secondary?: boolean;
  transparent?: boolean;
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
}: ButtonProps) => {
  const returnClassNames = () => {
    const classNames = ["button"];

    if (isDisabled) classNames.push("button--disabled");
    if (className) classNames.push(className);
    if (formElement) classNames.push(`button--form`);
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
