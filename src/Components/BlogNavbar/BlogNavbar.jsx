import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../Asset/logo.png";
import { useNavigate } from "react-router-dom";

export default function BlogNavbar() {
  const navigate = useNavigate();

  const removeToken = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <>
      <Navbar className="bg-secondary p-4" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={() => navigate("/me")}>
                Your Profile
              </NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => removeToken()}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
