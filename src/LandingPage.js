import React from "react";
import OrgManagment from "./Screens/OrgManagment";
import "./LandingPage.scss";

const LandingPage = () => {
  //TODO: add logic for what screen should be shown to the user when they first navigate to our application,
  //this logic should be based upon the user's Auth0 role (organization member, multi-group member, single-group member)
  return (
    <div className="app-body">
      <OrgManagment />
    </div>
  );
};

export default LandingPage;
