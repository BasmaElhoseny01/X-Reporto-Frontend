/* eslint-disable*/
import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { MainState, RootState } from "./state/Reducers";
import { bindActionCreators } from "redux";
import { actionsCreators } from "./state";

// Services
import axios from "./services/apiService";

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

// Paths
import paths from "./pages/paths";

// Pages
import HomePage from "./pages/HomePage";

import AccountPage from "./pages/AccountPage";

// Cases
import UnAssigned from "./pages/Unassigned";
import XRayWorkList from "./pages/XRayWorklist";
import XRayCompleted from "./pages/XRayCompleted";
import XRayArchived from "./pages/XRayArchived";

import DoctorPendingCases from "./pages/DoctorPendingCases";
import DoctorCompletedCases from "./pages/DoctorCompletedCases";

import ViewXRayPage from "./pages/ViewXRayPage";

// Patients
import AllPatient from "./pages/AllPatient";

import NewXRay from "./components/features/xrays/NewXRay/NewXRay";

// import PatientArchived from "./pages/PatientArchived";
import NewPatientPage from "./pages/NewPatientPage";
import ViewPatientPage from "./pages/ViewPatientPage";

import AllDoctors from "./pages/AllDoctors";
import NewEmployee from "./components/features/employee/NewEmployee/NewEmployee";

import Examples from "./pages/Examples";
import DrawarPage from "./pages/DrawarPage";
// import ArchivedDoctor from "./pages/ArchivedDoctor";
import AllTemplates from "./pages/AllTemplates";
import SigninPage from "./pages/Signin";
import ViewEmployee from "./components/features/employee/ViewEmployee/ViewEmployee";
import NewTemplates from "./components/features/templates/NewTemplates/NewTemplates";
import ViewTemplate from "./components/features/templates/ViewTemplate/ViewTemplate";
import NotFoundPage from "./pages/NotFoundPage";

// import { bindActionCreators } from "redux";
// import { actionsCreators } from "./state";

// interface AppProps {
//   // Define props here
// }

function App() {
  // Dispatchers
  const dispatch = useDispatch();
  const { ChangeUser } = bindActionCreators(actionsCreators, dispatch);

  // Redux states
  const token = useSelector((state: MainState) => state.token);
  const currentTheme = useSelector((state: RootState) => state.theme);

  // TODO Check location for that
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("/api/v1/employees/me")
      .then((response) => {
        ChangeUser(response.data);
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  }, [token]);

  // Naming convention
  // let name = "App";
  // console.log("App mounted");
  // name = "App";
  // console.log(name);
  // Set theme to light

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

  // const {ChangeToken} = bindActionCreators(actionsCreators,useDispatch());
  // ChangeToken("");
  // console.log(token);

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
                      <Route path={paths.home} element={<HomePage />} />

                      <Route path={paths.account} element={<AccountPage />} />

                      {/* Cases */}
                      <Route path={paths.cases.base}>
                        <Route
                          path={paths.cases.types.unassigned}
                          element={<UnAssigned />}
                        />

                        <Route path={paths.cases.types.pending}>
                          <Route index element={<XRayWorkList />} />
                          <Route
                            path=":doctorId"
                            element={<DoctorPendingCases />}
                          />
                        </Route>

                        <Route path={paths.cases.types.completed}>
                          <Route index element={<XRayCompleted />} />
                          <Route
                            path=":doctorId"
                            element={<DoctorCompletedCases />}
                          />
                        </Route>

                        <Route
                          path={paths.cases.types.archived}
                          element={<XRayArchived />}
                        />

                        <Route
                          path={paths.cases.types.new}
                          element={<NewXRay />}
                        />

                        <Route path=":id" element={<ViewXRayPage />} />
                      </Route>

                      {/* Patients */}
                      <Route path={paths.patients.base}>
                        <Route index element={<AllPatient />} />
                        <Route path=":Id" element={<ViewPatientPage />} />
                        {/* <Route path="new" element={<NewPatientPage />} /> */}
                      </Route>

                      {/* <Route path="doctors">
                        <Route index element={<AllDoctors />} />
                        <Route
                          path="new"
                          element={<NewEmployee type="doctors" />}
                        />
                        <Route
                          path=":Id"
                          element={<ViewEmployee type="doctors" />}
                        />
                      </Route> */}

                      {/* <Route path="templates">
                        <Route index element={<AllTemplates />} />
                        <Route path="new" element={<NewTemplates />} />
                        <Route path=":Id" element={<ViewTemplate />} />
                      </Route>
 */}
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
                      <Route path="/*" element={<NotFoundPage />} />
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
