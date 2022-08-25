import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Input,
  ListItem,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { countries } from "../constants/countries";
import FullScreenLoading from "../Utils/Loading";

import AddIcon from "@mui/icons-material/Add";
import "../Login/vendor/VendorSignup.scss";
import { isValidAlphanumeric, isValidInt } from "../Utils/inputValidators";
import React from "react";
import { useGetCompanyDetailQuery } from "../gql/get/company/company.generated";
import { useUpdateVendorMutation } from "../gql/update/vendor/vendor.generated";
import { useUpdateCustomerMutation } from "../gql/update/customer/customer.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
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
