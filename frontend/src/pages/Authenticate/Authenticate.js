import React, { useState, useContext } from "react";
import { useForm } from "../../hooks/form-hook";
import Card from "../../components/shared/InterfaceElements/Card/Card";
import Input from "../../components/shared/InterfaceElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "../../components/utils/validators";
import Button from "../../components/shared/InterfaceElements/Button/Button";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import LoadingSpinner from "../../components/shared/InterfaceElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/shared/InterfaceElements/ErrorModal";
import "./Authenticate.scss";

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

  const [error, setError] = useState(null);
  const [isLoginMode, changeLoginMode] = useState(true);
  const { setLogged } = useContext(AuthContext);

  const onSendForm = async event => {
    event.preventDefault();

    let path = "http://localhost:4000/api/users/register";
    let formData = {
      name: formState.inputs.nickname.value,
      password: formState.inputs.password.value,
      email: formState.inputs.email.value
    };

    if (isLoginMode) {
      path = "http://localhost:4000/api/users/login";
      formData = {
        name: formState.inputs.nickname.value,
        password: formState.inputs.password.value
      };
    }

    await axios
      .post(path, formData)
      .then(response => {
        if (response.status === 200) {
          setLogged(true);
        }
      })
      .catch(({ response }) => {
        setError(response.data.message);
      });
  };

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
    <>
      <ErrorModal error={error} onCancel={() => setError(null)} />
      <Card className="authenticate">
        <form>
          {formInputs}
          <Button
            isDisabled={!formState.isValid}
            type="confirm"
            action={event => {
              event.preventDefault();
              onSendForm(event);
            }}
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
