import React from "react";
import { Form, Nav, Navbar } from "react-bootstrap";
import AuthButton from "./auth-button";
import "./TopNav.scss";

const TopNav = () => {
  return (
    <div className="top-nav">
      <Navbar key="top-navbar" bg="light" className="mb-3">
        <Navbar.Brand href="/">Sports Saftey EAP Application</Navbar.Brand>
        <Nav className="flex-grow-1">
          <Nav.Link href="/UserManagement">User Management</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2" />
        </Form>
        <AuthButton />
      </Navbar>
    </div>
  );
};

export default TopNav;
