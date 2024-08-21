import { useState, useEffect } from "react";
import { NotFoundError } from "../utils/error";
import type { KanjiQueryResult, KanjiItem } from "kanjibreak-api-types";

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
  const [data, setData] = useState<null | KanjiItem[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof RAPID_API_KEY !== "string") {
      console.error(
        "Rapid api key is required.\nYOu can get the api key through following this link: https://rapidapi.com/BettoRaite/api/kanjibreakapi "
      );
      return;
    }

    setIsLoading(true);

    let ignore = false;
    let fetchUrl = DEFAULT_FETCH_URL;

    if (searchQuery) {
      console.log(searchQuery);
      fetchUrl = `${BASE_URL}/kanji/character/${searchQuery}`;
    }

    async function initReq() {
      try {
        const response = await fetch(fetchUrl, FETCH_OPTIONS);
        if (response.status === 400) {
          throw new NotFoundError("Not found.");
        }
        const data = (await response.json()) as KanjiQueryResult;
        if (!Array.isArray(data.items)) {
          throw new NotFoundError("Not found.");
        }

        const { items } = data;

        if (!ignore) {
          setData(items);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof NotFoundError) {
          setData(null);
          setIsLoading(false);
        } else {
          console.error(`Failed to fetch data:\n${error}`);
          setError(true);
          setIsLoading(false);
        }
      }
    }

    initReq();

    return () => {
      ignore = true;
    };
  }, [searchQuery]);

  return { data, isLoading, error };
}
