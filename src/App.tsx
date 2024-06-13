/* eslint-disable no-empty-pattern */
import React from "react";

import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";

//  Styles
import theme from "./styles/theme";

// Components
import Button from "./components/common/Button/Button";

interface AppProps {
  // Define props here
}

const App: React.FC<AppProps> = ({}) => {
  return (
    <ConfigProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Button
          label="Button"
          onClick={() => console.log("Button clicked")}
          type="primary"
        />

        <Button
          label="Button"
          onClick={() => console.log("Button clicked")}
          type="dashed"
        />

        <Button
          label="Button"
          onClick={() => console.log("Button clicked")}
          type="default"
        />
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
