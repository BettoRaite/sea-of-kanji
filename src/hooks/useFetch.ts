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
type FetchState = {
  data: null | KanjiItem[];
  isLoading: boolean;
  error: null | Error;
  hasMorePages: boolean;
};
export function useFetch(searchQuery: string, page: number) {
  const [fetchState, setFetchState] = useState<FetchState>({
    data: null,
    isLoading: true,
    error: null,
    hasMorePages: true,
  });

  useEffect(() => {
    console.log("Fetching data");
    if (typeof RAPID_API_KEY !== "string") {
      console.error(
        "Rapid api key is required.\nYOu can get the api key through following this link: https://rapidapi.com/BettoRaite/api/kanjibreakapi "
      );
      return;
    }

    setFetchState((prevFetchState) => ({
      ...prevFetchState,
      isLoading: true,
    }));

    let ignore = false;
    let fetchUrl = DEFAULT_FETCH_URL;

    if (searchQuery) {
      console.log(searchQuery);
      fetchUrl = `${BASE_URL}/kanji/character/${searchQuery}`;
    }

    async function fetchItems() {
      try {
        const response = await fetch(`${fetchUrl}?page=${page}`, FETCH_OPTIONS);
        if (response.status === 400) {
          throw new NotFoundError("Not found.");
        }

        const data = (await response.json()) as KanjiQueryResult;
        if (!Array.isArray(data.items)) {
          throw new NotFoundError("Not found.");
        }

        const { items } = data;

        if (!ignore) {
          setFetchState((prevFetchState) => ({
            ...prevFetchState,
            isLoading: false,
            data: items,
          }));
        }
      } catch (error) {
        if (!(error instanceof NotFoundError)) {
          console.error(`Failed to fetch data:\n${error}`);
        }
        setFetchState({
          data: null,
          isLoading: false,
          hasMorePages: false,
          error: error as Error,
        });
      }
    }

    fetchItems();

    return () => {
      ignore = true;
    };
  }, [searchQuery, page]);

  return fetchState;
}
