import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "./OrganizationCard.scss";

const EAPCard = ({ eapObject }) => {
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <div onClick={() => console.log("Download EAP PDF")}>
        <Card.Img variant="top" src={eapObject.image} />
        <Card.Body>
          <Card.Title>{eapObject.venueName}</Card.Title>
          <Card.Text>{eapObject.bio}</Card.Text>
        </Card.Body>
      </div>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{`Created By: ${eapObject.createdBy}`}</ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <div className="display-card-action-buttons">
          <Button>Edit</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="outline-dark">Share</Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default EAPCard;
