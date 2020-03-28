import React from "react";

import "./AvatarImage.scss";

const AvatarImage = ({ src, alt, className }) => {
  return (
    <>
      <img src={src} className={`avatar_image ${className}`} alt={alt} />
    </>
  );
};

export default AvatarImage;
