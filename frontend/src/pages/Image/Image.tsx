import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import { addViewToImage, API_IMAGES } from "../../API/images";
import Button from "../../components/Button/Button";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import "./Image.scss";
import Spinner from "../../components/Spinner/Spinner";
import { ImageModalContext } from "../../context/uiContext";

export default function Image() {
  const params: { id: string } = useParams();
  const imageId = params.id;
  const history = useHistory();
  const imageContext: any = useContext(ImageModalContext);

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const { get, del, data, isLoading } = useHttp();

  useEffect(() => {
    get(`${API_IMAGES}/${imageId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = () => {
    setConfirmationVisible(true);
  };

  const onEdit = () => {
    imageContext.openImageEdit(data.image);
  };

  const onConfirm = async () => {
    await del(`${API_IMAGES}/${imageId}`);
    history.push("/");
  };

  const onCloseModal = () => setConfirmationVisible(false);

  let content: JSX.Element | String = <Spinner />;

  useEffect(() => {
    addViewToImage(imageId);
  }, []);

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
          <h2 className="image-page__title">{image.name}</h2>
          <p className="image-page__description">{image.description}</p>
          <Button onClick={onEdit}>Edit Image data</Button>
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
        onCancel={onCloseModal}
      />
    </div>
  );
}
