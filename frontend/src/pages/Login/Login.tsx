import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/authContext";
import ErrorModal from "../../components/Modal/ErrorModal";
import AuthenticateLayout from "../../components/AuthenticateLayout/AuthenticateLayout";
import { IFormStateProperty } from "../../interfaces/IuseForm";
import { sendLoginRequest } from "../../API/auth";

interface ILoginFormState {
  nickname: IFormStateProperty;
  password: IFormStateProperty;
}

const defaultLoginInputs: ILoginFormState = {
  nickname: {
    value: "",
    isValid: true,
  },
  password: {
    value: "",
    isValid: true,
  },
};

export default (): JSX.Element => {
  const history = useHistory();
  const [formState, inputHandler] = useForm<ILoginFormState>(
    defaultLoginInputs
  );

  const [error, setError] = useState(null);
  const { setLogged } = useContext(AuthContext);

  const onSendForm = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await sendLoginRequest(
      {
        name: formState.inputs.nickname.value,
        password: formState.inputs.password.value,
      },
      setLogged,
      setError
    );
  };

  const onRegisterRedirect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push("/register");
  };

  return (
    <>
      <ErrorModal
        error={error}
        onCancel={() => {
          setError(null);
        }}
      />
      <AuthenticateLayout title="Log in">
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
        <Button formElement secondary onClick={onRegisterRedirect}>
          Create Account
        </Button>
      </AuthenticateLayout>
    </>
  );
};
