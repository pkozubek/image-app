import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";
import { API_IMAGES } from "../../helpers/url";
import Button from "../../components/Button/Button";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import ImageForm from "./ImageForm";

export default function Image() {
  const imageId = useParams().id;
  const history = useHistory();

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isEdited, setEdited] = useState(false);
  const { get, update, del, data, isLoading } = useHttp();

  useEffect(() => {
    get(`${API_IMAGES}/${imageId}`);
  }, []);

  const onDelete = () => {
    setConfirmationVisible(true);
  };

  const onEdit = () => {
    setEdited(true);
  };

  const onConfirm = () => {
    del(`${API_IMAGES}/${imageId}`);
    history.push("/");
  };

  let content = "loading";

  if (!isLoading && data !== null) {
    const { image } = data;
    console.log(image);
    content = (
      <>
        <img src={image.url} alt={image.name} />
        {isEdited ? (
          <ImageForm name={image.name} />
        ) : (
          <>
            <h2>{image.name}</h2>
            <p>{image.description}</p>
            <Button onClick={onEdit}>Edit Image data</Button>
          </>
        )}
        <Button onClick={onDelete}>Delete Image</Button>
      </>
    );
  }

  return (
    <div>
      {content}
      <ConfirmationModal
        question="Do you realy want to delete this ?"
        isVisible={isConfirmationVisible}
        onConfirm={onConfirm}
      />
    </div>
  );
}
