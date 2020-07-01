import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "common/user/user.context";
import ActivePathContext from "common/activepath/activepath.context";

function Providers(props) {
  const history = useHistory();
  return (
    <Fragment>
      <UserContext.Provider value={props.user}>
        <ActivePathContext.Provider value={history.location.pathname}>
          {props.children}
        </ActivePathContext.Provider>
      </UserContext.Provider>
    </Fragment>
  );
}

export default Providers;
