import "./main.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Providers from "common/providers/providers";
import useLogin from "common/hooks/use-login";
import Account from "account/account";
import Dashboard from "dashboard/dashboard";
import client from "common/client/client";
window.client = client;

function Main() {
  const { AUTH_STATUS, user, loginStatus, setLoginStatus } = useLogin();

  if (loginStatus === AUTH_STATUS.LOADING) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  if (loginStatus === AUTH_STATUS.NOT_LOGGED_IN) {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
    return <Account status={AUTH_STATUS} setLoginStatus={setLoginStatus} />;
  }

  if (user && user._id && loginStatus === AUTH_STATUS.LOGGED_IN) {
    console.log(user);
    return (
      <Router>
        <Providers user={user}>
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </Providers>
      </Router>
    );
  }

  return null;
}

export default Main;
