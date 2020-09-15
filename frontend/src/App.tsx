import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Header from "./components/Header/Header";
import UsersPage from "./pages/UsersPage/UsersPage";
import Images from "./pages/Images/Images";
import UserPage from "./pages/UserPage/UserPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Image from "./pages/Image/Image";
import { AuthContext } from "./context/auth-context";
import ImageModal from "./components/Modal/ImageModal";

export default (): JSX.Element => {
  const { userData } = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );

  if (userData) {
    routes = (
      <>
        <Header />
        <ImageModal />
        <main>
          <Switch>
            <Route path="/" exact>
              <Images />
            </Route>
            <Route path="/users" exact>
              <UsersPage />
            </Route>
            <Route path="/users/:id" exact>
              <UserPage />
            </Route>
            <Route path="/image/:id" exact>
              <Image />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </>
    );
  }

  return <Router>{routes}</Router>;
};
