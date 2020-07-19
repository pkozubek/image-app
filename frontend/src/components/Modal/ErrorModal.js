import React from "react";
import { IoIosWarning } from "react-icons/io";

import Modal from "./Modal";
import Button from "../Button/Button";

const ErrorModal = ({ onCancel, error }) => {
  return (
    <Modal
      onCancel={onCancel}
      header="An Error Occurred!"
      isVisible={!!error}
      footer={
        <Button modalElement onClick={onCancel}>
          Okay
        </Button>
      }
    >
      <IoIosWarning class="content__icon" />
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
