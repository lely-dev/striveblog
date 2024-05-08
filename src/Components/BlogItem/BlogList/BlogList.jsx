import React from "react";
import { Row, Col } from "react-bootstrap";
import { BlogCard } from "../BlogCard/BlogCard";
import posts from "../../../data/posts.json";

export const BlogList = (props) => {
  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogCard key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};
