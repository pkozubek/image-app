import React from "react";

import Button from "../../shared/InterfaceElements/Button/Button";
import "./ImageModal.scss";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";

const ImageModal = ({ src, title }) => {
  return (
    <>
      <img className="modal-content__image" src={src} alt={`img${title}`} />
      <h3 className="modal-content__image-name">{title}</h3>
      <div className="modal-content__buttons-container">
        <Button type="transparent" textColor="red">
          <IoMdThumbsDown />
        </Button>
        <Button type="transparent" textColor="green">
          <IoMdThumbsUp />
        </Button>
      </div>
    </>
  );
};

export default ImageModal;
