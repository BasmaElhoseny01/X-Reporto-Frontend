import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./state/Reducers";

// Theme
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";

// Ant Design
import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

// Components
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";

// Pages
import Home from "./pages/Home";

// interface AppProps {
//   // Define props here
// }

function App() {
  const currentTheme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Naming convention
    // let name = "App";
    // console.log("App mounted");
    // name = "App";
    // console.log(name);
    // Set theme to light
  });

  return (
    <ConfigProvider theme={currentTheme == "light" ? lightTheme : darkTheme}>
      <ThemeProvider theme={currentTheme == "light" ? lightTheme : darkTheme}>
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
