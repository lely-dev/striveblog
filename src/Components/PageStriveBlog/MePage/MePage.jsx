import React from "react";
import BlogNavbar from "../../BlogNavbar/BlogNavbar";
import BlogFooter from "../../BlogFooter/BlogFooter";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetBlog } from "../../../Context/GetBlogProvider.jsx";
import { useContext, useEffect, useState } from "react";
import { BlogCard } from "../../BlogItem/BlogCard/BlogCard.jsx";

const getUrl = "http://localhost:3010/blogPosts";

export default function MePage() {
  const { data } = useContext(GetBlog);
  const [userBlogs, setUserBlogs] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const getBlogId = async () => {
      try {
        const response = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Errore durante il recupero dei blog");
        }

        const userBlogsData = await response.json();

        setUserBlogs(userBlogsData);
      } catch (error) {
        console.error(error);
      }
    };

    getBlogId();
  }, [token]);

  return (
    <>
      <BlogNavbar />
      <Button
        as={Link}
        to="/new"
        className="blog-navbar-add-button bg-dark"
        size="lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        Nuovo Articolo
      </Button>
      <Row>
        {userBlogs &&
          userBlogs.map((post, i) => (
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
      <BlogFooter />
    </>
  );
}
