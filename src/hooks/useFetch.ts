import { useState, useEffect, useRef } from "react";
import { NotFoundError } from "../utils/error";
import type { KanjiEndpointResponse } from "kanjibreak-api-types";
import { apiResponse } from "../schemas/schema";

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
async function fetchItems(fetchUrl: string): Promise<KanjiEndpointResponse> {
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
      const data = (await response.json()) as KanjiEndpointResponse;
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

type ResponseCache = Record<string, KanjiEndpointResponse | undefined>;
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: KanjiEndpointResponse }
  | { status: "error"; error: Error };

export function useFetch(fetchUrl: string) {
  const [requestState, setRequestState] = useState<RequestState>({
    status: "idle",
  });

  const responseCache = useRef<ResponseCache>({});

  useEffect(() => {
    setRequestState(() => ({
      status: "loading",
    }));

    function setData(data: KanjiEndpointResponse) {
      setRequestState({
        status: "success",
        data,
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
          status: "error",
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
