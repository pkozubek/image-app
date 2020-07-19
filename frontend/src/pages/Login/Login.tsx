import React, { useState, useContext } from "react";
import axios from "axios";

import { useForm } from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../../components/Modal/ErrorModal";
import AuthenticateLayout from "../../components/AuthenticateLayout/AuthenticateLayout";

interface IformDateInterface {
  name: string;
  password: string;
  email?: string;
}

export const Authenticate = () => {
  const [formState, inputHandler, setForm] = useForm({
    nickname: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    isValid: false,
  });

  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);

  const onSendForm = async (event) => {
    event.preventDefault();

    const path = "http://localhost:4000/api/users/login";
    const formData: IformDateInterface = {
      name: formState.inputs.nickname.value,
      password: formState.inputs.password.value,
    };

    await axios
      .post(path, formData)
      .then((response) => {
        if (response.status === 200) {
          auth.setLogged(true);
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      });
  };

  return (
    <>
      <ErrorModal
        error={error}
        onCancel={() => {
          setError(null);
        }}
      />
      <AuthenticateLayout>
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
          label="Password:"
          type="password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          value={formState.inputs.password.value}
          isValid={formState.inputs.password.isValid}
        />
        <Button
          isDisabled={!formState.isValid}
          formElement
          primary
          onClick={onSendForm}
        >
          Log in
        </Button>
        <Button formElement secondary onClick={onSendForm}>
          Create Account
        </Button>
      </AuthenticateLayout>
    </>
  );
};

export default Authenticate;
