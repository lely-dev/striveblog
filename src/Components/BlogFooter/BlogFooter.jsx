import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function BlogFooter() {
  return (
    <>
      <Container className="p-4">
        <Row>
          <Col className="p-3 fs-4" style={{ textAlign: "center" }}>
            <FontAwesomeIcon icon={faFacebookF} className="px-4" />
            <FontAwesomeIcon icon={faInstagram} className="px-4" />
            <FontAwesomeIcon icon={faTwitter} className="px-4" />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            © 2024 StriveBlog. All rights reserved.
          </Col>
        </Row>
      </Container>
    </>
  );
}
