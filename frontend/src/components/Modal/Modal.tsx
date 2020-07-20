import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { IoIosClose } from "react-icons/io";

import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

import "./Modal.scss";

interface ModalContentProps {
  children: JSX.Element | string;
  close: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  header?: string;
  footer?: JSX.Element;
  isVisible?: boolean;
}

const ModalContent = ({
  children,
  close,
  header,
  footer,
}: ModalContentProps) => {
  const content = (
    <div className="modal">
      <header className="header">
        <h2 className="header__text">{header}</h2>
        <Button onClick={close} transparent>
          <IoIosClose className="header__close-icon" />
        </Button>
      </header>
      <div className="content">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = ({ isVisible, onCancel, children, ...props }) => {
  return (
    <>
      {isVisible && <Backdrop />}
      <CSSTransition
        in={isVisible}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalContent close={onCancel} {...props}>
          {children}
        </ModalContent>
      </CSSTransition>
    </>
  );
};

export default Modal;
