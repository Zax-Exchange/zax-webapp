import { CircularProgress, Container, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { AuthContext } from "../../context/AuthContext";
import { buttonTheme, PrimaryButton } from "../themedComponents/Buttons";
import { ShrinkTextField } from "../themedComponents/ShrinkTextField";
import FullScreenLoading from "../Utils/Loading";
import { useGetCompanyDetail, useUpdateCustomerData, useUpdateVendorData } from "../hooks/companyHooks";

const UpdateBillingEmail = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);


  return <Container>
    <Typography variant="h6">Update Billing Email</Typography>
    
  </Container>
}

export default UpdateBillingEmail;