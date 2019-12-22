import React from "react";

import Button from "../../shared/InterfaceElements/Button/Button";

const ImageModal = ({ src, title }) => {
  return (
    <>
      <img src={src} alt={`img${title}`} />
      <h3>{title}</h3>
      <div>
        <Button>UnLike</Button>
        <Button>Like</Button>
      </div>
    </>
  );
};

export default ImageModal;
