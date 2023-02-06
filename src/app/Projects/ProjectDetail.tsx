import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerProjectDetail from "./customer/CustomerProjectDetail";
import VendorProjectDetail from "./vendor/VendorProjectDetail";

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
