import { useEffect, useState } from "react";

const forms = {
  login: {
    url: "#login",
    name: "login"
  },
  register: {
    url: "#register",
    name: "register"
  }
};

const isLoginFromUrl = hash => {
  if (hash === "") {
    return true;
  }
  return hash === forms.login.url;
};

function useLoginUrlHistory() {
  const [isLoginForm, setIsLoginForm] = useState(
    isLoginFromUrl(window.location.hash) ? true : false
  );

  const popstateHandler = e => {
    if (!e.state) {
      return;
    }

    if (e.state.url === forms.login.url) {
      setIsLoginForm(true);
    } else {
      setIsLoginForm(false);
    }
  };

  useEffect(() => {
    if (isLoginForm) {
      window.history.pushState(forms.login, "", forms.login.url);
    } else {
      window.history.pushState(forms.register, "", forms.register.url);
    }
  }, [isLoginForm]);

  useEffect(() => {
    window.addEventListener("popstate", popstateHandler);
    return () => window.removeEventListener("popstate", popstateHandler);
  }, []);

  return [isLoginForm, setIsLoginForm];
}

export default useLoginUrlHistory;
