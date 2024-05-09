import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const GetBlog = createContext(null);

const getUrl = "http://localhost:3010/blogPosts";

export default function GetBlogProvider({ children }) {
  const [data, setData] = useState("");

  // FUNZIONE GET PER I BLOG
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(getUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Errore nella richiesta GET: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error("Errore durante la richiesta GET:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <GetBlog.Provider value={{ data }}>{children}</GetBlog.Provider>;
}
