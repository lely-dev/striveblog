import React, { useContext } from "react";
import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "./NewBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../../../Context/AuthUserProvider";

const postUrl = "http://localhost:3010/blogPosts";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Categoria 1");
  const [cover, setCover] = useState("");
  const [time, setTime] = useState("");
  const [minute, setMinute] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate("");
  const token = localStorage.getItem("userToken");
  const authorId = localStorage.getItem("_id");

  console.log(token);

  //UPLOAD PICTURE SU CLODINARY
  const uploadCover = async (file, idBlog) => {
    try {
      const newImg = new FormData();
      newImg.append("cover", file);
      const token = localStorage.getItem("userToken");

      if (idBlog) {
        const response = await fetch(
          `http://localhost:3010/blogPosts/${idBlog}/cover`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: newImg,
          }
        );

        if (!response.ok) {
          throw new Error(
            "Errore durante il caricamento dell'immagine su Cloudinary"
          );
        }

        const data = await response.json();
        console.log("Immagine caricata su Cloudinary:", data);
      } else {
        console.error("L'ID dell'articolo è vuoto o non valido.");
      }
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il caricamento dell'immagine su Cloudinary:",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogPost = {
      title: title,
      category: category,
      readTime: {
        value: time,
        unit: minute,
      },
      content: content,
    };

    // CHIAMATA POST DEL NUOVO BLOG

    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPost),
      });

      if (!response.ok) {
        throw new Error("Errore durante la chiamata al backend");
      }

      //POST DEL BLOG
      const data = await response.json();
      console.log("Blog salvato con successo:", data);

      //FA PARTIRE LA FUNZIONE PER UPLOAD DELL'IMMAGINE PASSANDO I PARAMETRI
      await uploadCover(cover, data._id);
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }

    //RESET DEL FORM
    handleReset();
    //NAVIGA ALLA PAGINA PROFILO
    navigate("/me");
  };

  //FUNZIONE PER CANCELLARE IL FORM
  const handleReset = () => {
    setTitle("");
    setCategory("Categoria 1");
    setContent("");
  };

  return (
    <>
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Categoria 1</option>
              <option>Categoria 2</option>
              <option>Categoria 3</option>
              <option>Categoria 4</option>
              <option>Categoria 5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </Form.Group>

          <Form>
            <Row>
              <Col xs={7}>
                <Form.Label>Reading Time</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder="3"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="min"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                />
              </Col>
            </Row>
          </Form>

          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Contenuto Blog</Form.Label>

            <CKEditor
              editor={ClassicEditor}
              data="<p>Write your Blog</p>"
              onReady={(editor) => {
                console.log(
                  "CKEditor5 React Component is ready to use!",
                  editor
                );
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setContent(data);
              }}
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button
              type="reset"
              size="lg"
              variant="outline-dark"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
            >
              Invia
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
