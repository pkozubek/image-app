import React from "react";

import "./ImagesContainer.scss";

const ImagesContainer = ({ className, children, title }) => {
  return <div className={`images-container ${className}`}>{children}</div>;
};

export default ImagesContainer;
