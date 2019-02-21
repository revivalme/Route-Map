import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt);

import { defaultTheme } from "./themes";
import App from "./components/App";

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <App />
  </ThemeProvider>,
  document.querySelector("#root")
);
