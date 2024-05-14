import React, { useContext } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./BlogAuthor.css";
import { GetAuthors } from "../../../Context/GetAuthorsProvider";

const BlogAuthor = (props) => {
  const { data } = useContext(GetAuthors);

  const { authorId } = props;

  const author = data.find((author) => author._id === authorId);

  if (!author) return null;

  const { nome, avatar } = author;

  console.log(author);

  return (
    <>
      <Row>
        <Col xs={"auto"} className="pe-0">
          <Image className="blog-author" src={avatar} roundedCircle />
        </Col>
        <Col>
          <div>di</div>
          <h6>{nome}</h6>
        </Col>
      </Row>
    </>
  );
};

export default BlogAuthor;
