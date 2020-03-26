import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";
import { API_IMAGES } from "../../helpers/url";

export default function Image() {
  const imageId = useParams().id;
  const { get, data, isLoading } = useHttp();

  useEffect(() => {
    get(`${API_IMAGES}/${imageId}`);
  }, []);

  let content = "loading";

  if (!isLoading && data !== null) {
    console.log("content");
    const { image } = data;
    console.log(image);
    content = <img src={image.url} />;
  }

  return <div>{content}</div>;
}
