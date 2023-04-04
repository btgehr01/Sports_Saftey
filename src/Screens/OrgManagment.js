import React from "react";
import OrganizationCard from "../Components/OrganizationCard";
import { getOrganizationsForUser } from "../Helpers/MockAPICalls";
import { Button } from "react-bootstrap";
import "./ManagementScreen.scss";

const OrgManagment = () => {
  const organizations = getOrganizationsForUser();
  const OrganizationCards = organizations.map((org) => {
    return (
      <div key={org.id}>
        <OrganizationCard org={org} />
      </div>
    );
  });

  return (
    <div className="card-List">
      <div className="list-header">
        <h2>Organizations</h2>
        <Button>+ Add Organization</Button>
      </div>
      <hr />
      <div className="list-body">{OrganizationCards}</div>
    </div>
  );
};

export default OrgManagment;
