import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API_IMAGES, updateImageData } from "../../API/images";
import { AuthContext } from "../../context/authContext";
import { ImageModalContext } from "../../context/uiContext";
import { useForm } from "../../hooks/useForm";
import { useHttp } from "../../hooks/useHttp";
import { IFormStateProperty } from "../../interfaces/IuseForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import Button from "../Button/Button";
import ImageUpload from "../ImageUpload/ImageUpload";
import Input from "../Input/Input";

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

interface IModalFormProps {
  onSubmitSucces?: () => void;
}

const ImageForm = ({ onSubmitSucces }: IModalFormProps) => {
  const { userData } = useContext(AuthContext);
  const imageContext = useContext(ImageModalContext);
  const history = useHistory();

  const [formState, inputHandler, setForm] = useForm(
    defaultAddImageForm,
    false
  );

  const { post } = useHttp();
  const { isValid, inputs } = formState;
  const { title, description, image } = inputs;

  const submitForm = async (ev) => {
    ev.preventDefault();

    if (isValid) {
      const formData = new FormData();
      formData.append("name", title.value);
      formData.append("description", description.value);
      formData.append("author", userData.id);
      formData.append("image", image.value);

      await post(API_IMAGES, formData);
      if (onSubmitSucces) onSubmitSucces();

      if (history.location.pathname === "/") window.location.reload();
      else history.push("/");
    }
  };

  const updateImage = async (ev) => {
    ev.preventDefault();

    await updateImageData(imageContext.imageData.id, {
      name: title.value,
      description: description.value,
    });

    window.location.reload();
  };

  useEffect(() => {
    if (imageContext.imageData) {
      console.log(imageContext.imageData);
      setForm(
        {
          title: {
            value: imageContext.imageData.name,
            isValid: false,
          },
          description: {
            value: imageContext.imageData.description,
            isValid: false,
          },
          image: {
            value: "",
            isValid: true,
          },
        },
        true
      );
    }
  }, [imageContext.imageData, setForm]);

  return (
    <form onSubmit={imageContext.imageData ? updateImage : submitForm}>
      <Input
        id="title"
        onInput={inputHandler}
        label="Image name:"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={title.value}
      />
      {!imageContext.imageData && (
        <ImageUpload id="image" onChange={inputHandler} alt="image-preview" />
      )}
      <Input
        id="description"
        onInput={inputHandler}
        label="Description :"
        validators={[VALIDATOR_REQUIRE()]}
        value={description.value}
      />
      <Button isDisabled={!formState.isValid} confirmation>
        {imageContext.imageData ? "Edit" : "Submit"}
      </Button>
    </form>
  );
};

export default ImageForm;
