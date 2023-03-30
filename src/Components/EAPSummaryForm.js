import React from "react";
import { Form, Button } from "react-bootstrap";
import "./EAPSummaryForm.scss";

const EAPSummaryForm = ({ onSubmit, incrementStep, eapObject, setStep }) => {
  const handleSubmit = () => {
    incrementStep();
    onSubmit();
  };

  return (
    <Form id="addForm" onSubmit={(event) => handleSubmit(event)}>
      <div className="eap-summary">
        <h6>Venue Name</h6>
        <p>{eapObject.address.venueName}</p>
        <h6>Venue Address</h6>
        {eapObject.address.streetAddress2 ? (
          <p>{`${eapObject.address.streetAddress}, ${eapObject.address.streetAddress2}, ${eapObject.address.city}, ${eapObject.address.state} ${eapObject.address.zipCode}`}</p>
        ) : (
          <p>{`${eapObject.address.streetAddress}, ${eapObject.address.city}, ${eapObject.address.state} ${eapObject.address.zipCode}`}</p>
        )}
        <h6>Contact 1 Info:</h6>
        <p>{eapObject.contact.name}</p>
        <p>{`${eapObject.contact.phoneNumber}     ${eapObject.contact.email}`}</p>
        <p>{`${eapObject.contact.role}     ${eapObject.contact.type}`}</p>
        <h6>Emergency Route Image:</h6>
        <img alt="Emergency Routes" src={eapObject.image} />
        <div className="summary-buttons">
          <Button onClick={() => setStep(1)}>Edit Venue Information</Button>
          <Button onClick={() => setStep(2)}>Edit Contact Information</Button>
          <Button onClick={() => setStep(3)}>Edit Emergency Routes</Button>
        </div>
      </div>
    </Form>
  );
};

export default EAPSummaryForm;
