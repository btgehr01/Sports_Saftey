import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./FormProgress.scss";

const FormProgress = ({ step }) => {
  const formSteps = [
    "Venue Information",
    "Emergency Contacts",
    "Emergency Routes",
    "EAP Info Summary",
  ];

  const renderStepLabels = () => {
    return formSteps.map((step) => {
      return <h4>{step}</h4>;
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
