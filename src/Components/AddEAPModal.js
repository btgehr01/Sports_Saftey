import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import FormProgress from "./FormProgress";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import DrawRouteForm from "./DrawRouteForm";
import EAPSummaryForm from "./EAPSummaryForm";
import CreatePDF from "../Helpers/CreatePDF";

const AddEAPModal = ({ onClose }) => {
  const initialEAPObject = {
    venueName: "",
    address: {
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    contact: {
      name: "",
      phoneNumber: "",
      email: "",
      type: "",
      role: "",
    },
    image: "",
    file: "",
  };

  const SUBMISSIONSTEP = 4;

  const [step, setStep] = useState(1);
  const [eapObject, setEAPObject] = useState(initialEAPObject);
  const [goneBackToEdit, setGoneBackToEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const incrementStep = () => {
    if (goneBackToEdit) {
      setStep(SUBMISSIONSTEP);
    } else {
      setStep(step + 1);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const linkToPDF = await CreatePDF({ eapObject });
    console.log("EAP location: ", linkToPDF);
    setEAPObject({ ...eapObject, file: linkToPDF });
    setIsLoading(false);
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
            setGoneBackToEdit={setGoneBackToEdit}
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
              <div>
                <h4>{`Successfully Created EAP for ${eapObject.venueName}`}</h4>
                <a
                  href={eapObject.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {eapObject.file}
                </a>
              </div>
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
