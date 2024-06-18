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

// Styled Components
import { ContentContainer, MainContainer } from "./AppStyles";

// Components
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";

// Pages
import Home from "./pages/Home";
import NewPatientPage from "./pages/NewPatientPage";
import Examples from "./pages/Examples";
import AllPatient from "./pages/AllPatient";

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
          <MainContainer>
            <Header />
            <ContentContainer>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="patient/new" element={<NewPatientPage />} />
                  <Route path="examples" element={<Examples />} />
                  <Route
                    path="about"
                    element={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div>basma</div>
                        <div>basma</div>
                      </div>
                    }
                  />

                  <Route path="patients">
                    <Route index element={<AllPatient/>} />
                    <Route path="new" element={<h1>new patient</h1>} />
                  </Route>
                  
                </Routes>
              </BrowserRouter>
            </ContentContainer>
          </MainContainer>
        </Layout>
      </ThemeProvider>
    </ConfigProvider>
  );
}
export default App;
