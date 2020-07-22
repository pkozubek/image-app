import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { IoIosClose } from "react-icons/io";

import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

import { IModalProps } from "../../interfaces/components/IModal";

import "./Modal.scss";

const Modal = ({
  isVisible,
  onCancel,
  children,
  actions,
  header,
}: IModalProps) => {
  const modalContent = (
    <>
      {isVisible && <Backdrop />}
      <CSSTransition
        in={isVisible}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <div className="modal">
          <header className="header">
            {header && <h2 className="header__text">{header}</h2>}
            <Button
              className="header__close__button"
              onClick={onCancel}
              transparent
            >
              <IoIosClose className="header__close__icon" />
            </Button>
          </header>
          <div className="content">{children}</div>
          <div className="actions">{actions}</div>
        </div>
      </CSSTransition>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-hook")
  );
};

export default Modal;
