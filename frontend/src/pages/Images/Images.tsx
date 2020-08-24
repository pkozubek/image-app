import React, { useEffect } from "react";

import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../API/API";
import Spinner from "../../components/Spinner/Spinner";
import SingleImage from "./SingleImage/SingleImage";

import "./Images.scss";

const Images = (): JSX.Element => {
  const { get, isLoading, data } = useHttp();

  useEffect(() => {
    get(API_IMAGES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let images: JSX.Element = <Spinner />;

  if (!isLoading && data !== null) {
    images = data.map((singleImage) => {
      return <SingleImage imageData={singleImage} key={singleImage._id} />;
    });
  }

  return <div className="Images">{images}</div>;
};

export default Images;
