import { createContext, useCallback, useContext, useRef, useState } from "react";

export const InfiniteScrollContext = createContext<InfiniteScrollContextProps | undefined>(
    undefined
  );
  
  /**
   * Custom hook for Post Context
   */
  
  export const useInfiniteScrollContext = () => {
    const context = useContext(InfiniteScrollContext);
    if (!context) {
      throw new Error(
        `${useInfiniteScrollContext.name} must be used within a ${InfiniteScrollContext.name}`
      );
    }
    return context;
  };
  
  /**
   * InfiniteScroll Component
   */
  
  const InfiniteScrollProvider: React.FC<InfiniteScrollProps> = ({ children }) => {
  const [page, setPage] = useState<number>(1);
  const [more, setMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const intersect = useRef<IntersectionObserver | null>(null);

   const lastPostElementRef = useCallback(
      (e: HTMLDivElement) => {
        if (loading) return;
        if (intersect.current) intersect.current.disconnect();
        intersect.current = new IntersectionObserver(
          (value) => {
            if (value[0].isIntersecting && more) {
              setPage((prePage) => prePage + 1);
            }
          },
          { threshold: 1.0 }
        );
        if (e) intersect.current.observe(e);
      },
      [loading, more]
    );
    
    return (
      <InfiniteScrollContext.Provider
        value={{
            page,
            more,
            loading,
            error,
            setPage,
            setMore,
            setLoading,
            setError,
            lastPostElementRef,
  
        }}
      >
        {children}
      </InfiniteScrollContext.Provider>
    );
  };
  export default InfiniteScrollProvider;