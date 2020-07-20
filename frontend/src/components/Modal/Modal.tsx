import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { IoIosClose } from "react-icons/io";

import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

import "./Modal.scss";

interface IModalProps {
  isVisible: boolean;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: JSX.Element | string;
  footer: JSX.Element;
  header: string;
}

const Modal = ({
  isVisible,
  onCancel,
  children,
  footer,
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
            <h2 className="header__text">{header}</h2>
            <Button onClick={onCancel} transparent>
              <IoIosClose className="header__close-icon" />
            </Button>
          </header>
          <div className="content">{children}</div>
          <div className="footer">{footer}</div>
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
