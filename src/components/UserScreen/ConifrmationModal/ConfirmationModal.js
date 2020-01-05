import React from "react";
import Button from "../../shared/InterfaceElements/Button/Button";

const ConfirmationModal = ({ question, confirmAction, declineAction }) => {
  return (
    <>
      <h3>{question}</h3>
      <Button>Yes</Button>
      <Button>No</Button>
    </>
  );
};

export default ConfirmationModal;
