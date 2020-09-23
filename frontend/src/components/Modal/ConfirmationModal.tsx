import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

import { IConfirmationModalProps } from "../../interfaces/IModal";
import "./ConfirmationModal.scss";

const ConfirmationModal = ({
  question,
  onConfirm,
  isVisible,
  onCancel,
}: IConfirmationModalProps) => {
  return (
    <Modal
      onCancel={onCancel}
      isVisible={isVisible}
      actions={
        <>
          <Button
            className="confirmation-modal__button"
            onClick={onCancel}
            decline
          >
            No
          </Button>
          <Button
            className="confirmation-modal__button"
            onClick={onConfirm}
            confirmation
          >
            Yes
          </Button>
        </>
      }
    >
      <p>{question}</p>
    </Modal>
  );
};

export default ConfirmationModal;
