import { useEffect, type ReactNode } from "react";
type InfiniteScrollProps = {
  children: ReactNode;
  hasMorePages: boolean;
  isLoading: boolean;
  onNextPage: () => void;
};
export function InfiniteScroll({
  children,
  onNextPage,
  hasMorePages,
  isLoading,
}: InfiniteScrollProps) {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        if (!isLoading) {
          onNextPage();
        }
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
  }, [hasMorePages, onNextPage, isLoading]);
  return <>{children}</>;
}
