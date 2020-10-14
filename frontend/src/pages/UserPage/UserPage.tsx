import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BsCardImage } from "react-icons/bs";

import "./UserPage.scss";

import UserInfo from "./UserInfo/UserInfo";
import ImagesContainer from "../../components/ImagesContainer/ImagesContainer";
import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../API/images";
import Spinner from "../../components/Spinner/Spinner";
import { getUserData } from "../../API/users";
import { AuthContext } from "../../context/authContext";
import { defaultAvatar } from "../../utils/defaults";

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
    //eslint-disable-next-line
  }, [asyncEffect, userId]);

  const onImageClick = (id) => {
    history.push(`/image/${id}`);
  };

  let renderedImages = isLoading && <Spinner />;

  const images = data ? data.images : [];
  if (!isLoading && images.length > 0) {
    const { images } = data;
    renderedImages = (
      <>
        <h2 className="user-images__title">Images: </h2>
        <ImagesContainer className="user-images__container">
          {images.map((singleImg, index) => (
            <img
              key={images.name + index.toString()}
              src={singleImg.url}
              alt={singleImg.name}
              onClick={() => onImageClick(singleImg.id)}
            />
          ))}
        </ImagesContainer>
      </>
    );
  } else if (!isLoading && images.length === 0) {
    renderedImages = (
      <div className="user-images__placeholder">
        <BsCardImage /> <span>Users did not upload any image</span>
      </div>
    );
  }

  return (
    <div>
      <UserInfo nickname={user.name} src={user.avatar || defaultAvatar} />
      <div className="user-images">{renderedImages}</div>
    </div>
  );
};

export default UserPage;
