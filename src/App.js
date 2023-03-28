import React from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TopNav from "./Components/TopNav";
import LandingPage from "./LandingPage";
import GroupManagment from "./Screens/GroupManagement";
import OrgManagment from "./Screens/OrgManagment";
import UserManagement from "./Screens/UserManagement";
import EAPManagement from "./Screens/EAPManagement ";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div id="app" className="d-flex flex-column h-100">
      <TopNav />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Organizations" element={<OrgManagment />} />
          <Route
            path="/Organization/:OrganizationId/Groups"
            element={<GroupManagment />}
          />
          <Route
            path="/Organization/:OrganizationId/Group/:GroupId/EAPs"
            element={<EAPManagement />}
          />
          <Route path="/UserManagement" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
