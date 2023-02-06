import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerProjects from "./customer/CustomerProjects";
import VendorProjects from "./vendor/VendorProjects";

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
