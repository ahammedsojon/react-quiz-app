import { useEffect, useState } from "react";

const useFetch = (url, method, headers) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    loading,
    error,
    result,
  };
};

export default useFetch;
