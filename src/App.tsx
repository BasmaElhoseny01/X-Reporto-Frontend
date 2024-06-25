import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { MainState, RootState } from "./state/Reducers";

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

import XRayWorkList from "./pages/XRayWorklist";
import XRayCompleted from "./pages/XRayCompleted";
import NewXRay from "./components/features/xrays/NewXRay/NewXRay";
import ViewXRayPage from "./pages/ViewXRayPage";

import AllPatient from "./pages/AllPatient";
// import PatientArchived from "./pages/PatientArchived";
import NewPatientPage from "./pages/NewPatientPage";
import ViewPatientPage from "./pages/ViewPatientPage";

import AllDoctors from "./pages/AllDoctors";
import NewRadiologist from "./components/features/radiologists/NewRadiologist/NewRadiologist";

import Examples from "./pages/Examples";
import DrawarPage from "./pages/DrawarPage";
import XRayArchived from "./pages/XRayArchived";
// import ArchivedDoctor from "./pages/ArchivedDoctor";
import AllTemplates from "./pages/AllTemplates";
import UnAssigend from "./pages/Unassigned";
import SigninPage from "./pages/Signin";
import ViewRadiologist from "./components/features/radiologists/ViewRadiologist/ViewRadiologist";
import NewTemplates from "./components/features/templates/NewTemplates/NewTemplates";
import ViewTemplate from "./components/features/templates/ViewTemplate/ViewTemplate";

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

  const token = useSelector((state: MainState) => state.token);

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
          {token === "" ? (
            <SigninPage />
          ) : (
            <>
              <SideBar />
              <MainContainer>
                <Header />
                <ContentContainer>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Home />} />

                      <Route path="patients">
                        <Route index element={<AllPatient />} />
                        <Route path="new" element={<NewPatientPage />} />
                        <Route path=":Id" element={<ViewPatientPage />} />
                      </Route>

                      <Route path="reports">
                        <Route path="workList" element={<XRayWorkList />} />
                        <Route path="completed" element={<XRayCompleted />} />
                        <Route path="archived" element={<XRayArchived />} />
                        <Route path="new" element={<NewXRay />} />
                        <Route path="unassign" element={<UnAssigend />} />
                        <Route path=":Id" element={<ViewXRayPage />} />
                      </Route>

                      <Route path="doctors">
                        <Route index element={<AllDoctors />} />
                        <Route path="new" element={<NewRadiologist />} />
                        <Route path=":Id" element={<ViewRadiologist />} />
                      </Route>

                      <Route path="templates">
                        <Route index element={<AllTemplates />} />
                        <Route path="new" element={<NewTemplates />} />
                        <Route path=":Id" element={<ViewTemplate />} />
                      </Route>

                      {/* <Route path="annotation" element={<Annotation />} /> */}
                      <Route path="drawer" element={<DrawarPage />} />
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
                    </Routes>
                  </BrowserRouter>
                </ContentContainer>
              </MainContainer>
            </>
          )}
        </Layout>
      </ThemeProvider>
    </ConfigProvider>
  );
}
export default App;
