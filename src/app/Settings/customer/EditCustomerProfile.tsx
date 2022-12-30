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
import {
  CustomerDetail,
  UpdateCustomerInfoInput,
} from "../../../generated/graphql";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { countries } from "../../constants/countries";
import FullScreenLoading from "../../Utils/Loading";
import { Country } from "../../Signup/customer/CustomerSignup";
import { validate } from "email-validator";
import { useUpdateCustomerInfoMutation } from "../../gql/update/customer/customer.generated";
import { useGetCustomerDetailQuery } from "../../gql/get/customer/customer.generated";
import { useIntl } from "react-intl";

/** ADMIN VIEW */
const EditCustomerProfile = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getCustomerDetailData,
    loading: getCustomerDetailLoading,
    error: getCustomerDetailError,
    refetch: getCustomerDetailRefetch,
  } = useGetCustomerDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [
    updateCustomerData,
    {
      error: updateCustomerDataError,
      loading: updateCustomerDataLoading,
      data: updateCustomerDataData,
    },
  ] = useUpdateCustomerInfoMutation();

  const [customerData, setCustomerData] =
    useState<UpdateCustomerInfoInput | null>(null);

  useEffect(() => {
    if (getCustomerDetailData && getCustomerDetailData.getCustomerDetail) {
      const { name, contactEmail, phone, logo, country, companyUrl, fax } =
        getCustomerDetailData.getCustomerDetail!;
      setCustomerData({
        companyId: user!.companyId,
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
        message: intl.formatMessage({ id: "app.general.network.error" }),
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
            required
            {...params}
            label={intl.formatMessage({ id: "app.company.attribute.country" })}
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
      const fieldValue = customerData![key as keyof UpdateCustomerInfoInput];
      if (isRequired(key) && !isValid(key, fieldValue)) return true;
    }

    return false;
  };
  // console.log({ shouldDisableUpdateButton: shouldDisableUpdateButton() });
  const updateCompanyData = async () => {
    try {
      await updateCustomerData({
        variables: {
          data: customerData!,
        },
      });

      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      getCustomerDetailRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
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
      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.companySettings.editCompanyProfile",
        })}
      </Typography>

      {customerData && (
        <>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.companyName",
              })}
              name="name"
              value={customerData.name}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.contactEmail",
              })}
              name="contactEmail"
              value={customerData.contactEmail}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({ id: "app.company.attribute.phone" })}
              name="phone"
              value={customerData.phone}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({ id: "app.company.attribute.fax" })}
              name="fax"
              value={customerData.fax}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.companyUrl",
              })}
              name="companyUrl"
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
                variant="outlined"
                disabled={shouldDisableUpdateButton()}
                onClick={updateCompanyData}
              >
                {intl.formatMessage({ id: "app.general.update" })}
              </Button>
            </Container>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default EditCustomerProfile;
