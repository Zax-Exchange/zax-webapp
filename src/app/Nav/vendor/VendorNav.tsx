import { IconButton, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import VendorNotification from "../../Notification/VendorNotification";
import SearchBar from "../../Search/SearchBar";
import logo from "../../../static/logo2.png";
import { useNavigate } from "react-router-dom";
import VendorSideNav from "./VendorSideNav";
import { Menu } from "@mui/icons-material";
const VendorNav = () => {
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);

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
        <VendorNotification />
      </Toolbar>
      <VendorSideNav
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />
    </>
  );
};

export default VendorNav;
