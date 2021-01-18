import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import LESSON_1 from "./LESSON_1";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/1" render={() => <LESSON_1 />} />
    </Switch>
  );
};

export default Routes;
