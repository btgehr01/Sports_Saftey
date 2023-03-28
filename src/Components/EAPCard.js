import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Mode } from "../Screens/EAPManagement ";
import "./OrganizationCard.scss";

const EAPCard = ({ eapObject, setMode }) => {
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <div onClick={() => console.log("Download EAP PDF")}>
        <div className="card-image">
          <Card.Img
            variant="top"
            src={eapObject.image}
            style={{ height: "200px" }}
          />
        </div>
        <Card.Body style={{ height: "200px", overflow: "scroll" }}>
          <Card.Title>{eapObject.venueName}</Card.Title>
          <Card.Text>{eapObject.bio}</Card.Text>
        </Card.Body>
      </div>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{`Created By: ${eapObject.createdBy}`}</ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <div className="display-card-action-buttons">
          <Button onClick={() => setMode(Mode.Edit)}>Edit</Button>
          <Button variant="danger" onClick={() => setMode(Mode.Delete)}>
            Delete
          </Button>
          <Button variant="outline-dark" onClick={() => setMode(Mode.Share)}>
            Share
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default EAPCard;
