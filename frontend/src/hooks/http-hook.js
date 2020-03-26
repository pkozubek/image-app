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
    console.log("inHandler", data);
    setLoading(false);
    setError(null);
    setData(data);
  }

  const get = async url => {
    setLoading(true);
    await axios
      .get(url)
      .then(handleSuccess)
      .catch(handleError);
  };

  const post = async (url, data) => {
    setLoading(true);
    await axios
      .post(url, data)
      .then(handleSuccess)
      .catch(handleError);
  };

  const patch = (url, data) => {
    setLoading(true);
    axios
      .patch((url, data))
      .then(handleSuccess)
      .catch(handleError);
  };

  const del = (url, data) => {
    setLoading(true);
    axios
      .delete(url, data)
      .then(handleSuccess)
      .catch(handleError);
  };

  return { get, post, patch, del, error, data, isLoading };
};
