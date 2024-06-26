import React, { useState } from "react";
import { getGroupForGroupId } from "../Helpers/MockAPICalls";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddEAPModal from "../Components/AddEAPModal";
import EditEAPModal from "../Components/EditEAPModal";
import DeleteEAPModal from "../Components/DeleteEAPModal";
import ShareEAPModal from "../Components/ShareEAPModal";
import EAPCard from "../Components/EAPCard";
import "./ManagementScreen.scss";

export const Mode = {
  View: "view",
  Add: "add",
  Edit: "edit",
  Delete: "delete",
  Share: "share",
};

const EAPManagement = () => {
  //This react state variable will be used to decide which modal to show when a CRUD button is clicked
  const [mode, setMode] = useState(Mode.View);
  //Pull the OrganizationId and groupId from the URL
  const { OrganizationId, GroupId } = useParams();
  //Grab a group object through using a simulated API helper function
  const group = getGroupForGroupId(OrganizationId, GroupId);
  const eapObjectsFromGroupId = group?.EAPs;

  const closeModal = () => {
    setMode(Mode.View);
  };

  const EAPCards = eapObjectsFromGroupId?.map((eapObject) => {
    return (
      <div key={eapObject.id}>
        <EAPCard eapObject={eapObject} setMode={setMode} />
      </div>
    );
  });
  //TODO: add functionality to the edit, share, and delete EAP buttons
  return (
    <div className="card-List">
      <div className="list-header">
        <h2>{`${group?.name} EAPs`}</h2>
        <Button onClick={() => setMode(Mode.Add)}>+ Add EAP</Button>
      </div>
      <hr />
      <div className="list-body">{EAPCards}</div>
      <Modal
        size="xl"
        centered
        backdrop="static"
        show={mode === Mode.Add}
        onHide={closeModal}
      >
        <AddEAPModal onClose={closeModal} />
      </Modal>
      <Modal
        size="xl"
        centered
        backdrop="static"
        show={mode === Mode.Edit}
        onHide={closeModal}
      >
        <EditEAPModal onClose={closeModal} />
      </Modal>
      <Modal size="sm" centered show={mode === Mode.Delete} onHide={closeModal}>
        <DeleteEAPModal onClose={closeModal} />
      </Modal>
      <Modal size="lg" centered show={mode === Mode.Share} onHide={closeModal}>
        <ShareEAPModal onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default EAPManagement;
