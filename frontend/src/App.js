import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./components/Header/Header";
import UsersPage from "./pages/UsersPage/UsersPage";
import Images from "./pages/Images/Images";
import UserPage from "./pages/UserPage/UserPage";
import AddImage from "./pages/AddImage/AddImage";
import Authenticate from "./pages/Authenticate/Authenticate";
import Image from "./pages/Image/Image";
import { AuthContext } from "./context/auth-context";

function App() {
  const { isLogged } = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route path="/">
        <Authenticate />
      </Route>
    </Switch>
  );

  if (isLogged) {
    routes = (
      <>
        <Header />
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
            <Route path="/add_image" exact>
              <AddImage />
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
}

export default App;
