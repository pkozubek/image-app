import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./UserPage.scss";

import UserInfo from "./UserInfo/UserInfo";
import ImagesContainer from "../../components/ImagesContainer/ImagesContainer";
import { useHttp } from "../../hooks/useHttp";
import { API_IMAGES } from "../../helpers/url";
import Spinner from "../../components/Spinner/Spinner";

const UserPage = () => {
  const params: { id: string } = useParams();
  const userId = params.id;
  const history = useHistory();

  const { get, data, isLoading } = useHttp();

  useEffect(() => {
    get(API_IMAGES + `/user/${userId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <UserInfo
        nickname="test"
        description="some description"
        src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
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
