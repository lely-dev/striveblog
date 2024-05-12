import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../BlogItem/BlogAuthor/BlogAuthor.jsx";
import LikeBlog from "../../likes/LikeBlog";
import "./PageBlog.css";
import BlogNavbar from "../../BlogNavbar/BlogNavbar.jsx";
import BlogFooter from "../../BlogFooter/BlogFooter.jsx";
import { GetBlog } from "../../../Context/GetBlogProvider.jsx";

const PageBlog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useContext(GetBlog);
  console.log(data);

  useEffect(() => {
    if (data) {
      const { id } = params;
      const blog = data.find((post) => post._id.toString() === id);

      if (blog) {
        setBlog(blog);
        setLoading(false);
      } else {
        navigate("/404");
      }
    }
  }, [data]);

  if (loading) {
    return <div>loading</div>;
  } else {
    console.log(blog);
    return (
      <>
        <BlogNavbar />
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                {/* <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div> */}
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

export default PageBlog;
