import React, { useEffect } from "react";

import { useHttp } from "../../hooks/http-hook";
import { API_IMAGES } from "../../helpers/url";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";
import SingleImage from "./SingleImage/SingleImage";

import "./Images.scss";

const Images = () => {
  const { get, isLoading, data } = useHttp();

  useEffect(() => {
    get(API_IMAGES);
  }, []);

  let images = <Spinner />;

  if (!isLoading && data !== null) {
    images = data.map(singleImage => {
      return <SingleImage imageData={singleImage} key={singleImage._id} />;
    });
  }

  return <div>{images}</div>;
};

export default Images;
