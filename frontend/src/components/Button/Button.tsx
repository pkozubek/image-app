import React from "react";

import "./Button.scss";

interface ButtonProps {
  children: JSX.Element | string;
  type?: string;
  className?: string;
  textColor?: string;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const returnClassNames = (
  disabled: boolean,
  className: string,
  textColor: string,
  type: string
) => {
  const classNames = ["button"];

  if (type) classNames.push(`button--${type}`);
  if (disabled) classNames.push("button--disabled");
  if (className) classNames.push(className);
  if (textColor) classNames.push(`button--${textColor}`);

  return classNames;
};

const Button = ({
  children,
  onClick,
  type,
  className,
  textColor,
  isDisabled,
}: ButtonProps) => {
  const classNames = returnClassNames(isDisabled, className, textColor, type);
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={classNames.join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
