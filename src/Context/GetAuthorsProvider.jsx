import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const GetAuthors = createContext(null);

const getUrl = "http://localhost:3010/authors";

export default function GetAuthorsProvider({ children }) {
  const [data, setData] = useState([]);

  // FUNZIONE GET PER I BLOG
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("Token non trovato");
      }

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
    // Chiamiamo fetchData solo se il token è presente
    const token = localStorage.getItem("userToken");
    if (token) {
      fetchData();
    }
  }, []);

  return (
    <GetAuthors.Provider value={{ data, fetchData }}>
      {children}
    </GetAuthors.Provider>
  );
}
