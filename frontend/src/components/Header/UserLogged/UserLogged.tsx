import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import "./UserLogged.scss";

export default function UserLogged({ userName = "test" }) {
  const { setLogged } = useContext(AuthContext);
  const history = useHistory();

  const onClick = () => {
    setLogged!(false);
    history.push("/");
  };

  return (
    <div className="UserLogged">
      Logged as <span className="UserLogged__nickname">{userName}</span>,
      <span className="UserLogged__logout" onClick={onClick}>
        Logout
      </span>
    </div>
  );
}
