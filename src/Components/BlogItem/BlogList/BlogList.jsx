import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { BlogCard } from "../BlogCard/BlogCard";
import { GetBlog } from "../../../Context/GetBlogProvider.jsx";

export const BlogList = (props) => {
  const { data } = useContext(GetBlog);
  return (
    <Row>
      {data &&
        data.map((post, i) => (
          <Col
            key={`item-${i}`}
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogCard key={data.title} {...data} />
          </Col>
        ))}
    </Row>
  );
};
