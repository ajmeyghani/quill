import React, { useState } from "react";
import logo from "./logo.svg";
import client from "common/client/client";
import useLoginUrlHistory from "common/hooks/use-login-history";
import AccountForm from "./account-form";

function Account(props) {
  const { setLoginStatus, status } = props;
  const [isLoginForm, setIsLoginForm] = useLoginUrlHistory();
  const [errMsg, setErrMsg] = useState("");

  const toggleForm = () => setIsLoginForm(p => !p);

  const onFailure = err => {
    setLoginStatus(status.NOT_LOGGED_IN);
    window.toaster.failure(err.message)
  };

  const onSuccess = result => {
    setLoginStatus(status.LOGGED_IN);
  };

  const login = (email, password) => {
    client
      .authenticate({
        strategy: "local",
        email,
        password
      })
      .then(r => onSuccess(r))
      .catch(err => {
        onFailure(err);
        setErrMsg(err.message);
      });
  };

  const signup = (email, password) => {
    client
      .service("users")
      .create({ email, password })
      .then(r => {
        return client.authenticate({
          strategy: "local",
          email,
          password
        });
      })
      .then(r => onSuccess(r))
      .catch(err => {
        onFailure(err);
        setErrMsg(err.message);
      });
  };

  return (
    <div>
      <img style={{ height: "5rem" }} src={logo} alt="" />
      <button onClick={_ => toggleForm()}>Toggle Form</button>
      <p>Status: {errMsg}</p>
      <a className="button" href="http://localhost:3030/oauth/github">
        Login with Github
      </a>
      {isLoginForm ? (
        <AccountForm onSubmit={login} type="login">
          <p>Login Form</p>
        </AccountForm>
      ) : (
        <AccountForm onSubmit={signup} type="signup">
          <p>Sign Up Form</p>
        </AccountForm>
      )}
    </div>
  );
}

export default Account;
