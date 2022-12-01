import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./app/Nav/Nav";
import Home from "./app/Home/Home";
import Settings from "./app/Settings/Settings";
import Profile from "./app/Profile/Profile";
import VendorSearchResults from "./app/Search/vendor/VendorSearchResults";
import CustomerSearchResults from "./app/Search/customer/CustomerSearchResults";
import SearchProjectDetail from "./app/Search/vendor/SearchProjectDetail";
// import ProjectBid from './app/Projects/ProjectBid';
import { Container, createTheme, PaletteOptions } from "@mui/material";
import CustomerProjectDetail from "./app/Projects/customer/CustomerProjectDetail";
import RequireAuth from "./app/Auth/RequireAuth";
import Login from "./app/Login/Login";
import UserSignup from "./app/Login/UserSignup";
import VendorSignup from "./app/Login/vendor/VendorSignup";
import CompanySignup from "./app/Login/CompanySignup";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./app/ErrorBoundary/ErrorBoundary";
import CustomerSignup from "./app/Login/customer/CustomerSignup";
import VendorProjectDetail from "./app/Projects/vendor/VendorProjectDetail";
import { ThemeProvider } from "@mui/system";
import AdvancedCreateProject from "./app/Projects/customer/createProject/advanced/AdvancedCreateProject";
import useCustomSnackbar from "./app/Utils/CustomSnackbar";
import CustomerProjects from "./app/Projects/customer/CustomerProjects";
import VendorProjects from "./app/Projects/vendor/VendorProjects";
import LoggedOutRoute from "./app/Auth/LoggedOutRoute";
import { AuthContext } from "./context/AuthContext";
import { SnackbarContextProvider } from "./context/SnackbarContext";
import {
  GENERAL_ROUTES,
  VENDOR_ROUTES,
  CUSTOMER_ROUTES,
} from "./app/constants/loggedInRoutes";
import { IntlProvider } from "react-intl";
import en from "./translations/en.json";
import zhCn from "./translations/zh-cn.json";
import GuidedCreateProject from "./app/Projects/customer/createProject/guided/GuidedCreateProject";
import VendorProfile from "./app/Profile/vendor/VendorProfile";
import ProjectDetail from "./app/Projects/ProjectDetail";
import EditProject from "./app/Projects/customer/editProject/EditProject";
import Projects from "./app/Projects/Projects";
import POInvoice from "./app/POInvoice/POInvoice";
import { LOGGED_OUT_ROUTES } from "./app/constants/loggedOutRoutes";
import ForgotPassword from "./app/Login/ForgotPassword";
import ResetPassword from "./app/Login/ResetPassword";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#34477f",
      light: "#3f4f7d",
    },
    secondary: {
      main: "#1b60a0",
      light: "#457baf",
      dark: "#12436f",
      contrastText: "#ffffff",
    },
    text: {
      disabled: "rgba(146,146,146,0.38)",
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(49,49,49,0.54)",
    },
    warning: {
      main: "#e09150",
    },
    error: {
      main: "rgb(223, 27, 65)",
      light: "#e24866",
      dark: "#9a112c",
      contrastText: "#ffffff",
    },
    divider: "rgb(0 0 0 / 18%)",
  } as PaletteOptions,
  typography: {
    body1: {
      fontSize: "1.2rem",
    },
    subtitle1: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: "1rem",
    },
    caption: {
      fontSize: "0.9rem",
      color: "rgba(0,0,0,0.65)",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      lineHeight: 1.48,
      letterSpacing: "0em",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        sizeSmall: {
          fontSize: "1em",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          size: "small",
          sx: {
            fontSize: 16,
          },
        },
        FormHelperTextProps: {
          sx: {
            fontSize: 12,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: "6px",
        },
      },
    },
  },
});

