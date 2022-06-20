import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import Direction from "./direction";
import Test from "../pages/test";
const hist = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route exact path="/loginsso/">
          <Direction />
        </Route>
        <Route path="/truong">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
