import React from "react";
import { Link } from "react-router-dom";

import Button from "../../shared/InterfaceElements/Button/Button";
import "./ImageModal.scss";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const ImageModal = ({ src, title, deleteAction }) => {
  return (
    <>
      <img className="modal-content__image" src={src} alt={`img${title}`} />
      <h3 className="modal-content__image-name">
        {title}
        <Link to="/edit_image/1">
          <FiEdit2 />
        </Link>
        <AiOutlineDelete onClick={deleteAction} />
      </h3>
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
