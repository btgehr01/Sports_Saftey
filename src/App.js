import React from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TopNav from "./Components/TopNav";
import Home from "./Home";
import ViewEAPs from "./ViewEAPs";
import UserManagement from "./UserManagement";
import EAPManagement from "./EAPManagement ";

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
          <Route path="/" element={<Home />} />
          <Route path="/View" element={<ViewEAPs />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/EAPManagement" element={<EAPManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
