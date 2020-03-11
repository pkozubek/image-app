import React from "react";

import SingleUser from "./SingleUser";
import "./UserList.scss";

const defaultImage =
  "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const UserList = ({ users }) => {
  let renderedUserList = (
    <div>
      <h2>No users</h2>
    </div>
  );

  if (users && users.length > 0) {
    renderedUserList = (
      <ul className="users_list">
        {users.map(({ id, name, avatar, views, imagesCount }) => {
          return (
            <SingleUser
              key={id}
              id={id}
              userName={name}
              avatar={avatar || defaultImage}
              numberOfViews={views}
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
