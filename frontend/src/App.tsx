import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import UsersPage from "./pages/UsersPage/UsersPage";
import Images from "./pages/Images/Images";
import UserPage from "./pages/UserPage/UserPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Image from "./pages/Image/Image";
import { AuthContext } from "./context/authContext";
import Layout from "./Layout";
import ImageAdd from "./pages/ImageAdd/ImageAdd";
import { IUserDataWithExpirationDate } from "./interfaces/IUserDataDTO";

const defaultRoutes = [
  <Route key="base" exact path="/">
    <Login />
  </Route>,
  <Route key="register" path="/register">
    <Register />
  </Route>,
];

export default (): JSX.Element => {
  const { userData, setLogged } = useContext(AuthContext);
  const [routes, setRoutes] = useState(defaultRoutes);

  useEffect(() => {
    const storageUserData: IUserDataWithExpirationDate = JSON.parse(
      localStorage.getItem("userData")
    );

    if (
      !userData &&
      storageUserData &&
      storageUserData.token &&
      new Date(storageUserData.expirationDate) > new Date()
    ) {
      const tokenTimeLeft =
        new Date(storageUserData.expirationDate).getTime() -
        new Date().getTime();

      setLogged(storageUserData, tokenTimeLeft);
    }
  }, [userData, setLogged]);

  useEffect(() => {
    if (!userData) setRoutes(defaultRoutes);
    else {
      const routes = [
        <Route key="base" path="/" exact>
          <Images />
        </Route>,
        <Route key="users" path="/users" exact>
          <UsersPage />
        </Route>,
        <Route key="userid" path="/users/:id" exact>
          <UserPage />
        </Route>,
        <Route key="imageid" path="/image/:id" exact>
          <Image />
        </Route>,
        <Route key="imageadd" path="/imageadd" exact>
          <ImageAdd />
        </Route>,
      ];

      setRoutes(routes);
    }
  }, [userData]);

  return (
    <Router>
      <Layout>
        <main>
          <Switch>
            {routes}
            <Redirect to="/" />
          </Switch>
        </main>
      </Layout>
    </Router>
  );
};
