import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../BlogAuthor/BlogAuthor.jsx";
import "./BlogCard.css";

export const BlogCard = (props) => {
  const { title, cover, author, _id } = props;
  // console.log(props);
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor authorId={author} />
        </Card.Footer>
      </Card>
    </Link>
  );
};
