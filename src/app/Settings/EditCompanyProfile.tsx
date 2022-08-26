import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";

import EditVendorProfile from "./vendor/EditVendorProfile";
import EditCustomerProfile from "./customer/EditCustomerProfile";

/**
 * 
 * id
  name
  logo
  phone
  fax
  country
  companyUrl
  isActive
  isVendor
  isVerified

  locations
  materials
  moq
  leadTime
 */

const EditCompanyProfile = () => {
  const { user } = useContext(AuthContext);

  if (user!.isVendor) {
    return <EditVendorProfile />;
  }
  return <EditCustomerProfile />;
};

export default EditCompanyProfile;
