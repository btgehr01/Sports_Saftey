import React from "react";
import { Modal, Button } from "react-bootstrap";

const AddEAPModal = ({ onClose }) => {
  const onSubmit = () => {
    console.log("add EAP");
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddEAPModal;
