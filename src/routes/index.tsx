import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export const Rotas = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};
