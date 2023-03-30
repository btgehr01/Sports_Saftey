import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import FormProgress from "./FormProgress";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import DrawRouteForm from "./DrawRouteForm";
import EAPSummaryForm from "./EAPSummaryForm";

const AddEAPModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [eapObject, setEAPObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const incrementStep = () => {
    setStep(step + 1);
  };

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("EAP to add", eapObject);
      setIsLoading(false);
    }, 2000);
  };

  const renderScreen = () => {
    console.log("eapObject", eapObject);
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
        return (
          <EAPSummaryForm
            setStep={setStep}
            incrementStep={incrementStep}
            eapObject={eapObject}
            onSubmit={onSubmit}
          />
        );
      case 5:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              <h4>{`Successfully Created EAP for ${eapObject.address.venueName}`}</h4>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProgress step={step} />
        {renderScreen()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {step < 5 ? (
          <Button variant="primary" type="submit" form="addForm">
            {step < 4 ? "Next" : "Create EAP"}
          </Button>
        ) : null}
      </Modal.Footer>
    </>
  );
};

export default AddEAPModal;
