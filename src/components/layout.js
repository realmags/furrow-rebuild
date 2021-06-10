import React, { useState } from "react";
import PropTypes from "prop-types";

// styled components
import { createGlobalStyle, ThemeProvider } from "styled-components";

// * For some reason, normalize does not work
import { normalize } from "styled-normalize";

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
  };

  const lightTheme = {
    background: "#fff",
    text: "#000",
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <Normalize /> */}
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
