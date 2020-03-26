import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";

const UsersPage = () => {
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/users").then(({ data }) => {
      setUsersList(data);
    });
  }, []);

  return (
    <div>
      <UserList users={usersList} />
    </div>
  );
};

export default UsersPage;
