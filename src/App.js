import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Home from "./pages/general/Home";
import PrivateRoutes from "./routes/PrivateRoutes";
// import Cookies from "js-cookie";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoutes exact path="/home" component={Home} />
        <PrivateRoutes exact path="/layout" component={Layout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
