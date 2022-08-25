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

import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useUpdateCustomerMutation } from "../../gql/update/customer/customer.generated";
import {
  CustomerDetail,
  EditableCustomerDetail,
  UpdateCustomerInputData,
} from "../../../generated/graphql";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { countries } from "../../constants/countries";
import FullScreenLoading from "../../Utils/Loading";
import { Country } from "../../Login/customer/CustomerSignup";
import { useGetEditableCustomerDetailQuery } from "../../gql/get/customer/customer.generated";
import { validate } from "email-validator";

const EditCustomerProfile = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getCustomerDetailData,
    loading: getCustomerDetailLoading,
    error: getCustomerDetailError,
    refetch: getCustomerDetailRefetch,
  } = useGetEditableCustomerDetailQuery({
    variables: {
      companyId: user!.companyId,
    },
  });

  const [
    updateCustomerData,
    {
      error: updateCustomerDataError,
      loading: updateCustomerDataLoading,
      data: updateCustomerDataData,
    },
  ] = useUpdateCustomerMutation();

  const [customerData, setCustomerData] =
    useState<UpdateCustomerInputData | null>(null);

  useEffect(() => {
    if (
      getCustomerDetailData &&
      getCustomerDetailData.getEditableCustomerDetail
    ) {
      const { name, contactEmail, phone, logo, country, companyUrl, fax } =
        getCustomerDetailData.getEditableCustomerDetail!;
      setCustomerData({
        name,
        contactEmail,
        phone,
        logo,
        country,
        companyUrl,
        fax,
      });
    }
  }, [getCustomerDetailData]);

  useEffect(() => {
    if (getCustomerDetailError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getCustomerDetailError]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "phone":
      case "fax":
        isAllowed = isValidInt(val);
        break;
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setCustomerData({
        ...customerData!,
        [e.target.name]: val,
      });
    }
  };

  const countryOnChange = (v: Country | null) => {
    // v could be null if user clears input field
    const country = v ? v.label : customerData!.country;
    setCustomerData({
      ...customerData!,
      country,
    });
  };
  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        blurOnSelect
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e, v) => countryOnChange(v)}
        value={countries.find((c) => c.label === customerData!.country)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            name="country"
            value={customerData!.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  };

  const renderCustomerUpdateForm = () => {
    return <></>;
  };

  const shouldDisableUpdateButton = () => {
    // common non-required attributes
    const isRequired = (field: string) => {
      switch (field) {
        case "contactEmail":
        case "name":
        case "phone":
        case "country":
          return true;
      }
      return false;
    };

    const isValid = (
      field: string,
      fieldValue: boolean | string | undefined | null
    ) => {
      switch (field) {
        case "contactEmail":
          return validate(fieldValue as string);
        case "name":
          return !!fieldValue;
        case "phone":
          return !!fieldValue;
        case "country":
          return !!fieldValue;
      }
      return false;
    };

    for (let key in customerData) {
      const fieldValue = customerData![key as keyof UpdateCustomerInputData];
      if (isRequired(key) && !isValid(key, fieldValue)) return true;
    }

    return false;
  };
  // console.log({ shouldDisableUpdateButton: shouldDisableUpdateButton() });
  const updateCompanyData = async () => {
    try {
      await updateCustomerData({
        variables: {
          data: {
            id: user!.companyId,
            data: customerData!,
          },
        },
      });

      setSnackbar({
        severity: "success",
        message: "Company profile updated.",
      });
      getCustomerDetailRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Could not perform action. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const isLoading = getCustomerDetailLoading || updateCustomerDataLoading;

  if (getCustomerDetailError) return null;

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6">Edit Company Profile</Typography>

      {customerData && (
        <>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Name"
              name="name"
              value={customerData.name}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Contact Email"
              name="contactEmail"
              value={customerData.contactEmail}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Phone"
              name="phone"
              value={customerData.phone}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Fax"
              name="fax"
              value={customerData.fax}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="URL"
              name="companyrl"
              value={customerData.companyUrl}
              onChange={onChange}
            />
            {renderCountryDropdown()}

            {renderCustomerUpdateForm()}

            <Container
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
              disableGutters
            >
              <Button
                disabled={shouldDisableUpdateButton()}
                onClick={updateCompanyData}
              >
                Update
              </Button>
            </Container>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default EditCustomerProfile;
