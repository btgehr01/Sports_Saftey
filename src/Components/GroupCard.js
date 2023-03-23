import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrganizationCard.scss";

const GroupCard = ({ orgId, group }) => {
  const navigate = useNavigate();
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <div
        onClick={() =>
          navigate(`/Organization/${orgId}/Group/${group.id}/EAPs`)
        }
      >
        <Card.Img variant="top" src={group.logo} />
        <Card.Body>
          <Card.Title>{group.name}</Card.Title>
          <Card.Text>{group.bio}</Card.Text>
        </Card.Body>
      </div>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{`Created By: ${group.createdBy}`}</ListGroup.Item>
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

export default GroupCard;
