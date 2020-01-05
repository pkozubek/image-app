import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../shared/InterfaceElements/Button/Button";
import "./ImageModal.scss";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from "../../../context/auth-context";

const ImageModal = ({ src, title, deleteAction }) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <img className="modal-content__image" src={src} alt={`img${title}`} />
      <h3 className="modal-content__image-name">
        {title}
        {auth.isLoggedIn ? (
          <>
            <Link to="/edit_image/1">
              <FiEdit2 />
            </Link>
            <AiOutlineDelete onClick={deleteAction} />
          </>
        ) : null}
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
