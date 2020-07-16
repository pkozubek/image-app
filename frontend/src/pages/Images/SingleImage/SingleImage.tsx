import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { IoIosEye, IoMdHeart } from "react-icons/io";

import "./SingleImage.scss";

interface ISingleImageProps {
  imageData: any;
}

export default function SingleImage({ imageData }: ISingleImageProps) {
  const history = useHistory();
  const { _id, url, name, userID, views, likes } = imageData;
  const { name: author } = userID;

  const onClick = useCallback(() => {
    history.push(`/image/${_id}`);
  }, [history, _id]);

  return (
    <div className="Single-image" onClick={onClick}>
      <img className="Single-image__image" src={url} alt={name} />
      <div className="Single-image__info">
        <IoIosEye /> {views} <IoMdHeart /> {likes}{" "}
        <span className="Single-image__info__author">author: {author}</span>
      </div>
    </div>
  );
}
