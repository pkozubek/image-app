import React, { useReducer, useEffect } from "react";

import "./Input.scss";
import { validate } from "../../utils/validators";

interface IInputProps {
  label: string;
  id: string;
  placeholder?: string;
  type?: "text" | "password";
  value?: string;
  isValid?: boolean;
  validators;
  onInput;
}

const inputReduer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  label,
  id,
  placeholder,
  type,
  value,
  isValid,
  validators,
  onInput,
}: IInputProps) => {
  const [inputState, dispatchChange] = useReducer(inputReduer, {
    value: value || "",
    isValid: isValid || false,
    isTouched: false,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatchChange({
      type: "CHANGE",
      value: event.target.value,
      validators: validators,
    });
  };

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [onInput, id, inputState.value, inputState.isValid]);

  useEffect(() => {
    dispatchChange({
      type: "CHANGE",
      value: value,
      validators: validators,
    });
  }, [value, validators]);

  const handleTouching = () => {
    dispatchChange({ type: "TOUCH" });
  };

  return (
    <div className="form-input">
      <label
        className={`form-input__label ${
          !inputState.isValid &&
          inputState.isTouched &&
          "form-input__label--error"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        onChange={changeHandler}
        id={id}
        value={inputState.value}
        placeholder={placeholder}
        type={type}
        onBlur={handleTouching}
        className={`form-input__input ${
          !inputState.isValid &&
          inputState.isTouched &&
          "form-input__input--error"
        }`}
      />
    </div>
  );
};

export default Input;
