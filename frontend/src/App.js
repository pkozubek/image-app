import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./components/shared/Header/Header";
import UsersPage from "./pages/UsersPage/UsersPage";
import Images from "./pages/Images";
import Welcome from "./pages/Welcome.js";
import UserPage from "./pages/UserPage/UserPage";
import AddImage from "./pages/AddImage/AddImage";
import EditImage from "./pages/EditImage/EditImage";
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
              <Welcome />
            </Route>
            <Route path="/images" exact>
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
            <Route path="/edit_image/:id" exact>
              <EditImage />
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
