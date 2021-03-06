import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../utils/validators";
import AuthenticateLayout from "../../components/AuthenticateLayout/AuthenticateLayout";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/authContext";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { IFormStateProperty } from "../../interfaces/IuseForm";
import ErrorModal from "../../components/Modal/ErrorModal";
import { sendRegisterRequest } from "../../API/auth";

interface IRegisterFormState {
  nickname: IFormStateProperty;
  password: IFormStateProperty;
  email: IFormStateProperty;
  avatar: IFormStateProperty;
}

const defaultRegisterInputs: IRegisterFormState = {
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
};

export default (): JSX.Element => {
  const history = useHistory();
  const { setLogged } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [formState, inputHandler] = useForm<IRegisterFormState>(
    defaultRegisterInputs
  );

  const { isValid, inputs } = formState;
  const { nickname, password, email, avatar } = inputs;

  const onRegisterAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (isValid) {
      const registerResponse = await sendRegisterRequest(
        {
          nickname: nickname.value,
          password: password.value,
          email: email.value,
          avatar: avatar.value,
        },
        setError
      );

      if (registerResponse) setLogged(registerResponse);
    }
  };

  const onLoginRedirect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <>
      <ErrorModal
        error={error}
        onCancel={() => {
          setError(null);
        }}
      />
      <AuthenticateLayout title="Register">
        <Input
          id="nickname"
          onInput={inputHandler}
          label="Nickname:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          value={nickname.value}
          isValid={nickname.isValid}
        />
        <Input
          id="password"
          onInput={inputHandler}
          type="password"
          label="Password:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          value={password.value}
          isValid={password.isValid}
        />
        <ImageUpload alt="avatar" id="avatar" onChange={inputHandler} />
        <Input
          id="email"
          onInput={inputHandler}
          label="Email:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          value={email.value}
          isValid={email.isValid}
        />
        <Button
          isDisabled={!isValid}
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
    </>
  );
};
