import React from "react";
import "./SingleUser.scss";
import { Link } from "react-router-dom";

import Card from "../../../components/Card/Card";
import AvatarImage from "../../../components/AvatarImage/AvatarImage";

const SingleUser = ({ id, userName, avatar, numberOfViews, imagesCount }) => {
  return (
    <li className="single-user">
      <Card className="single-user__content">
        <Link to={`users/${id}`} className="single-user__container">
          <AvatarImage src={avatar} alt={`${userName}img`} />
          <div className="single-user__info">
            <h2 className="single-user__name">{userName}</h2>
            <div className="single-user__details">
              <p className="single-user__details-item">Images: {imagesCount}</p>
              <p className="single-user__details-item"></p>
            </div>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default SingleUser;
