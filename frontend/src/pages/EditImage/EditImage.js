import React from "react";
import Card from "../../components/shared/InterfaceElements/Card/Card";
import Input from "../../components/shared/InterfaceElements/Input/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../../components/shared/InterfaceElements/Button/Button";

const EditImage = () => {
  const [formState, inputHandler, setForm] = useForm(
    {
      title: {
        value: "testowa_nazwa",
        isValid: true
      },
      description: {
        value: "test_desc",
        isValid: true
      }
    },
    true
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
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          onInput={inputHandler}
          label="Description :"
          validators={[VALIDATOR_REQUIRE()]}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <Button isDisabled={!formState.isValid} type="confirm">
          Submit
        </Button>
      </Card>
    </form>
  );
};

export default EditImage;
