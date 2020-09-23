import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleUser from "./SingleUser/SingleUser";
import Spinner from "../../components/Spinner/Spinner";
import { USERS_API } from "../../API/users";
import "./UserList.scss";

const defaultImage =
  "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const UsersPage = () => {
  const [users, setUsersList] = useState(null);

  useEffect(() => {
    axios.get(USERS_API).then(({ data }) => {
      setUsersList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let renderedUserList = <Spinner />;

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
