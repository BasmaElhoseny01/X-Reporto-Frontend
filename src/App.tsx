/* eslint-disable*/
import React, { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  useLocation,
} from "react-router-dom";

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
// Login
import SignInPage from "./pages/SignInPage";
// Account
import AccountPage from "./pages/AccountPage";

// Cases
import UnAssigned from "./pages/Unassigned";
import XRayWorkList from "./pages/XRayWorklist";
import XRayCompleted from "./pages/XRayCompleted";
import XRayArchived from "./pages/XRayArchived";

import DoctorPendingCases from "./pages/DoctorPendingCases";
import DoctorCompletedCases from "./pages/DoctorCompletedCases";

import ViewXRayPage from "./pages/ViewXRayPage";
import NewXRay from "./components/features/xrays/NewXRay/NewXRay";

// Patients
import AllPatient from "./pages/AllPatient";
import ViewPatientPage from "./pages/ViewPatientPage";
import NewPatientPage from "./pages/NewPatientPage";
// import PatientArchived from "./pages/PatientArchived";

// Doctors

// Templates
import AllTemplates from "./pages/AllTemplates";
import NewTemplates from "./components/features/templates/NewTemplates/NewTemplates";
import ViewTemplate from "./components/features/templates/ViewTemplate/ViewTemplate";

import AllDoctors from "./pages/AllDoctors";
import NewEmployee from "./components/features/employee/NewEmployee/NewEmployee";

import Examples from "./pages/Examples";
import DrawarPage from "./pages/DrawarPage";
// import ArchivedDoctor from "./pages/ArchivedDoctor";
import ViewEmployee from "./components/features/employee/ViewEmployee/ViewEmployee";

// 404
import NotFoundPage from "./pages/NotFoundPage";
import { reDirectToLogin } from "./pages/paths.utils";

// interface AppProps {
//   // Define props here
// }

interface Props {
  children: React.ReactNode;
}

const ConditionalLayout = (props: Props) => {
  const { children } = props;
  const location = useLocation();
  const isLoginPage = location.pathname === paths.login;

  return (
    <>
      {!isLoginPage && <SideBar />}
      <MainContainer>
        {<Header />}
        {children}
      </MainContainer>
    </>
  );
};

function App() {
  // Dispatchers
  const dispatch = useDispatch();
  const { ChangeUser } = bindActionCreators(actionsCreators, dispatch);

  // Redux states
  const token = useSelector((state: MainState) => state.token);
  const currentTheme = useSelector((state: RootState) => state.theme);

  // TODO Check location for that
  useEffect(() => {
    console.log("Token: ", token);
    if (token === "") {
      reDirectToLogin();
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/v1/employees/me")
        .then((response) => {
          ChangeUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, [token]);

  return (
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
          <>
            {/* <SideBar /> */}
            {/* <Header /> */}
            <BrowserRouter>
              <ConditionalLayout>
                <ContentContainer>
                  <Routes>
                    <Route path={paths.home} element={<HomePage />} />
                    <Route path={paths.login} element={<SignInPage />} />

                    {/* <Route path={paths.account} element={<AccountPage />} /> */}

                    {/* Cases */}
                    {/* <Route path={paths.cases.base}>
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
                    </Route> */}

                    {/* Patients */}
                    {/* <Route path={paths.patients.base}>
                      <Route index element={<AllPatient />} />
                      <Route
                        path={paths.patients.types.new}
                        element={<NewPatientPage />}
                      />
                      <Route path=":Id" element={<ViewPatientPage />} />
                    </Route> */}

                    {/* Templates */}
                    {/* <Route path={paths.templates.base}>
                      <Route index element={<AllTemplates />} />
                      <Route
                        path={paths.templates.types.new}
                        element={<NewTemplates />}
                      />
                      <Route path=":Id" element={<ViewTemplate />} />
                    </Route> */}

                    {/* NotFound */}
                    <Route path="/*" element={<NotFoundPage />} />
                  </Routes>
                </ContentContainer>
              </ConditionalLayout>
            </BrowserRouter>
          </>
        </Layout>
      </ThemeProvider>
    </ConfigProvider>
  );
}
export default App;
