import React from "react";

import Card from "../../../components/Card/Card";
import AvatarImage from "../../../components/AvatarImage/AvatarImage";
import "./UserInfo.scss";

const UserInfo = ({ nickname, src }) => {
  return (
    <Card className="user-info">
      <AvatarImage
        src={src}
        alt={`${nickname}img`}
        className="user-info__avatar"
      />
      <h2 className="user-info__nickname">{nickname}</h2>
    </Card>
  );
};

export default UserInfo;
