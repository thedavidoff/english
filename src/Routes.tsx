import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Lesson from "./Lesson";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/:id" render={() => <Lesson />} />
    </Switch>
  );
};

export default Routes;
