import React, { useState } from "react";
import { useForm } from "../../hooks/form-hook";
import Card from "../../components/shared/InterfaceElements/Card/Card";
import Input from "../../components/shared/InterfaceElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "../../components/utils/validators";
import Button from "../../components/shared/InterfaceElements/Button/Button";

export const Authenticate = () => {
  const [formState, inputHandler, setForm] = useForm({
    nickname: {
      value: "",
      isValid: true
    },
    password: {
      value: "",
      isValid: true
    },
    email: {
      value: "",
      isValid: true
    },
    isValid: false
  });

  const [isLoginMode, changeLoginMode] = useState(true);

  const handleLogChange = () => {
    if (!isLoginMode) {
      setForm(
        {
          ...formState.inputs,
          email: undefined
        },
        false
      );
    } else {
      setForm(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }

    changeLoginMode(prevIsLogin => !prevIsLogin);
  };

  console.log(isLoginMode, formState, "dziala");
  const formInputs = isLoginMode ? (
    <>
      <Input
        id="nickname"
        onInput={inputHandler}
        label="Nickname:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.nickname.value}
        valid={formState.inputs.nickname.isValid}
      />
      <Input
        id="password"
        onInput={inputHandler}
        label="Password:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.password.value}
        valid={formState.inputs.password.isValid}
      />
    </>
  ) : (
    <>
      <Input
        id="nickname"
        onInput={inputHandler}
        label="Nickname:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.nickname.value}
        valid={formState.inputs.nickname.isValid}
      />
      <Input
        id="password"
        onInput={inputHandler}
        label="Password:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.password.value}
        valid={formState.inputs.password.isValid}
      />
      <Input
        id="email"
        onInput={inputHandler}
        label="Email:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        value={formState.inputs.email.value}
        valid={formState.inputs.email.isValid}
      />
    </>
  );

  return (
    <Card>
      <form>
        {formInputs}
        <Button isDisabled={!formState.isValid} type="confirm">
          {isLoginMode ? "Log in" : "Create Account"}
        </Button>
        <p onClick={handleLogChange}>
          {isLoginMode ? "Dont have account? Register!" : "Want to log in!"}
        </p>
      </form>
    </Card>
  );
};

export default Authenticate;
