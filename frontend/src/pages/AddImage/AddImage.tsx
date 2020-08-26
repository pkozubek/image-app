import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import Button from "../../components/Button/Button";
import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../API/API";
import { useHistory } from "react-router-dom";
import "./AddImage.scss";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { AuthContext } from "../../context/auth-context";
import { IFormStateProperty } from "../../interfaces/IuseForm";

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

const AddImage = () => {
  const { post, data, isLoading } = useHttp();
  const history = useHistory();
  const { userData } = useContext(AuthContext);
  const [formState, inputHandler] = useForm(defaultAddImageForm, false);

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
        <Modal isVisible={isLoading}>
          <Spinner />
        </Modal>
      </Card>
    </form>
  );
};

export default AddImage;
