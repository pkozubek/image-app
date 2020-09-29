import React, { useContext } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavItem.scss";
import { AuthContext } from "../../../../context/authContext";
import {
  ImageModalContext,
  IsMobileContext,
} from "../../../../context/uiContext";
import Button from "../../../Button/Button";

interface INavContainerProps {
  onClick?: () => void;
}

const NavItemContainer = ({ onClick }: INavContainerProps) => {
  const { setLoggedOut } = useContext(AuthContext);
  const imageContext: any = useContext(ImageModalContext);
  const isMobile = useContext(IsMobileContext);

  const onLogoutClick = () => {
    onClick();
    setLoggedOut();
  };

  const onAddImageClick = () => {
    imageContext.openImageCreate();
  };

  const imageAdd = isMobile ? (
    <NavItem onClick={onClick} link={"/imageadd"}>
      Add Image
    </NavItem>
  ) : (
    <Button className="menu-items__add-image" onClick={onAddImageClick}>
      Add Image
    </Button>
  );

  return (
    <ul className="menu-items">
      <NavItem onClick={onClick} link={"/"} exact>
        Images
      </NavItem>
      <NavItem onClick={onClick} link={"/users"}>
        Users
      </NavItem>
      {imageAdd}
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
