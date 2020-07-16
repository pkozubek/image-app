import React from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../../components/Button/Button";
import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../helpers/url";
import { useHistory } from "react-router-dom";
import "./AddImage.scss";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

const AddImage = () => {
  const { post, data, isLoading } = useHttp();
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      url: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitForm = async (ev) => {
    ev.preventDefault();

    const { isValid, inputs } = formState;
    const { title, description, url } = inputs;

    if (isValid) {
      await post(API_IMAGES, {
        name: title.value,
        description: description.value,
        url: url.value,
        author: "5e5ec63223439e067c5671fd",
      });
    }
  };

  if (data !== null) {
    history.push(`/image/${data.id}`);
  }

  return (
    <form className="image-add" onSubmit={submitForm}>
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
        <Input
          id="url"
          onInput={inputHandler}
          label="Image url :"
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Button isDisabled={!formState.isValid} type="confirm">
          Submit
        </Button>
        <Modal isVisible={isLoading}>
          <Spinner />
        </Modal>
      </Card>
    </form>
  );
};

export default AddImage;
