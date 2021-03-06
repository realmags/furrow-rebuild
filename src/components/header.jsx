import React, { useEffect, useRef } from "react";

// Header styled components
import { HeaderNav, Logo, Menu } from "../styles/headerStyles";
import { Container, Flex } from "../styles/globalStyles";

// Context
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext";

// Custom Hook
import useElementPosition from "../hooks/useElementPosition";

function Header({
  onCursor,
  toggleMenu,
  setToggleMenu,
  hamburgerPosition,
  setHamburgerPosition,
}) {
  const { currentTheme } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const hamburgerRef = useRef(null);
  const position = useElementPosition(hamburgerRef);

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      dispatch({ type: "TOGGLE_THEME", theme: "light" });
    } else {
      dispatch({ type: "TOGGLE_THEME", theme: "dark" });
    }
  };

  const menuHover = () => {
    onCursor("locked");
    setHamburgerPosition({ x: position.x, y: position.y + 72 });
  };

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  // TODO: INSTALL REACT-ROUTER-DOM AND ADD LINK TO LOGO

  return (
    <HeaderNav
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
          >
            {/* add LINK to homepage by importing react-router-dom */}
            <a href="#">FURR</a>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            ></span>
            <a href="#">W</a>
          </Logo>
          <Menu
            ref={hamburgerRef}
            onClick={() => setToggleMenu(!toggleMenu)}
            onMouseEnter={menuHover}
            onMouseLeave={onCursor}
          >
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  );
}

export default Header;
