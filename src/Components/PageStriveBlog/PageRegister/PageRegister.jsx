import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL_postRegister = "http://localhost:3010/auth/register";

export default function PageRegister(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [data_di_nascita, setDataDiNascita] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL_postRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          nome,
          cognome,
          email,
          data_di_nascita,
          avatar,
        }),
      });

      if (response.ok) {
        console.log("Registrazione riuscita con successo");
        // RECUPERO DEL TOKEN DA SALVARE NELLO STORAGE
        const backToken = await response.json();
        const userToken = backToken.token;
        localStorage.setItem("userToken", userToken);

        //NAVIGO ALLA HOMEPAGE DEI BLOG
        navigate("/home");
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <>
      <Modal {...props} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={registerUser}>
            <Row>
              <Col>
                <Form.Control
                  placeholder="First name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Last name"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Date of Birth"
                  value={data_di_nascita}
                  onChange={(e) => setDataDiNascita(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control
                    type="file"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
