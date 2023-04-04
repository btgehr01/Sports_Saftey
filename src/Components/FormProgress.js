import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./FormProgress.scss";

const FormProgress = ({ step }) => {
  //define the steps of the form
  const formSteps = [
    "Venue Information",
    "Emergency Contacts",
    "Emergency Routes",
    "EAP Submission",
  ];
  //render the form step labels on the top of this component
  const renderStepLabels = () => {
    return formSteps.map((step, index) => {
      return <h4 key={index}>{step}</h4>;
    });
  };

  return (
    <div className="progress-container">
      <div className="step-labels">{renderStepLabels()}</div>
      <ProgressBar animated now={(step - 1) * (100 / formSteps.length)} />
    </div>
  );
};

export default FormProgress;
