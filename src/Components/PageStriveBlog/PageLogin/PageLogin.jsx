import React, { useContext } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageRegister from "../PageRegister/PageRegister";
import LoginGoogle from "./LoginGoogle";
import { GetBlog } from "../../../Context/GetBlogProvider";
import "./PageLogin.css";

const URL_postLogin = "http://localhost:3010/auth/login";

export default function PageLogin() {
  const { fetchData } = useContext(GetBlog);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modaleLogin, setModaleLogin] = useState(false);
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  //LOGIN TRAMITE USERNAME E PASSWORD DELL UTENTE GIA REGISTRATO
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL_postLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("Login riuscito");
        // RECUPERO DEL TOKEN DA SALVARE NELLO STORAGE
        const respData = await response.json();
        const token = respData.token;

        localStorage.setItem("userToken", token);

        fetchData();

        //NAVIGO ALLA HOMEPAGE DEI BLOG
        navigate("/home");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  return (
    <>
      <Container id="login_page">
        <Row>
          <Col>
            <h3>Log in to your account!</h3>
            <Button variant="outline-dark" onClick={() => setModaleLogin(true)}>
              Log In
            </Button>
            <h4>Don't have an account? Sign Up</h4>
            <LoginGoogle />
            <Button
              variant="outline-dark"
              onClick={() => setShowRegister(true)}
            >
              Email
            </Button>
          </Col>
        </Row>

        <Modal
          show={modaleLogin}
          onHide={() => setModaleLogin(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Login to your account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={loginUser}>
                <div>
                  <label>
                    Username:
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <button type="submit">Accedi</button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        <PageRegister
          show={showRegister}
          onHide={() => setShowRegister(false)}
        />
      </Container>
    </>
  );
}
