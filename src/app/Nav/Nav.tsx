import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Menu, Home, TextSnippet, Settings, Logout } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
import logo from "../../static/logo2.png";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
  VENDOR_ROUTES,
} from "../constants/loggedInRoutes";
import { useIntl } from "react-intl";
import VendorNotification from "../Notification/NotificationComponent";
import CustomerNav from "./customer/CustomerNav";
import VendorNav from "./vendor/VendorNav";

const query = gql`
  mutation reset($t: Int) {
    reset(t: $t)
  }
`;

const Nav = () => {
  const intl = useIntl();
  const [reset, { loading: resetLoading }] = useMutation(query);
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  const isVendor = user?.isVendor;

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const handleLoggedOutOnClick = (page: string) => {
    navigate(`/${page}`);
  };

  const renderLogo = () => {
    return (
      <img
        src={logo}
        height={44}
        style={{ marginBottom: 2, cursor: "pointer" }}
        onClick={() => navigate(GENERAL_ROUTES.HOME)}
        alt="logo"
      />
    );
  };

  const resetData = async () => {
    try {
      await reset({
        variables: {
          t: 1,
        },
      });
    } catch (error: any) {
      setSnackbar({
        severity: "error",
        message: error.message,
      });
      setSnackbarOpen(true);
    }
  };

  const renderLoggedOutNav = () => {
    return (
      <>
        <Toolbar>
          {renderLogo()}

          <Box display="flex" flexGrow={1} justifyContent="flex-end">
            <Button
              sx={{ color: "#4c5678", mr: 2 }}
              variant="outlined"
              onClick={() => handleLoggedOutOnClick("login")}
            >
              {intl.formatMessage({
                id: "app.general.login",
              })}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleLoggedOutOnClick("company-signup")}
            >
              {intl.formatMessage({
                id: "app.routes.loggedOut.getStarted",
              })}
            </Button>
          </Box>
        </Toolbar>
      </>
    );
  };

  return (
    <>
      {resetLoading && <FullScreenLoading />}
      <Box
        sx={{
          flexGrow: 1,
          marginBottom: 5,
          width: "100%",
          zIndex: 9,
          position: "fixed",
        }}
      >
        <AppBar
          sx={{
            backgroundColor: "white",
            // boxShadow: "0px -3px 10px 0px rgb(151 149 149 / 75%)",
            boxShadow: 0,
            padding: "0 7% 0",
            height: "64px",
          }}
        >
          {!user && renderLoggedOutNav()}
          {user && user.isVendor && <VendorNav />}
          {user && !user.isVendor && <CustomerNav />}
          {/* <Button onClick={resetData}>RESET</Button> */}
        </AppBar>
      </Box>
      <Box
        sx={{
          marginTop: "65px",
          borderTop: "1.5px solid rgb(237 103 4)",
          lineHeight: 0,
          position: "fixed",
          width: "100%",
          zIndex: 9,
        }}
      >
        <Box
          sx={{
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            padding: "2px 8px",
            backgroundColor: "rgb(237 103 4)",
            display: "inline-block",
            marginTop: "-1px",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "10px",
              lineHeight: "10px",
              color: "#fff",
              fontWeight: "700",
            }}
          >
            BETA
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Nav;
