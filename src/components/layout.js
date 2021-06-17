import React, { useState } from "react";
import PropTypes from "prop-types";

// Styled components
import { createGlobalStyle, ThemeProvider } from "styled-components";

// * For some reason, normalize does not work
import { normalize } from "styled-normalize";

// Components
import Header from "./header";
import Cursor from "./customCursor";
import Navigation from "./navigation";

import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext";
import Footer from "./footer";

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
  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0,
    y: 0,
  });

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  };

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  };

  const { currentTheme, cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const [toggleMenu, setToggleMenu] = useState(false);

  const onCursor = (cursorType) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Cursor toggleMenu={toggleMenu} />
      <Header
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        hamburgerPosition={hamburgerPosition}
        setHamburgerPosition={setHamburgerPosition}
      />
      <Navigation
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <main>{children}</main>
      <Footer onCursor={onCursor} />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
