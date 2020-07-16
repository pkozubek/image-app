import React, { useState, useContext } from "react";
import axios from "axios";

import { useForm } from "../../hooks/useForm";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../utils/validators";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../../components/Modal/ErrorModal";

import "./Login.scss";

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
    email: {
      value: "",
      isValid: true,
    },
    isValid: false,
  });

  const [error, setError] = useState(null);
  const [isLoginMode, changeLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const onSendForm = async (event) => {
    event.preventDefault();

    let path = "http://localhost:4000/api/users/login";
    let formData: IformDateInterface = {
      name: formState.inputs.nickname.value,
      password: formState.inputs.password.value,
    };
    if (!isLoginMode) {
      path = "http://localhost:4000/api/users/register";
      formData = {
        name: formState.inputs.nickname.value,
        password: formState.inputs.password.value,
        email: formState.inputs.email.value,
      };
    }

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

  const handleLogChange = () => {
    if (!isLoginMode) {
      setForm(
        {
          ...formState.inputs,
          email: undefined,
        },
        false
      );
    } else {
      setForm(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    changeLoginMode((prevIsLogin) => !prevIsLogin);
  };

  const formInputs = isLoginMode ? (
    <>
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
    </>
  ) : (
    <>
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
    </>
  );

  return (
    <>
      <ErrorModal
        error={error}
        onCancel={() => {
          setError(null);
        }}
      />
      <Card className="authenticate">
        <form>
          {formInputs}
          <Button
            isDisabled={!formState.isValid}
            type="confirm"
            onClick={onSendForm}
          >
            {isLoginMode ? "Log in" : "Create Account"}
          </Button>
          <p onClick={handleLogChange}>
            {isLoginMode ? "Dont have account? Register!" : "Want to log in!"}
          </p>
        </form>
      </Card>
    </>
  );
};

export default Authenticate;
