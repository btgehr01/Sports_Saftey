import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditEAPModal = ({ onClose }) => {
  const onSubmit = () => {
    console.log("edit EAP");
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Edit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default EditEAPModal;
