import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import LESSON_1 from "./LESSON_1";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <LESSON_1 />} />
      <Route exact path="/home" render={() => <Home />} />
    </Switch>
  );
};

export default Routes;
