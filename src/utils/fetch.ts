import type { KanjiEndpointResponse } from "kanjibreak-api-types";
import { NotFoundError } from "./error";
import { apiResponse } from "../schemas/schema";

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
if (typeof RAPID_API_KEY !== "string") {
  throw new Error(
    "Rapid api key is required.\nYou can get the api key through following this link: https://rapidapi.com/BettoRaite/api/kanjibreakapi "
  );
}
const BASE_URL = "https://kanjibreakapi.p.rapidapi.com/kanji";

export const INITIAL_PAGE = 1;
export const PAGE_SIZE = 100;

export async function fetchItems(
  fetchUrl: string
): Promise<KanjiEndpointResponse> {
  const response = await fetch(`${fetchUrl}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "kanjibreakapi.p.rapidapi.com",
    },
  });
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

export function getNextFetchUrl(searchQuery: string, page: number) {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("pageSize", String(PAGE_SIZE));
  if (page > 1) params.append("offset", "1");

  let fetchUrl = `${BASE_URL}?${params.toString()}`;

  if (searchQuery) {
    fetchUrl = `${BASE_URL}/character/${searchQuery}`;
  }

  return fetchUrl;
}
