import React from "react";
import { Route, Switch } from "react-router-dom";
import Customers from "../components/Customers/Customers";
import Customer from "../pages/Customer";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Customers} />
      <Route path="/customers/:customerId" component={Customer} />
    </Switch>
  );
};

export default AppRoutes;
