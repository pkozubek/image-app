import { useState } from "react";
import axios from "axios";

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const get = url => {
    setLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => setError(err));
  };

  return { get, error, data, isLoading };
};
