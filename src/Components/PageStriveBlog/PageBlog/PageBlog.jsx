import React, { useContext, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import BlogAuthor from "../../BlogItem/BlogAuthor/BlogAuthor.jsx";
import LikeBlog from "../../likes/LikeBlog.jsx";
import "./PageBlog.css";
import { GetBlog } from "../../../Context/GetBlogProvider.jsx";
import { useParams } from "react-router-dom";
import BlogNavbar from "../../BlogNavbar/BlogNavbar.jsx";
import BlogFooter from "../../BlogFooter/BlogFooter.jsx";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const { data } = useContext(GetBlog);
  const params = useParams();

  useEffect(() => {
    const { id } = params;
    // console.log("ID del blog dalla URL:", id);
    const blogItem = data.find((blog) => blog._id === id);
    // console.log(data);
    if (blogItem) {
      setBlog(blogItem);
      setLoading(false);
    } else {
      // navigate("/404");
    }
  }, [params, data]); // Aggiungo params e data come dipendenze per ricalcolare l'effetto quando cambiano

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        <BlogNavbar />
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...data.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                {blog.readTime && (
                  <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
                )}
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <LikeBlog defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          </Container>
        </div>
        <BlogFooter />
      </>
    );
  }
};

export default Blog;
