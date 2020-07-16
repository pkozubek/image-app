import React from "react";

import "./AvatarImage.scss";

interface AvatarImageInterface {
  src: string;
  alt: string;
  className: string;
}

const AvatarImage = ({ src, alt, className }: AvatarImageInterface) => {
  return (
    <>
      <img src={src} className={`avatar_image ${className}`} alt={alt} />
    </>
  );
};

export default AvatarImage;
