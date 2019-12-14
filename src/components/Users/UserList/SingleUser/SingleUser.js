import React from "react";
import "./SingleUser.scss";
import { Link } from "react-router-dom";

const SingleUser = ({ id, userName, avatar, numberOfViews, imagesCount }) => {
  return (
    <li className="single-user">
      <Link to={`images/${id}`} className="single-user__container">
        <img
          alt={`${userName}img`}
          className="single-user__avatar"
          src={avatar}
        ></img>
        <div className="single-user__info">
          <h2 className="single-user__name">{userName}</h2>
          <div className="single-user__details">
            <p className="single-user__details-item">Images: {imagesCount}</p>
            <p className="single-user__details-item">Views: {numberOfViews}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SingleUser;
