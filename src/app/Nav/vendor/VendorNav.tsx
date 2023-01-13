import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import NotificationComponent from "../../Notification/NotificationComponent";
import SearchBar from "../../Search/SearchBar";
import logo from "../../../static/logo2.png";
import { useNavigate } from "react-router-dom";
import VendorSideNav from "./VendorSideNav";
import { Menu } from "@mui/icons-material";
import { useIntl } from "react-intl";
import GenerateGuestProjectLinkModal from "./modals/GenerateGuestProjectLinkModal";

const VendorNav = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [
    generateGuestProjectLinkModalOpen,
    setGenerateGuestProjectLinkModalOpen,
  ] = useState(false);

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

  return (
    <>
      <Toolbar>
        {renderHamburger()}
        {renderLogo()}
        <SearchBar />
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Button
            onClick={() => setGenerateGuestProjectLinkModalOpen(true)}
            variant="outlined"
            sx={{ borderRadius: 40 }}
          >
            {intl.formatMessage({
              id: "app.vendor.guestProject.create",
            })}
          </Button>
        </Box>

        <NotificationComponent />
      </Toolbar>
      <Dialog
        open={generateGuestProjectLinkModalOpen}
        onClose={() => setGenerateGuestProjectLinkModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <GenerateGuestProjectLinkModal
            setGenerateGuestProjectLinkModalOpen={
              setGenerateGuestProjectLinkModalOpen
            }
          />
        </DialogContent>
      </Dialog>
      <VendorSideNav
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />
    </>
  );
};

export default VendorNav;
