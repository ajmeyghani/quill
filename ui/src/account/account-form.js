import React, { useState, useEffect } from "react";

function AccountForm(props) {
  const credsInitialState = { email: "", password: "" };
  const [credentials, setCredentials] = useState(credsInitialState);
  const updateCredentials = (k, v) => setCredentials(p => ({ ...p, [k]: v }));

  useEffect(
    () => {
      return () => {
        setCredentials(credsInitialState);
      };
    },
    /* eslint-disable-line react-hooks/exhaustive-deps */ [props.type]
  );

  return (
    <div>
      {React.Children.toArray(props.children)[0]}
      <input
        onChange={event => updateCredentials("email", event.target.value)}
        placeholder="Email"
        type="text"
        value={credentials.email}
      />
      <input
        onChange={event => updateCredentials("password", event.target.value)}
        placeholder="Password"
        type="password"
        value={credentials.password}
      />
      <button
        onClick={_ => props.onSubmit(credentials.email, credentials.password)}
      >
        {props.type === "login" ? "Login" : "Sign Up"}
      </button>
    </div>
  );
}

export default AccountForm;
