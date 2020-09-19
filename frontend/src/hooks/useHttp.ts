import { useState } from "react";
import axios from "axios";

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  function handleError(err) {
    setLoading(false);
    setError(err);
  }

  function handleSuccess({ data }) {
    setLoading(false);
    setError(null);
    setData(data);
  }

  const get = async (url: string) => {
    setLoading(true);
    await axios.get(url).then(handleSuccess).catch(handleError);
  };

  const post = async (url: string, data: object | FormData) => {
    setLoading(true);
    await axios.post(url, data).then(handleSuccess).catch(handleError);
  };

  const patch = async (url: string, data) => {
    setLoading(true);
    await axios.patch(url, data).then(handleSuccess).catch(handleError);
  };

  const del = async (url: string, data?) => {
    setLoading(true);
    await axios.delete(url, data).then(handleSuccess).catch(handleError);
  };

  return { get, post, patch, del, error, data, isLoading };
};
