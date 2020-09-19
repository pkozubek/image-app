import React, { useContext } from "react";
import Modal from "./Modal";

import "./ImageModal.scss";
import { ImageModalContext } from "../../context/uiContext";
import ImageForm from "../ImageForm/ImageForm";

const ImageModal = () => {
  const imageContext: any = useContext(ImageModalContext);

  return (
    <Modal
      onCancel={imageContext.closeImageModal}
      isVisible={imageContext.isActive}
      className="image-modal"
    >
      <ImageForm />
    </Modal>
  );
};

export default ImageModal;
