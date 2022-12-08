import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerSettings from "./customer/CustomerSettings";
import VendorSettings from "./vendor/VendorSettings";

const Settings = () => {
  const { user } = useContext(AuthContext);

  if (user!.isVendor) {
    return <VendorSettings />;
  }
  return <CustomerSettings />;
};

export default Settings;
