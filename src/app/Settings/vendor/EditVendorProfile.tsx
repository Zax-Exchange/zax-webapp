import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import React from "react";

import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useGetVendorDetailQuery } from "../../gql/get/vendor/vendor.generated";

import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { Country } from "../../Signup/customer/CustomerSignup";
import { countries } from "../../constants/countries";
import FullScreenLoading from "../../Utils/Loading";
import { validate } from "email-validator";
import { useUpdateVendorInfoMutation } from "../../gql/update/vendor/vendor.generated";
import { UpdateVendorInfoInput } from "../../../generated/graphql";
import {
  ALL_PRODUCT_NAMES,
  productValueToLabelMap,
} from "../../constants/products";
import { useIntl } from "react-intl";
import { Cancel } from "@mui/icons-material";

/** ADMIN VIEW */
const EditVendorProfile = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getVendorDetailData,
    loading: getVendorDetailLoading,
    error: getVendorDetailError,
    refetch: getVendorDetailRefetch,
  } = useGetVendorDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [
    updateVendorData,
    {
      error: updateVendorDataError,
      loading: updateVendorDataLoading,
      data: updateVendorDataData,
    },
  ] = useUpdateVendorInfoMutation();

  const [vendorData, setVendorData] = useState<UpdateVendorInfoInput | null>(
    null
  );

  useEffect(() => {
    if (getVendorDetailData && getVendorDetailData.getVendorDetail) {
      const { name, contactEmail, phone, logo, country, companyUrl, fax } =
        getVendorDetailData.getVendorDetail;

      setVendorData({
        companyId: user!.companyId,
        name,
        contactEmail,
        phone,
        logo,
        country,
        companyUrl: companyUrl || "https://",
        fax,
      });
    }
  }, [getVendorDetailData]);

  useEffect(() => {
    if (getVendorDetailError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [getVendorDetailError]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "phone":
      case "fax":
        isAllowed = isValidInt(val);
        break;
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "companyUrl":
        if (val.substring(0, 8) !== "https://") {
          isAllowed = false;
        } else {
          isAllowed = true;
        }
        break;
      default:
        break;
    }

    if (isAllowed) {
      setVendorData({
        ...vendorData!,
        [e.target.name]: val,
      });
    }
  };

  const countryOnChange = (v: Country | null) => {
    // v could be null if user clears input field
    const country = v ? v.label : vendorData!.country;
    setVendorData({
      ...vendorData!,
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
        value={countries.find((c) => c.label === vendorData!.country)}
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
            value={vendorData!.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  };

  const shouldDisableUpdateButton = () => {
    // common non-required attributes
    const isRequired = (field: keyof UpdateVendorInfoInput) => {
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
      field: keyof UpdateVendorInfoInput,
      fieldValue: boolean | string | number | string[] | undefined | null
    ) => {
      switch (field) {
        case "contactEmail":
          return validate(fieldValue as string);
        case "name":
        case "phone":
        case "country":
          return !!(fieldValue as string).length;
      }
      return false;
    };

    for (let key in vendorData) {
      const attr = key as keyof UpdateVendorInfoInput;
      const fieldValue = vendorData![attr];

      if (isRequired(attr) && !isValid(attr, fieldValue)) return true;
    }

    return false;
  };

  const updateCompanyData = async () => {
    try {
      await updateVendorData({
        variables: {
          data: {
            ...vendorData!,
            companyUrl:
              vendorData!.companyUrl !== "https://"
                ? vendorData!.companyUrl
                : "",
          },
        },
      });
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      getVendorDetailRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const isLoading = getVendorDetailLoading || updateVendorDataLoading;

  if (getVendorDetailError) return null;

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.companySettings.editCompanyProfile",
        })}
      </Typography>

      {vendorData && (
        <>
          <Stack spacing={3} sx={{ marginTop: 2 }}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.companyName",
              })}
              name="name"
              value={vendorData!.name}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.contactEmail",
              })}
              name="contactEmail"
              value={vendorData!.contactEmail}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({ id: "app.company.attribute.phone" })}
              name="phone"
              value={vendorData!.phone}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({ id: "app.company.attribute.fax" })}
              name="fax"
              value={vendorData!.fax}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.companyUrl",
              })}
              name="companyUrl"
              value={vendorData!.companyUrl}
              onChange={onChange}
            />
            {renderCountryDropdown()}

            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
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

export default EditVendorProfile;
