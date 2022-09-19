import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import CustomerNotification from "../../Notification/CustomerNotification";
import SearchBar from "../../Search/SearchBar";
import CustomerSideNav from "./CustomerSideNav";
import logo from "../../../static/logo2.png";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../constants/loggedInRoutes";

export default function CustomerNav() {
  const intl = useIntl();
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [projectCreationModalOpen, setProjectCreationModalOpen] =
    useState(false);

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
        src={logo}
        height={44}
        style={{ marginBottom: 2, cursor: "pointer" }}
        onClick={() => navigate(GENERAL_ROUTES.HOME)}
        alt="logo"
      />
    );
  };

  const navigateToProjectCreationPage = (
    route:
      | CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT
      | CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT
  ) => {
    navigate(route);
    setProjectCreationModalOpen(false);
  };
  return (
    <>
      <Toolbar>
        {renderHamburger()}
        {renderLogo()}
        <SearchBar />
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Button
            onClick={() => setProjectCreationModalOpen(true)}
            variant="contained"
            sx={{ borderRadius: 40 }}
          >
            {intl.formatMessage({
              id: "app.routes.loggedIn.newProject",
            })}
          </Button>
        </Box>
        <CustomerNotification />
      </Toolbar>
      <CustomerSideNav
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />

      <Dialog
        open={projectCreationModalOpen}
        onClose={() => setProjectCreationModalOpen(false)}
      >
        <DialogTitle>
          {intl.formatMessage({
            id: "app.customer.createProject.creationModeModalTitle",
          })}
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box>
              <Button
                variant="outlined"
                onClick={() =>
                  navigateToProjectCreationPage(
                    CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT
                  )
                }
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.guidedCreate",
                })}
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  navigateToProjectCreationPage(
                    CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT
                  )
                }
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.advancedCreate",
                })}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
