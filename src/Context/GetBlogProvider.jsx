import React, { createContext } from "react";
import { useState } from "react";

export const GetBlog = createContext(null);

const getUrl = "http://localhost:3010/blogPosts";

export default function GetBlogProvider({ children }) {
  const [data, setData] = useState("");

  // FUNZIONE GET PER I BLOG
  const fetchData = async () => {
    try {
      const response = await fetch(getUrl);
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error("Errore durante la richiesta GET:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <MyContext.Provider value={{ data }}>{children}</MyContext.Provider>;
}
