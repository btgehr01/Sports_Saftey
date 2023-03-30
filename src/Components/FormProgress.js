import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./FormProgress.scss";

const FormProgress = ({ step }) => {
  const formSteps = [
    "Venue Information",
    "Emergency Contacts",
    "Emergency Routes",
    "EAP Submission",
  ];

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
