import React from "react";
import { getOrganizationForOrgId } from "../Helpers/MockAPICalls";
import { useParams } from "react-router-dom";
import GroupCard from "../Components/GroupCard";
import { Button } from "react-bootstrap";
import "./ManagementScreen.scss";

const GroupManagment = () => {
  const { OrganizationId } = useParams();
  const organization = getOrganizationForOrgId(OrganizationId);
  const groupsFromOrgId = organization?.groups;

  const groupCards = groupsFromOrgId?.map((group) => {
    return (
      <div key={group.id}>
        <GroupCard orgId={OrganizationId} group={group} />
      </div>
    );
  });

  return (
    <div className="card-List">
      <div className="list-header">
        <h2>{`${organization?.name} Groups`}</h2>
        <Button>+ Add Group</Button>
      </div>
      <hr />
      <div className="list-body">{groupCards}</div>
    </div>
  );
};

export default GroupManagment;
