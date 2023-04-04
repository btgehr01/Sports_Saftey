import React, { useEffect, useState } from "react";
import { simulateGoogleMapsAPICall } from "../Helpers/MockAPICalls";
import MapCanvas from "./MapCanvas";
import { Form } from "react-bootstrap";
import "./Form.scss";

const DrawRouteForm = ({ eapObject, setEAPObject, incrementStep }) => {
  const [base64Image, setBase64Image] = useState("");
  const [requiredMessage, setRequiredMessage] = useState("");

  useEffect(() => {
    if (base64Image) {
      deleteRequiredMessage();
    }
  });

  const deleteRequiredMessage = () => {
    setRequiredMessage("");
  };

  const imgSource = simulateGoogleMapsAPICall(eapObject);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (base64Image) {
      deleteRequiredMessage();
      setEAPObject({ ...eapObject, image: base64Image });
      incrementStep();
      //gone back to edit the EAP emergency route image
    } else if (eapObject.image) {
      setRequiredMessage("Please click the save image button to continue.");
    } else {
      setRequiredMessage("Sketching an Emergency Route is Required");
    }
  };

  return (
    <Form id="addForm" onSubmit={(event) => handleSubmit(event)}>
      <h4>Google Maps API URL: {}</h4>
      <MapCanvas
        src={eapObject.image || imgSource}
        base64Image={base64Image}
        setBase64Image={setBase64Image}
      />
      {requiredMessage ? (
        <div className="form-error" style={{ paddingLeft: "40px" }}>
          {requiredMessage}
        </div>
      ) : null}
    </Form>
  );
};

export default DrawRouteForm;
