import React from "react";
import Layout from "../components/layout";

// Components
import HomeBanner from "../components/homepage/HomeBanner";

import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext";

function IndexPage(props) {
  const { cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursor = (cursorType) => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
  };

  return (
    <Layout>
      <HomeBanner onCursor={onCursor} />
    </Layout>
  );
}

export default IndexPage;
