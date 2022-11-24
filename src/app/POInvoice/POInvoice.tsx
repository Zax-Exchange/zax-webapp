import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerPO from "./customer/CustomerPO";
import VendorInvoice from "./vendor/VendorInvoice";

const POInvoice = () => {
  const { user } = useContext(AuthContext);

  if (user!.isVendor) {
    return <VendorInvoice />;
  }
  return <CustomerPO />;
};

export default POInvoice;
