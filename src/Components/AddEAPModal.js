import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormProgress from "./FormProgress";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import DrawRouteForm from "./DrawRouteForm";
import EAPSummaryForm from "./EAPSummaryForm";

const AddEAPModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [eapObject, setEAPObject] = useState({});

  const incrementStep = () => {
    setStep(step + 1);
  };

  const onSubmit = () => {
    console.log("add EAP");
  };

  const renderScreen = () => {
    console.log("eapObject", eapObject);
    console.log("step", step);
    switch (step) {
      case 1:
        return (
          <AddressForm
            eapObject={eapObject}
            setEAPObject={setEAPObject}
            incrementStep={incrementStep}
          />
        );
      case 2:
        return (
          <ContactForm
            eapObject={eapObject}
            setEAPObject={setEAPObject}
            incrementStep={incrementStep}
          />
        );
      case 3:
        return (
          <DrawRouteForm
            eapObject={eapObject}
            setEAPObject={setEAPObject}
            incrementStep={incrementStep}
          />
        );
      case 4:
        return <EAPSummaryForm setStep={setStep} onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProgress step={step} />
        {renderScreen()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="primary" type="submit" form="addForm">
          {step < 4 ? "Next" : "Submit"}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddEAPModal;
