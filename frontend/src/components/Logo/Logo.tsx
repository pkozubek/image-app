import React from "react";
import { useHistory } from "react-router-dom";
import { IoIosImages } from "react-icons/io";

import { ILogoProps } from "../../interfaces/components/ILogo";

import "./Logo.scss";

export default ({ dark, clickable }: ILogoProps): JSX.Element => {
  const history = useHistory();
  const onClick = () => history.push("/");

  return (
    <h1
      onClick={onClick}
      className={`Logo ${dark ? "Logo__dark" : ""} ${
        clickable ? "Logo__clickable" : ""
      }`}
    >
      <IoIosImages className="Logo__icon" />
      Image-app
    </h1>
  );
};
