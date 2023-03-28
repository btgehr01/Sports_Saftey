import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import DrawRouteForm from "./DrawRouteForm";
import EAPSummaryForm from "./EAPSummaryForm";

const AddEAPModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [eapObject, setEAPObject] = useState({});

  const incrementStep = () => {
    setValidated(false);
    setStep(step + 1);
  };

  const onSubmit = () => {
    console.log("add EAP");
  };

  const renderScreen = () => {
    console.log("step", step);
    switch (step) {
      case 1:
        return (
          <AddressForm
            setEAPObject={setEAPObject}
            setValidated={setValidated}
          />
        );
      case 2:
        return <ContactForm />;
      case 3:
        return <DrawRouteForm />;
      case 4:
        return <EAPSummaryForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderScreen()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button
          variant="primary"
          disabled={!validated}
          onClick={step < 4 ? incrementStep : onSubmit}
        >
          {step < 4 ? "Next" : "Submit"}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddEAPModal;
