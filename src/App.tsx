import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./state/Reducers";

// Theme
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";

// Ant Design
import { ConfigProvider, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";

// Components
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";

// Pages
import Home from "./pages/Home";
import HomeTwo from "./components/features/radiologists/Home/HomeTwo";
import NewPatientPage from "./pages/NewPatientPage";
import Examples from "./pages/Examples";

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

  // const getThemeAlgorithm = () => {
  //   switch (currentTheme) {
  //     case "dark":
  //       return theme.darkAlgorithm;
  //     case "compact":
  //       return theme.compactAlgorithm;
  //     case "compact-dark":
  //       return (tokens: any) => ({
  //         ...theme.darkAlgorithm(tokens),
  //         ...theme.compactAlgorithm(tokens),
  //       });
  //     default:
  //       return theme.defaultAlgorithm;
  //   }
  // };

  return (
    // <ConfigProvider theme={currentTheme == "light" ? lightTheme : darkTheme}>
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme == "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        token: currentTheme == "light" ? lightTheme.token : darkTheme.token,
      }}
    >
      <ThemeProvider theme={currentTheme == "light" ? lightTheme : darkTheme}>
        <Layout>
          <SideBar />
          <Layout>
            {/* @BasmaElhoseny01 Remove this */}
            {/* <Content style={{ height: "100vh" }}> */}
            <Content>
              <Header />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<HomeTwo />} />
                  <Route path="patient/new" element={<NewPatientPage />} />
                  <Route path="examples" element={<Examples />} />
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
