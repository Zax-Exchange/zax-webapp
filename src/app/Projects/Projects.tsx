import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GENERAL_ROUTES } from "../constants/loggedInRoutes";
import CustomerProjects from "./customer/CustomerProjects";
import VendorProjects from "./vendor/VendorProjects";
import ReactGA from "react-ga4";

const Projects = () => {
  const { user } = useContext(AuthContext);

  if (user?.isVendor) {
    return <VendorProjects />;
  }

  if (!user?.isVendor) {
    return <CustomerProjects />;
  }

  return null;
};

export default Projects;
