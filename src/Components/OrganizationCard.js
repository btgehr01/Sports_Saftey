import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrganizationCard.scss";

const OrganizationCard = () => {
  const navigate = useNavigate();
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <div onClick={() => navigate("/Organization/UofLHealthOrgId/Groups")}>
        <Card.Img
          variant="top"
          src="data:image/png;base64,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"
        />
        <Card.Body>
          <Card.Title>Organization Name</Card.Title>
          <Card.Text>Organization Bio</Card.Text>
        </Card.Body>
      </div>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Created By: ernest.rimer@uoflhealth.org</ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <div className="display-card-action-buttons">
          <Button>Edit</Button>
          <Button variant="secondary">Users</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default OrganizationCard;
