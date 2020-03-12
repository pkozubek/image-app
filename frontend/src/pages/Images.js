import React, { useEffect } from "react";
import { useHttp } from "../hooks/http-hook";
const Images = () => {
  const { get, isLoading, data } = useHttp();

  useEffect(() => {
    get("http://localhost:4000/api/users");
  }, []);

  if (isLoading) {
    console.log("loaduje");
  } else {
    console.log("juz nie loaduje");
    console.log(data);
  }

  return <h1>images</h1>;
};

export default Images;
