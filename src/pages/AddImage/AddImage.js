import React, { useReducer, useCallback } from "react";
import Card from "../../components/shared/InterfaceElements/Card/Card";
import Input from "../../components/shared/InterfaceElements/Input/Input";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../components/utils/validators";
import Button from "../../components/shared/InterfaceElements/Button/Button";
import "./AddImage.scss";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormValid = true;

      for (const inputID in state.inputs) {
        if (inputID === action.inputId) {
          isFormValid = isFormValid && action.isValid;
          console.log(inputID, isFormValid);
        } else {
          isFormValid = isFormValid && state.inputs[inputID].isValid;
          console.log(inputID, isFormValid);
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: isFormValid
      };
    default:
      return state;
  }
};
const AddImage = () => {
  const inputHandler = useCallback((id, value, isValid) => {
    dispatchFormChange({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputID: id
    });
  }, []);

  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });

  const submitForm = event => {
    event.prevetDefault();
  };

  return (
    <form onSubmit={submitForm} className="image-add">
      <Card>
        <Input
          id="title"
          onInput={inputHandler}
          label="Image name:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        />
        <Input
          id="description"
          onInput={inputHandler}
          label="Description :"
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Button isDisabled={!formState.isValid} type="confirm">
          Submit
        </Button>
      </Card>
    </form>
  );
};

export default AddImage;
