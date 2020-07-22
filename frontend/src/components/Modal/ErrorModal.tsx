import React from "react";
import { IoIosWarning } from "react-icons/io";

import Modal from "./Modal";
import Button from "../Button/Button";

import { IErrorModalProps } from "../../interfaces/components/IModal";

const ErrorModal = ({ onCancel, error }: IErrorModalProps) => {
  return (
    <Modal
      onCancel={onCancel}
      header="An Error Occurred!"
      isVisible={!!error}
      actions={
        <Button modalElement onClick={onCancel}>
          Okay
        </Button>
      }
    >
      <IoIosWarning className="content__icon" />
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
