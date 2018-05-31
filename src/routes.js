import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/auth";
import Chatbox from "./pages/chatbox";

const routes = () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/auth" />} />
      <Route path="/auth" exact component={AuthPage} />
      <Route path="/chatbox" exact component={Chatbox} />
    </Switch>
  );
};

export default routes;
