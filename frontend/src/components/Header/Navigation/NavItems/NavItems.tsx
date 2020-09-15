import React, { useContext } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavItem.scss";
import { AuthContext } from "../../../../context/auth-context";
import { useHistory } from "react-router-dom";
import { ImageModalContext } from "../../../../context/image-modal-context";

interface INavContainerProps {
  onClick?: () => void;
}

const NavItemContainer = ({ onClick }: INavContainerProps) => {
  const { setLogged } = useContext(AuthContext);
  const imageContext: any = useContext(ImageModalContext);

  const onLogoutClick = () => {
    onClick();
    setLogged(null);
  };

  const onAddImageClick = () => {
    console.log("click");
    imageContext.openImageCreate();
  };

  console.log(imageContext);

  return (
    <ul className="menu-items">
      <NavItem onClick={onClick} link={"/"} exact>
        Images
      </NavItem>
      <NavItem onClick={onClick} link={"/users"}>
        Users
      </NavItem>
      <button onClick={onAddImageClick}>Add Image</button>
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
