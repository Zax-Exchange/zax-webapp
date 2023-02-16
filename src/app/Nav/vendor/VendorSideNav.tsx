import {
  Home,
  Logout,
  ReceiptLong,
  Settings,
  TextSnippet,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";

export default function VendorSideNav({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const intl = useIntl();
  const navigate = useNavigate();

  const handleSideNavOnClick = (page: string) => {
    if (page === "home") {
      navigate(GENERAL_ROUTES.HOME);
    } else {
      navigate(`${page}`);
    }
  };

  const renderSideNavListItem = (
    onClick: () => void,
    icon: JSX.Element,
    text: string,
    shouldHighlight: boolean = false
  ) => {
    return (
      <ListItem onClick={onClick}>
        <ListItemButton
          sx={{
            backgroundColor: shouldHighlight ? "#ededed" : "transparent",
            borderRadius: "4px",
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{ variant: "subtitle1" }}
          ></ListItemText>
        </ListItemButton>
      </ListItem>
    );
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
          {renderSideNavListItem(
            () => handleSideNavOnClick(GENERAL_ROUTES.HOME),
            <Home />,
            intl.formatMessage({
              id: "app.routes.loggedIn.home",
            }),
            location.pathname === GENERAL_ROUTES.HOME
          )}
          {renderSideNavListItem(
            () => handleSideNavOnClick(GENERAL_ROUTES.PROJECTS),
            <TextSnippet />,
            intl.formatMessage({
              id: "app.routes.loggedIn.projects",
            }),
            location.pathname === GENERAL_ROUTES.PROJECTS
          )}
          {renderSideNavListItem(
            () => handleSideNavOnClick(GENERAL_ROUTES.PO_INVOICE),
            <ReceiptLong />,
            intl.formatMessage({
              id: "app.routes.loggedIn.poInvoice",
            }),
            location.pathname === GENERAL_ROUTES.PO_INVOICE
          )}

          {renderSideNavListItem(
            () => handleSideNavOnClick(GENERAL_ROUTES.SETTINGS),
            <Settings />,
            intl.formatMessage({
              id: "app.routes.loggedIn.settings",
            }),
            location.pathname === GENERAL_ROUTES.SETTINGS
          )}

          {renderSideNavListItem(
            logout,
            <Logout />,
            intl.formatMessage({
              id: "app.general.logout",
            })
          )}
        </List>
      </Box>
    </Drawer>
  );
}
