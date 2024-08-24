import { useState, useEffect, useRef } from "react";
import { NotFoundError } from "../utils/error";

type ResponseCache<T> = Record<string, T | undefined>;
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

type FetchCallback<T> = (fetchUrl: string) => Promise<T>;
export function useFetch<T>(
  fetchUrl: string,
  fetchCallback: FetchCallback<T>
): RequestState<T> {
  const [requestState, setRequestState] = useState<RequestState<T>>({
    status: "idle",
  });
  const responseCache = useRef<ResponseCache<T>>({});

  useEffect(() => {
    setRequestState(() => ({
      status: "loading",
    }));

    let ignoreResponse = false;

    async function initReq() {
      try {
        let data = responseCache.current[fetchUrl];
        if (!data) {
          data = await fetchCallback(fetchUrl);
        }
        if (!ignoreResponse) {
          setRequestState({
            status: "success",
            data,
          });
          responseCache.current[fetchUrl] = data;
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
  }, [fetchUrl, fetchCallback]);

  return requestState;
}
