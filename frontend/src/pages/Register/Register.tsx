import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../utils/validators";
import AuthenticateLayout from "../../components/AuthenticateLayout/AuthenticateLayout";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/auth-context";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { API_USER_REGISTER } from "../../API/API";

export default (): JSX.Element => {
  const history = useHistory();
  const [setError] = useState(null);
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm({
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
    avatar: {
      value: "",
      isValid: true,
    },
    isValid: false,
  });

  const onRegisterAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const formData = {
      name: formState.inputs.nickname.value,
      password: formState.inputs.password.value,
      email: formState.inputs.email.value,
    };

    await axios
      .post(API_USER_REGISTER, formData)
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

  const onLoginRedirect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <AuthenticateLayout title="Register">
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
      <ImageUpload alt="avatar" id="avatar" onChange={inputHandler} />
      <Input
        id="email"
        onInput={inputHandler}
        label="Email:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        value={formState.inputs.email.value}
        isValid={formState.inputs.email.isValid}
      />
      <Button
        isDisabled={!formState.isValid}
        formElement
        primary
        onClick={onRegisterAccount}
      >
        Register
      </Button>
      <Button formElement secondary onClick={onLoginRedirect}>
        Back to Login
      </Button>
    </AuthenticateLayout>
  );
};
