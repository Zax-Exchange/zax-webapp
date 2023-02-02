import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerProjectDetail from "./customer/CustomerProjectDetail";
import VendorProjectDetail from "./vendor/VendorProjectDetail";
import ReactGA from "react-ga4";
import { GENERAL_ROUTES } from "../constants/loggedInRoutes";

const ProjectDetail = () => {
  const { user } = useContext(AuthContext);

  if (user?.isVendor) {
    return <VendorProjectDetail />;
  }

  if (!user?.isVendor) {
    return <CustomerProjectDetail />;
  }

  return null;
};

export default ProjectDetail;
