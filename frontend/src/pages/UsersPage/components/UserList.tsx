import React from "react";

import SingleUser from "./SingleUser";
import "./UserList.scss";
import Spinner from "../../../components/Spinner/Spinner";

const defaultImage =
  "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const UserList = ({ users }) => {
  let renderedUserList = <Spinner />;
  console.log(users);

  if (users && users.length > 0) {
    renderedUserList = (
      <ul className="users_list">
        {users.map(({ id, name, avatar, images }) => {
          const imagesCount = images.length;
          const viewsCount =
            images.length > 0
              ? images.reduce((prev, current) => prev.views + current.views)
              : 0;

          return (
            <SingleUser
              key={id}
              id={id}
              userName={name}
              avatar={avatar || defaultImage}
              numberOfViews={viewsCount}
              imagesCount={imagesCount}
            />
          );
        })}
      </ul>
    );
  }

  return renderedUserList;
};

export default UserList;
