import React from "react";

import UserList from "../components/Users/UserList/UserList";

const Users = () => {
  const usersList = [
    {
      name: "test",
      avatar: "test",
      imagesCount: 1,
      views: 1,
      id: 1
    }
  ];

  return (
    <div>
      <UserList users={usersList} />
    </div>
  );
};

export default Users;
