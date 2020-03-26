import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

const ConfirmationModal = ({
  question,
  onConfirm,
  declineAction,
  isVisible
}) => {
  return (
    <Modal isVisible={isVisible}>
      <h3>{question}</h3>
      <Button onClick={onConfirm}>Yes</Button>
      <Button>No</Button>
    </Modal>
  );
};

export default ConfirmationModal;
