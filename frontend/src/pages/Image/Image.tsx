import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../API/images";
import Button from "../../components/Button/Button";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import ImageForm from "./ImageForm";
import "./Image.scss";
import Spinner from "../../components/Spinner/Spinner";

export default function Image() {
  const params: { id: string } = useParams();
  const imageId = params.id;
  const history = useHistory();

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isEdited, setEdited] = useState(false);
  const { get, del, data, isLoading } = useHttp();

  useEffect(() => {
    get(`${API_IMAGES}/${imageId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = () => {
    setConfirmationVisible(true);
  };

  const onEdit = () => {
    setEdited(true);
  };

  const onConfirm = async () => {
    await del(`${API_IMAGES}/${imageId}`);
    history.push("/");
  };

  let content: JSX.Element | String = <Spinner />;

  if (!isLoading && data !== null) {
    const { image } = data;
    if (image) {
      content = (
        <>
          <figure className="image-page__figure">
            <img
              className="image-page__img"
              src={`${image.url}`}
              alt={image.name}
            />
          </figure>
          {isEdited ? (
            <ImageForm name={image.name} />
          ) : (
            <>
              <h2 className="image-page__title">{image.name}</h2>
              <p className="image-page__description">{image.description}</p>
              <Button onClick={onEdit}>Edit Image data</Button>
            </>
          )}
          <Button onClick={onDelete}>Delete Image</Button>
        </>
      );
    }
  }

  return (
    <div className="image-page__container">
      {content}
      <ConfirmationModal
        question="Do you realy want to delete this ?"
        isVisible={isConfirmationVisible}
        onConfirm={onConfirm}
      />
    </div>
  );
}
