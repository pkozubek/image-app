import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./components/shared/Header/Header";
import Users from "./pages/Users";
import Images from "./pages/Images";
import Welcome from "./pages/Welcome.js";
import UserScreen from "./pages/UserScreen/UserScreen";
import AddImage from "./pages/AddImage/AddImage";
import EditImage from "./pages/EditImage/EditImage";
import Authenticate from "./pages/Authenticate/Authenticate";
import { AuthContext } from "./context/auth-context";

function App() {
  const { isLogged } = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route path="/" exact>
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
              <Users />
            </Route>
            <Route path="/users/:id" exact>
              <UserScreen />
            </Route>
            <Route path="/add_image" exact>
              <AddImage />
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
