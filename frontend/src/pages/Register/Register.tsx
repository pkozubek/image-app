import React from "react";

import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../utils/validators";

export default (): JSX.Element => {
  const [formState, inputHandler, setForm] = useForm({
    nickname: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    isValid: false,
  });

  const onRegisterAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const path = "http://localhost:4000/api/users/register";
    const formData = {
      name: formState.inputs.nickname.value,
      password: formState.inputs.password.value,
      email: formState.inputs.email.value,
    };
  };

  return (
    <form>
      <Input
        id="nickname"
        onInput={inputHandler}
        label="Nickname:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.nickname.value}
        isValid={formState.inputs.nickname.isValid}
      />
      <Input
        id="password"
        onInput={inputHandler}
        type="password"
        label="Password:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.password.value}
        isValid={formState.inputs.password.isValid}
      />
      <Input
        id="email"
        onInput={inputHandler}
        label="Email:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        value={formState.inputs.email.value}
        isValid={formState.inputs.email.isValid}
      />
    </form>
  );
};
