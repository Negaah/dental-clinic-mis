 // Paiman's Changes here


import { useState, useEffect } from "react";
import apiClient from "../lib/api";

interface UseFetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
}


 // Paiman's Changes here
const useFetch = <T = any>(url: string, options: UseFetchOptions = { method: "GET" }) => {
    const [data, setData] = useState<T | null>(null);
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
                setData(response.data as T);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (url) fetchData(); // Ensure URL is not empty before fetching
    }, [url, options.method, options.body]);

    return { data, loading, error };
};

export default useFetch;
