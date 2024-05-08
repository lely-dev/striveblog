import React from "react";
import { Container } from "react-bootstrap";
import { BlogList } from "../../BlogItem/BlogList/BlogList";
import BlogFooter from "../../BlogFooter/BlogFooter";
import BlogNavbar from "../../BlogNavbar/BlogNavbar";

export const PageHome = (props) => {
  return (
    <>
      <BlogNavbar />
      <Container fluid="sm">
        <BlogList />
      </Container>
      <BlogFooter />
    </>
  );
};
