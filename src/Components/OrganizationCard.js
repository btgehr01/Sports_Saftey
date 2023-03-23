import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrganizationCard.scss";

const OrganizationCard = ({ org }) => {
  const navigate = useNavigate();
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <div onClick={() => navigate(`/Organization/${org.id}/Groups`)}>
        <div className="card-image">
          <Card.Img variant="top" src={org.logo} style={{ height: "200px" }} />
        </div>
        <Card.Body style={{ height: "200px", overflow: "scroll" }}>
          <Card.Title>{org.name}</Card.Title>
          <Card.Text>{org.bio}</Card.Text>
        </Card.Body>
      </div>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{`Created By: ${org.createdBy}`}</ListGroup.Item>
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
