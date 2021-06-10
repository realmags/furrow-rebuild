import React, { useState } from "react";
import PropTypes from "prop-types";

// Styled components
import { createGlobalStyle, ThemeProvider } from "styled-components";

// * For some reason, normalize does not work
import { normalize } from "styled-normalize";

// Components
import Header from "./header";

import { useGlobalStateContext } from "../context/globalContext";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    text-decoration: none;
    margin: 0;
    padding: 0;
    /* cursor: none; */
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${(props) => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`;

const Layout = ({ children }) => {
  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e",
  };

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e",
  };

  const { currentTheme } = useGlobalStateContext();

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
