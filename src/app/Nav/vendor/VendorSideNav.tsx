import { Home, Logout, Settings, TextSnippet } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
  VENDOR_ROUTES,
} from "../../constants/loggedInRoutes";

export default function VendorSideNav({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, logout } = useContext(AuthContext);
  const intl = useIntl();
  const navigate = useNavigate();

  const handleSideNavOnClick = (page: string) => {
    if (page === "home") {
      navigate(GENERAL_ROUTES.HOME);
    } else if (page === "projects") {
      navigate(VENDOR_ROUTES.PROJECTS);
    } else {
      navigate(`${page}`);
    }
  };
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
          <ListItem onClick={() => handleSideNavOnClick(GENERAL_ROUTES.HOME)}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  id: "app.routes.loggedIn.home",
                })}
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
                primary={intl.formatMessage({
                  id: "app.routes.loggedIn.projects",
                })}
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

          <ListItem
            onClick={() => handleSideNavOnClick(GENERAL_ROUTES.SETTINGS)}
          >
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  id: "app.routes.loggedIn.settings",
                })}
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
                primary={intl.formatMessage({
                  id: "app.general.logout",
                })}
                primaryTypographyProps={{ variant: "subtitle1" }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}