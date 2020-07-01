import React, { useContext } from "react";
import UserContext from "common/user/user.context";
import { Switch, Route, Redirect } from "react-router-dom";
import client from "common/client/client";
import Todos from "features/todos/todos";

function Dashboard() {
  const user = useContext(UserContext);
  const logout = () => {
    client
      .logout()
      .then(_ => (window.location.href = "/"))
      .catch(err => console.log("could not log out", err));
  };
  return (
    <div>
      <div>{user.avatar ? <img src={user.avatar} alt="" /> : null}</div>
      <div>
        Im dashboard. <button onClick={logout}>log out</button>
      </div>
      <Switch>
        <Route exact path={"/todos"} component={Todos} />
        <Route render={_ => <Redirect to={"/todos"} />} />
      </Switch>
    </div>
  );
}

export default Dashboard;
