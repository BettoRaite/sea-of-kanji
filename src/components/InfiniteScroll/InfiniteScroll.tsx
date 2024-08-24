import { useEffect, type ReactNode } from "react";
type InfiniteScrollProps = {
  children: ReactNode;
  hasMorePages: boolean;
  onNextPage: () => void;
};

const INFINITE_SCROOL_ENTRY = 5000;

export function InfiniteScroll({
  children,
  onNextPage,
  hasMorePages,
}: InfiniteScrollProps) {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - INFINITE_SCROOL_ENTRY) {
        onNextPage();
      }
    };

    if (hasMorePages) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (hasMorePages) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMorePages, onNextPage]);
  return <>{children}</>;
}
