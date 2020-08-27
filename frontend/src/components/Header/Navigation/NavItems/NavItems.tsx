import React, { useContext } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavItem.scss";
import { AuthContext } from "../../../../context/auth-context";
import { useHistory } from "react-router-dom";

interface INavContainerProps {
  onClick?: () => void;
}

const NavItemContainer = ({ onClick }: INavContainerProps) => {
  const { setLogged } = useContext(AuthContext);

  const onLogoutClick = () => {
    onClick();
    setLogged(null);
  };

  return (
    <ul className="menu-items">
      <NavItem onClick={onClick} link={"/"} exact>
        Images
      </NavItem>
      <NavItem onClick={onClick} link={"/users"}>
        Users
      </NavItem>
      <NavItem onClick={onClick} link={"/add_image"} add>
        Add Image
      </NavItem>
      <NavItem
        className="menu-items__logout"
        onClick={onLogoutClick}
        link={"/"}
        add
      >
        Logout
      </NavItem>
    </ul>
  );
};

export default NavItemContainer;
