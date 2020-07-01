import "@ajmey/toaster/themes/theme-default.css";
import { useToaster } from "@ajmey/toaster";
import React from "react";
import ReactDOM from "react-dom";
import Main from "main/main";

import * as serviceWorker from "./serviceWorker";

window.toaster = useToaster();

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
