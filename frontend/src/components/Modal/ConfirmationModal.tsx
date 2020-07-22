import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

import { IConfirmationModalProps } from "../../interfaces/components/IModal";

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
          <Button onClick={onConfirm} confirmation>
            Yes
          </Button>
          <Button onClick={onCancel} decline>
            No
          </Button>
        </>
      }
    >
      <p>{question}</p>
    </Modal>
  );
};

export default ConfirmationModal;
