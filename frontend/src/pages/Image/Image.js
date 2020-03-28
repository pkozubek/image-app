import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";
import { API_IMAGES } from "../../helpers/url";
import Button from "../../components/shared/InterfaceElements/Button/Button";
import ConfirmationModal from "../../components/shared/InterfaceElements/Modal/ConfirmationModal";

export default function Image() {
  const imageId = useParams().id;
  const history = useHistory();

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const { get, del, data, isLoading } = useHttp();

  useEffect(() => {
    get(`${API_IMAGES}/${imageId}`);
  }, []);

  const onButtonClick = () => {
    setConfirmationVisible(true);
  };

  const onConfirm = () => {
    del(`${API_IMAGES}/${imageId}`);
    history.push("/");
  };

  let content = "loading";

  if (!isLoading && data !== null) {
    const { image } = data;

    content = (
      <>
        <img src={image.url} />
        <Button onClick={onButtonClick}>Delete Image</Button>
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
