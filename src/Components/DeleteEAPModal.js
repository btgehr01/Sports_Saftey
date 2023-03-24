import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteEAPModal = ({ onClose }) => {
  const onSubmit = () => {
    console.log("delete EAP");
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Delete EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Are you sure you want to delete the EAP for (venueName) with ID (EAPId)`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteEAPModal;
