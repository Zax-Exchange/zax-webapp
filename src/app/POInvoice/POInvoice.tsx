import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerPO from "./customer/CustomerPO";
import VendorPO from "./vendor/VendorPO";

const POInvoice = () => {
  const { user } = useContext(AuthContext);

  if (user!.isVendor) {
    return <VendorPO />;
  }
  return <CustomerPO />;
};

export default POInvoice;
