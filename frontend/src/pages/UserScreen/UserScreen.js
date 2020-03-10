import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./UserScreen.scss";

import UserInfo from "../../components/UserScreen/UserInfo/UserInfo";
import ImagesContainer from "../../components/shared/InterfaceElements/ImagesContainer/ImagesContainer";
import Modal from "../../components/shared/InterfaceElements/Modal/Modal";
import ImageModal from "../../components/UserScreen/ImageModal/ImageModal";
import ConfirmationModal from "../../components/UserScreen/ConifrmationModal/ConfirmationModal";

const UserScreen = () => {
  const userId = useParams().id;

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const showDeleteConfirmation = () => {
    setImageModalVisible(false);
    setConfirmationModalVisible(true);
  };

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
          <img
            onClick={() => setImageModalVisible(true)}
            alt="1"
            src="https://image.winudf.com/v2/image/Y29tLmVib2wuY3V0ZWdpcmxfc2NyZWVuXzJfMTUyMzc3MDEzMF8wNDI/screen-2.jpg?fakeurl=1&type=.jpg"
          />
          <img
            alt="2"
            src="https://image.winudf.com/v2/image/Y29tLmVib2wuY3V0ZWdpcmxfc2NyZWVuXzJfMTUyMzc3MDEzMF8wNDI/screen-2.jpg?fakeurl=1&type=.jpg"
          />
          <img
            alt="3"
            src="https://image.winudf.com/v2/image/Y29tLmVib2wuY3V0ZWdpcmxfc2NyZWVuXzJfMTUyMzc3MDEzMF8wNDI/screen-2.jpg?fakeurl=1&type=.jpg"
          />
          <img
            alt="4"
            src="https://image.winudf.com/v2/image/Y29tLmVib2wuY3V0ZWdpcmxfc2NyZWVuXzJfMTUyMzc3MDEzMF8wNDI/screen-2.jpg?fakeurl=1&type=.jpg"
          />
          <img
            alt="5"
            src="https://image.winudf.com/v2/image/Y29tLmVib2wuY3V0ZWdpcmxfc2NyZWVuXzJfMTUyMzc3MDEzMF8wNDI/screen-2.jpg?fakeurl=1&type=.jpg"
          />
        </ImagesContainer>
      </div>
    </div>
  );
};

export default UserScreen;
