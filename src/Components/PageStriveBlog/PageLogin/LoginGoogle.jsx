import React from "react";
import { Button } from "react-bootstrap";

export default function LoginGoogle() {
  //LOGIN TRAMITE GOOGLE

  const googleLogin = () => {
    const urlBack = "http://localhost:3010/auth/googleLogin";
    window.open(urlBack, "_self");
  };

  return (
    <Button variant="outline-dark" onClick={googleLogin}>
      Google
    </Button>
  );
}
