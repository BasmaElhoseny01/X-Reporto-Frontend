import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import { ConfigProvider, Layout } from "antd";
import { ThemeProvider } from "styled-components";

//  Styles
// import theme from "./styles/theme";
import { darkTheme } from "./styles/theme";
import Home from "./pages/Home";
import { Content } from "antd/es/layout/layout";
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";

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
    <ConfigProvider theme={darkTheme}>
      <ThemeProvider theme={darkTheme}>
        <Layout>
            <SideBar />          
          <Layout>
            <Content>
              <Header />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="about" element={<h1>about</h1>} />
                </Routes>
              </BrowserRouter>
            </Content>
          </Layout>
        </Layout>
      </ThemeProvider>
    </ConfigProvider>
  );
}
export default App;
