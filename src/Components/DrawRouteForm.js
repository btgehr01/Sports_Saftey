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
    //prevent the form from submitting
    event.preventDefault();
    //if the base64 image is set
    if (base64Image) {
      deleteRequiredMessage();
      //set the image property within the EAP object within the parent component
      setEAPObject({ ...eapObject, image: base64Image });
      incrementStep();
      //gone back to edit the EAP emergency route image
    } else if (eapObject.image) {
      //if the eapObject within the parent component is set (user went back to edit)
      setRequiredMessage("Please click the save image button to continue.");
    } else {
        //set the required message if the user hasn't saved/drawn on the preloaded image
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
