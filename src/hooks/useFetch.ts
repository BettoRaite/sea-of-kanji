import { useState, useEffect } from "react";
import { NotFoundError } from "../utils/error";
import type { KanjiQueryResult, KanjiItem } from "kanjibreak-api-types";
import { apiResponse } from "../schemas/schema";

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
const PAGE_SIZE = 100;

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
    if (typeof RAPID_API_KEY !== "string") {
      console.error(
        "Rapid api key is required.\nYOu can get the api key through following this link: https://rapidapi.com/BettoRaite/api/kanjibreakapi "
      );
      return;
    }

    setFetchState((prevFetchState) => ({
      ...prevFetchState,
      data: null,
      isLoading: true,
    }));

    let ignore = false;

    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("pageSize", String(PAGE_SIZE));
    if (page > 1) params.append("offset", "1");

    let fetchUrl = `${DEFAULT_FETCH_URL}?${params.toString()}`;

    if (searchQuery) {
      fetchUrl = `${BASE_URL}/kanji/character/${searchQuery}`;
    }

    async function fetchItems() {
      try {
        const response = await fetch(`${fetchUrl}`, FETCH_OPTIONS);

        switch (response.status) {
          case 400: {
            throw new NotFoundError("Not found.");
          }
          case 200: {
            const data = (await response.json()) as KanjiQueryResult;

            apiResponse.parse(data);

            const { items, metadata = {} } = data;

            if (!ignore) {
              setFetchState((prevFetchState) => ({
                ...prevFetchState,
                isLoading: false,
                data: items,
                hasMorePages: (metadata.pages ?? 0) > 0,
              }));
            }
            break;
          }

          default: {
            const tryParseResData = async () => {
              try {
                return await response.json();
              } catch {
                console.error("Failed to parse unknown response");
                return {};
              }
            };

            const unknownReponseData = await tryParseResData();

            throw new Error(
              `Unknown response\nResponse data: ${JSON.stringify(
                unknownReponseData,
                null,
                4
              )}`
            );
          }
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
