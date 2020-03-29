import React from "react";
import { useHistory } from "react-router-dom";

import "./SingleImage.scss";

export default function SingleImage({ imageData }) {
  const history = useHistory();
  const { _id, url, name, userID, views, likes } = imageData;
  const { name: author } = userID;

  const onClick = () => {
    history.push(`/image/${_id}`);
  };

  return (
    <div className="Single-image" onClick={onClick}>
      <img className="Single-image__image" src={url} />
      <div className="Single-image__description">
        <p>
          name: {name} views: {views} likes: {likes}
        </p>
        <p>author: {author}</p>
      </div>
    </div>
  );
}
