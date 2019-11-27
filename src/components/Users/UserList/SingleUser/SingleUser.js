import React from "react";
import "./SingleUser.scss";
import { Link } from "react-router-dom";

const SingleUser = ({ id, userName, avatar, numberOfViews, imagesCount }) => {
  return (
    <div className="single-user">
      <Link to={`images/${id}`}>
        <div className="single-user">
          <img
            alt={`${userName}img`}
            className="single-user__image"
            src={avatar}
          ></img>
          <h3 className="single-user__name">{userName}</h3>
          <div className="single-user__details">
            <p>{numberOfViews}</p>
            <p>{imagesCount}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleUser;
