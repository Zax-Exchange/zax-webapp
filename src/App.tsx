import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./app/Nav/Nav";
import Home from "./app/Home/Home";
import Settings from "./app/Settings/Settings";
import Profile from "./app/Profile/Profile";
import VendorSearchResults from "./app/Search/VendorSearchResults";
import CustomerSearchResults from "./app/Search/CustomerSearchResults";
import SearchProjectDetail from "./app/Search/SearchProjectDetail";
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
import CreateProject from "./app/Projects/customer/CreateProject";
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
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "1rem",
    },
    caption: {
      fontSize: "0.9rem",
    },
    h6: {
      fontWeight: 500,
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
          borderRadius: 40,
        },
      },
    },
  },
});

function App() {
  const { setSnackbar, setSnackbarOpen, CustomSnackbar } = useCustomSnackbar();
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <div className="App" style={{ minWidth: "960px" }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CustomSnackbar />
            <Nav />
            <Container maxWidth="xl" sx={{ mb: 12 }}>
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
                  path={CUSTOMER_ROUTES.PROJECTS}
                  element={
                    <RequireAuth isAllowed={!user?.isVendor}>
                      <CustomerProjects />
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
                  path={CUSTOMER_ROUTES.PROJECT_DETAIL}
                  element={
                    <RequireAuth isAllowed={!user?.isVendor}>
                      <CustomerProjectDetail />
                    </RequireAuth>
                  }
                />
                <Route
                  path={CUSTOMER_ROUTES.CREATE_PROJECT}
                  element={
                    <RequireAuth isAllowed={!user?.isVendor}>
                      <CreateProject />
                    </RequireAuth>
                  }
                />
                {/* END CUSTOMER PATH */}

                {/* START VENDOR PATH */}
                <Route
                  path={VENDOR_ROUTES.PROJECTS}
                  element={
                    <RequireAuth isAllowed={user?.isVendor}>
                      <VendorProjects />
                    </RequireAuth>
                  }
                />

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
                <Route
                  path={VENDOR_ROUTES.PROJECT_DETAIL}
                  element={
                    <RequireAuth isAllowed={user?.isVendor}>
                      <VendorProjectDetail />
                    </RequireAuth>
                  }
                />
                {/* END VENDOR PATH */}

                {/* logged out routes */}
                <Route
                  path="/login"
                  element={
                    <LoggedOutRoute>
                      <Login />
                    </LoggedOutRoute>
                  }
                />
                <Route
                  path="/company-signup"
                  element={
                    <LoggedOutRoute>
                      <CompanySignup />
                    </LoggedOutRoute>
                  }
                />
                <Route
                  path="/user-signup/:companyId"
                  element={
                    <LoggedOutRoute>
                      <UserSignup />
                    </LoggedOutRoute>
                  }
                />
                <Route
                  path="/vendor-signup"
                  element={
                    <LoggedOutRoute>
                      <VendorSignup />
                    </LoggedOutRoute>
                  }
                />
                <Route
                  path="/customer-signup"
                  element={
                    <LoggedOutRoute>
                      <CustomerSignup />
                    </LoggedOutRoute>
                  }
                />
              </Routes>
            </Container>
          </ErrorBoundary>
        </div>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
