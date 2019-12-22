import React from "react";

import SingleUser from "./SingleUser/SingleUser";
import "./UserList.scss";

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
              avatar={avatar}
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
