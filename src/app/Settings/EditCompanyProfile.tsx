import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";

import EditVendorProfile from "./vendor/EditVendorProfile";
import EditCustomerProfile from "./customer/EditCustomerProfile";

/** ADMIN VIEW */
const EditCompanyProfile = () => {
  const { user } = useContext(AuthContext);

  if (user!.isVendor) {
    return <EditVendorProfile />;
  }
  return <EditCustomerProfile />;
};

export default EditCompanyProfile;
