import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

import "./UserLogged.scss";

export default function UserLogged() {
  const { setLoggedOut, userData } = useContext(AuthContext);
  const history = useHistory();

  const onClick = () => {
    setLoggedOut();
    history.push("/");
  };

  return (
    <div className="UserLogged">
      Logged as{" "}
      <span className="UserLogged__nickname">{userData && userData.name}</span>,
      <span className="UserLogged__logout" onClick={onClick}>
        Logout
      </span>
    </div>
  );
}
