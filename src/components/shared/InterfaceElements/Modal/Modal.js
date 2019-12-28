import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.scss";

import Backdrop from "../Backdrop/Backdrop";
import ModalContent from "./ModalContent/ModalContent";

const Modal = ({ isVisible, setVisible, children }) => {
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
        <ModalContent close={() => setVisible(false)}>{children}</ModalContent>
      </CSSTransition>
    </>
  );
};

export default Modal;