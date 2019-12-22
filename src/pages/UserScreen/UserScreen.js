import React from "react";

import UserInfo from "../../components/UserScreen/UserInfo/UserInfo";
import ImagesContainer from "../../components/shared/InterfaceElements/ImagesContainer/ImagesContainer";

import "./UserScreen.scss";

const UserScreen = () => {
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
          <img
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
