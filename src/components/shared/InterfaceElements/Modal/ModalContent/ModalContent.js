import React from "react";
import ReactDOM from "react-dom";

import "./ModalContent.scss";
import { IoIosClose } from "react-icons/io";

import Button from "../../Button/Button";

const ModalContent = ({ children, close }) => {
  const content = (
    <div className="modal">
      <header className="modal__header">
        <Button action={close} type="transparent" className="modal__close">
          <IoIosClose className="modal__close-icon" />
        </Button>
      </header>
      {children}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default ModalContent;
