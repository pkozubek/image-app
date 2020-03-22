import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./UserPage.scss";

import UserInfo from "../../components/UserScreen/UserInfo/UserInfo";
import ImagesContainer from "../../components/shared/InterfaceElements/ImagesContainer/ImagesContainer";
import Modal from "../../components/shared/InterfaceElements/Modal/Modal";
import ImageModal from "../../components/UserScreen/ImageModal/ImageModal";
import ConfirmationModal from "../../components/UserScreen/ConifrmationModal/ConfirmationModal";
import { useHttp } from "../../hooks/http-hook";
import { API_IMAGES } from "../../helpers/url";

const UserPage = () => {
  const userId = useParams().id;

  const { get, data, error, isLoading } = useHttp();

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const showDeleteConfirmation = () => {
    setImageModalVisible(false);
    setConfirmationModalVisible(true);
  };

  useEffect(() => {
    get(API_IMAGES + `/user/${userId}`);
  }, []);

  let gatheredImages = null;

  if (!isLoading && data !== null) {
    const { images } = data;
    gatheredImages = images.map(singleImg => (
      <img key={images.name} src={singleImg.url} alt={singleImg.name} />
    ));
  }

  return (
    <div>
      <Modal isVisible={isImageModalVisible} setVisible={setImageModalVisible}>
        <ImageModal
          src="https://image.winudf.com/v2/image/Y29tLmVib2wuY3V0ZWdpcmxfc2NyZWVuXzJfMTUyMzc3MDEzMF8wNDI/screen-2.jpg?fakeurl=1&type=.jpg"
          title="test"
          deleteAction={showDeleteConfirmation}
        />
      </Modal>
      <Modal
        isVisible={isConfirmationModalVisible}
        setVisible={setConfirmationModalVisible}
      >
        <ConfirmationModal question="Are you sure that you want to delete this image?" />
      </Modal>
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
