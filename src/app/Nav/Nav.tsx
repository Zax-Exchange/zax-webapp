import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import "./Nav.scss";
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
} from "@mui/material";
import { Menu, Home, TextSnippet, Settings, Logout } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
// import logo from "../../static/logo2.png";
import { gql, useMutation } from "@apollo/client";
import CustomerNotification from "../Notification/CustomerNotification";
import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
  VENDOR_ROUTES,
} from "../constants/loggedInRoutes";

const query = gql`
  mutation reset($t: Int) {
    reset(t: $t)
  }
`;

// TODO: add route protections to prevent customer/vendors from accessing vendors/customers pages
const Nav = () => {
  const [reset, { loading: resetLoading }] = useMutation(query);
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  const isVendor = user?.isVendor;

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const handleSideNavOnClick = (page: string) => {
    if (page === "home") {
      navigate(GENERAL_ROUTES.HOME);
    } else if (page === "projects") {
      if (user!.isVendor) {
        navigate(VENDOR_ROUTES.PROJECTS);
      } else {
        navigate(CUSTOMER_ROUTES.PROJECTS);
      }
    } else {
      navigate(`${page}`);
    }
  };

  const renderSideNav = () => {
    return (
      <Drawer
        anchor="left"
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setSideNavOpen(false)}
          onKeyDown={() => setSideNavOpen(false)}
        >
          <List>
            <ListItem onClick={() => handleSideNavOnClick("home")}>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{ variant: "subtitle1" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem onClick={() => handleSideNavOnClick("projects")}>
              <ListItemButton>
                <ListItemIcon>
                  <TextSnippet />
                </ListItemIcon>
                <ListItemText
                  primary="Projects"
                  primaryTypographyProps={{ variant: "subtitle1" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>

            {/* <ListItem onClick={() => handleSideNavOnClick("profile")}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile"></ListItemText>
            </ListItemButton>
          </ListItem> */}

            <ListItem onClick={() => handleSideNavOnClick("settings")}>
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{ variant: "subtitle1" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem onClick={logout}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary="Log out"
                  primaryTypographyProps={{ variant: "subtitle1" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    );
  };

  const handleLoggedOutOnClick = (page: string) => {
    navigate(`/${page}`);
  };

  const navigateToCreateProject = () => {
    navigate(CUSTOMER_ROUTES.CREATE_PROJECT);
  };
  const renderHamburger = () => {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ color: "gray" }}
        onClick={() => setSideNavOpen(true)}
      >
        <Menu />
      </IconButton>
    );
  };

  const renderLogo = () => {
    return (
      <img
        // src={logo}
        height={44}
        style={{ marginBottom: 2, cursor: "pointer" }}
        onClick={() => navigate(GENERAL_ROUTES.HOME)}
        alt="logo"
      />
    );
  };

  const renderSearchBar = () => {
    return <SearchBar />;
  };
  const renderCustomerNav = () => {
    return (
      <>
        <Toolbar>
          {renderHamburger()}

          {renderLogo()}

          {renderSearchBar()}

          <Box display="flex" flexGrow={1} justifyContent="flex-end">
            <Button
              onClick={navigateToCreateProject}
              variant="contained"
              sx={{ borderRadius: 40 }}
            >
              NEW PROJECT
            </Button>
          </Box>

          <CustomerNotification />
        </Toolbar>
        {renderSideNav()}
      </>
    );
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
              Log In
            </Button>
            <Button
              variant="contained"
              onClick={() => handleLoggedOutOnClick("company-signup")}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </>
    );
  };

  const renderVendorNav = () => {
    return (
      <>
        <Toolbar>
          {renderHamburger()}
          {renderLogo()}
          {renderSearchBar()}
        </Toolbar>
      </>
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

  return (
    <>
      {resetLoading && <FullScreenLoading />}
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px -3px 10px 0px rgb(151 149 149 / 75%)",
            padding: "0 7% 0",
          }}
        >
          {!user && renderLoggedOutNav()}
          {user && user.isVendor && renderVendorNav()}
          {user && !user.isVendor && renderCustomerNav()}
        </AppBar>
        <Button onClick={resetData}>RESET</Button>
      </Box>
      {renderSideNav()}
    </>
  );
};

export default Nav;
