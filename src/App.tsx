import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";

//  Styles
import theme from "./styles/theme";
import Home from "./pages/Home";
import Drawer from "./components/common/Drawer/Drawer";

// interface AppProps {
//   // Define props here
// }

function App() {
  useEffect(() => {
    // Naming convention
    // let name = "App";
    // console.log("App mounted");
    // name = "App";
    // console.log(name);
  });

  return (
    <ConfigProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <div className="MainComtainer">
          <Drawer />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<h1>about</h1>} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ConfigProvider>
  );
}
export default App;
