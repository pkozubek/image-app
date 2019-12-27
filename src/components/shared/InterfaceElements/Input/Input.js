import React, { useReducer } from "react";

import "./Input.scss";
import { validate } from "../../../utils/validators";

const inputReduer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = ({ label, id, placeholder, type, validators }) => {
  const [inputState, dispatchChange] = useReducer(inputReduer, {
    value: "",
    isValid: false,
    isTouched: false
  });

  console.log(validators);
  const changeHandler = event => {
    dispatchChange({
      type: "CHANGE",
      value: event.target.value,
      validators: validators
    });
  };

  const handleTouching = () => {
    dispatchChange({ type: "TOUCH" });
  };

  return (
    <div className="form-input">
      <label className="form-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        onChange={changeHandler}
        id={id}
        value={inputState.value}
        placeholder={placeholder}
        type={type}
        onBlur={handleTouching}
        className={`form-input__input ${!inputState.isValid &&
          inputState.isTouched &&
          "form-input__input--error"}`}
      />
    </div>
  );
};

export default Input;
