import React, { useEffect, useState } from "react";
import { Modal, Button, InputGroup, Form, Spinner } from "react-bootstrap";
import useCopy from "use-copy";

const ShareEAPModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shareableLink, setShareableLink] = useState("");

  //TODO: useEffect will be used to initially set the above sharable link state variable based off of the fileLocation property for the specific EAPObject
  useEffect(() => {
    setShareableLink(
      "localhost:3000/Organization/UofLHealthOrgId/Group/UofLFootballGroupId/EAPs"
    );
    setIsLoading(false);
  }, []);

  const [copied, copy, setCopied] = useCopy(shareableLink);

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Share EAP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <InputGroup className="mb-3">
            <Form.Control
              readOnly
              aria-describedby="basic-addon2"
              value={shareableLink}
            />
            <Button
              style={{ width: "80px" }}
              onClick={() => copyText()}
              variant="outline-secondary"
              id="copy-button"
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </InputGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ShareEAPModal;
