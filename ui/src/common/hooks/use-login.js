import { useState, useEffect } from "react";
import client from "common/client/client";

const AUTH_STATUS = {
  LOADING: "LOADING",
  LOGGED_IN: "LOGGED_IN",
  NOT_LOGGED_IN: "NOT_LOGGED_IN"
};

function useLogin() {
  const [loginStatus, setLoginStatus] = useState(AUTH_STATUS.LOADING);
  const [user, setUser] = useState();

  /* Try to login in onload */
  useEffect(() => {
    client
      .reAuthenticate()
      .then(r => setLoginStatus(AUTH_STATUS.LOGGED_IN))
      .catch(err => {
        setLoginStatus(AUTH_STATUS.NOT_LOGGED_IN);
      });
  }, []);

  /* if logged in, set the user, and add patch listener */
  useEffect(() => {
    if (loginStatus === AUTH_STATUS.LOGGED_IN) {
      client
        .get("authentication")
        .then(r => setUser(r.user))
        .catch(err => console.log(err));

      client.service("users").on("patched", r => {
        setUser(r.data);
      });
    }

    return () => {
      client.service("users").off("patched");
    };
  }, [loginStatus]);

  return {
    setLoginStatus,
    loginStatus,
    AUTH_STATUS,
    user
  };
}

export default useLogin;