function App() {
  const { CustomSnackbar } = useCustomSnackbar();
  const { user } = useContext(AuthContext);

  return (
    <IntlProvider locale="en" messages={en}>
      <ThemeProvider theme={theme}>
        <SnackbarContextProvider>
          <div className="App" style={{ minWidth: "960px" }}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <CustomSnackbar />
              <Nav />
              <Container maxWidth="xl" sx={{ mb: 12, pt: 12 }}>
                <Routes>
                  {/* START COMMON PATH */}
                  <Route
                    path={GENERAL_ROUTES.ARBITRARY}
                    element={
                      <RequireAuth isAllowed={true}>
                        <Home />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path={GENERAL_ROUTES.HOME}
                    element={
                      <RequireAuth isAllowed={true}>
                        <Home />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={GENERAL_ROUTES.PROFILE}
                    element={
                      <RequireAuth isAllowed={true}>
                        <Profile />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={GENERAL_ROUTES.PROJECT_DETAIL}
                    element={
                      <RequireAuth isAllowed={true}>
                        <ProjectDetail />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={GENERAL_ROUTES.PROJECTS}
                    element={
                      <RequireAuth isAllowed={true}>
                        <Projects />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={GENERAL_ROUTES.PO_INVOICE}
                    element={
                      <RequireAuth isAllowed={true}>
                        <POInvoice />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={GENERAL_ROUTES.SETTINGS}
                    element={
                      <RequireAuth isAllowed={true}>
                        <Settings />
                      </RequireAuth>
                    }
                  />
                  {/* END COMMON PATH */}

                  {/* START CUSTOMER PATH */}
                  <Route
                    path={CUSTOMER_ROUTES.EDIT_PROJECT}
                    element={
                      <RequireAuth isAllowed={!user?.isVendor}>
                        <EditProject />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={CUSTOMER_ROUTES.SEARCH_RESULTS}
                    element={
                      <RequireAuth isAllowed={!user?.isVendor}>
                        <CustomerSearchResults />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path={CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT}
                    element={
                      <RequireAuth isAllowed={!user?.isVendor}>
                        <GuidedCreateProject />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT}
                    element={
                      <RequireAuth isAllowed={!user?.isVendor}>
                        <AdvancedCreateProject />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={CUSTOMER_ROUTES.VENDOR_PROFILE}
                    element={
                      <RequireAuth isAllowed={!user?.isVendor}>
                        <VendorProfile />
                      </RequireAuth>
                    }
                  />
                  {/* END CUSTOMER PATH */}

                  {/* START VENDOR PATH */}
                  <Route
                    path={VENDOR_ROUTES.SEARCH_RESULTS}
                    element={
                      <RequireAuth isAllowed={user?.isVendor}>
                        <VendorSearchResults />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path={VENDOR_ROUTES.SEARCH_PROJECT_DETAIL}
                    element={
                      <RequireAuth isAllowed={user?.isVendor}>
                        <SearchProjectDetail />
                      </RequireAuth>
                    }
                  />
                  {/* END VENDOR PATH */}

                  {/* logged out routes */}
                  <Route
                    path={LOGGED_OUT_ROUTES.LOGIN}
                    element={
                      <LoggedOutRoute>
                        <Login />
                      </LoggedOutRoute>
                    }
                  />
                  <Route
                    path={LOGGED_OUT_ROUTES.COMPANY_SIGNUP}
                    element={
                      <LoggedOutRoute>
                        <CompanySignup />
                      </LoggedOutRoute>
                    }
                  />
                  <Route
                    path={LOGGED_OUT_ROUTES.USER_SIGNUP}
                    element={
                      <LoggedOutRoute>
                        <UserSignup />
                      </LoggedOutRoute>
                    }
                  />
                  <Route
                    path={LOGGED_OUT_ROUTES.VENDOR_SIGNUP}
                    element={
                      <LoggedOutRoute>
                        <VendorSignup />
                      </LoggedOutRoute>
                    }
                  />
                  <Route
                    path={LOGGED_OUT_ROUTES.CUSTOMER_SIGNUP}
                    element={
                      <LoggedOutRoute>
                        <CustomerSignup />
                      </LoggedOutRoute>
                    }
                  />
                  <Route
                    path={LOGGED_OUT_ROUTES.FORGOT_PASSWORD}
                    element={
                      <LoggedOutRoute>
                        <ForgotPassword />
                      </LoggedOutRoute>
                    }
                  />
                  <Route
                    path={LOGGED_OUT_ROUTES.RESET_PASSWORD}
                    element={
                      <LoggedOutRoute>
                        <ResetPassword />
                      </LoggedOutRoute>
                    }
                  />
                </Routes>
              </Container>
            </ErrorBoundary>
          </div>
        </SnackbarContextProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
