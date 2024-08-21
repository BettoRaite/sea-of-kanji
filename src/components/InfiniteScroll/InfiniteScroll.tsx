import { useEffect, type ReactNode } from "react";
type InfiniteScrollProps = {
  children: ReactNode;
  hasMore: boolean;
  onNextPage: () => void;
};
export function InfiniteScroll({
  children,
  onNextPage,
  hasMore,
}: InfiniteScrollProps) {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        console.log(scrollTop, clientHeight, scrollHeight);
        onNextPage();
      }
    };

    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (hasMore) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, onNextPage]);
  return <>{children}</>;
}
