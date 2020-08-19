import React from "react";

import "./ImagesContainer.scss";

interface IImagesContainer {
  className: string;
  children: JSX.Element | JSX.Element[];
}

const ImagesContainer = ({ className, children }: IImagesContainer) => {
  return <div className={`images-container ${className}`}>{children}</div>;
};

export default ImagesContainer;
