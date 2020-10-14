import React, { useCallback, useContext, useEffect, useState } from "react";
import SingleUser from "./SingleUser/SingleUser";
import Spinner from "../../components/Spinner/Spinner";
import "./UserList.scss";
import { AuthContext } from "../../context/authContext";
import { getUserList } from "../../API/users";
import { defaultAvatar } from "../../utils/defaults";

const UsersPage = () => {
  const [users, setUsersList] = useState(null);
  const { userData } = useContext(AuthContext);

  const awaitEffect = useCallback(async () => {
    const users = await getUserList(userData.token);
    setUsersList(users);
  }, [userData.token]);

  useEffect(() => {
    awaitEffect();
  }, [awaitEffect]);

  let renderedUserList = <Spinner />;

  if (users && users.length > 0) {
    renderedUserList = (
      <ul className="users_list">
        {users.map(({ id, name, avatar, images }) => {
          const imagesCount = images.length;

          return (
            <SingleUser
              key={id}
              id={id}
              userName={name}
              avatar={avatar || defaultAvatar}
              imagesCount={imagesCount}
            />
          );
        })}
      </ul>
    );
  }

  return <div>{renderedUserList}</div>;
};

export default UsersPage;
