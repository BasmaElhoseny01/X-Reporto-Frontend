import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import { ConfigProvider, Layout } from "antd";
import { ThemeProvider } from "styled-components";

//  Styles
import { lightTheme, darkTheme } from "./styles/theme";
import Home from "./pages/Home";
import { Content } from "antd/es/layout/layout";
import Header from "./components/layout/Header/Header";
// import Sider from "antd/es/layout/Sider";
import SideBar from "./components/layout/SideBar/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "./state/Reducers";
// import Drawer from "./components/common/Drawer/Drawer";

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

  const currentTheme = useSelector((state: RootState) => state.theme);

  return (
    <ConfigProvider theme={currentTheme == "light" ? lightTheme : darkTheme}>
      <ThemeProvider theme={darkTheme}>
        <Layout>
          {/* <Sider>Sider</Sider> */}
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
