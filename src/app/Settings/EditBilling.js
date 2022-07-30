import { CircularProgress, Container, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { AuthContext } from "../../context/AuthContext";
import { buttonTheme, PrimaryButton } from "../themedComponents/PrimaryButton";
import { ShrinkTextField } from "../themedComponents/ShrinkTextField";
import FullScreenLoading from "../Utils/Loading";
import { useGetCompanyDetail, useUpdateCustomerData, useUpdateVendorData } from "./hooks";

const EditBilling = ({
  setSuccessSnackbarOpen,
  setErrorSnackbarOpen,
  setSuccessSnackbarMessage,
  setErrorSnackbarMessage
}) => {
  const { user } = useContext(AuthContext);

  const { meta, getCVCProps, getCardNumberProps, getExpiryDateProps } = usePaymentInputs()
  const {
    getCompanyDetailRefetch,
    getCompanyDetailError,
    getCompanyDetailData,
    getCompanyDetailLoading
  } = useGetCompanyDetail();
  const {
    updateCustomerData,
    updateCustomerDataLoading,
  } = useUpdateCustomerData();

  const {
    updateVendorData,
    updateVendorDataLoading
  } = useUpdateVendorData();

  const [values, setValues] = useState({
    creditCardNumber: "",
    creditCardExp: "",
    creditCardCvv: ""
  })


  useEffect(() => {
    if (getCompanyDetailData && getCompanyDetailData.getCompanyDetail) {
      setValues({
        creditCardNumber: getCompanyDetailData.getCompanyDetail.creditCardNumber,
        creditCardExp: getCompanyDetailData.getCompanyDetail.creditCardExp,
        creditCardCvv: getCompanyDetailData.getCompanyDetail.creditCardCvv
      })
    }
  }, [getCompanyDetailData]);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const updateBilling = async () => {
    const id = user.companyId;
    const data = values;

    try {
      if (user.isVendor) {
        await updateVendorData({
          variables: {
            data: {
              id,
              data
            }
          }
        })
      } else {
        await updateCustomerData({
          variables: {
            data: {
              id,
              data
            }
          }
        })
      }
      getCompanyDetailRefetch();
      setSuccessSnackbarOpen(true);
      setSuccessSnackbarMessage("Billing info updated.")
    } catch (e) {
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage("Something went wrong. Please try again later.")
    }
  }

  const isLoading = getCompanyDetailLoading || updateCustomerDataLoading || updateVendorDataLoading;

  return <Container>
    {isLoading && <FullScreenLoading />}
    {getCompanyDetailError && 
      <>
      <Typography>Something went wrong</Typography>

        <ThemeProvider theme={buttonTheme}>
          <PrimaryButton 
            variant="contained" 
            onClick={getCompanyDetailRefetch}
          >
            Retry
          </PrimaryButton>
      </ThemeProvider>
      </>
    }

    {
      getCompanyDetailData && 
      getCompanyDetailData.getCompanyDetail &&
      <>
        <Typography variant="h6">Edit Billing Information</Typography>
        <Stack spacing={4} sx={{marginTop: 2}}>
          <TextField InputLabelProps={{shrink: true}} label="Credit card number" type="tel" inputProps={getCardNumberProps({ onChange, name: "creditCardNumber", value: values.creditCardNumber })} error={!!meta.erroredInputs.cardNumber} helperText={meta.erroredInputs.cardNumber}></TextField>
          <TextField InputLabelProps={{shrink: true}} label="Exp" type="tel" inputProps={getExpiryDateProps({ onChange, name: "creditCardExp", value: values.creditCardExp })} error={!!meta.erroredInputs.expiryDate} helperText={meta.erroredInputs.expiryDate}></TextField>
          <TextField InputLabelProps={{shrink: true}} label="CVV" type="tel" inputProps={getCVCProps({ onChange, name: "creditCardCvv", value: values.creditCardCvv })} error={!!meta.erroredInputs.cvc} helperText={meta.erroredInputs.cvc}></TextField>
        </Stack>
        <Container sx={{ display: "flex", justifyContent:"flex-end", marginTop: 2 }} disableGutters>
          <ThemeProvider theme={buttonTheme}>
            <PrimaryButton 
              variant="contained" 
              disabled={!!meta.error}
              onClick={updateBilling}
            >
              Update
            </PrimaryButton>
        </ThemeProvider>
        </Container>
      </>
    }
  </Container>
}

export default EditBilling;