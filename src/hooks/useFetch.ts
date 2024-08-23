import { useState, useEffect, useRef } from "react";
import { NotFoundError } from "../utils/error";
import type { KanjiQueryResult, KanjiItem } from "kanjibreak-api-types";
import { apiResponse } from "../schemas/schema";

type RequestState = {
  data: null | KanjiItem[];
  isLoading: boolean;
  error: null | Error;
  hasMorePages: boolean;
};

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
if (typeof RAPID_API_KEY !== "string") {
  throw new Error(
    "Rapid api key is required.\nYou can get the api key through following this link: https://rapidapi.com/BettoRaite/api/kanjibreakapi "
  );
}
const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "kanjibreakapi.p.rapidapi.com",
  },
};
async function fetchItems(fetchUrl: string): Promise<KanjiQueryResult> {
  const response = await fetch(`${fetchUrl}`, FETCH_OPTIONS);
  const tryParseResData = async () => {
    try {
      return await response.json();
    } catch {
      console.error("Failed to parse unknown response");
      return {};
    }
  };

  switch (response.status) {
    case 400: {
      throw new NotFoundError("Not found.");
    }
    case 200: {
      const data = (await response.json()) as KanjiQueryResult;
      apiResponse.parse(data);
      return data;
    }

    default: {
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
}

type ResponseCache = Record<string, KanjiQueryResult | undefined>;
export function useFetch(fetchUrl: string) {
  const [requestState, setRequestState] = useState<RequestState>({
    data: null,
    isLoading: true,
    error: null,
    hasMorePages: true,
  });
  const responseCache = useRef<ResponseCache>({});

  useEffect(() => {
    setRequestState((prev) => ({
      ...prev,
      data: null,
      isLoading: true,
    }));

    function setData(data: KanjiQueryResult) {
      const { items, metadata = {} } = data;

      setRequestState({
        error: null,
        isLoading: false,
        data: items,
        hasMorePages: (metadata.pages ?? 0) > 0,
      });
      responseCache.current[fetchUrl] = data;
    }

    let ignoreResponse = false;

    async function initReq() {
      try {
        let data = responseCache.current[fetchUrl];
        if (!data) {
          data = await fetchItems(fetchUrl);
        }
        if (!ignoreResponse) {
          setData(data);
        }
      } catch (error) {
        if (!(error instanceof NotFoundError)) {
          console.error(`Failed to fetch data:\n${error}`);
        }
        setRequestState({
          data: null,
          isLoading: false,
          hasMorePages: false,
          error: error as Error,
        });
      }
    }

    initReq();

    return () => {
      ignoreResponse = true;
    };
  }, [fetchUrl]);

  return requestState;
}
