import React from "react";
import Card from "../../components/shared/InterfaceElements/Card/Card";
import Input from "../../components/shared/InterfaceElements/Input/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../../components/shared/InterfaceElements/Button/Button";
import "./AddImage.scss";

const AddImage = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );
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
