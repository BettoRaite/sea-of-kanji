import { useState, useEffect } from "react";

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const BASE_URL = "https://kanjibreakapi.p.rapidapi.com";
const DEFAULT_FETCH_URL = `${BASE_URL}/kanji`;
const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "kanjibreakapi.p.rapidapi.com",
  },
};

export function useFetch(searchQuery: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof RAPID_API_KEY !== "string") {
      console.error("NO RAPID API KEY");
      return;
    }

    let ignore = false;
    let fetchUrl = DEFAULT_FETCH_URL;

    if (searchQuery) {
      fetchUrl = `${BASE_URL}/kanji/character/${searchQuery}`;
    }
    fetch(fetchUrl, FETCH_OPTIONS)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.items)) {
          throw new TypeError("items is not an array");
        }
        const { items } = data;
        if (!ignore) {
          console.log(items);
          setData(items);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
      });

    return () => {
      ignore = true;
    };
  }, [searchQuery]);

  return { data, isLoading, error };
}
