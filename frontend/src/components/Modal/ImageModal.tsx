import React, { useContext } from "react";
import Modal from "./Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import Input from "../Input/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../Button/Button";
import { useForm } from "../../hooks/useForm";
import { IFormStateProperty } from "../../interfaces/IuseForm";
import { AuthContext } from "../../context/auth-context";
import { API_IMAGES } from "../../API/API";
import { useHttp } from "../../hooks/useHttp";

import "./ImageModal.scss";
import { ImageModalContext } from "../../context/image-modal-context";

interface IAddImageFormState {
  title: IFormStateProperty;
  description: IFormStateProperty;
  image: IFormStateProperty;
}

const defaultAddImageForm: IAddImageFormState = {
  title: {
    value: "",
    isValid: false,
  },
  description: {
    value: "",
    isValid: false,
  },
  image: {
    value: "",
    isValid: false,
  },
};

const ImageModal = () => {
  const [formState, inputHandler] = useForm(defaultAddImageForm, false);
  const { userData } = useContext(AuthContext);
  const imageContext: any = useContext(ImageModalContext);

  const { isValid, inputs } = formState;
  const { title, description, image } = inputs;
  const { post, data, isLoading } = useHttp();

  const submitForm = async (ev) => {
    ev.preventDefault();

    const { isValid, inputs } = formState;
    const { title, description, image } = inputs;

    if (isValid) {
      const formData = new FormData();
      formData.append("name", title.value);
      formData.append("description", description.value);
      formData.append("author", userData.id);
      formData.append("image", image.value);

      await post(API_IMAGES, formData);
    }
  };

  return (
    <Modal
      onCancel={imageContext.closeImageModal}
      isVisible={imageContext.isActive}
      className="image-modal"
    >
      <form onSubmit={submitForm}>
        <Input
          id="title"
          onInput={inputHandler}
          label="Image name:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        />
        <ImageUpload id="image" onChange={inputHandler} alt="image-preview" />
        <Input
          id="description"
          onInput={inputHandler}
          label="Description :"
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Button isDisabled={!formState.isValid} confirmation>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default ImageModal;