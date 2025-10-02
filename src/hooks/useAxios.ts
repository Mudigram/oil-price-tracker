"use client";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export function useAxios<T = unknown>(
  url: string,
  options?: AxiosRequestConfig
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.request<T>({ url, ...(options || {}) });
        setData(res.data);
      } catch (err: unknown) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        const fallbackMessage = axiosErr.message || "Request failed";
        const serverMessage = (
          axiosErr.response?.data as { message?: string } | undefined
        )?.message;
        setError(serverMessage || fallbackMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // include both url and options so consumers can pass headers/params and trigger re-fetch
  }, [url, options]);

  return { data, loading, error };
}
