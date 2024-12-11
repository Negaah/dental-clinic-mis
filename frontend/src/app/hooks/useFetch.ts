import { useState, useEffect } from "react";
import apiClient from "../lib/api";

interface UseFetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
}

const useFetch = (url: string, options: UseFetchOptions = { method: "GET" }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient({
                    url,
                    method: options.method,
                    data: options.body,
                });
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options.method, options.body]);

    return { data, loading, error };
};

export default useFetch;
