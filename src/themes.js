import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export const defaultTheme = {
  bgPrimary: "#2a2a2a",
  colorPrimary: "#b2b2b2",
  colorSecondary: "#4c4c4c",
};
