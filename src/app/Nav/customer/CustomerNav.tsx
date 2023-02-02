import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  Toolbar,
} from "@mui/material";
import React, { useContext, useState } from "react";
import SearchBar from "../../Search/SearchBar";
import CustomerSideNav from "./CustomerSideNav";
import logo from "../../../static/logo2.png";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../constants/loggedInRoutes";
import NewProjectMenu from "./NewProjectMenu";
import NotificationComponent from "../../Notification/NotificationComponent";
import { AuthContext } from "../../../context/AuthContext";

import ReactGA from "react-ga4";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../analytics/constants";

export default function CustomerNav() {
  const { user } = useContext(AuthContext);

  const intl = useIntl();
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const [newProjectMenuAnchor, seNewtProjectMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const newProjectMenuOpen = !!newProjectMenuAnchor;

  const newProjectOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    seNewtProjectMenuAnchor(e.currentTarget);
  };

  const newProjectOnClose = () => {
    seNewtProjectMenuAnchor(null);
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
        <MenuIcon />
      </IconButton>
    );
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

  return (
    <>
      <Toolbar>
        {renderHamburger()}
        {renderLogo()}
        <SearchBar />
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Button
            onClick={newProjectOnClick}
            variant="outlined"
            sx={{ borderRadius: 40 }}
          >
            {intl.formatMessage({
              id: "app.routes.loggedIn.newProject",
            })}
            <ExpandMore />
          </Button>
        </Box>
        <NotificationComponent />
      </Toolbar>

      <CustomerSideNav
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />
      <NewProjectMenu
        newProjectMenuAnchor={newProjectMenuAnchor}
        newProjectMenuOpen={newProjectMenuOpen}
        newProjectOnClose={newProjectOnClose}
      />
    </>
  );
}
