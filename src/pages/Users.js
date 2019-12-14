import React from "react";

import UserList from "../components/Users/UserList/UserList";

const Users = () => {
  const usersList = [
    {
      name: "Jakies imie",
      avatar:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
