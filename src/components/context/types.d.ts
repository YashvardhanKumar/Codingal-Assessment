interface InfiniteScrollContextProps {
    page: number;
    more: boolean;
    loading: boolean;
    error: string | null;
    setPage: React.Dispatch<React.SetStateAction<number>>
    setMore: React.Dispatch<React.SetStateAction<boolean>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
    lastPostElementRef: (e: HTMLDivElement) => void
}

interface InfiniteScrollProps {
    children: React.ReactNode;
}