import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Users from "./pages/Users";
import Images from "./pages/Images";
import Welcome from "./pages/Welcome.js";
import Header from "./components/shared/Header/Header";

function App() {
  return (
    <Router>
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
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
