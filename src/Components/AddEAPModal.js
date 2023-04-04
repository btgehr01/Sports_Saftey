import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import FormProgress from "./FormProgress";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import DrawRouteForm from "./DrawRouteForm";
import EAPSummaryForm from "./EAPSummaryForm";
import CreatePDF from "../Helpers/CreatePDF";

const AddEAPModal = ({ onClose }) => {
  //the initial EAP object for the whole AddEAPModal, this object is edited as each form is completed
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

  //number of forms located within the modal
  const SUBMISSIONSTEP = 4;

  //state variable that holds what form step the user is currently working on
  const [step, setStep] = useState(1);
  //state variable that holds the eapObject that gets updated as the form is completed
  const [eapObject, setEAPObject] = useState(initialEAPObject);
  //state variable that holds a boolean that represents if the user has gone back to edit one of the forms (used to bring the user to the submission step)
  const [goneBackToEdit, setGoneBackToEdit] = useState(false);
  //state variable that holds a boolean that represents if the form is loading upon submission
  const [isLoading, setIsLoading] = useState(false);

  //
  const incrementStep = () => {
    if (goneBackToEdit) {
      setStep(SUBMISSIONSTEP);
    } else {
      setStep(step + 1);
    }
  };

  //called when the add EAP process is completed/submitted
  const onSubmit = async () => {
    setIsLoading(true);
    const linkToPDF = await CreatePDF({ eapObject });
    console.log("EAP location: ", linkToPDF);
    setEAPObject({ ...eapObject, file: linkToPDF });
    //TODO: store the eapObject within a database hosted on the AWS cloud through an API call
    setIsLoading(false);
  };

  //conditional rendering of the form seen within the modal component based upon the step the user is currently on
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

  //the button located within the modal's footer is hooked up to submit every form within the add EAP process (trigger the onSubmit function for the form element)
  //with a bit of magic of course :)
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
