import React from "react";

import Modal from "./Modal/Modal";
import Button from "./Button/Button";

const ErrorModal = ({ onCancel, error }) => {
  return (
    <Modal
      onCancel={onCancel}
      header="An Error Occurred!"
      isVisible={!!error}
      footer={<Button onClick={onCancel}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
