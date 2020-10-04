import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./UserPage.scss";

import UserInfo from "./UserInfo/UserInfo";
import ImagesContainer from "../../components/ImagesContainer/ImagesContainer";
import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../API/images";
import Spinner from "../../components/Spinner/Spinner";
import { getUserData } from "../../API/users";
import { AuthContext } from "../../context/authContext";

const defaultAvatar =
  "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const UserPage = () => {
  const params: { id: string } = useParams();
  const userId = params.id;
  const history = useHistory();
  const { userData } = useContext(AuthContext);
  const [user, setUser] = useState<any>("");

  const { get, data, isLoading } = useHttp();

  const asyncEffect = useCallback(async () => {
    const gatheredUser = await getUserData(userId, userData.token);
    if (gatheredUser) setUser(gatheredUser);
  }, [userId, userData.token]);

  useEffect(() => {
    get(API_IMAGES + `/user/${userId}`);
    asyncEffect();
  }, [asyncEffect]);

  const onImageClick = (id) => {
    history.push(`/image/${id}`);
  };

  let gatheredImages = <Spinner />;

  if (!isLoading && data !== null) {
    const { images } = data;
    gatheredImages = images.map((singleImg) => (
      <img
        key={images.name}
        src={singleImg.url}
        alt={singleImg.name}
        onClick={() => onImageClick(singleImg.id)}
      />
    ));
  }

  return (
    <div>
      <UserInfo nickname={user.name} src={user.avatar || defaultAvatar} />
      <div className="user-images">
        <h2 className="user-images__title">Images: </h2>
        <ImagesContainer className="user-images__container">
          {gatheredImages}
        </ImagesContainer>
      </div>
    </div>
  );
};

export default UserPage;
